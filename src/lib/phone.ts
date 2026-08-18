export type PhoneCountry = {
  iso: string;
  dial: string;
  ar: string;
  en: string;
};

export const PHONE_COUNTRIES: PhoneCountry[] = [
  { iso: "JO", dial: "+962", ar: "الأردن", en: "Jordan" },
  { iso: "PS", dial: "+970", ar: "فلسطين", en: "Palestine" },
  { iso: "SA", dial: "+966", ar: "السعودية", en: "Saudi Arabia" },
  { iso: "AE", dial: "+971", ar: "الإمارات", en: "United Arab Emirates" },
  { iso: "KW", dial: "+965", ar: "الكويت", en: "Kuwait" },
  { iso: "QA", dial: "+974", ar: "قطر", en: "Qatar" },
  { iso: "BH", dial: "+973", ar: "البحرين", en: "Bahrain" },
  { iso: "OM", dial: "+968", ar: "عُمان", en: "Oman" },
  { iso: "EG", dial: "+20", ar: "مصر", en: "Egypt" },
  { iso: "LB", dial: "+961", ar: "لبنان", en: "Lebanon" },
  { iso: "IQ", dial: "+964", ar: "العراق", en: "Iraq" },
  { iso: "SY", dial: "+963", ar: "سوريا", en: "Syria" },
  { iso: "YE", dial: "+967", ar: "اليمن", en: "Yemen" },
  { iso: "MA", dial: "+212", ar: "المغرب", en: "Morocco" },
  { iso: "DZ", dial: "+213", ar: "الجزائر", en: "Algeria" },
  { iso: "TN", dial: "+216", ar: "تونس", en: "Tunisia" },
  { iso: "SD", dial: "+249", ar: "السودان", en: "Sudan" },
  { iso: "TR", dial: "+90", ar: "تركيا", en: "Turkey" },
  { iso: "GB", dial: "+44", ar: "بريطانيا", en: "United Kingdom" },
  { iso: "US", dial: "+1", ar: "أمريكا", en: "United States" },
  { iso: "CA", dial: "+1", ar: "كندا", en: "Canada" },
  { iso: "DE", dial: "+49", ar: "ألمانيا", en: "Germany" },
  { iso: "FR", dial: "+33", ar: "فرنسا", en: "France" },
  { iso: "IT", dial: "+39", ar: "إيطاليا", en: "Italy" },
  { iso: "ES", dial: "+34", ar: "إسبانيا", en: "Spain" },
  { iso: "NL", dial: "+31", ar: "هولندا", en: "Netherlands" },
  { iso: "SE", dial: "+46", ar: "السويد", en: "Sweden" },
  { iso: "AU", dial: "+61", ar: "أستراليا", en: "Australia" },
  { iso: "IN", dial: "+91", ar: "الهند", en: "India" },
  { iso: "PK", dial: "+92", ar: "باكستان", en: "Pakistan" },
];

export const DEFAULT_PHONE_COUNTRY = "JO";

export function countryFlag(iso: string) {
  return iso
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

export function getPhoneCountry(iso: string) {
  return PHONE_COUNTRIES.find((row) => row.iso === iso) ?? PHONE_COUNTRIES[0]!;
}

export function nationalDigits(local: string) {
  return local.replace(/\D/g, "").replace(/^0+/, "");
}

export function composePhone(iso: string, local: string) {
  const country = getPhoneCountry(iso);
  return `${country.dial}${nationalDigits(local)}`;
}

export function isValidPhone(iso: string, local: string) {
  const digits = nationalDigits(local);
  if (digits.length < 7 || digits.length > 12) return false;
  return Boolean(composePhone(iso, local));
}
