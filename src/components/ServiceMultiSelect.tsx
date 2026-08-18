import { Check, ChevronDown, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useI18n } from "@/lib/i18n";
import { formatDuration, formatMoney, serviceName, type Service } from "@/lib/salon";
import { cn } from "@/lib/utils";

export function ServiceMultiSelect({
  services,
  value,
  onChange,
}: {
  services: Service[];
  value: string[];
  onChange: (ids: string[]) => void;
}) {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selected = useMemo(
    () => value.map((id) => services.find((s) => s.id === id)).filter(Boolean) as Service[],
    [value, services],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return services;
    return services.filter((s) =>
      `${s.name_ar} ${s.name_en}`.toLowerCase().includes(q),
    );
  }, [services, query]);

  const toggle = (id: string) => {
    onChange(value.includes(id) ? value.filter((item) => item !== id) : [...value, id]);
  };

  const label =
    selected.length === 0
      ? t("f_service_ph")
      : selected.length === 1
        ? serviceName(selected[0]!, lang)
        : `${selected.length} — ${selected.map((s) => serviceName(s, lang)).join("، ")}`;

  return (
    <div className="space-y-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl border border-border bg-background px-4 py-3 text-start text-sm outline-none transition-colors hover:border-primary/40 focus:border-primary",
              selected.length === 0 && "text-muted-foreground",
            )}
          >
            <span className="line-clamp-1">{label}</span>
            <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground", open && "rotate-180")} />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-[var(--radix-popover-trigger-width)] max-w-[min(100vw-2rem,36rem)] p-0"
        >
          <div className="border-b border-border p-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("f_service_search")}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="max-h-72 overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <p className="px-3 py-4 text-sm text-muted-foreground">{t("err_service")}</p>
            ) : (
              filtered.map((s) => {
                const active = value.includes(s.id);
                return (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => toggle(s.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start text-sm transition-colors hover:bg-secondary",
                      active && "bg-secondary/80",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-5 shrink-0 place-items-center rounded-md border",
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background",
                      )}
                    >
                      {active ? <Check className="size-3" /> : null}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-foreground">
                        {serviceName(s, lang)}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-muted-foreground">
                        {formatDuration(s.duration_min, {
                          hour: t("hour_unit"),
                          minute: t("minutes"),
                        })}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatMoney(Number(s.price), t("currency"))}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </PopoverContent>
      </Popover>

      {selected.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {selected.map((s) => (
            <button
              type="button"
              key={s.id}
              onClick={() => toggle(s.id)}
              className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs text-foreground"
            >
              {serviceName(s, lang)}
              <X className="size-3 opacity-60" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
