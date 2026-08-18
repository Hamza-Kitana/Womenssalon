import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarClock, ChevronDown, Flower2, Home, LogOut, PieChart, Search, Settings2, Sparkles, Timer } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { OverviewPanel } from "@/components/admin/OverviewPanel";
import { ServicesPanel } from "@/components/admin/ServicesPanel";
import { LoadingScreen } from "@/components/LoadingScreen";
import {
  adminDeleteBooking,
  adminDeleteSlot,
  adminLogin,
  adminLogout,
  adminMe,
  adminOverview,
  adminSaveSlot,
  adminSetCredentials,
  adminToggleSlot,
  adminUpdateBooking,
} from "@/lib/local-db";
import { useI18n } from "@/lib/i18n";
import {
  DEFAULT_TIMES,
  STAFF,
  bookingAmount,
  bookingServiceIds,
  formatDateLabel,
  formatMoney,
  formatTime12,
  hhmm,
  serviceName,
  staffName,
  type Booking,
  type Service,
  type Slot,
} from "@/lib/salon";
import { cn } from "@/lib/utils";

const TOKEN_KEY = "admin-token";

type Tab = "overview" | "bookings" | "slots" | "services" | "settings";
type Status = "pending" | "confirmed" | "done" | "cancelled";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "الإدارة | لمسة ورد" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { t, lang, setLang, dir } = useI18n();
  const [token, setToken] = useState<string | null>(null);
  const [booting, setBooting] = useState(true);
  const [tab, setTab] = useState<Tab>("overview");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) {
      setBooting(false);
      return;
    }
    const res = adminMe(stored);
    if (res.ok) setToken(stored);
    else localStorage.removeItem(TOKEN_KEY);
    setBooting(false);
  }, []);

  const login = useMutation({
    mutationFn: () => Promise.resolve(adminLogin(user, pass)),
    onSuccess: (res) => {
      if (!res.ok) {
        toast.error(t("bad_login"));
        return;
      }
      localStorage.setItem(TOKEN_KEY, res.token);
      setToken(res.token);
      setPass("");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : t("bad_login")),
  });

  if (booting) {
    return <LoadingScreen />;
  }

  if (!token) {
    return (
      <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login.mutate();
          }}
          className="glass-card relative z-10 w-full max-w-md space-y-5 rounded-[2rem] p-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
                <Flower2 className="size-4" />
              </span>
              <div>
                <p className="font-display text-xl">{t("brand")}</p>
                <p className="text-xs text-muted-foreground">{t("admin_login")}</p>
              </div>
            </div>
            <button
              type="button"
              className="text-xs text-muted-foreground"
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            >
              {lang === "ar" ? "EN" : "عربي"}
            </button>
          </div>
          <p className="text-sm text-muted-foreground">{t("admin_welcome")}</p>
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder={t("username")}
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground"
          />
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder={t("password")}
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground"
          />
          <button
            type="submit"
            disabled={login.isPending}
            className="w-full rounded-full bg-primary py-3 text-primary-foreground disabled:opacity-60"
          >
            {t("login")}
          </button>
          <Link
            to="/"
            className="block text-center text-xs text-muted-foreground hover:text-foreground"
          >
            {t("go_home")}
          </Link>
        </form>
      </div>
    );
  }

  return (
    <Dashboard
      token={token}
      tab={tab}
      setTab={setTab}
      dir={dir}
      onLogout={async () => {
        adminLogout();
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
      }}
    />
  );
}

function Dashboard({
  token,
  tab,
  setTab,
  dir,
  onLogout,
}: {
  token: string;
  tab: Tab;
  setTab: (t: Tab) => void;
  dir: "rtl" | "ltr";
  onLogout: () => void;
}) {
  const { t } = useI18n();
  const qc = useQueryClient();
  const overview = useQuery({
    queryKey: ["admin-overview", token],
    queryFn: () => Promise.resolve(adminOverview(token)),
  });

  const refresh = () => {
    void qc.invalidateQueries({ queryKey: ["admin-overview"] });
    void qc.invalidateQueries({ queryKey: ["services"] });
  };

  const nav = [
    { id: "overview" as const, icon: PieChart, label: t("dash_overview") },
    { id: "bookings" as const, icon: CalendarClock, label: t("dash_bookings") },
    { id: "services" as const, icon: Sparkles, label: t("dash_services") },
    { id: "slots" as const, icon: Timer, label: t("dash_slots") },
    { id: "settings" as const, icon: Settings2, label: t("dash_settings") },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row" dir={dir}>
      <aside className="flex shrink-0 flex-col bg-sidebar text-sidebar-foreground lg:sticky lg:top-0 lg:h-screen lg:w-[15.5rem]">
        <div className="flex items-center gap-2 px-5 py-5">
          <Flower2 className="size-5 text-sidebar-primary" />
          <div>
            <p className="font-display text-lg">{t("brand")}</p>
            <p className="text-[10px] tracking-widest text-sidebar-foreground/70">
              {t("admin_login")}
            </p>
          </div>
        </div>
        <nav className="flex flex-1 gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible">
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-2xl px-3 py-2.5 text-sm whitespace-nowrap transition-colors",
                tab === item.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover:bg-sidebar-accent/60",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="m-3 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-2xl px-3 py-2 text-sm opacity-80 hover:bg-sidebar-accent"
          >
            <Home className="size-4" />
            {t("go_home")}
          </Link>
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-sm opacity-80 hover:bg-sidebar-accent"
          >
            <LogOut className="size-4" />
            {t("logout")}
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-6 md:p-8">
        {overview.isLoading ? (
          <LoadingScreen compact />
        ) : overview.data ? (
          <>
            {tab === "overview" && (
              <OverviewPanel bookings={overview.data.bookings} services={overview.data.services} />
            )}
            {tab === "bookings" && (
              <BookingsPanel
                token={token}
                bookings={overview.data.bookings}
                services={overview.data.services}
                onDone={refresh}
              />
            )}
            {tab === "slots" && (
              <SlotsPanel
                token={token}
                slots={overview.data.slots}
                bookings={overview.data.bookings}
                onDone={refresh}
              />
            )}
            {tab === "services" && (
              <ServicesPanel token={token} services={overview.data.services} onDone={refresh} />
            )}
            {tab === "settings" && <SettingsPanel token={token} />}
          </>
        ) : (
          <p className="text-muted-foreground">{t("page_error_sub")}</p>
        )}
      </main>
    </div>
  );
}

function suggestStaff(serviceId: string | null) {
  if (serviceId === "svc-hair") return "st-noor";
  if (serviceId === "svc-makeup") return "st-leen";
  if (serviceId === "svc-nails") return "st-rana";
  if (serviceId === "svc-skin") return "st-jana";
  if (serviceId === "svc-bridal") return "st-sara";
  return null;
}

function statusClass(status: string) {
  if (status === "confirmed") return "bg-emerald-100 text-emerald-800";
  if (status === "done") return "bg-secondary text-foreground";
  if (status === "cancelled") return "bg-destructive/15 text-destructive";
  return "bg-amber-100 text-amber-900";
}

function BookingsPanel({
  token,
  bookings,
  services,
  onDone,
}: {
  token: string;
  bookings: Booking[];
  services: Service[];
  onDone: () => void;
}) {
  const { t, lang } = useI18n();
  const [editing, setEditing] = useState<Booking | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [serviceId, setServiceId] = useState("all");
  const [staffId, setStaffId] = useState("all");
  const [date, setDate] = useState("");

  const names = useMemo(() => {
    const m = new Map<string, Service>();
    for (const s of services) m.set(s.id, s);
    return m;
  }, [services]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((b) => {
      if (status !== "all" && b.status !== status) return false;
      if (serviceId !== "all" && !bookingServiceIds(b).includes(serviceId)) return false;
      if (staffId === "unassigned" && b.staff_id) return false;
      if (staffId !== "all" && staffId !== "unassigned" && b.staff_id !== staffId) return false;
      if (date && b.slot_date !== date) return false;
      if (q) {
        const labels = bookingServiceIds(b)
          .map((id) => names.get(id))
          .filter(Boolean)
          .map((svc) => `${svc!.name_ar} ${svc!.name_en}`)
          .join(" ");
        const member = STAFF.find((row) => row.id === b.staff_id);
        const hay = [
          b.customer_name,
          b.phone,
          b.notes,
          labels,
          member?.name_ar ?? "",
          member?.name_en ?? "",
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [bookings, date, names, query, serviceId, staffId, status]);

  const hasFilters = Boolean(query.trim() || status !== "all" || serviceId !== "all" || staffId !== "all" || date);

  const clearFilters = () => {
    setQuery("");
    setStatus("all");
    setServiceId("all");
    setStaffId("all");
    setDate("");
  };

  const selectClass =
    "w-full appearance-none rounded-xl border border-border bg-background py-2 pe-9 ps-3 text-sm text-foreground outline-none focus:border-primary";

  const patch = useMutation({
    mutationFn: (input: {
      id: string;
      status?: Status;
      slot_date?: string;
      slot_time?: string;
      guests?: number;
      notes?: string;
      staff_id?: string | null;
    }) => {
      const { id, ...rest } = input;
      return Promise.resolve(adminUpdateBooking(token, id, rest));
    },
    onSuccess: () => {
      toast.success(t("saved"));
      setEditing(null);
      onDone();
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => Promise.resolve(adminDeleteBooking(token, id)),
    onSuccess: () => {
      toast.success(t("deleted"));
      onDone();
    },
  });

  return (
    <div>
      <h1 className="font-display mb-5 flex items-center gap-2 text-3xl text-foreground">
        <CalendarClock className="size-6 text-primary" />
        {t("dash_bookings")}
      </h1>

      {bookings.length === 0 ? (
        <p className="text-muted-foreground">{t("no_bookings")}</p>
      ) : (
        <>
          <div className="luxury-card mb-4 grid gap-3 rounded-[1.5rem] p-4 md:grid-cols-2 xl:grid-cols-[1.4fr_0.8fr_0.9fr_0.9fr_0.8fr_auto] xl:items-end">
            <label className="text-sm md:col-span-2 xl:col-span-1">
              {t("filter_search")}
              <span className="relative mt-1 block">
                <Search className="pointer-events-none absolute top-1/2 start-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("filter_search")}
                  className="w-full rounded-xl border border-border bg-background py-2 pe-3 ps-9 text-sm text-foreground outline-none focus:border-primary"
                />
              </span>
            </label>
            <label className="text-sm">
              {t("filter_status")}
              <span className="relative mt-1 block">
                <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass}>
                  <option value="all">{t("filter_all")}</option>
                  <option value="pending">{t("status_pending")}</option>
                  <option value="confirmed">{t("status_confirmed")}</option>
                  <option value="done">{t("status_done")}</option>
                  <option value="cancelled">{t("status_cancelled")}</option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 end-3 size-4 -translate-y-1/2 text-muted-foreground" />
              </span>
            </label>
            <label className="text-sm">
              {t("f_service")}
              <span className="relative mt-1 block">
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className={selectClass}
                >
                  <option value="all">{t("filter_all")}</option>
                  {services.map((svc) => (
                    <option key={svc.id} value={svc.id}>
                      {serviceName(svc, lang)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 end-3 size-4 -translate-y-1/2 text-muted-foreground" />
              </span>
            </label>
            <label className="text-sm">
              {t("dash_staff")}
              <span className="relative mt-1 block">
                <select value={staffId} onChange={(e) => setStaffId(e.target.value)} className={selectClass}>
                  <option value="all">{t("filter_all")}</option>
                  <option value="unassigned">{t("dash_unassigned")}</option>
                  {STAFF.map((member) => (
                    <option key={member.id} value={member.id}>
                      {staffName(member, lang)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 end-3 size-4 -translate-y-1/2 text-muted-foreground" />
              </span>
            </label>
            <label className="text-sm">
              {t("filter_date")}
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
              />
            </label>
            {hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground"
              >
                {t("filter_clear")}
              </button>
            ) : null}
          </div>

          <p className="mb-3 text-xs text-muted-foreground">
            {filtered.length} {t("filter_count")}
          </p>

          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("filter_none")}</p>
          ) : (
            <div className="overflow-x-auto rounded-[1.6rem] border border-border bg-card">
              <table className="w-full min-w-[980px] text-sm">
                <thead className="bg-secondary/70 text-start">
                  <tr>
                    <th className="px-4 py-3 font-medium">{t("f_name")}</th>
                    <th className="px-4 py-3 font-medium">{t("f_phone")}</th>
                    <th className="px-4 py-3 font-medium">{t("f_service")}</th>
                    <th className="px-4 py-3 font-medium">{t("dash_staff")}</th>
                    <th className="px-4 py-3 font-medium">{t("dash_amount")}</th>
                    <th className="px-4 py-3 font-medium">{t("f_date")}</th>
                    <th className="px-4 py-3 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => {
                const ids = bookingServiceIds(b);
                const labels = ids
                  .map((id) => names.get(id))
                  .filter(Boolean)
                  .map((svc) => serviceName(svc!, lang));
                const amount = bookingAmount(b, services);
                return (
                  <tr key={b.id} className="border-t border-border/70">
                    <td className="px-4 py-3">
                      <p>{b.customer_name}</p>
                      <span
                        className={cn(
                          "mt-1 inline-block rounded-full px-2 py-0.5 text-[10px]",
                          statusClass(b.status),
                        )}
                      >
                        {t(`status_${b.status}` as "status_pending")}
                      </span>
                    </td>
                    <td className="px-4 py-3" dir="ltr">
                      {b.phone}
                    </td>
                    <td className="px-4 py-3">
                      <p>{labels.length ? labels.join(" · ") : "—"}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {b.guests} {t("f_guests")}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={b.staff_id ?? ""}
                        onChange={(e) =>
                          patch.mutate({
                            id: b.id,
                            staff_id: e.target.value ? e.target.value : null,
                          })
                        }
                        className="max-w-[10rem] rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground"
                      >
                        <option value="">{t("dash_unassigned")}</option>
                        {STAFF.map((member) => (
                          <option key={member.id} value={member.id}>
                            {staffName(member, lang)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 font-medium">{formatMoney(amount, t("currency"))}</td>
                    <td className="px-4 py-3">
                      {formatDateLabel(b.slot_date, lang)}
                      <span className="block text-xs text-muted-foreground" dir="ltr">
                        {formatTime12(b.slot_time)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap justify-end gap-1">
                        {b.status === "pending" && (
                          <button
                            type="button"
                            className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground"
                            onClick={() =>
                              patch.mutate({
                                id: b.id,
                                status: "confirmed",
                                staff_id: b.staff_id ?? suggestStaff(b.service_id),
                              })
                            }
                          >
                            {t("action_confirm")}
                          </button>
                        )}
                        {b.status === "confirmed" && (
                          <button
                            type="button"
                            className="rounded-full bg-secondary px-3 py-1 text-xs"
                            onClick={() => patch.mutate({ id: b.id, status: "done" })}
                          >
                            {t("action_done")}
                          </button>
                        )}
                        {b.status !== "cancelled" && b.status !== "done" && (
                          <button
                            type="button"
                            className="rounded-full px-3 py-1 text-xs text-destructive"
                            onClick={() => patch.mutate({ id: b.id, status: "cancelled" })}
                          >
                            {t("action_cancel")}
                          </button>
                        )}
                        <button
                          type="button"
                          className="rounded-full px-3 py-1 text-xs"
                          onClick={() => setEditing(b)}
                        >
                          {t("action_edit")}
                        </button>
                        <button
                          type="button"
                          className="rounded-full px-3 py-1 text-xs text-muted-foreground"
                          onClick={() => remove.mutate(b.id)}
                        >
                          {t("action_delete")}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
            </div>
          )}
        </>
      )}

      {editing && (
        <EditBooking
          booking={editing}
          onClose={() => setEditing(null)}
          onSave={(data) => patch.mutate({ id: editing.id, ...data })}
        />
      )}
    </div>
  );
}

function EditBooking({
  booking,
  onClose,
  onSave,
}: {
  booking: Booking;
  onClose: () => void;
  onSave: (p: {
    slot_date: string;
    slot_time: string;
    guests: number;
    notes: string;
    staff_id: string | null;
  }) => void;
}) {
  const { t, lang } = useI18n();
  const [slot_date, setDate] = useState(booking.slot_date);
  const [slot_time, setTime] = useState(hhmm(booking.slot_time));
  const [guests, setGuests] = useState(booking.guests);
  const [notes, setNotes] = useState(booking.notes);
  const [staff_id, setStaff] = useState(booking.staff_id ?? "");

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="glass-card w-full max-w-md space-y-3 rounded-3xl p-6">
        <h2 className="font-display text-xl">{t("action_edit")}</h2>
        <input
          type="date"
          value={slot_date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-2xl border border-border bg-background px-3 py-2 text-foreground"
        />
        <label className="block text-sm">
          {t("f_time")}
          <input
            type="time"
            lang="en-US"
            value={slot_time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 block w-full rounded-2xl border border-border bg-background px-3 py-2 text-foreground"
          />
          <span className="mt-1 block text-xs text-muted-foreground" dir="ltr">
            {formatTime12(slot_time)}
          </span>
        </label>
        <input
          type="number"
          min={1}
          max={10}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value) || 1)}
          className="w-full rounded-2xl border border-border bg-background px-3 py-2 text-foreground"
        />
        <select
          value={staff_id}
          onChange={(e) => setStaff(e.target.value)}
          className="w-full rounded-2xl border border-border bg-background px-3 py-2 text-foreground"
        >
          <option value="">{t("dash_unassigned")}</option>
          {STAFF.map((member) => (
            <option key={member.id} value={member.id}>
              {staffName(member, lang)} — {lang === "ar" ? member.role_ar : member.role_en}
            </option>
          ))}
        </select>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full rounded-2xl border border-border bg-background px-3 py-2 text-foreground"
        />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-full px-4 py-2 text-sm">
            {t("action_close")}
          </button>
          <button
            type="button"
            onClick={() =>
              onSave({
                slot_date,
                slot_time,
                guests,
                notes,
                staff_id: staff_id ? staff_id : null,
              })
            }
            className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
          >
            {t("action_save")}
          </button>
        </div>
      </div>
    </div>
  );
}

function SlotsPanel({
  token,
  slots,
  bookings,
  onDone,
}: {
  token: string;
  slots: Slot[];
  bookings: Booking[];
  onDone: () => void;
}) {
  const { t, lang } = useI18n();
  const [slot_date, setDate] = useState("");
  const [slot_time, setTime] = useState("10:00");
  const [capacity, setCapacity] = useState(2);
  const [selectedDate, setSelectedDate] = useState("");

  const today = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }, []);

  const occupancy = useMemo(() => {
    const map = new Map<string, number>();
    for (const b of bookings) {
      if (b.status === "cancelled") continue;
      const key = `${b.slot_date}|${hhmm(b.slot_time)}`;
      map.set(key, (map.get(key) ?? 0) + Math.max(1, b.guests || 1));
    }
    return map;
  }, [bookings]);

  const grouped = useMemo(() => {
    const m = new Map<string, Slot[]>();
    for (const s of slots) {
      if (s.slot_date < today) continue;
      const list = m.get(s.slot_date) ?? [];
      list.push(s);
      m.set(s.slot_date, list);
    }
    return [...m.entries()].map(([date, list]) => [
      date,
      [...list].sort((a, b) => hhmm(a.slot_time).localeCompare(hhmm(b.slot_time))),
    ]) as Array<[string, Slot[]]>;
  }, [slots, today]);

  useEffect(() => {
    if (!grouped.length) {
      setSelectedDate("");
      return;
    }
    setSelectedDate((current) =>
      grouped.some(([date]) => date === current) ? current : grouped[0]![0],
    );
  }, [grouped]);

  const save = useMutation({
    mutationFn: (input: {
      slot_date: string;
      slot_time: string;
      capacity: number;
      is_open: boolean;
    }) => Promise.resolve(adminSaveSlot(token, input)),
    onSuccess: () => {
      toast.success(t("saved"));
      onDone();
    },
  });

  const toggle = useMutation({
    mutationFn: (input: { id: string; is_open: boolean }) =>
      Promise.resolve(adminToggleSlot(token, input.id, input.is_open)),
    onSuccess: onDone,
  });

  const remove = useMutation({
    mutationFn: (id: string) => Promise.resolve(adminDeleteSlot(token, id)),
    onSuccess: () => {
      toast.success(t("deleted"));
      onDone();
    },
  });

  const addDay = async () => {
    if (!slot_date) return;
    for (const time of DEFAULT_TIMES) {
      await save.mutateAsync({ slot_date, slot_time: time, capacity, is_open: true });
    }
    setSelectedDate(slot_date);
  };

  const active = grouped.find(([date]) => date === selectedDate);
  const list = active?.[1] ?? [];
  const openCount = list.filter((s) => s.is_open).length;

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-display text-3xl text-foreground">{t("dash_slots")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("slot_upcoming")}</p>
      </div>
      <form
        className="luxury-card mb-5 grid gap-3 rounded-[1.5rem] p-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_6rem_auto_auto] lg:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          if (!slot_date || !slot_time) return;
          save.mutate({ slot_date, slot_time, capacity, is_open: true });
          setSelectedDate(slot_date);
        }}
      >
        <label className="text-sm">
          {t("f_date")}
          <input
            type="date"
            value={slot_date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground"
          />
        </label>
        <label className="text-sm">
          {t("f_time")}
          <input
            type="time"
            lang="en-US"
            value={slot_time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 block w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground"
          />
        </label>
        <label className="text-sm">
          {t("capacity")}
          <input
            type="number"
            min={1}
            max={20}
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value) || 1)}
            className="mt-1 block w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground"
          />
        </label>
        <button
          type="submit"
          className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
        >
          {t("add_slot")}
        </button>
        <button
          type="button"
          onClick={() => void addDay()}
          className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground"
        >
          {t("add_day")}
        </button>
      </form>

      <div className="luxury-card overflow-hidden rounded-[1.5rem]">
        <div className="flex flex-col gap-3 border-b border-border/70 p-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block min-w-0 flex-1 text-sm sm:max-w-md">
            {t("slot_pick_day")}
            <span className="relative mt-1 block">
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full appearance-none rounded-xl border border-border bg-background py-2 pe-10 ps-3 text-sm text-foreground outline-none focus:border-primary"
              >
                {grouped.length === 0 ? (
                  <option value="">{t("no_days")}</option>
                ) : (
                  grouped.map(([date, daySlots]) => {
                    const open = daySlots.filter((s) => s.is_open).length;
                    return (
                      <option key={date} value={date}>
                        {formatDateLabel(date, lang)} — {open} {t("slot_open")} / {daySlots.length}
                      </option>
                    );
                  })
                )}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 end-3 size-4 -translate-y-1/2 text-muted-foreground" />
            </span>
          </label>
          {selectedDate ? (
            <p className="text-xs text-muted-foreground">
              {openCount} {t("slot_open")} · {list.length}
            </p>
          ) : null}
        </div>

        {list.length === 0 ? (
          <p className="p-5 text-sm text-muted-foreground">{t("slot_empty_day")}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead className="bg-secondary/60 text-start text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 font-medium">{t("f_time")}</th>
                  <th className="px-4 py-2.5 font-medium">{t("slot_seats")}</th>
                  <th className="px-4 py-2.5 font-medium">{t("slot_status")}</th>
                  <th className="px-4 py-2.5 font-medium" />
                </tr>
              </thead>
              <tbody>
                {list.map((slot) => {
                  const taken = occupancy.get(`${slot.slot_date}|${hhmm(slot.slot_time)}`) ?? 0;
                  const remaining = Math.max(0, slot.capacity - taken);
                  const full = remaining <= 0;
                  return (
                    <tr key={slot.id} className="border-t border-border/60">
                      <td className="px-4 py-2.5 font-medium tabular-nums" dir="ltr">
                        {formatTime12(slot.slot_time)}
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="text-muted-foreground">
                          {taken}/{slot.capacity}
                          {full ? ` · ${t("slot_taken")}` : ""}
                        </span>
                        <span className="mt-1 block h-1 w-24 overflow-hidden rounded-full bg-secondary">
                          <span
                            className="block h-full rounded-full bg-primary"
                            style={{
                              width: `${slot.capacity ? Math.min(100, (taken / slot.capacity) * 100) : 0}%`,
                            }}
                          />
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[11px]",
                            !slot.is_open && "bg-muted text-muted-foreground",
                            slot.is_open && full && "bg-primary/12 text-primary",
                            slot.is_open && !full && "bg-emerald-100 text-emerald-800",
                          )}
                        >
                          {!slot.is_open ? t("slot_pause") : full ? t("slot_taken") : t("slot_open")}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex justify-end gap-1">
                          <button
                            type="button"
                            className="rounded-full bg-secondary px-2.5 py-1 text-[11px]"
                            onClick={() => toggle.mutate({ id: slot.id, is_open: !slot.is_open })}
                          >
                            {slot.is_open ? t("slot_pause") : t("slot_resume")}
                          </button>
                          <button
                            type="button"
                            className="rounded-full px-2.5 py-1 text-[11px] text-destructive"
                            onClick={() => remove.mutate(slot.id)}
                          >
                            {t("action_delete")}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsPanel({ token }: { token: string }) {
  const { t } = useI18n();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const res = adminMe(token);
    if (res.username) setUsername(res.username);
  }, [token]);

  const save = useMutation({
    mutationFn: () => Promise.resolve(adminSetCredentials(token, username, password)),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success(t("creds_saved"));
        setPassword("");
      }
    },
  });

  return (
    <div className="max-w-lg">
      <h1 className="font-display mb-2 text-3xl text-foreground">{t("dash_settings")}</h1>
      <p className="mb-6 text-sm text-muted-foreground">{t("settings_hint")}</p>
      <form
        className="glass-card space-y-4 rounded-[2rem] p-6"
        onSubmit={(e) => {
          e.preventDefault();
          save.mutate();
        }}
      >
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={t("username")}
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("new_password")}
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground"
        />
        <button
          type="submit"
          className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground"
        >
          {t("action_save")}
        </button>
      </form>
    </div>
  );
}
