import { useMutation } from "@tanstack/react-query";
import { Clock, Pencil, Plus, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { adminDeleteService, adminSaveService } from "@/lib/local-db";
import {
  SERVICE_IMAGE_KEYS,
  formatDuration,
  formatMoney,
  serviceImage,
  serviceName,
  type Service,
  type ServiceImageKey,
} from "@/lib/salon";
import { SalonImage } from "@/components/SalonImage";
import { cn } from "@/lib/utils";

type Draft = {
  id?: string;
  name_ar: string;
  name_en: string;
  desc_ar: string;
  desc_en: string;
  long_ar: string;
  long_en: string;
  includes_ar: string;
  includes_en: string;
  price: number;
  hours: number;
  minutes: number;
  image_key: ServiceImageKey;
  sort_order: number;
  is_active: boolean;
};

const emptyDraft = (sort: number): Draft => ({
  name_ar: "",
  name_en: "",
  desc_ar: "",
  desc_en: "",
  long_ar: "",
  long_en: "",
  includes_ar: "",
  includes_en: "",
  price: 40,
  hours: 1,
  minutes: 0,
  image_key: "hair",
  sort_order: sort,
  is_active: true,
});

function toDraft(service: Service): Draft {
  return {
    id: service.id,
    name_ar: service.name_ar,
    name_en: service.name_en,
    desc_ar: service.desc_ar,
    desc_en: service.desc_en,
    long_ar: service.long_ar ?? "",
    long_en: service.long_en ?? "",
    includes_ar: (service.includes_ar ?? []).join("\n"),
    includes_en: (service.includes_en ?? []).join("\n"),
    price: Number(service.price) || 0,
    hours: Math.floor((service.duration_min || 0) / 60),
    minutes: (service.duration_min || 0) % 60,
    image_key: service.image_key,
    sort_order: service.sort_order,
    is_active: service.is_active,
  };
}

const imageLabel: Record<ServiceImageKey, `img_${ServiceImageKey}`> = {
  hair: "img_hair",
  makeup: "img_makeup",
  nails: "img_nails",
  skin: "img_skin",
  bridal: "img_bridal",
  color: "img_color",
  keratin: "img_keratin",
  highlights: "img_highlights",
  lashes: "img_lashes",
  brows: "img_brows",
  henna: "img_henna",
  spa: "img_spa",
  pedicure: "img_pedicure",
  wax: "img_wax",
  engagement: "img_engagement",
  goldbridal: "img_goldbridal",
  updo: "img_updo",
  glam: "img_glam",
};

export function ServicesPanel({
  token,
  services,
  onDone,
}: {
  token: string;
  services: Service[];
  onDone: () => void;
}) {
  const { t, lang } = useI18n();
  const [draft, setDraft] = useState<Draft | null>(null);
  const durationLabels = { hour: t("hour_unit"), minute: t("minutes") };

  const save = useMutation({
    mutationFn: (input: Draft) =>
      Promise.resolve(
        adminSaveService(token, {
          ...(input.id ? { id: input.id } : {}),
          name_ar: input.name_ar,
          name_en: input.name_en,
          desc_ar: input.desc_ar,
          desc_en: input.desc_en,
          long_ar: input.long_ar,
          long_en: input.long_en,
          includes_ar: input.includes_ar.split("\n"),
          includes_en: input.includes_en.split("\n"),
          price: input.price,
          duration_min: input.hours * 60 + input.minutes,
          image_key: input.image_key,
          sort_order: input.sort_order,
          is_active: input.is_active,
        }),
      ),
    onSuccess: () => {
      toast.success(t("saved"));
      setDraft(null);
      onDone();
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => Promise.resolve(adminDeleteService(token, id)),
    onSuccess: () => {
      toast.success(t("deleted"));
      setDraft(null);
      onDone();
    },
  });

  if (draft) {
    return (
      <ServiceForm
        draft={draft}
        onChange={setDraft}
        onCancel={() => setDraft(null)}
        onSave={() => {
          if (!draft.name_ar.trim()) {
            toast.error(t("err_service_name"));
            return;
          }
          if (draft.hours * 60 + draft.minutes < 15) {
            toast.error(t("err_duration"));
            return;
          }
          save.mutate(draft);
        }}
        saving={save.isPending}
      />
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display flex items-center gap-2 text-3xl text-foreground">
          <Sparkles className="size-6 text-primary" />
          {t("dash_services")}
        </h1>
        <button
          type="button"
          onClick={() => setDraft(emptyDraft(services.length + 1))}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
        >
          <Plus className="size-4" />
          {t("add_service")}
        </button>
      </div>

      <div className="grid gap-4">
        {services.map((service) => (
          <article
            key={service.id}
            className={cn(
              "luxury-card flex flex-col gap-4 rounded-[1.6rem] p-4 sm:flex-row sm:items-center",
              !service.is_active && "opacity-70",
            )}
          >
            <SalonImage
              src={serviceImage(service.image_key)}
              alt={serviceName(service, lang)}
              className="h-28 w-full rounded-[1.2rem] object-cover sm:h-24 sm:w-36"
            />
            <div className="min-w-0 flex-1 text-start">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-xl text-foreground">
                  {serviceName(service, lang)}
                </h2>
                {!service.is_active && (
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                    {t("svc_hidden")}
                  </span>
                )}
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {lang === "ar" ? service.desc_ar : service.desc_en}
              </p>
              <p className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span>{formatMoney(Number(service.price), t("currency"))}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3" />
                  {formatDuration(service.duration_min, durationLabels)}
                </span>
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => setDraft(toDraft(service))}
                className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-xs"
              >
                <Pencil className="size-3.5" />
                {t("action_edit")}
              </button>
              <button
                type="button"
                onClick={() => remove.mutate(service.id)}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs text-destructive"
              >
                <Trash2 className="size-3.5" />
                {t("action_delete")}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ServiceForm({
  draft,
  onChange,
  onCancel,
  onSave,
  saving,
}: {
  draft: Draft;
  onChange: (d: Draft) => void;
  onCancel: () => void;
  onSave: () => void;
  saving: boolean;
}) {
  const { t } = useI18n();
  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    onChange({ ...draft, [key]: value });
  const field =
    "mt-1 block w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-foreground">
          {draft.id ? t("action_edit") : t("add_service")}
        </h1>
        <button type="button" onClick={onCancel} className="rounded-full px-4 py-2 text-sm">
          {t("action_close")}
        </button>
      </div>

      <form
        className="glass-card grid gap-4 rounded-[2rem] p-6 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
      >
        <label className="text-sm">
          {t("svc_name_ar")}
          <input
            className={field}
            value={draft.name_ar}
            onChange={(e) => set("name_ar", e.target.value)}
          />
        </label>
        <label className="text-sm">
          {t("svc_name_en")}
          <input
            className={field}
            value={draft.name_en}
            onChange={(e) => set("name_en", e.target.value)}
          />
        </label>
        <label className="text-sm md:col-span-2">
          {t("svc_desc_ar")}
          <textarea
            rows={2}
            className={field}
            value={draft.desc_ar}
            onChange={(e) => set("desc_ar", e.target.value)}
          />
        </label>
        <label className="text-sm md:col-span-2">
          {t("svc_desc_en")}
          <textarea
            rows={2}
            className={field}
            value={draft.desc_en}
            onChange={(e) => set("desc_en", e.target.value)}
          />
        </label>
        <label className="text-sm md:col-span-2">
          {t("svc_long_ar")}
          <textarea
            rows={4}
            className={field}
            value={draft.long_ar}
            onChange={(e) => set("long_ar", e.target.value)}
          />
        </label>
        <label className="text-sm md:col-span-2">
          {t("svc_long_en")}
          <textarea
            rows={4}
            className={field}
            value={draft.long_en}
            onChange={(e) => set("long_en", e.target.value)}
          />
        </label>
        <label className="text-sm">
          {t("svc_includes_ar")}
          <textarea
            rows={5}
            className={field}
            value={draft.includes_ar}
            onChange={(e) => set("includes_ar", e.target.value)}
          />
        </label>
        <label className="text-sm">
          {t("svc_includes_en")}
          <textarea
            rows={5}
            className={field}
            value={draft.includes_en}
            onChange={(e) => set("includes_en", e.target.value)}
          />
        </label>
        <label className="text-sm">
          {t("from_price")} ({t("currency")})
          <input
            type="number"
            min={0}
            className={field}
            value={draft.price}
            onChange={(e) => set("price", Number(e.target.value) || 0)}
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">
            {t("svc_hours")}
            <input
              type="number"
              min={0}
              max={12}
              className={field}
              value={draft.hours}
              onChange={(e) => set("hours", Math.max(0, Number(e.target.value) || 0))}
            />
          </label>
          <label className="text-sm">
            {t("svc_mins")}
            <input
              type="number"
              min={0}
              max={59}
              step={5}
              className={field}
              value={draft.minutes}
              onChange={(e) =>
                set("minutes", Math.min(59, Math.max(0, Number(e.target.value) || 0)))
              }
            />
          </label>
        </div>
        <label className="text-sm">
          {t("svc_image")}
          <select
            className={field}
            value={draft.image_key}
            onChange={(e) => set("image_key", e.target.value as ServiceImageKey)}
          >
            {SERVICE_IMAGE_KEYS.map((key) => (
              <option key={key} value={key}>
                {t(imageLabel[key])}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          {t("svc_sort")}
          <input
            type="number"
            min={1}
            className={field}
            value={draft.sort_order}
            onChange={(e) => set("sort_order", Number(e.target.value) || 1)}
          />
        </label>
        <label className="flex items-center gap-2 text-sm md:col-span-2">
          <input
            type="checkbox"
            checked={draft.is_active}
            onChange={(e) => set("is_active", e.target.checked)}
          />
          {t("svc_active")}
        </label>
        <div className="flex justify-end gap-2 md:col-span-2">
          <button type="button" onClick={onCancel} className="rounded-full px-4 py-2 text-sm">
            {t("action_close")}
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground disabled:opacity-60"
          >
            {t("action_save")}
          </button>
        </div>
      </form>
    </div>
  );
}
