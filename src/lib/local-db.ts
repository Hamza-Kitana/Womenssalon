import {
  DEFAULT_TIMES,
  listStoredServices,
  saveStoredServices,
  normalizeService,
  type Booking,
  type Service,
  type Slot,
} from "@/lib/salon";

const K_SLOTS = "lamsat-slots";
const K_BOOKINGS = "lamsat-bookings";
const K_CREDS = "lamsat-admin-creds";

export type SlotAvailability = {
  id: string;
  slot_date: string;
  slot_time: string;
  capacity: number;
  taken: number;
  remaining: number;
};

type Creds = { username: string; password: string };

function browser() {
  return typeof window !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!browser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (!browser()) return;
  localStorage.setItem(key, JSON.stringify(value));
}

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function todayIso() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isFriday(iso: string) {
  return new Date(`${iso}T12:00:00`).getDay() === 5;
}

function loadSlots(): Slot[] {
  return readJson<Slot[]>(K_SLOTS, []);
}

function saveSlots(rows: Slot[]) {
  writeJson(K_SLOTS, rows);
}

function loadBookings(): Booking[] {
  return readJson<Array<Partial<Booking>>>(K_BOOKINGS, []).map((row) => ({
    id: String(row.id ?? uid()),
    created_at: String(row.created_at ?? new Date().toISOString()),
    customer_name: String(row.customer_name ?? ""),
    guests: Number(row.guests) || 1,
    notes: String(row.notes ?? ""),
    phone: String(row.phone ?? ""),
    service_id: row.service_id ?? null,
    service_ids: Array.isArray(row.service_ids)
      ? row.service_ids.map(String).filter(Boolean)
      : row.service_id
        ? [String(row.service_id)]
        : [],
    slot_date: String(row.slot_date ?? ""),
    slot_time: String(row.slot_time ?? ""),
    status: String(row.status ?? "pending"),
    staff_id: row.staff_id ?? null,
  }));
}

function saveBookings(rows: Booking[]) {
  writeJson(K_BOOKINGS, rows);
}

function loadCreds(): Creds {
  return readJson<Creds>(K_CREDS, { username: "admin", password: "222" });
}

export function ensureSlots() {
  const existing = loadSlots();
  const start = todayIso();
  const needed = new Set<string>();
  for (let i = 0; i < 14; i += 1) {
    const date = addDays(start, i);
    if (isFriday(date)) continue;
    for (const time of DEFAULT_TIMES) needed.add(`${date}|${time}`);
  }
  const have = new Set(existing.map((s) => `${s.slot_date}|${String(s.slot_time).slice(0, 5)}`));
  const extra: Slot[] = [];
  for (const key of needed) {
    if (have.has(key)) continue;
    const [slot_date, slot_time] = key.split("|") as [string, string];
    extra.push({
      id: uid(),
      created_at: new Date().toISOString(),
      slot_date,
      slot_time,
      capacity: 1,
      is_open: true,
    });
  }
  if (extra.length > 0) saveSlots([...existing, ...extra]);
}

export function getAvailability(): SlotAvailability[] {
  if (!browser()) return [];
  ensureSlots();
  const today = todayIso();
  const taken = new Map<string, number>();
  for (const b of loadBookings()) {
    if (b.status === "cancelled" || b.slot_date < today) continue;
    const key = `${b.slot_date}|${String(b.slot_time).slice(0, 5)}`;
    taken.set(key, (taken.get(key) ?? 0) + (b.guests ?? 1));
  }
  return loadSlots()
    .filter((s) => s.is_open && s.slot_date >= today)
    .map((s) => {
      const time = String(s.slot_time).slice(0, 5);
      const used = taken.get(`${s.slot_date}|${time}`) ?? 0;
      return {
        id: s.id,
        slot_date: s.slot_date,
        slot_time: time,
        capacity: s.capacity,
        taken: used,
        remaining: Math.max(0, s.capacity - used),
      };
    })
    .sort(
      (a, b) => a.slot_date.localeCompare(b.slot_date) || a.slot_time.localeCompare(b.slot_time),
    );
}

export function createBooking(input: {
  customer_name: string;
  phone: string;
  service_ids: string[];
  slot_date: string;
  slot_time: string;
  guests: number;
  notes: string;
}) {
  const slot = getAvailability().find(
    (s) => s.slot_date === input.slot_date && s.slot_time === input.slot_time.slice(0, 5),
  );
  if (!slot) return { ok: false as const, reason: "slot_unavailable" };
  if (slot.remaining < input.guests) return { ok: false as const, reason: "slot_full" };

  const service_ids = [...new Set(input.service_ids.filter(Boolean))];
  if (service_ids.length === 0) return { ok: false as const, reason: "no_service" };

  const row: Booking = {
    id: uid(),
    created_at: new Date().toISOString(),
    customer_name: input.customer_name,
    phone: input.phone,
    service_id: service_ids[0] ?? null,
    service_ids,
    slot_date: input.slot_date,
    slot_time: input.slot_time,
    guests: input.guests,
    notes: input.notes,
    status: "pending",
    staff_id: null,
  };
  saveBookings([...loadBookings(), row]);
  return { ok: true as const };
}

function signToken(username: string) {
  return btoa(
    encodeURIComponent(JSON.stringify({ u: username, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })),
  );
}

function readToken(token: string): { u: string; exp: number } | null {
  try {
    return JSON.parse(decodeURIComponent(atob(token))) as { u: string; exp: number };
  } catch {
    return null;
  }
}

export function assertAdmin(token: string) {
  const creds = loadCreds();
  const data = readToken(token);
  if (!data || data.u !== creds.username || data.exp < Date.now()) throw new Error("UNAUTHORIZED");
  return data.u;
}

export function adminLogin(username: string, password: string) {
  const creds = loadCreds();
  if (username.trim() !== creds.username.trim() || password.trim() !== creds.password) {
    return { ok: false as const };
  }
  return { ok: true as const, token: signToken(creds.username) };
}

export function adminLogout() {
  return { ok: true };
}

export function adminMe(token: string) {
  try {
    const username = assertAdmin(token);
    return { ok: true, username };
  } catch {
    return { ok: false, username: null };
  }
}

export function adminOverview(token: string) {
  assertAdmin(token);
  ensureSlots();
  const bookings = [...loadBookings()].sort(
    (a, b) => a.slot_date.localeCompare(b.slot_date) || a.slot_time.localeCompare(b.slot_time),
  );
  const slots = [...loadSlots()].sort(
    (a, b) =>
      a.slot_date.localeCompare(b.slot_date) ||
      String(a.slot_time).localeCompare(String(b.slot_time)),
  );
  const services: Service[] = [...listStoredServices()].sort((a, b) => a.sort_order - b.sort_order);
  return { bookings, slots, services };
}

export function adminUpdateBooking(
  token: string,
  id: string,
  patch: {
    status?: string;
    slot_date?: string;
    slot_time?: string;
    guests?: number;
    notes?: string;
    staff_id?: string | null;
  },
) {
  assertAdmin(token);
  saveBookings(
    loadBookings().map((row) => {
      if (row.id !== id) return row;
      return {
        ...row,
        ...(patch.status !== undefined ? { status: patch.status } : {}),
        ...(patch.slot_date !== undefined ? { slot_date: patch.slot_date } : {}),
        ...(patch.slot_time !== undefined ? { slot_time: patch.slot_time } : {}),
        ...(patch.guests !== undefined ? { guests: patch.guests } : {}),
        ...(patch.notes !== undefined ? { notes: patch.notes } : {}),
        ...(patch.staff_id !== undefined ? { staff_id: patch.staff_id } : {}),
      };
    }),
  );
  return { ok: true };
}

export function adminDeleteBooking(token: string, id: string) {
  assertAdmin(token);
  saveBookings(loadBookings().filter((row) => row.id !== id));
  return { ok: true };
}

export function adminSaveSlot(
  token: string,
  input: { slot_date: string; slot_time: string; capacity: number; is_open: boolean },
) {
  assertAdmin(token);
  ensureSlots();
  const time = input.slot_time.slice(0, 5);
  const rows = loadSlots();
  const idx = rows.findIndex(
    (s) => s.slot_date === input.slot_date && String(s.slot_time).slice(0, 5) === time,
  );
  if (idx >= 0) {
    const current = rows[idx]!;
    rows[idx] = { ...current, capacity: input.capacity, is_open: input.is_open, slot_time: time };
  } else {
    rows.push({
      id: uid(),
      created_at: new Date().toISOString(),
      slot_date: input.slot_date,
      slot_time: time,
      capacity: input.capacity,
      is_open: input.is_open,
    });
  }
  saveSlots(rows);
  return { ok: true };
}

export function adminToggleSlot(token: string, id: string, is_open: boolean) {
  assertAdmin(token);
  saveSlots(loadSlots().map((s) => (s.id === id ? { ...s, is_open } : s)));
  return { ok: true };
}

export function adminDeleteSlot(token: string, id: string) {
  assertAdmin(token);
  saveSlots(loadSlots().filter((s) => s.id !== id));
  return { ok: true };
}

export function adminSaveService(
  token: string,
  input: {
    id?: string;
    name_ar: string;
    name_en: string;
    desc_ar: string;
    desc_en: string;
    long_ar: string;
    long_en: string;
    includes_ar: string[];
    includes_en: string[];
    price: number;
    duration_min: number;
    image_key: Service["image_key"];
    sort_order: number;
    is_active: boolean;
  },
) {
  assertAdmin(token);
  const rows = listStoredServices();
  const id = input.id?.trim() || `svc-${uid()}`;
  const next = normalizeService({
    ...input,
    id,
    created_at: rows.find((row) => row.id === id)?.created_at ?? new Date().toISOString(),
  });
  const idx = rows.findIndex((row) => row.id === id);
  if (idx >= 0) rows[idx] = next;
  else rows.push(next);
  saveStoredServices(rows);
  return { ok: true, service: next };
}

export function adminDeleteService(token: string, id: string) {
  assertAdmin(token);
  saveStoredServices(listStoredServices().filter((row) => row.id !== id));
  return { ok: true };
}

export function adminSetCredentials(token: string, username: string, password: string) {
  assertAdmin(token);
  const current = loadCreds();
  writeJson(K_CREDS, {
    username: username.trim() || current.username,
    password: password.trim() ? password : current.password,
  });
  return { ok: true };
}
