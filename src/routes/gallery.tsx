import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { SalonImage, SalonVideo } from "@/components/SalonImage";
import { useI18n } from "@/lib/i18n";
import { GALLERY, IMAGES, VIDEOS } from "@/lib/salon";
import { sweepDelay } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [{ title: "المعرض | لمسة ورد" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { t, lang, dir } = useI18n();

  return (
    <PageShell flush>
      <section className="relative h-[46vh] min-h-[280px] w-full overflow-hidden">
        <SalonVideo
          src={VIDEOS.closeup}
          poster={IMAGES.interior}
          label={t("gallery_video")}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,18,28,0.28)_0%,rgba(40,18,28,0.42)_48%,rgba(40,18,28,0.82)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-8 text-start text-white sm:px-6 lg:px-8">
          <span className="mb-3 block h-px w-16 bg-[var(--gradient-gold)]" />
          <h1 className="font-display text-4xl drop-shadow md:text-6xl">{t("gallery_title")}</h1>
          <p className="mt-3 max-w-xl text-sm text-white/85 md:text-base">{t("gallery_sub")}</p>
        </div>
      </section>

      <div className="w-full columns-1 gap-4 px-4 py-8 sm:columns-2 sm:px-6 lg:columns-3 lg:px-8 lg:py-10">
        {GALLERY.map((item, i) => (
          <Reveal
            key={item.src}
            delay={sweepDelay(i, GALLERY.length, dir, 45)}
            className="mb-4 break-inside-avoid"
          >
            <SalonImage
              src={item.src}
              alt={lang === "ar" ? item.alt_ar : item.alt_en}
              className="w-full rounded-[1.4rem] object-cover shadow-[var(--shadow-soft)] transition-transform duration-700 hover:scale-[1.02] hover:shadow-[var(--shadow-lift)]"
            />
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
