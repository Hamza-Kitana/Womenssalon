import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarDays, Clock, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { PageShell } from "@/components/SiteLayout";
import { LoadingScreen } from "@/components/LoadingScreen";
import { SalonImage } from "@/components/SalonImage";
import { ServiceMultiSelect } from "@/components/ServiceMultiSelect";
import { PhoneInput } from "@/components/PhoneInput";
import { useI18n } from "@/lib/i18n";
import { createBooking, getAvailability } from "@/lib/local-db";
import {
  composePhone,
  DEFAULT_PHONE_COUNTRY,
  isValidPhone,
} from "@/lib/phone";
import {
  fetchServices,
  formatDuration,
  formatMoney,
  formatTime12,
  hhmm,
  IMAGES,
  serviceName,
} from "@/lib/salon";
import { cn, sweepDelay } from "@/lib/utils";

type Search = { service?: string };

const field =
  "w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary";

export const Route = createFileRoute("/booking")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    ...(typeof search["service"] === "string" ? { service: search["service"] } : {}),
  }),
  head: () => ({
    meta: [{ title: "الحجز | لمسة ورد" }],
  }),
  component: BookingPage,
});

function dateParts(iso: string, lang: "ar" | "en") {
  const d = new Date(`${iso}T12:00:00`);
  const locale = lang === "ar" ? "ar-JO" : "en-GB";
  return {
    week: d.toLocaleDateString(locale, { weekday: "short" }),
    day: d.toLocaleDateString(locale, { day: "numeric" }),
    month: d.toLocaleDateString(locale, { month: "short" }),
  };
}

function BookingPage() {
  const { t, lang, dir } = useI18n();
  const { service: preset } = Route.useSearch();
  const qc = useQueryClient();

  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: async () => fetchServices(),
  });
  const { data: slots = [], isLoading } = useQuery({
    queryKey: ["availability"],
    queryFn: async () => getAvailability(),
  });

  const [serviceIds, setServiceIds] = useState<string[]>(() =>
    preset ? preset.split(",").filter(Boolean) : [],
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [phoneCountry, setPhoneCountry] = useState(DEFAULT_PHONE_COUNTRY);
  const [phoneLocal, setPhoneLocal] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!preset) return;
    const ids = preset
      .split(",")
      .map((id) => id.trim())
      .filter((id) => services.some((s) => s.id === id));
    if (ids.length) setServiceIds(ids);
  }, [preset, services]);

  const days = useMemo(() => {
    const map = new Map<string, typeof slots>();
    for (const s of slots) {
      const list = map.get(s.slot_date) ?? [];
      list.push(s);
      map.set(s.slot_date, list);
    }
    return [...map.entries()];
  }, [slots]);

  const times = useMemo(() => slots.filter((s) => s.slot_date === date), [slots, date]);
  const selected = times.find((s) => hhmm(s.slot_time) === time);
  const remaining = selected?.remaining ?? 0;
  const picked = services.filter((s) => serviceIds.includes(s.id));
  const totalPrice = picked.reduce((sum, s) => sum + Number(s.price), 0) * Math.max(1, guests);
  const totalMins = picked.reduce((sum, s) => sum + s.duration_min, 0);

  const mutation = useMutation({
    mutationFn: () =>
      Promise.resolve(
        createBooking({
          customer_name: name.trim(),
          phone: composePhone(phoneCountry, phoneLocal),
          service_ids: serviceIds,
          slot_date: date,
          slot_time: time,
          guests,
          notes: notes.trim(),
        }),
      ),
    onSuccess: (res) => {
      if (!res.ok) {
        toast.error(
          res.reason === "slot_full" ? t("err_guests") : res.reason === "no_service" ? t("err_service") : t("err_slot"),
        );
        return;
      }
      toast.success(t("ok_booked"));
      setTime("");
      setName("");
      setPhoneLocal("");
      setNotes("");
      setGuests(1);
      void qc.invalidateQueries({ queryKey: ["availability"] });
    },
    onError: () => toast.error(t("page_error_sub")),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      toast.error(t("err_name"));
      return;
    }
    if (!isValidPhone(phoneCountry, phoneLocal)) {
      toast.error(t("err_phone"));
      return;
    }
    if (serviceIds.length === 0) {
      toast.error(t("err_service"));
      return;
    }
    if (!date || !time) {
      toast.error(t("err_slot"));
      return;
    }
    if (!selected || remaining < guests) {
      toast.error(t("err_guests"));
      return;
    }
    mutation.mutate();
  };

  return (
    <PageShell flush>
      <section className="relative h-[200px] w-full overflow-hidden md:h-[240px]">
        <SalonImage
          src={IMAGES.lounge}
          alt={t("booking_title")}
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,18,28,0.28)_0%,rgba(40,18,28,0.48)_50%,rgba(40,18,28,0.84)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-5 text-start text-white sm:px-6 lg:px-8">
          <span className="mb-2 block h-px w-16 bg-[var(--gradient-gold)]" />
          <h1 className="font-display text-3xl drop-shadow md:text-5xl">{t("booking_title")}</h1>
          <p className="mt-1.5 max-w-xl text-sm text-white/85 md:text-base">{t("booking_sub")}</p>
        </div>
      </section>

      <form
        onSubmit={submit}
        className="grid w-full gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.9fr_1.2fr] lg:px-8 lg:py-10"
      >
        <aside className="luxury-card h-fit rounded-[2rem] p-5 text-start lg:sticky lg:top-28">
          <p className="text-[11px] tracking-[0.22em] text-muted-foreground">{t("tagline")}</p>
          <h2 className="mt-2 font-display text-2xl text-foreground">
            {picked.length ? t("f_selected") : t("choose")}
          </h2>
          {picked.length ? (
            <ul className="mt-4 space-y-2">
              {picked.map((s) => (
                <li
                  key={s.id}
                  className="flex items-start justify-between gap-3 rounded-2xl bg-secondary/70 px-3 py-2 text-sm"
                >
                  <span>{serviceName(s, lang)}</span>
                  <span className="shrink-0 text-muted-foreground">
                    {formatMoney(Number(s.price), t("currency"))}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">{t("err_service")}</p>
          )}
          {picked.length ? (
            <div className="mt-4 space-y-2 border-t border-border/70 pt-4 text-sm">
              <p className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("f_total")}</span>
                <span className="font-medium">{formatMoney(totalPrice, t("currency"))}</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Clock className="size-3.5" />
                  {t("duration")}
                </span>
                <span>
                  {formatDuration(totalMins, {
                    hour: t("hour_unit"),
                    minute: t("minutes"),
                  })}
                </span>
              </p>
            </div>
          ) : null}
          {date && time ? (
            <p className="mt-4 flex items-start gap-2 rounded-2xl bg-secondary/80 px-3 py-2 text-sm">
              <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                {dateParts(date, lang).week} {dateParts(date, lang).day} {dateParts(date, lang).month}
                <span className="mt-0.5 block text-muted-foreground" dir="ltr">
                  {formatTime12(time)}
                </span>
              </span>
            </p>
          ) : null}
        </aside>

        <div className="luxury-card space-y-7 rounded-[2rem] p-5 text-start md:p-8">
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-display text-xl">
              <Sparkles className="size-4 text-primary" />
              {t("f_service")}
            </h3>
            <ServiceMultiSelect services={services} value={serviceIds} onChange={setServiceIds} />
          </div>

          <div>
            <h3 className="mb-3 font-display text-xl">{t("f_date")}</h3>
            {isLoading ? (
              <LoadingScreen compact />
            ) : days.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("no_days")}</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {days.map(([d], i) => {
                  const parts = dateParts(d, lang);
                  return (
                    <button
                      type="button"
                      key={d}
                      onClick={() => {
                        setDate(d);
                        setTime("");
                      }}
                      style={{ animationDelay: `${sweepDelay(i, days.length, dir, 35)}ms` }}
                      className={cn(
                        "sweep-in min-w-[4.6rem] rounded-2xl border px-3 py-2.5 text-center transition-colors",
                        date === d
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground hover:bg-secondary",
                      )}
                    >
                      <span className="block text-[10px] opacity-80">{parts.week}</span>
                      <span className="block font-display text-lg leading-none">{parts.day}</span>
                      <span className="mt-1 block text-[10px] opacity-80">{parts.month}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {date ? (
            <div>
              <h3 className="mb-3 font-display text-xl">{t("f_time")}</h3>
              {times.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t("no_slots")}</p>
              ) : (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                  {times.map((slot, i) => {
                    const full = slot.remaining <= 0;
                    const value = hhmm(slot.slot_time);
                    return (
                      <button
                        type="button"
                        key={slot.id}
                        disabled={full}
                        onClick={() => setTime(value)}
                        style={{ animationDelay: `${sweepDelay(i, times.length, dir, 30)}ms` }}
                        className={cn(
                          "sweep-in rounded-2xl border px-3 py-3 text-sm transition-colors",
                          full && "cursor-not-allowed opacity-40",
                          time === value
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:bg-secondary",
                        )}
                      >
                        <span className="block font-medium" dir="ltr">
                          {formatTime12(value)}
                        </span>
                        <span className="text-[11px] opacity-80">
                          {full ? t("full") : `${t("remaining")} ${slot.remaining}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : null}

          <label className="block space-y-2 text-sm">
            <span>{t("f_guests")}</span>
            <input
              type="number"
              min={1}
              max={Math.max(1, remaining || 10)}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value) || 1)}
              className={field}
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2 text-sm">
              <span>{t("f_name")}</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("f_name_ph")}
                autoComplete="name"
                name="name"
                className={field}
              />
            </label>
            <label className="block space-y-2 text-sm">
              <span>{t("f_phone")}</span>
              <PhoneInput
                country={phoneCountry}
                local={phoneLocal}
                onCountryChange={setPhoneCountry}
                onLocalChange={setPhoneLocal}
              />
            </label>
          </div>

          <label className="block space-y-2 text-sm">
            <span>{t("f_notes")}</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t("f_notes_ph")}
              rows={3}
              className={field}
            />
          </label>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full rounded-full bg-primary py-3.5 text-sm text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-[1.01] disabled:opacity-60"
          >
            {mutation.isPending ? t("sending") : t("f_submit")}
          </button>
        </div>
      </form>
    </PageShell>
  );
}
