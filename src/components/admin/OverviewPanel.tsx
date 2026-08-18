import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
} from "recharts";
import { Banknote, CalendarCheck, Clock3, Sparkles } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useI18n } from "@/lib/i18n";
import {
  STAFF,
  bookingAmount,
  bookingServiceIds,
  formatDateLabel,
  formatMoney,
  serviceName,
  staffName,
  type Booking,
  type Service,
} from "@/lib/salon";
import { cn } from "@/lib/utils";

const SERVICE_COLORS = ["#c45c7a", "#b08968", "#8b5e6b", "#d4a574", "#9a6b7a"];

function lastDays(n: number) {
  const days: string[] = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i -= 1) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    days.push(`${y}-${m}-${day}`);
  }
  return days;
}

export function OverviewPanel({
  bookings,
  services,
}: {
  bookings: Booking[];
  services: Service[];
}) {
  const { t, lang } = useI18n();
  const active = bookings.filter((b) => b.status !== "cancelled");
  const collected = active
    .filter((b) => b.status === "done")
    .reduce((sum, b) => sum + bookingAmount(b, services), 0);
  const expected = active
    .filter((b) => b.status === "pending" || b.status === "confirmed")
    .reduce((sum, b) => sum + bookingAmount(b, services), 0);
  const pending = bookings.filter((b) => b.status === "pending").length;

  const days = lastDays(14);
  const byDay = days.map((date) => {
    const dayBookings = active.filter((b) => b.slot_date === date);
    return {
      date,
      label: formatDateLabel(date, lang).split(" ")[0] ?? date,
      revenue: dayBookings.reduce((sum, b) => sum + bookingAmount(b, services), 0),
      count: dayBookings.length,
    };
  });

  const byService = services
    .map((svc, i) => ({
      key: svc.id,
      name: serviceName(svc, lang),
      value: active
        .filter((b) => bookingServiceIds(b).includes(svc.id))
        .reduce((sum, b) => sum + Number(svc.price) * Math.max(1, b.guests || 1), 0),
      fill: SERVICE_COLORS[i % SERVICE_COLORS.length]!,
    }))
    .filter((row) => row.value > 0);

  const byStaff = STAFF.map((member) => {
    const rows = active.filter((b) => b.staff_id === member.id);
    return {
      id: member.id,
      name: staffName(member, lang),
      role: lang === "ar" ? member.role_ar : member.role_en,
      color: member.color,
      clients: rows.length,
      revenue: rows.reduce((sum, b) => sum + bookingAmount(b, services), 0),
    };
  }).sort((a, b) => b.revenue - a.revenue);

  const unassigned = active.filter((b) => !b.staff_id).length;

  const revenueConfig = {
    revenue: { label: t("dash_amount"), color: "var(--primary)" },
  } satisfies ChartConfig;

  const serviceConfig = Object.fromEntries(
    byService.map((row) => [row.key, { label: row.name, color: row.fill }]),
  ) satisfies ChartConfig;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">{t("dash_overview")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("admin_welcome")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi
          icon={Banknote}
          label={t("dash_revenue_done")}
          value={formatMoney(collected, t("currency"))}
          hint={t("status_done")}
        />
        <Kpi
          icon={Sparkles}
          label={t("dash_revenue_expected")}
          value={formatMoney(expected, t("currency"))}
          hint={`${t("status_pending")} + ${t("status_confirmed")}`}
        />
        <Kpi icon={CalendarCheck} label={t("dash_total_bookings")} value={String(active.length)} />
        <Kpi icon={Clock3} label={t("dash_pending")} value={String(pending)} />
      </div>

      {active.length === 0 ? (
        <div className="glass-card rounded-[2rem] p-10 text-center text-sm text-muted-foreground">
          {t("dash_empty_charts")}
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-5">
          <div className="luxury-card rounded-[2rem] p-5 xl:col-span-3">
            <h2 className="mb-4 font-display text-xl">{t("dash_chart_days")}</h2>
            <ChartContainer config={revenueConfig} className="h-64 w-full">
              <AreaChart data={byDay}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  dataKey="revenue"
                  type="monotone"
                  fill="color-mix(in oklab, var(--primary) 22%, transparent)"
                  stroke="var(--primary)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </div>

          <div className="luxury-card rounded-[2rem] p-5 xl:col-span-2">
            <h2 className="mb-4 font-display text-xl">{t("dash_chart_services")}</h2>
            {byService.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">
                {t("dash_empty_charts")}
              </p>
            ) : (
              <ChartContainer config={serviceConfig} className="h-64 w-full">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={byService}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={48}
                    strokeWidth={4}
                  >
                    {byService.map((row) => (
                      <Cell key={row.key} fill={row.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            )}
          </div>
        </div>
      )}

      <div className="luxury-card rounded-[2rem] p-5">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-xl">{t("dash_chart_staff")}</h2>
          {unassigned > 0 ? (
            <p className="text-xs text-muted-foreground">
              {unassigned} · {t("dash_unassigned")}
            </p>
          ) : null}
        </div>
        <div className="space-y-4">
          {byStaff.map((row) => {
            const max = Math.max(...byStaff.map((item) => item.revenue), 1);
            const pct = Math.max(6, (row.revenue / max) * 100);
            return (
              <div key={row.id} className="rounded-2xl border border-border bg-background/70 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ background: row.color }}
                    />
                    <div className="min-w-0 text-start">
                      <p className="truncate font-medium text-foreground">{row.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{row.role}</p>
                    </div>
                  </div>
                  <div className="shrink-0 text-end">
                    <p className="text-sm font-medium text-foreground" dir="ltr">
                      {formatMoney(row.revenue, t("currency"))}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {row.clients} {t("dash_total_bookings")}
                    </p>
                  </div>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                  <span
                    className="block h-full rounded-full"
                    style={{
                      width: `${row.revenue > 0 ? pct : 0}%`,
                      background: row.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Banknote;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className={cn("luxury-card rounded-[1.6rem] p-5")}>
      <span className="mb-4 grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <p className="text-xs tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl text-foreground">{value}</p>
      {hint ? <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
