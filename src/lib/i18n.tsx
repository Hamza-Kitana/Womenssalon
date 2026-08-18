/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "ar" | "en";

const dict = {
  brand: { ar: "لمسة ورد", en: "Lamsat Ward" },
  tagline: { ar: "صالون نسائي فاخر", en: "Luxury Ladies Salon" },
  nav_home: { ar: "الرئيسية", en: "Home" },
  nav_services: { ar: "الخدمات", en: "Services" },
  nav_booking: { ar: "احجزي موعدك", en: "Book Now" },
  nav_gallery: { ar: "المعرض", en: "Gallery" },
  nav_location: { ar: "الموقع", en: "Location" },
  menu_open: { ar: "فتح القائمة", en: "Open menu" },
  menu_close: { ar: "إغلاق القائمة", en: "Close menu" },
  hero_kicker: { ar: "خصوصية • أناقة • هدوء", en: "Privacy • Grace • Calm" },
  hero_title: { ar: "جمالك يبدأ من هنا", en: "Your beauty starts here" },
  hero_sub: {
    ar: "تجربة عناية راقية وهادئة مصممة لكِ وحدك — شعر، مكياج، بشرة وأظافر بأيدي خبيرات.",
    en: "A calm, refined beauty experience made just for you — hair, makeup, skin and nails by experts.",
  },
  hero_cta: { ar: "احجزي موعدك الآن", en: "Book your appointment" },
  hero_scroll: { ar: "تصفحي الخدمات", en: "Explore services" },
  hero_card_hair: { ar: "شعر", en: "Hair" },
  hero_card_makeup: { ar: "مكياج", en: "Makeup" },
  hero_card_skin: { ar: "بشرة", en: "Skin" },
  services_title: { ar: "خدماتنا", en: "Our Services" },
  services_sub: {
    ar: "كل خدمة بتفاصيلها، مدتها وسعرها — بدون أي تعقيد.",
    en: "Every service with its details, duration and price — no complications.",
  },
  minutes: { ar: "دقيقة", en: "min" },
  currency: { ar: "د.أ", en: "JOD" },
  book_this: { ar: "احجزي هذه الخدمة", en: "Book this service" },
  booking_title: { ar: "حجز موعد", en: "Book an appointment" },
  booking_sub: {
    ar: "اختاري خدمة أو أكثر، ثم اليوم والساعة، واتركي اسمك ورقمك فقط.",
    en: "Pick one or more services, then a day and time, and leave your name and phone.",
  },
  f_service: { ar: "الخدمات", en: "Services" },
  f_service_ph: { ar: "اختاري خدمة أو أكثر", en: "Choose one or more services" },
  f_service_search: { ar: "ابحثي عن خدمة...", en: "Search a service..." },
  f_selected: { ar: "المختارة", en: "Selected" },
  f_total: { ar: "المجموع", en: "Total" },
  f_date: { ar: "اليوم", en: "Day" },
  f_time: { ar: "الساعة", en: "Time" },
  f_guests: { ar: "عدد الأشخاص", en: "Guests" },
  f_name: { ar: "الاسم", en: "Full name" },
  f_phone: { ar: "رقم الهاتف", en: "Phone number" },
  f_country: { ar: "الدولة", en: "Country" },
  f_notes: { ar: "ملاحظات (اختياري)", en: "Notes (optional)" },
  f_submit: { ar: "تأكيد الحجز", en: "Confirm booking" },
  f_name_ph: { ar: "مثال: سارة أحمد", en: "e.g. Sara Ahmad" },
  f_phone_ph: { ar: "7XXXXXXXX", en: "7XXXXXXXX" },
  f_notes_ph: { ar: "أي تفصيل تحبين نعرفه مسبقاً", en: "Anything you'd like us to know" },
  choose: { ar: "اختاري", en: "Choose" },
  remaining: { ar: "متبقي", en: "left" },
  err_name: {
    ar: "الرجاء كتابة الاسم كاملاً (حرفين على الأقل).",
    en: "Please enter your full name.",
  },
  err_phone: { ar: "اختاري الدولة واكتبي رقم هاتف صحيح.", en: "Choose a country and enter a valid phone number." },
  err_service: { ar: "اختاري خدمة واحدة على الأقل.", en: "Please choose at least one service." },
  err_slot: { ar: "اختاري اليوم والساعة.", en: "Please choose a day and time." },
  err_guests: { ar: "عدد الأشخاص أكبر من المقاعد المتاحة.", en: "Not enough seats for this time." },
  ok_booked: {
    ar: "تم استلام حجزك! سنتواصل معك لتأكيده.",
    en: "Booking received! We will contact you to confirm.",
  },
  no_slots: { ar: "لا توجد أوقات متاحة في هذا اليوم.", en: "No available times for this day." },
  no_days: {
    ar: "لا توجد أيام مفتوحة حالياً. راجعي لاحقاً.",
    en: "No open days right now. Please check back later.",
  },
  full: { ar: "محجوز", en: "Full" },
  sending: { ar: "جارٍ الحفظ...", en: "Saving..." },
  gallery_title: { ar: "من داخل الصالون", en: "Inside the salon" },
  gallery_sub: {
    ar: "لمحات من الأجواء والتفاصيل التي نهتم بها.",
    en: "Glimpses of the atmosphere and details we care about.",
  },
  gallery_video: { ar: "أجواء الصالون", en: "Salon atmosphere" },
  location_title: { ar: "موقعنا", en: "Our location" },
  location_sub: {
    ar: "بانتظارك في قلب المدينة، مع خصوصية تامة.",
    en: "Waiting for you in the heart of the city, in full privacy.",
  },
  address: { ar: "شارع الأمير محمد، عمّان، الأردن", en: "Prince Mohammad St, Amman, Jordan" },
  hours: {
    ar: "السبت - الخميس: 10:00 AM إلى 8:00 PM • الجمعة: مغلق",
    en: "Sat - Thu: 10:00 AM - 8:00 PM • Friday: closed",
  },
  open_maps: { ar: "افتحي الخريطة", en: "Open in Maps" },
  loc_privacy: { ar: "مدخل هادئ وخصوصية كاملة", en: "A quiet entrance and full privacy" },
  loc_parking: { ar: "وقوف قريب للسيارات", en: "Nearby parking" },
  loc_welcome: { ar: "استقبال دافئ من أول خطوة", en: "A warm welcome from the first step" },
  footer_rights: { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
  footer_explore: { ar: "تصفحي", en: "Explore" },
  footer_visit: { ar: "زورينا", en: "Visit us" },
  footer_hours_title: { ar: "أوقات العمل", en: "Opening hours" },
  admin_link: { ar: "دخول الإدارة", en: "Admin" },
  admin_login: { ar: "تسجيل دخول الإدارة", en: "Admin login" },
  admin_welcome: { ar: "مساحة هادئة لإدارة الحجوزات", en: "A calm space to manage bookings" },
  username: { ar: "اسم المستخدم", en: "Username" },
  password: { ar: "كلمة المرور", en: "Password" },
  login: { ar: "دخول", en: "Sign in" },
  logout: { ar: "خروج", en: "Sign out" },
  bad_login: { ar: "اسم المستخدم أو كلمة المرور غير صحيحة", en: "Wrong username or password" },
  dash_overview: { ar: "نظرة عامة", en: "Overview" },
  dash_bookings: { ar: "الحجوزات", en: "Bookings" },
  dash_slots: { ar: "الأوقات المتاحة", en: "Time slots" },
  dash_services: { ar: "الخدمات", en: "Services" },
  dash_settings: { ar: "الإعدادات", en: "Settings" },
  status_pending: { ar: "قيد الانتظار", en: "Pending" },
  status_confirmed: { ar: "مؤكد", en: "Confirmed" },
  status_done: { ar: "منتهي", en: "Done" },
  status_cancelled: { ar: "ملغي", en: "Cancelled" },
  action_confirm: { ar: "قبول", en: "Accept" },
  action_done: { ar: "إنهاء", en: "Complete" },
  action_cancel: { ar: "تعليق / إلغاء", en: "Hold / Cancel" },
  action_delete: { ar: "حذف", en: "Delete" },
  action_edit: { ar: "تعديل", en: "Edit" },
  action_save: { ar: "حفظ", en: "Save" },
  action_close: { ar: "إغلاق", en: "Close" },
  no_bookings: { ar: "لا توجد حجوزات بعد.", en: "No bookings yet." },
  filter_search: { ar: "ابحثي بالاسم أو الرقم أو الخدمة...", en: "Search by name, phone or service..." },
  filter_all: { ar: "الكل", en: "All" },
  filter_status: { ar: "الحالة", en: "Status" },
  filter_date: { ar: "اليوم", en: "Day" },
  filter_clear: { ar: "مسح الفلاتر", en: "Clear filters" },
  filter_none: { ar: "ما في نتائج بهالبحث.", en: "No bookings match these filters." },
  filter_count: { ar: "نتيجة", en: "results" },
  slot_open: { ar: "مفتوح", en: "Open" },
  slot_closed: { ar: "معلّق", en: "Paused" },
  add_slot: { ar: "إضافة وقت", en: "Add slot" },
  add_day: { ar: "إضافة يوم كامل", en: "Add full day" },
  capacity: { ar: "السعة", en: "Capacity" },
  settings_hint: {
    ar: "يمكنكِ تغيير اسم المستخدم وكلمة المرور في أي وقت.",
    en: "You can change the username and password at any time.",
  },
  new_password: {
    ar: "كلمة مرور جديدة (اتركيها فارغة للإبقاء)",
    en: "New password (leave blank to keep)",
  },
  creds_saved: { ar: "تم حفظ بيانات الدخول.", en: "Login details saved." },
  saved: { ar: "تم الحفظ.", en: "Saved." },
  deleted: { ar: "تم الحذف.", en: "Deleted." },
  loading: { ar: "جارٍ التحميل...", en: "Loading..." },
  loading_wait: { ar: "نرتّب لكِ اللمسة بهدوء", en: "Preparing your moment of calm" },
  music_on: { ar: "الموسيقى", en: "Music" },
  sound: { ar: "الصوت", en: "Sound" },
  not_found: { ar: "الصفحة غير موجودة", en: "Page not found" },
  not_found_sub: {
    ar: "الصفحة التي تبحثين عنها غير متاحة.",
    en: "The page you're looking for doesn't exist.",
  },
  go_home: { ar: "العودة للرئيسية", en: "Go home" },
  page_error: { ar: "تعذّر تحميل الصفحة", en: "This page didn't load" },
  page_error_sub: {
    ar: "حدث خطأ غير متوقع. يمكنكِ المحاولة مجدداً.",
    en: "Something went wrong. You can try again.",
  },
  try_again: { ar: "إعادة المحاولة", en: "Try again" },
  view_details: { ar: "التفاصيل", en: "Details" },
  includes: { ar: "ماذا تشمل الجلسة", en: "What's included" },
  how_we_work: { ar: "طريقة العمل", en: "How we work" },
  service_about: { ar: "عن الخدمة", en: "About the service" },
  service_gallery: { ar: "صور من الجلسة", en: "From the session" },
  related: { ar: "خدمات أخرى", en: "More services" },
  back_services: { ar: "كل الخدمات", en: "All services" },
  duration: { ar: "المدة", en: "Duration" },
  from_price: { ar: "السعر", en: "Price" },
  hour_unit: { ar: "ساعة", en: "hr" },
  add_service: { ar: "إضافة خدمة", en: "Add service" },
  svc_name_ar: { ar: "الاسم بالعربي", en: "Arabic name" },
  svc_name_en: { ar: "الاسم بالإنجليزي", en: "English name" },
  svc_desc_ar: { ar: "وصف قصير بالعربي", en: "Short description (AR)" },
  svc_desc_en: { ar: "وصف قصير بالإنجليزي", en: "Short description (EN)" },
  svc_long_ar: { ar: "تفاصيل الخدمة بالعربي", en: "Full details (AR)" },
  svc_long_en: { ar: "تفاصيل الخدمة بالإنجليزي", en: "Full details (EN)" },
  svc_includes_ar: {
    ar: "ما تشمله الجلسة بالعربي (سطر لكل نقطة)",
    en: "What's included AR (one per line)",
  },
  svc_includes_en: {
    ar: "ما تشمله الجلسة بالإنجليزي (سطر لكل نقطة)",
    en: "What's included EN (one per line)",
  },
  svc_hours: { ar: "المدة — ساعات", en: "Duration — hours" },
  svc_mins: { ar: "المدة — دقائق", en: "Duration — minutes" },
  svc_image: { ar: "صورة الخدمة", en: "Service image" },
  svc_active: { ar: "ظاهرة للزبائن", en: "Visible to clients" },
  svc_hidden: { ar: "مخفية", en: "Hidden" },
  svc_sort: { ar: "ترتيب العرض", en: "Display order" },
  img_hair: { ar: "شعر", en: "Hair" },
  img_makeup: { ar: "مكياج", en: "Makeup" },
  img_nails: { ar: "أظافر", en: "Nails" },
  img_skin: { ar: "بشرة", en: "Skin" },
  img_bridal: { ar: "عروس", en: "Bridal" },
  img_color: { ar: "صبغة", en: "Color" },
  img_keratin: { ar: "كيراتين", en: "Keratin" },
  img_highlights: { ar: "هايلايت", en: "Highlights" },
  img_lashes: { ar: "رموش", en: "Lashes" },
  img_brows: { ar: "حواجب", en: "Brows" },
  img_henna: { ar: "حناء", en: "Henna" },
  img_spa: { ar: "مساج", en: "Spa" },
  img_pedicure: { ar: "باديكير", en: "Pedicure" },
  img_wax: { ar: "شمع", en: "Wax" },
  img_engagement: { ar: "خطوبة", en: "Engagement" },
  img_goldbridal: { ar: "عروس ذهبية", en: "Golden bridal" },
  img_updo: { ar: "تسريحة", en: "Updo" },
  img_glam: { ar: "جلام", en: "Glam" },
  err_service_name: {
    ar: "اكتبي اسم الخدمة بالعربي.",
    en: "Please enter the Arabic service name.",
  },
  err_duration: { ar: "حددي مدة الخدمة (ساعة أو دقائق).", en: "Set the service duration." },
  dash_revenue_done: { ar: "المحصّل", en: "Collected" },
  dash_revenue_expected: { ar: "المتوقع", en: "Expected" },
  dash_total_bookings: { ar: "كل الحجوزات", en: "All bookings" },
  dash_pending: { ar: "بانتظار التأكيد", en: "Awaiting confirmation" },
  dash_chart_days: { ar: "الإيراد حسب اليوم", en: "Revenue by day" },
  dash_chart_services: { ar: "توزيع الخدمات", en: "Services mix" },
  dash_chart_staff: { ar: "أداء الاختصاصيات", en: "Specialist performance" },
  dash_staff: { ar: "من استلمها", en: "Handled by" },
  dash_amount: { ar: "المبلغ", en: "Amount" },
  dash_unassigned: { ar: "غير محددة", en: "Unassigned" },
  dash_empty_charts: {
    ar: "بعد ما تصير حجوزات، تظهر الأرقام والشارتات هنا.",
    en: "Charts appear here once bookings start coming in.",
  },
  slot_seats: { ar: "المقاعد", en: "Seats" },
  slot_taken: { ar: "محجوز", en: "Booked" },
  slot_pause: { ar: "تعليق", en: "Pause" },
  slot_resume: { ar: "فتح", en: "Open" },
  slot_upcoming: { ar: "اختاري اليوم من القائمة، وعدّلي أوقاته من الجدول.", en: "Pick a day from the list, then edit its times in the table." },
  slot_pick_day: { ar: "اختاري اليوم", en: "Choose a day" },
  slot_empty_day: { ar: "لا أوقات لهذا اليوم. أضيفي وقتاً أو يوماً كاملاً من فوق.", en: "No times for this day. Add a slot or a full day above." },
  slot_status: { ar: "الحالة", en: "Status" },
} as const;

export type Key = keyof typeof dict;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string; dir: "rtl" | "ltr" };

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "en" || stored === "ar") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (k: Key) => dict[k][lang],
      dir: lang === "ar" ? "rtl" : "ltr",
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
