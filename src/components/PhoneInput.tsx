import { ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PHONE_COUNTRIES, countryFlag, getPhoneCountry } from "@/lib/phone";
import { cn } from "@/lib/utils";

export function PhoneInput({
  country,
  local,
  onCountryChange,
  onLocalChange,
}: {
  country: string;
  local: string;
  onCountryChange: (iso: string) => void;
  onLocalChange: (value: string) => void;
}) {
  const { t, lang } = useI18n();
  const selected = getPhoneCountry(country);

  return (
    <div
      className={cn(
        "flex overflow-hidden rounded-2xl border border-border bg-background transition-colors focus-within:border-primary",
      )}
    >
      <div className="relative shrink-0">
        <span className="flex h-full items-center gap-1.5 px-3 py-3 text-sm">
          <span>{countryFlag(selected.iso)}</span>
          <span className="tabular-nums" dir="ltr">
            {selected.dial}
          </span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </span>
        <select
          value={country}
          onChange={(e) => onCountryChange(e.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
          aria-label={t("f_country")}
        >
          {PHONE_COUNTRIES.map((row) => (
            <option key={row.iso} value={row.iso}>
              {countryFlag(row.iso)} {lang === "ar" ? row.ar : row.en} {row.dial}
            </option>
          ))}
        </select>
      </div>
      <span className="my-2 w-px shrink-0 bg-border" />
      <input
        value={local}
        onChange={(e) => onLocalChange(e.target.value.replace(/[^\d\s-]/g, ""))}
        placeholder={t("f_phone_ph")}
        inputMode="tel"
        autoComplete="tel-national"
        name="phone"
        dir="ltr"
        className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-foreground outline-none"
      />
    </div>
  );
}
