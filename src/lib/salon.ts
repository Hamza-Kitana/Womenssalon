export type ServiceImageKey =
  | "hair"
  | "makeup"
  | "nails"
  | "skin"
  | "bridal"
  | "color"
  | "keratin"
  | "highlights"
  | "lashes"
  | "brows"
  | "henna"
  | "spa"
  | "pedicure"
  | "wax"
  | "engagement"
  | "goldbridal"
  | "updo"
  | "glam";

export type Service = {
  id: string;
  name_ar: string;
  name_en: string;
  desc_ar: string;
  desc_en: string;
  price: number;
  duration_min: number;
  image_key: ServiceImageKey;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  long_ar?: string;
  long_en?: string;
  includes_ar?: string[];
  includes_en?: string[];
};

export const SERVICE_IMAGE_KEYS = [
  "hair",
  "makeup",
  "nails",
  "skin",
  "bridal",
  "color",
  "keratin",
  "highlights",
  "lashes",
  "brows",
  "henna",
  "spa",
  "pedicure",
  "wax",
  "engagement",
  "goldbridal",
  "updo",
  "glam",
] as const;

export type Booking = {
  id: string;
  created_at: string;
  customer_name: string;
  guests: number;
  notes: string;
  phone: string;
  service_id: string | null;
  service_ids?: string[];
  slot_date: string;
  slot_time: string;
  status: string;
  staff_id: string | null;
};

export type Staff = {
  id: string;
  name_ar: string;
  name_en: string;
  role_ar: string;
  role_en: string;
  color: string;
};

export type Slot = {
  id: string;
  created_at: string;
  capacity: number;
  is_open: boolean;
  slot_date: string;
  slot_time: string;
};

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1706629503650-cade709d15e3?auto=format&fit=crop&w=2000&q=80",
  hair: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1400&q=80",
  makeup:
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1400&q=80",
  nails:
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1400&q=80",
  skin: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1400&q=80",
  bridal:
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1400&q=80",
  interior:
    "https://images.unsplash.com/photo-1633681138600-295fcd688876?auto=format&fit=crop&w=1800&q=80",
  chairs:
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1800&q=80",
  glam: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=80",
  lounge:
    "https://images.unsplash.com/photo-1633681926019-03bd9325ec20?auto=format&fit=crop&w=1800&q=80",
  details:
    "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1400&q=80",
  mirror:
    "https://images.unsplash.com/photo-1626379501846-0df4067b8bb9?auto=format&fit=crop&w=1400&q=80",
  bloom:
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1400&q=80",
  wash: "https://images.unsplash.com/photo-1560869713-bf165a9cfac1?auto=format&fit=crop&w=1400&q=80",
  palette:
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1400&q=80",
  color:
    "https://images.unsplash.com/photo-1527799820371-d7a6c9da2f4c?auto=format&fit=crop&w=1400&q=80",
  keratin:
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=80",
  highlights:
    "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=1400&q=80",
  lashes:
    "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1400&q=80",
  brows:
    "https://images.unsplash.com/photo-1522337094846-8a818192de1f?auto=format&fit=crop&w=1400&q=80",
  henna:
    "https://images.unsplash.com/photo-1607779097040-26be67fc5a18?auto=format&fit=crop&w=1400&q=80",
  spa: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1400&q=80",
  pedicure:
    "https://images.unsplash.com/photo-1519415943484-9fa187109655?auto=format&fit=crop&w=1400&q=80",
  wax: "https://images.unsplash.com/photo-1570172619604-71b0bf611497?auto=format&fit=crop&w=1400&q=80",
  engagement:
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
  goldbridal:
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=80",
  updo: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1400&q=80",
} as const;

export const VIDEOS = {
  salon: "https://cdn.coverr.co/videos/coverr-beauty-salon-aplxmi7vyy/1080p.mp4",
  closeup: "https://cdn.coverr.co/videos/coverr-makeup-artist-applying-makeup-m9inljuu7s/1080p.mp4",
} as const;

export const GALLERY = [
  { src: IMAGES.interior, alt_ar: "ديكور الصالون", alt_en: "Salon interior" },
  { src: IMAGES.hair, alt_ar: "تسريحة شعر", alt_en: "Hair styling" },
  { src: IMAGES.makeup, alt_ar: "مكياج", alt_en: "Makeup" },
  { src: IMAGES.nails, alt_ar: "عناية بالأظافر", alt_en: "Nail care" },
  { src: IMAGES.skin, alt_ar: "عناية بالبشرة", alt_en: "Skincare" },
  { src: IMAGES.chairs, alt_ar: "كراسي الصالون", alt_en: "Salon chairs" },
  { src: IMAGES.glam, alt_ar: "إطلالة جلام", alt_en: "Glam look" },
  { src: IMAGES.lounge, alt_ar: "ركن الاستقبال", alt_en: "Lounge" },
  { src: IMAGES.details, alt_ar: "تفاصيل العناية", alt_en: "Care details" },
  { src: IMAGES.mirror, alt_ar: "محطة المرايا", alt_en: "Mirror station" },
  { src: IMAGES.bridal, alt_ar: "إطلالة عروس", alt_en: "Bridal look" },
  { src: IMAGES.bloom, alt_ar: "ورود", alt_en: "Flowers" },
  { src: IMAGES.wash, alt_ar: "غسيل الشعر", alt_en: "Hair wash" },
  { src: IMAGES.palette, alt_ar: "باليت مكياج", alt_en: "Makeup palette" },
] as const;

export const DEFAULT_TIMES = [
  "10:00",
  "11:30",
  "13:00",
  "14:30",
  "16:00",
  "17:30",
  "19:00",
] as const;

export const SERVICES: Service[] = [
  {
    id: "svc-hair",
    name_ar: "تسريحات وشعر",
    name_en: "Hair Styling",
    desc_ar: "قص، صبغة، سشوار وتسريحات مناسبات بأيدي خبيرات وبمنتجات فاخرة تحافظ على صحة شعرك.",
    desc_en: "Cuts, color, blowouts and occasion styling by expert stylists using luxury products.",
    price: 45,
    duration_min: 90,
    image_key: "hair",
    sort_order: 1,
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "svc-makeup",
    name_ar: "مكياج وسهرات",
    name_en: "Makeup & Glam",
    desc_ar: "مكياج ناعم أو سهرة كامل مع ثبات طويل، يشمل الرموش والتجهيز الكامل للبشرة.",
    desc_en:
      "Soft or full glam makeup with long-lasting finish, lashes and full skin prep included.",
    price: 60,
    duration_min: 75,
    image_key: "makeup",
    sort_order: 2,
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "svc-nails",
    name_ar: "عناية بالأظافر",
    name_en: "Nails & Manicure",
    desc_ar: "مانيكير وباديكير، جل وتركيب أظافر مع تعقيم كامل للأدوات ونقشات حسب الطلب.",
    desc_en: "Manicure, pedicure, gel and extensions with fully sterilized tools and custom art.",
    price: 30,
    duration_min: 60,
    image_key: "nails",
    sort_order: 3,
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "svc-skin",
    name_ar: "العناية بالبشرة",
    name_en: "Skincare & Facials",
    desc_ar: "تنظيف عميق، ترطيب وتفتيح مع جلسة استرخاء كاملة ومنتجات مناسبة لنوع بشرتك.",
    desc_en: "Deep cleansing, hydration and brightening facials tailored to your skin type.",
    price: 50,
    duration_min: 60,
    image_key: "skin",
    sort_order: 4,
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "svc-bridal",
    name_ar: "باقة العروس",
    name_en: "Bridal Package",
    desc_ar: "باقة متكاملة ليوم العرس: شعر، مكياج، أظافر وبشرة مع بروفة مسبقة وخصوصية تامة.",
    desc_en:
      "A complete wedding-day package: hair, makeup, nails and skin, with a trial and full privacy.",
    price: 250,
    duration_min: 240,
    image_key: "bridal",
    sort_order: 5,
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "svc-bridal-gold",
    name_ar: "باقة العروس الذهبية",
    name_en: "Golden Bridal",
    desc_ar: "يوم كامل في جناح خاص: بشرة، أظافر، شعر ومكياج ثابت مع بروفة ومرافقة بعد التصوير.",
    desc_en: "A full private suite day: skin, nails, hair and long-wear makeup, with a trial and photo touch-up.",
    price: 420,
    duration_min: 300,
    image_key: "goldbridal",
    sort_order: 6,
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "svc-bridal-trial",
    name_ar: "بروفة العروس",
    name_en: "Bridal Trial",
    desc_ar: "جلسة هادئة قبل يوم الفرح لتجربة الشعر والمكياج وتثبيت الإطلالة بدون ضغط.",
    desc_en: "A calm session before the wedding to try hair and makeup and lock the look without rush.",
    price: 85,
    duration_min: 90,
    image_key: "makeup",
    sort_order: 7,
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "svc-bridal-hair",
    name_ar: "تسريحة عروس",
    name_en: "Bridal Hair",
    desc_ar: "تسريحة عرس ثابتة مع لمسة ورد ناعمة، تناسب الطرحة والتاج وتصوير النهار والمساء.",
    desc_en: "A lasting bridal updo with a soft rose finish, made for veil, crown, day and evening photos.",
    price: 95,
    duration_min: 120,
    image_key: "updo",
    sort_order: 8,
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "svc-bridal-makeup",
    name_ar: "مكياج عروس",
    name_en: "Bridal Makeup",
    desc_ar: "مكياج عرس مضيء وثابت للحرارة والتصوير الطويل، مع رموش ولمسة شفاه حسب فستانك.",
    desc_en: "Luminous long-wear bridal makeup for heat and long photos, with lashes and a lip finish for your gown.",
    price: 120,
    duration_min: 100,
    image_key: "glam",
    sort_order: 9,
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "svc-engagement",
    name_ar: "باقة الخطوبة",
    name_en: "Engagement Package",
    desc_ar: "شعر ومكياج وأظافر لإطلالة خطوبة أنيقة — ناعمة للتصوير وقوية للسهرة.",
    desc_en: "Hair, makeup and nails for an elegant engagement look — soft for photos, lasting for the evening.",
    price: 190,
    duration_min: 150,
    image_key: "engagement",
    sort_order: 10,
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "svc-color",
    name_ar: "صبغة الشعر",
    name_en: "Hair Color",
    desc_ar: "تلوين فاخر يحافظ على لمعان الخصلة، من اللمسة الخفيفة إلى التغيير الكامل بلون ثابت.",
    desc_en: "Luxury coloring that keeps shine — from a soft refresh to a full change with lasting tone.",
    price: 75,
    duration_min: 120,
    image_key: "color",
    sort_order: 11,
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "svc-keratin",
    name_ar: "كيراتين وفرد ناعم",
    name_en: "Keratin Smooth",
    desc_ar: "فرد لطيف يهدّئ النفشة ويمنح لمعاناً حريرياً بدون أن يسطّح حركة الشعر بالكامل.",
    desc_en: "A gentle smooth that calms frizz and adds silk shine, without flattening all the movement.",
    price: 140,
    duration_min: 180,
    image_key: "keratin",
    sort_order: 12,
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "svc-highlights",
    name_ar: "هايلايت وأومبريه",
    name_en: "Highlights & Ombré",
    desc_ar: "إضاءات طبيعية أو أومبريه متدرّج يفتح الوجه ويحرّك اللون بدون قسوة على الشعر.",
    desc_en: "Natural lights or a soft ombré that opens the face and moves the color without harshness.",
    price: 95,
    duration_min: 150,
    image_key: "highlights",
    sort_order: 13,
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "svc-updo",
    name_ar: "تسريحة مناسبات",
    name_en: "Occasion Updo",
    desc_ar: "تسريحة سهرة أو حفل أنيقة تثبت للرقص والتصوير، مع دبابيس خفية ولمسة ورد.",
    desc_en: "An elegant party updo that lasts through dancing and photos, with hidden pins and a rose finish.",
    price: 55,
    duration_min: 75,
    image_key: "updo",
    sort_order: 14,
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "svc-lashes",
    name_ar: "تمديد رموش",
    name_en: "Lash Extensions",
    desc_ar: "رموش خفيفة تفتّح العين بدون ثقل، بخيوط ناعمة وتباعد مرتب يدوم أيام.",
    desc_en: "Light extensions that open the eye without weight, with soft fibers and a tidy map that lasts.",
    price: 65,
    duration_min: 90,
    image_key: "lashes",
    sort_order: 15,
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "svc-brows",
    name_ar: "حواجب ورفع",
    name_en: "Brow Shape & Lift",
    desc_ar: "تشكيل ورفع وتنظيف للحواجب حتى الإطار يصير أوضح وأهدى حول العين.",
    desc_en: "Shape, lift and tidy brows so the frame around the eye looks clearer and softer.",
    price: 28,
    duration_min: 40,
    image_key: "brows",
    sort_order: 16,
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "svc-henna",
    name_ar: "حناء نقش فاخر",
    name_en: "Luxury Henna",
    desc_ar: "نقش حناء ناعم لليد والقدم، من وردة صغيرة إلى نقشة عروس كاملة بتفاصيل دقيقة.",
    desc_en: "Soft henna for hands and feet — from a small rose to a full bridal pattern with fine detail.",
    price: 40,
    duration_min: 60,
    image_key: "henna",
    sort_order: 17,
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "svc-pedicure",
    name_ar: "باديكير سبا",
    name_en: "Spa Pedicure",
    desc_ar: "عناية للقدمين مع نقع وترطيب وجل أنيق، جلسة استرخاء قبل أي مناسبة.",
    desc_en: "Foot care with a soak, hydration and a quiet gel — a restful session before any occasion.",
    price: 42,
    duration_min: 75,
    image_key: "pedicure",
    sort_order: 18,
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "svc-massage",
    name_ar: "مساج استرخاء",
    name_en: "Relaxation Massage",
    desc_ar: "مساج لطيف للظهر والكتفين في ضوء خافت، يفك التوتر قبل المكياج أو يوم العرس.",
    desc_en: "A gentle back and shoulder massage in soft light, to ease tension before makeup or a wedding day.",
    price: 58,
    duration_min: 60,
    image_key: "spa",
    sort_order: 19,
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "svc-wax",
    name_ar: "إزالة الشعر بالشمع",
    name_en: "Waxing",
    desc_ar: "إزالة ناعمة بشمع دافئ وأدوات معقمة، مع تهدئة للبشرة بعد الجلسة.",
    desc_en: "A gentle warm-wax session with sterilized tools, and soothing care for the skin afterwards.",
    price: 38,
    duration_min: 45,
    image_key: "wax",
    sort_order: 20,
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
  },
];

export const STAFF: Staff[] = [
  {
    id: "st-noor",
    name_ar: "نور الورد",
    name_en: "Noor Al-Ward",
    role_ar: "خبيرة شعر",
    role_en: "Hair specialist",
    color: "#c45c7a",
  },
  {
    id: "st-leen",
    name_ar: "لين أحمد",
    name_en: "Leen Ahmad",
    role_ar: "خبيرة مكياج",
    role_en: "Makeup artist",
    color: "#b08968",
  },
  {
    id: "st-rana",
    name_ar: "رنا خالد",
    name_en: "Rana Khaled",
    role_ar: "خبيرة أظافر",
    role_en: "Nail artist",
    color: "#8b5e6b",
  },
  {
    id: "st-jana",
    name_ar: "جنى عمر",
    name_en: "Jana Omar",
    role_ar: "خبيرة بشرة",
    role_en: "Skin specialist",
    color: "#d4a574",
  },
  {
    id: "st-sara",
    name_ar: "سارة منصور",
    name_en: "Sara Mansour",
    role_ar: "منسقة عرائس",
    role_en: "Bridal coordinator",
    color: "#9a6b7a",
  },
];

export const MAPS_QUERY = "Prince Mohammad Street, Amman, Jordan";
export const MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=16&output=embed`;
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;

export function serviceImage(key: string) {
  if (key in IMAGES) return IMAGES[key as keyof typeof IMAGES];
  return IMAGES.hero;
}

export function serviceName(service: Service, lang: "ar" | "en") {
  return lang === "ar" ? service.name_ar : service.name_en;
}

export function serviceDesc(service: Service, lang: "ar" | "en") {
  return lang === "ar" ? service.desc_ar : service.desc_en;
}

export function formatMoney(price: number, currency: string) {
  return `${Number(price).toFixed(0)} ${currency}`;
}

export function formatDateLabel(iso: string, lang: "ar" | "en") {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString(lang === "ar" ? "ar-JO" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function staffName(staff: Staff, lang: "ar" | "en") {
  return lang === "ar" ? staff.name_ar : staff.name_en;
}

export function staffRole(staff: Staff, lang: "ar" | "en") {
  return lang === "ar" ? staff.role_ar : staff.role_en;
}

export function getStaff(id: string | null | undefined) {
  if (!id) return undefined;
  return STAFF.find((s) => s.id === id);
}

export function bookingServiceIds(
  booking: Pick<Booking, "service_id" | "service_ids">,
) {
  const fromList = (booking.service_ids ?? []).map(String).filter(Boolean);
  if (fromList.length) return [...new Set(fromList)];
  return booking.service_id ? [booking.service_id] : [];
}

export function bookingAmount(
  booking: Pick<Booking, "service_id" | "service_ids" | "guests">,
  services: Service[],
) {
  const sum = bookingServiceIds(booking).reduce((acc, id) => {
    const svc = services.find((s) => s.id === id);
    return acc + Number(svc?.price ?? 0);
  }, 0);
  return sum * Math.max(1, booking.guests || 1);
}

export function hhmm(value: string) {
  return String(value).slice(0, 5);
}

export function formatTime12(value: string) {
  const raw = hhmm(value);
  const [hoursPart, minutesPart] = raw.split(":");
  const hours = Number(hoursPart);
  const minutes = Number(minutesPart);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return raw;
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

export function formatDuration(minutes: number, labels: { hour: string; minute: string }) {
  const total = Math.max(0, Math.round(Number(minutes) || 0));
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h && m) return `${h} ${labels.hour} ${m} ${labels.minute}`;
  if (h) return `${h} ${labels.hour}`;
  return `${m} ${labels.minute}`;
}

const K_SERVICES = "lamsat-services";
const CATALOG_VERSION = 2;
const K_CATALOG = "lamsat-catalog-version";

function isImageKey(value: string): value is ServiceImageKey {
  return (SERVICE_IMAGE_KEYS as readonly string[]).includes(value);
}

function lines(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(/\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

export function normalizeService(row: Partial<Service> & { id?: string }): Service {
  const extra = row.id ? EXTRAS[row.id] : undefined;
  const image_key: ServiceImageKey = isImageKey(String(row.image_key ?? ""))
    ? (row.image_key as ServiceImageKey)
    : "hair";
  const desc_ar = String(row.desc_ar ?? "");
  const desc_en = String(row.desc_en ?? "");
  return {
    id: String(row.id || `svc-${Date.now()}`),
    name_ar: String(row.name_ar ?? "").trim() || "خدمة جديدة",
    name_en: String(row.name_en ?? "").trim() || "New service",
    desc_ar,
    desc_en,
    price: Math.max(0, Number(row.price) || 0),
    duration_min: (() => {
      const value = Number(row.duration_min);
      if (!Number.isFinite(value) || value <= 0) return 60;
      return Math.max(15, Math.round(value));
    })(),
    image_key,
    sort_order: Number(row.sort_order) || 99,
    is_active: row.is_active !== false,
    created_at: String(row.created_at ?? new Date().toISOString()),
    long_ar: String(row.long_ar ?? extra?.long_ar ?? desc_ar),
    long_en: String(row.long_en ?? extra?.long_en ?? desc_en),
    includes_ar:
      row.includes_ar !== undefined ? lines(row.includes_ar) : (extra?.includes_ar ?? []),
    includes_en:
      row.includes_en !== undefined ? lines(row.includes_en) : (extra?.includes_en ?? []),
  };
}

function seedServices(): Service[] {
  return SERVICES.map((row) => normalizeService(row));
}

function mergeMissingSeed(stored: Service[]): Service[] {
  const ids = new Set(stored.map((s) => s.id));
  const missing = seedServices().filter((s) => !ids.has(s.id));
  if (missing.length === 0) return stored;
  return [...stored, ...missing];
}

export function listStoredServices(): Service[] {
  if (typeof window === "undefined") return seedServices();
  try {
    const raw = localStorage.getItem(K_SERVICES);
    const version = Number(localStorage.getItem(K_CATALOG) || 0);
    if (!raw) {
      const seeded = seedServices();
      localStorage.setItem(K_SERVICES, JSON.stringify(seeded));
      localStorage.setItem(K_CATALOG, String(CATALOG_VERSION));
      return seeded;
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return seedServices();
    const stored = parsed.map((row) => normalizeService(row as Partial<Service>));
    if (version < CATALOG_VERSION) {
      const merged = mergeMissingSeed(stored);
      localStorage.setItem(K_SERVICES, JSON.stringify(merged));
      localStorage.setItem(K_CATALOG, String(CATALOG_VERSION));
      return merged;
    }
    return stored;
  } catch {
    return seedServices();
  }
}

export function saveStoredServices(rows: Service[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(K_SERVICES, JSON.stringify(rows.map((row) => normalizeService(row))));
}

export function fetchServices(): Service[] {
  return listStoredServices()
    .filter((s) => s.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export function getService(id: string) {
  return listStoredServices().find((s) => s.id === id);
}

export type ServiceExtra = {
  includes_ar: string[];
  includes_en: string[];
  long_ar: string;
  long_en: string;
  gallery: string[];
  steps_ar: string[];
  steps_en: string[];
};

const DEFAULT_STEPS_AR = [
  "استقبال هادئ وفهم طلبكِ",
  "تجهيز المكان والأدوات المعقمة",
  "تنفيذ الجلسة بتركيز وبدون استعجال",
  "لمسة أخيرة ونصيحة عناية للبيت",
];
const DEFAULT_STEPS_EN = [
  "A calm welcome and we listen to what you want",
  "The space and tools are prepared and sterilized",
  "The session is done with focus, never rushed",
  "A last look and simple aftercare for home",
];

const EXTRAS: Record<string, ServiceExtra> = {
  "svc-hair": {
    includes_ar: [
      "استشارة شكل الوجه",
      "قص أو تشذيب",
      "غسيل بشامبو فاخر",
      "سشوار أو تسريحة",
      "منتجات حماية حرارية",
    ],
    includes_en: [
      "Face-shape consultation",
      "Cut or trim",
      "Luxury shampoo wash",
      "Blowout or style",
      "Heat-protecting products",
    ],
    long_ar:
      "جلسة الشعر عندنا مش مجرد قصّة سريعة. نبدأ بملمس شعركِ وفهم طبيعته: جاف، دهني، مصبوغ، أو ناعم. بعدها نحدد الشكل الذي يناسب وجهكِ ومناسبتكِ، بدون وعود مبالغ فيها.\n\nنستخدم أدوات معقمة ومنتجات خفيفة لا تثقّل الخصلات. الغسيل بشامبو فاخر، ثم القص أو الصبغة حسب الاتفاق، ثم التسريحة مع حماية حرارية حتى تخرجي مرتاحة وشعركِ يتحرك بخفة.\n\nالموعد لكِ وحدك في جو هادئ. نأخذ وقتنا، ونشرح لكِ كيف تحافظين على النتيجة في البيت بخطوات بسيطة.",
    long_en:
      "A hair session here is never a rushed cut. We start with the feel of your hair — dry, oily, colored or fine — then choose a shape that suits your face and the occasion, without overpromising.\n\nTools are sterilized and products stay light. A luxury wash, then the cut or color you agreed on, then styling with heat protection so you leave comfortable and the hair moves easily.\n\nThe appointment is yours alone. We take our time, and we show you simple ways to keep the look at home.",
    gallery: [IMAGES.hair, IMAGES.wash, IMAGES.mirror, IMAGES.chairs, IMAGES.interior, IMAGES.details],
    steps_ar: [
      "استشارة وملمس الشعر وشكل الوجه",
      "غسيل وتحضير بهدوء",
      "قص أو صبغة حسب الاتفاق",
      "تسريحة وحماية حرارية ولمسة أخيرة",
    ],
    steps_en: [
      "Consultation, hair feel and face shape",
      "A calm wash and prep",
      "Cut or color as agreed",
      "Style, heat protection and a last look",
    ],
  },
  "svc-makeup": {
    includes_ar: [
      "تحضير البشرة",
      "مكياج كامل حسب المناسبة",
      "رموش حسب الطلب",
      "تثبيت طويل",
      "لمسة شفاه",
    ],
    includes_en: [
      "Skin prep",
      "Full makeup for the occasion",
      "Lashes on request",
      "Long-wear setting",
      "Lip finish",
    ],
    long_ar:
      "المكياج عند لمسة ورد يُبنى على بشرتكِ، مو على ترند جاهز. نسأل عن المناسبة، الإضاءة، واللباس، ثم نختار درجة هادئة أو جلام حسب مزاجكِ.\n\nنبدأ بتحضير البشرة وترطيبها حتى الأساس يثبت دون تكتل. بعدها نبني الإطلالة طبقة طبقة: عين، خد، شفاه، مع رموش عند الطلب وتثبيت يدوم للتصوير والسهر.\n\nالهدف إنكِ تبينين مرتاحة ومضيئة، مو ثقيلة. نعدّل التفاصيل أمامكِ حتى تحبي النتيجة قبل ما تطلعي.",
    long_en:
      "Makeup at Lamsat Ward is built on your skin, not a ready-made trend. We ask about the occasion, the light and the outfit, then choose a soft or glam look that matches your mood.\n\nSkin is prepped and hydrated so the base sits smoothly. Then we build the look in quiet layers — eyes, cheeks, lips — with lashes on request and a setting that lasts for photos and the evening.\n\nYou should look luminous and at ease, never heavy. We adjust in front of you until you like it before you leave.",
    gallery: [IMAGES.makeup, IMAGES.glam, IMAGES.palette, IMAGES.bridal, IMAGES.mirror, IMAGES.lounge],
    steps_ar: [
      "فهم المناسبة ولون بشرتكِ",
      "تحضير وترطيب البشرة",
      "بناء المكياج طبقة طبقة",
      "تثبيت ولمسة شفاه أخيرة",
    ],
    steps_en: [
      "We understand the occasion and your skin",
      "Prep and hydrate",
      "Makeup built in quiet layers",
      "Setting and a last lip finish",
    ],
  },
  "svc-nails": {
    includes_ar: [
      "تعقيم كامل للأدوات",
      "مانيكير أو باديكير",
      "تشكيل وبرد",
      "جل أو طلاء",
      "نقشة حسب اختيارك",
    ],
    includes_en: [
      "Fully sterilized tools",
      "Manicure or pedicure",
      "Shape and file",
      "Gel or polish",
      "Art of your choice",
    ],
    long_ar:
      "عناية الأظافر عندنا تبدأ بالنظافة قبل الشكل. كل أداة تُعقّم أمامكِ أو تُجهَّز مسبقاً، والجلسة في مكان مرتب وهادئ.\n\nنحدد الطول والشكل الذي يناسب يدكِ، ثم البرد والتجهيز، ثم الجل أو الطلاء. إذا أحببتِ نقشة، نرسمها بهدوء حتى التفاصيل الصغيرة تطلع نظيفة.\n\nفي النهاية نرطّب اليدين ونراجع اللون تحت الإضاءة. تخرجين بأظافر أنيقة تتحمل الأيام، بدون استعجال أو فوضى.",
    long_en:
      "Nail care starts with cleanliness before the look. Every tool is sterilized, and the session stays tidy and unhurried.\n\nWe choose a length and shape that suits your hands, then file and prep, then gel or polish. If you want art, it is painted slowly so even small details stay clean.\n\nWe moisturize the hands and check the color in the light. You leave with quiet, lasting nails — never rushed.",
    gallery: [IMAGES.nails, IMAGES.details, IMAGES.bloom, IMAGES.lounge, IMAGES.interior, IMAGES.palette],
    steps_ar: [
      "تعقيم واختيار الشكل واللون",
      "برد وتجهيز الأظافر",
      "جل أو طلاء ونقشة إن رغبتِ",
      "ترطيب اليدين ومراجعة النتيجة",
    ],
    steps_en: [
      "Sterilize, then choose shape and color",
      "File and prep the nails",
      "Gel or polish, and art if you wish",
      "Moisturize and a last check",
    ],
  },
  "svc-skin": {
    includes_ar: ["تحليل نوع البشرة", "تنظيف عميق", "تقشير لطيف", "ماسك مغذٍّ", "ترطيب وواقي"],
    includes_en: [
      "Skin-type analysis",
      "Deep cleanse",
      "Gentle exfoliation",
      "Nourishing mask",
      "Hydration and SPF",
    ],
    long_ar:
      "جلسة البشرة للاستراحة أولاً، والنتيجة ثانياً. نقرأ نوع بشرتكِ — جافة، دهنية، مختلطة أو حساسة — ثم نختار منتجات لا تهيج ولا تلمع زيادة.\n\nنبدأ بتنظيف عميق، تقشير لطيف حسب الحاجة، ثم ماسك مغذٍّ يُترك ليعمل بهدوء. بعدها ترطيب وواقي حتى تخرج البشرة مرتاحة، مو مشدودة.\n\nلا خطوات مستعجلة ولا أجهزة مزعجة بدون داعٍ. نشرح لكِ ما فعلناه وكيف تعتنين في البيت حتى تدوم النضارة أياماً.",
    long_en:
      "A skin session is rest first, result second. We read your type — dry, oily, combination or sensitive — then choose products that will not irritate or over-shine.\n\nA deep cleanse, gentle exfoliation if needed, then a nourishing mask left to work in calm. Hydration and SPF follow so the skin leaves comfortable, never tight.\n\nNo rush and no machines without reason. We tell you what we did and how to care at home so the glow lasts.",
    gallery: [IMAGES.skin, IMAGES.lounge, IMAGES.bloom, IMAGES.interior, IMAGES.details, IMAGES.wash],
    steps_ar: [
      "تحليل نوع البشرة واختيار المنتجات",
      "تنظيف عميق بهدوء",
      "تقشير لطيف وماسك مغذٍّ",
      "ترطيب وواقي ونصيحة للبيت",
    ],
    steps_en: [
      "Skin-type reading and product choice",
      "A deep, unhurried cleanse",
      "Gentle exfoliation and a mask",
      "Hydration, SPF and home advice",
    ],
  },
  "svc-bridal": {
    includes_ar: [
      "بروفة مسبقة",
      "شعر يوم العرس",
      "مكياج ثابت",
      "أظافر وبشرة",
      "خصوصية تامة للقاعة",
    ],
    includes_en: [
      "Advance trial",
      "Wedding-day hair",
      "Long-wear makeup",
      "Nails and skin",
      "Private suite",
    ],
    long_ar:
      "باقة العروس مصممة حتى يومكِ يبدأ بثبات، مو بتوتر. نحدد بروفة مسبقة للشعر والمكياج حتى تتعرفي على الإطلالة قبل الموعد الكبير، ونعدّل أي تفصيل بهدوء.\n\nيوم العرس يكون لكِ جناح خاص: بشرة وأظافر إن لزم، ثم الشعر، ثم مكياج ثابت للتصوير والحرارة والساعات الطويلة. الفريق يبقى قريباً حتى آخر خصلة ودبوس.\n\nالخصوصية كاملة، والوقت محسوب حتى تخرجي مطمئنة قبل الفرح. إذا أحببتِ مرافقة خفيفة بعد التصوير، ننسّقها ضمن الباقة حسب الاتفاق.",
    long_en:
      "The bridal package is made so your day begins in calm, not in rush. A trial for hair and makeup lets you know the look before the wedding, and we adjust slowly.\n\nOn the day you have a private suite: skin and nails if needed, then hair, then long-wear makeup for photos, heat and long hours. The team stays until the last pin.\n\nPrivacy is complete and timing is planned so you leave ready before the celebration. A light touch-up after photos can be arranged within the package.",
    gallery: [IMAGES.bridal, IMAGES.makeup, IMAGES.glam, IMAGES.hair, IMAGES.mirror, IMAGES.lounge],
    steps_ar: [
      "بروفة مسبقة للشعر والمكياج",
      "بشرة وأظافر في جناح خاص",
      "تسريحة ومكياج ثابت يوم العرس",
      "مراجعة أخيرة قبل التصوير والخروج",
    ],
    steps_en: [
      "A hair and makeup trial",
      "Skin and nails in a private suite",
      "Wedding-day hair and long-wear makeup",
      "A last check before photos and leaving",
    ],
  },
  "svc-bridal-gold": {
    includes_ar: [
      "بروفة مسبقة كاملة",
      "جناح خاص طوال اليوم",
      "بشرة وأظافر",
      "شعر ومكياج ثابت",
      "مرافقة بعد التصوير",
    ],
    includes_en: [
      "Full advance trial",
      "Private suite all day",
      "Skin and nails",
      "Hair and long-wear makeup",
      "Touch-up after photos",
    ],
    long_ar:
      "الباقة الذهبية ليوم تريدين فيه هدوءاً من الصباح حتى التصوير. نبدأ ببروفة مسبقة نثبّت فيها الشعر والمكياج، ثم يوم العرس يكون الجناح لكِ وحدكِ.\n\nبشرة وأظافر بهدوء، بعدها التسريحة والتاج أو الطرحة، ثم مكياج ثابت للحرارة والساعات الطويلة. الفريق يبقى قريباً لمرافقة خفيفة بعد الجلسات الأولى.\n\nكل تفصيل محسوب حتى تخرجي مطمئنة، بدون استعجال أو ازدحام حولك.",
    long_en:
      "The golden package is for a day that stays calm from morning until photos. A full trial locks hair and makeup, then the wedding-day suite is yours alone.\n\nSkin and nails first, then the updo with crown or veil, then long-wear makeup for heat and long hours. The team stays close for a light touch-up after the first portraits.\n\nEvery detail is timed so you leave ready, never rushed or crowded.",
    gallery: [IMAGES.goldbridal, IMAGES.bridal, IMAGES.makeup, IMAGES.hair, IMAGES.glam, IMAGES.lounge],
    steps_ar: [
      "بروفة كاملة قبل يوم الفرح",
      "بشرة وأظافر في الجناح الخاص",
      "تسريحة ومكياج ثابت",
      "مراجعة ومرافقة بعد التصوير",
    ],
    steps_en: [
      "A full trial before the wedding",
      "Skin and nails in the private suite",
      "Hair and long-wear makeup",
      "A last check and photo touch-up",
    ],
  },
  "svc-bridal-trial": {
    includes_ar: ["تجربة شعر", "تجربة مكياج", "صور مرجعية للإطلالة", "ملاحظات ليوم العرس"],
    includes_en: ["Hair trial", "Makeup trial", "Look references", "Notes for the wedding day"],
    long_ar:
      "البروفة مش مكياج جاهز نكرّره يوم العرس حرفياً. هي جلسة نسمع فيها مزاجكِ ولون الفستان والإضاءة، ثم نجرّب بهدوء حتى تحبي النتيجة.\n\nنصوّر الإطلالة كمراجع، ونكتب ما نثبّته يوم الفرح: درجة الأساس، شكل العين، ارتفاع التسريحة. تخرجين وأنتِ عارفة إطلالتكِ، مو متفاجئة.",
    long_en:
      "The trial is not a look we copy blindly on the wedding day. We listen to your mood, the gown and the light, then try slowly until you love it.\n\nWe photograph the result as a reference and write what we will lock on the day: the base, the eye, the height of the hair. You leave knowing the look, never surprised.",
    gallery: [IMAGES.makeup, IMAGES.mirror, IMAGES.palette, IMAGES.bridal, IMAGES.glam, IMAGES.lounge],
    steps_ar: [
      "حديث عن الفستان والإضاءة",
      "تجربة الشعر",
      "تجربة المكياج",
      "صور وملاحظات ليوم العرس",
    ],
    steps_en: [
      "We talk through the gown and the light",
      "Hair trial",
      "Makeup trial",
      "Photos and notes for the wedding day",
    ],
  },
  "svc-bridal-hair": {
    includes_ar: ["استشارة شكل الوجه", "تسريحة ثابتة", "تثبيت للطرحة أو التاج", "رذاذ حماية"],
    includes_en: ["Face-shape consult", "Lasting updo", "Veil or crown set", "Hold spray"],
    long_ar:
      "تسريحة العروس تُبنى لتثبت تحت الطرحة والتاج والتصوير من كل زاوية. نبدأ بشكل الوجه وطول الشعر، ثم نرفع الخصل بلطف مع دبابيس خفية.\n\nالنتيجة حركة ناعمة مو صلبة، ولمسة ورد خفيفة إن أحببتِ. نراجع الإطلالة بالمرآة من الأمام والخلف قبل ما تطلعي.",
    long_en:
      "Bridal hair is built to last under a veil, a crown and photos from every angle. We start with face shape and length, then lift the hair gently with hidden pins.\n\nThe finish moves softly, never stiff, with a light rose touch if you wish. We check the look in the mirror from front and back before you leave.",
    gallery: [IMAGES.updo, IMAGES.hair, IMAGES.bridal, IMAGES.mirror, IMAGES.bloom, IMAGES.lounge],
    steps_ar: ["فهم شكل الوجه والطرحة", "تحضير الشعر", "بناء التسريحة", "تثبيت ومراجعة أخيرة"],
    steps_en: ["Face shape and veil plan", "Hair prep", "Building the updo", "Hold and a last check"],
  },
  "svc-bridal-makeup": {
    includes_ar: ["تحضير البشرة", "مكياج ثابت للتصوير", "رموش", "تثبيت حراري"],
    includes_en: ["Skin prep", "Photo-ready makeup", "Lashes", "Heat setting"],
    long_ar:
      "مكياج العروس يُصنع ليبقى مضيئاً في النهار والتصوير الطويل، بدون تكتل. نحضّر البشرة جيداً ثم نبني الأساس طبقة رقيقة، والعين والشفاه حسب لون الفستان.\n\nالتثبيت يتحمّل الحرارة والدموع الخفيفة. نعدّل أمامكِ حتى الإطلالة تبدو أنتِ في أجمل هدوء، مو قناعاً ثقيلاً.",
    long_en:
      "Bridal makeup is made to stay luminous in daylight and long photos, never cakey. Skin is prepped, then a thin base, then eyes and lips to match the gown.\n\nThe setting holds through heat and a few happy tears. We adjust in front of you so the look is still you — calm and bright, not a heavy mask.",
    gallery: [IMAGES.glam, IMAGES.makeup, IMAGES.bridal, IMAGES.palette, IMAGES.mirror, IMAGES.goldbridal],
    steps_ar: ["تحضير البشرة", "بناء الأساس", "عين وشفاه ورموش", "تثبيت ومراجعة تحت الإضاءة"],
    steps_en: ["Skin prep", "Building the base", "Eyes, lips and lashes", "Setting and a light check"],
  },
  "svc-engagement": {
    includes_ar: ["تسريحة مناسبة", "مكياج ناعم أو جلام", "أظافر", "تثبيت للتصوير"],
    includes_en: ["Occasion hair", "Soft or glam makeup", "Nails", "Photo setting"],
    long_ar:
      "باقة الخطوبة أخف من يوم العرس، وأناقة للتصوير والحفل معاً. نختار تسريحة لا تتعب الرأس، ومكياجاً يثبت للصور والسهرة.\n\nالأظافر تُنسَّق مع الإطلالة. الوقت محسوب حتى تصلين مرتاحة، بلمعان هادئ يناسب الخاتم والورود.",
    long_en:
      "The engagement package is lighter than a wedding day, and elegant for both photos and the party. Hair stays comfortable, makeup lasts for pictures and the evening.\n\nNails are matched to the look. Timing is planned so you arrive at ease, with a quiet glow that suits the ring and the flowers.",
    gallery: [IMAGES.engagement, IMAGES.bridal, IMAGES.makeup, IMAGES.nails, IMAGES.bloom, IMAGES.glam],
    steps_ar: ["اختيار الإطلالة حسب الحفل", "شعر وأظافر", "مكياج وتثبيت", "مراجعة أخيرة"],
    steps_en: ["Choosing the look for the event", "Hair and nails", "Makeup and setting", "A last check"],
  },
  "svc-color": {
    includes_ar: ["استشارة لون", "صبغة أو ريتاچ", "معالجة بعد الصبغة", "سشوار خفيف"],
    includes_en: ["Color consult", "Full color or retouch", "After-color care", "Soft blowout"],
    long_ar:
      "الصبغة عندنا لون يلمع، مو لون يطفئ الشعر. نقرأ لونكِ الحالي وصحتكِ، ثم نختار درجة تناسب بشرتكِ بدون وعود مبالغ فيها.\n\nبعد التلوين معالجة خفيفة وسشوار حتى تخرجي بلون حيّ وملمس مرتاح. نشرح كيف تحافظين على الدرجة في البيت.",
    long_en:
      "Color here is meant to shine, not to dull the hair. We read your current tone and the health of the hair, then choose a shade that suits your skin without overpromising.\n\nAfter coloring, a light treatment and blowout so you leave with a living tone and a comfortable feel. We show you how to keep the shade at home.",
    gallery: [IMAGES.color, IMAGES.hair, IMAGES.wash, IMAGES.mirror, IMAGES.highlights, IMAGES.details],
    steps_ar: ["قراءة اللون الحالي", "مزج الدرجة", "تطبيق الصبغة", "معالجة وسشوار"],
    steps_en: ["Reading the current color", "Mixing the shade", "Applying color", "Care and a blowout"],
  },
  "svc-keratin": {
    includes_ar: ["غسيل تحضيري", "كيراتين أو فرد لطيف", "كيّ محسوب", "نصيحة عناية أسبوعين"],
    includes_en: ["Prep wash", "Keratin or gentle smooth", "Measured iron", "Two-week aftercare"],
    long_ar:
      "الكيراتين لتهدئة النفشة ولمعان حريري، مو لجعل الشعر خشبياً. نختار قوة الفرد حسب كثافتكِ، ونحمي الأطراف.\n\nبعد الجلسة نشرح الامتناع عن الغسيل rub أيام قليلة حسب المنتج، حتى النتيجة تثبت بهدوء أسابيع.",
    long_en:
      "Keratin is for calmer frizz and silk shine, not wooden hair. We choose the strength for your density and protect the ends.\n\nAfterwards we explain a few days without washing, according to the product, so the result settles quietly for weeks.",
    gallery: [IMAGES.keratin, IMAGES.hair, IMAGES.wash, IMAGES.chairs, IMAGES.interior, IMAGES.details],
    steps_ar: ["فحص الشعر والغسيل", "تطبيق المادة", "كيّ بهدوء", "تعليمات العناية"],
    steps_en: ["Hair check and wash", "Applying the treatment", "A calm iron", "Aftercare notes"],
  },
  "svc-highlights": {
    includes_ar: ["خريطة الإضاءات", "رقائق أو بلسم حر", "تونر لطيف", "ترطيب بعد الجلسة"],
    includes_en: ["Light map", "Foils or balayage", "Gentle toner", "Post-session hydration"],
    long_ar:
      "الهايلايت والأومبريه يفتحان الوجه بخصل مدروسة، مو ببقع عشوائية. نرسم الخريطة حسب طولكِ وقصة الغرة، ثم نطبّق بهدوء.\n\nتونر خفيف يلمّع الدرجة. النتيجة لون يتحرك مع الضوء، ويبقى الشعر طرياً قدر الإمكان.",
    long_en:
      "Highlights and ombré open the face with planned strands, never random patches. We map the lights to your length and fringe, then work slowly.\n\nA soft toner polishes the shade. The color should move with the light, and the hair stay as supple as we can keep it.",
    gallery: [IMAGES.highlights, IMAGES.color, IMAGES.hair, IMAGES.mirror, IMAGES.wash, IMAGES.lounge],
    steps_ar: ["رسم خريطة الإضاءات", "تطبيق الخصل", "تونر", "غسيل وترطيب"],
    steps_en: ["Mapping the lights", "Placing the strands", "Toner", "Wash and hydration"],
  },
  "svc-updo": {
    includes_ar: ["تسريحة سهرة", "دبابيس خفية", "لمسة ورد أو إكسسوار", "تثبيت للرقص"],
    includes_en: ["Party updo", "Hidden pins", "Rose or accessory", "Dance hold"],
    long_ar:
      "تسريحة المناسبات تثبت للتصوير والرقص دون أن تؤلم الرأس. نختار ارتفاعاً يناسب عنقكِ وفستانكِ، ونترك خصلات ناعمة حول الوجه إن أحببتِ.\n\nالدبابيس تختفي، والتثبيت خفيف. تخرجين جاهزة للحفل بلون ورد هادئ.",
    long_en:
      "An occasion updo lasts for photos and dancing without a sore head. We choose a height for your neck and dress, with soft pieces around the face if you like.\n\nPins stay hidden and the hold stays light. You leave ready for the party, with a quiet rose finish.",
    gallery: [IMAGES.updo, IMAGES.hair, IMAGES.glam, IMAGES.bloom, IMAGES.mirror, IMAGES.chairs],
    steps_ar: ["اختيار الارتفاع", "تحضير الشعر", "بناء التسريحة", "تثبيت ولمسة ورد"],
    steps_en: ["Choosing the height", "Hair prep", "Building the updo", "Hold and a rose finish"],
  },
  "svc-lashes": {
    includes_ar: ["استشارة شكل العين", "تمديد خفيف أو متوسط", "عزل مرتب", "نصيحة عناية 48 ساعة"],
    includes_en: ["Eye-shape consult", "Light or medium set", "Clean isolation", "48-hour aftercare"],
    long_ar:
      "الرموش عندنا خفة قبل الطول. نختار كثافة تناسب عينكِ حتى النظر يبقى مرتاحاً، والخيوط تُعزل واحدة واحدة.\n\nبعد الجلسة لا ماء ولا بخار ليومين. النتيجة عين مفتوحة بدون ماسكارا ثقيلة كل صباح.",
    long_en:
      "Lashes here are lightness before length. We pick a density that suits your eye so the gaze stays comfortable, isolating one by one.\n\nNo water or steam for two days after. The result is an open eye without heavy mascara every morning.",
    gallery: [IMAGES.lashes, IMAGES.makeup, IMAGES.glam, IMAGES.palette, IMAGES.mirror, IMAGES.details],
    steps_ar: ["قراءة شكل العين", "اختيار الطول والكثافة", "لصق الرمش بهدوء", "تعليمات العناية"],
    steps_en: ["Reading the eye", "Choosing length and density", "Applying lashes slowly", "Aftercare"],
  },
  "svc-brows": {
    includes_ar: ["تحديد الإطار", "تنظيف الزائد", "رفع أو صبغة خفيفة", "تهدئة للبشرة"],
    includes_en: ["Frame mapping", "Tidy extra hair", "Lift or light tint", "Skin soothe"],
    long_ar:
      "الحواجب إطار الوجه. نرسم الشكل الذي يناسب عينكِ دون مبالغة، ثم ننظّف الزائد ونرفع أو نلوّن بلطف إن لزم.\n\nالنتيجة حواجب أوضح وأهدى، مو مرسومة بقسوة. تهدئة بسيطة للبشرة بعد الجلسة.",
    long_en:
      "Brows are the frame of the face. We map a shape that suits your eye without overdoing it, then tidy extras and lift or tint gently if needed.\n\nThe result is clearer, softer brows — never harshly drawn. A light soothe for the skin after.",
    gallery: [IMAGES.brows, IMAGES.makeup, IMAGES.skin, IMAGES.mirror, IMAGES.details, IMAGES.lounge],
    steps_ar: ["رسم الإطار", "تنظيف", "رفع أو صبغة", "تهدئة ومراجعة"],
    steps_en: ["Mapping the frame", "Tidy", "Lift or tint", "Soothe and a last look"],
  },
  "svc-henna": {
    includes_ar: ["تصميم حسب المناسبة", "نقش يد أو قدم", "حناء طبيعية", "تعليمات تثبيت اللون"],
    includes_en: ["Design for the occasion", "Hand or foot pattern", "Natural henna", "Stain-care notes"],
    long_ar:
      "الحناء نقش يُرسم بيدين ثابتتين، من وردة صغيرة إلى إطلالة عروس على الكفين. نستخدم حناء طبيعية ونتركها لتثبت بلون دافئ.\n\nنشرح كيف تحافظين على العجينة حتى اللون يطلع غنياً، بدون لمعان كيميائي.",
    long_en:
      "Henna is drawn with a steady hand — from a small rose to a full bridal map on the palms. We use natural paste and let it stain a warm tone.\n\nWe show you how to keep the paste on so the color deepens, without a chemical shine.",
    gallery: [IMAGES.henna, IMAGES.details, IMAGES.bridal, IMAGES.bloom, IMAGES.nails, IMAGES.engagement],
    steps_ar: ["اختيار النقشة", "تنظيف اليد أو القدم", "الرسم بهدوء", "تعليمات تثبيت اللون"],
    steps_en: ["Choosing the pattern", "Prep of hand or foot", "Drawing slowly", "Stain-care notes"],
  },
  "svc-pedicure": {
    includes_ar: ["نقع دافئ", "عناية بالأظافر والبشرة", "جل أو طلاء", "تدليك خفيف للقدم"],
    includes_en: ["Warm soak", "Nail and skin care", "Gel or polish", "Light foot massage"],
    long_ar:
      "باديكير السبا استراحة للقدمين قبل الفستان المفتوح أو يوم طويل. نقع دافئ، عناية بالأظافر، ثم جل أنيق وتدليك خفيف.\n\nالأدوات معقمة، والجلسة هادئة. تخرجين بقدم مرتاحة ولون يثبت أياماً.",
    long_en:
      "A spa pedicure is rest for the feet before an open shoe or a long day. A warm soak, nail care, then a quiet gel and a light massage.\n\nTools are sterilized and the session stays calm. You leave with comfortable feet and a color that lasts.",
    gallery: [IMAGES.pedicure, IMAGES.nails, IMAGES.spa, IMAGES.details, IMAGES.lounge, IMAGES.bloom],
    steps_ar: ["نقع دافئ", "عناية وتشكيل", "جل أو طلاء", "تدليك خفيف"],
    steps_en: ["Warm soak", "Care and shape", "Gel or polish", "A light massage"],
  },
  "svc-massage": {
    includes_ar: ["زيت لطيف", "مساج ظهر وكتفين", "إضاءة خافتة", "دقائق هدوء بعد الجلسة"],
    includes_en: ["Gentle oil", "Back and shoulders", "Soft light", "Quiet minutes after"],
    long_ar:
      "المساج هنا لفك التوتر قبل مكياج أو يوم عرس، مو رياضة قاسية. ضوء خافت، أيدي هادئة على الظهر والكتفين.\n\nبعد الجلسة دقائق لتشربكِ الماء وتهدأ أنفاسكِ. الجسم يطلع أخف، والوجه يرتاح قبل أي إطلالة.",
    long_en:
      "Massage here eases tension before makeup or a wedding day — never a harsh workout. Soft light, calm hands on the back and shoulders.\n\nAfterwards a few minutes to drink water and breathe. The body feels lighter, and the face rests before any look.",
    gallery: [IMAGES.spa, IMAGES.lounge, IMAGES.bloom, IMAGES.interior, IMAGES.skin, IMAGES.details],
    steps_ar: ["ترحيب وضوء خافت", "اختيار الضغط", "مساج الظهر والكتفين", "هدوء وماء بعد الجلسة"],
    steps_en: ["Welcome and soft light", "Choosing pressure", "Back and shoulders", "Quiet water after"],
  },
  "svc-wax": {
    includes_ar: ["شمع دافئ", "أدوات معقمة", "تهدئة بعد الإزالة", "نصيحة عناية يومين"],
    includes_en: ["Warm wax", "Sterilized tools", "After-soothe", "Two-day aftercare"],
    long_ar:
      "الإزالة عندنا سرعة لطيفة ونظافة أولاً. الشمع دافئ لا حارق، والأدوات معقمة، والجلسة بخصوصية تامة.\n\nبعدها تهدئة للبشرة وتعليمات بسيطة ليومين حتى لا تهيج. النتيجة ناعمة بدون استعجال مؤلم.",
    long_en:
      "Waxing here is gentle speed and cleanliness first. The wax is warm, not scalding, tools are sterilized, and the room stays private.\n\nThen a soothe for the skin and simple notes for two days so it will not flare. The result is smooth, never a painful rush.",
    gallery: [IMAGES.wax, IMAGES.skin, IMAGES.details, IMAGES.lounge, IMAGES.interior, IMAGES.bloom],
    steps_ar: ["تحضير البشرة", "شمع دافئ", "إزالة بهدوء", "تهدئة وتعليمات"],
    steps_en: ["Skin prep", "Warm wax", "A calm removal", "Soothe and aftercare"],
  },
};

function galleryFor(key: string) {
  if (key === "hair" || key === "updo" || key === "color" || key === "keratin" || key === "highlights") {
    return [IMAGES.hair, IMAGES.wash, IMAGES.mirror, IMAGES.chairs, IMAGES.interior, IMAGES.details];
  }
  if (key === "makeup" || key === "glam" || key === "lashes" || key === "brows") {
    return [IMAGES.makeup, IMAGES.glam, IMAGES.palette, IMAGES.bridal, IMAGES.mirror, IMAGES.lounge];
  }
  if (key === "nails" || key === "henna" || key === "pedicure") {
    return [IMAGES.nails, IMAGES.details, IMAGES.bloom, IMAGES.lounge, IMAGES.interior, IMAGES.palette];
  }
  if (key === "skin" || key === "wax" || key === "spa") {
    return [IMAGES.skin, IMAGES.lounge, IMAGES.bloom, IMAGES.interior, IMAGES.details, IMAGES.wash];
  }
  if (key === "bridal" || key === "goldbridal" || key === "engagement") {
    return [IMAGES.bridal, IMAGES.makeup, IMAGES.glam, IMAGES.hair, IMAGES.mirror, IMAGES.lounge];
  }
  return [IMAGES.hero, IMAGES.interior, IMAGES.lounge, IMAGES.chairs, IMAGES.bloom, IMAGES.details];
}

export function serviceExtra(service: Service): ServiceExtra {
  const extra = EXTRAS[service.id];
  const storedLongAr = service.long_ar?.trim() ?? "";
  const storedLongEn = service.long_en?.trim() ?? "";
  return {
    includes_ar: service.includes_ar?.length ? service.includes_ar : (extra?.includes_ar ?? []),
    includes_en: service.includes_en?.length ? service.includes_en : (extra?.includes_en ?? []),
    long_ar:
      storedLongAr.length > 180 ? storedLongAr : extra?.long_ar || storedLongAr || service.desc_ar,
    long_en:
      storedLongEn.length > 180 ? storedLongEn : extra?.long_en || storedLongEn || service.desc_en,
    gallery: extra?.gallery ?? galleryFor(service.image_key),
    steps_ar: extra?.steps_ar ?? DEFAULT_STEPS_AR,
    steps_en: extra?.steps_en ?? DEFAULT_STEPS_EN,
  };
}

export function serviceIncludes(service: Service, lang: "ar" | "en") {
  const extra = serviceExtra(service);
  return lang === "ar" ? extra.includes_ar : extra.includes_en;
}

export function serviceLong(service: Service, lang: "ar" | "en") {
  const extra = serviceExtra(service);
  return lang === "ar" ? extra.long_ar : extra.long_en;
}

export function serviceSteps(service: Service, lang: "ar" | "en") {
  const extra = serviceExtra(service);
  return lang === "ar" ? extra.steps_ar : extra.steps_en;
}
