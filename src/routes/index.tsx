import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteLayout";
import { HeroServiceCard } from "@/components/HeroServiceCard";
import { SalonVideo } from "@/components/SalonImage";
import { useI18n } from "@/lib/i18n";
import { fetchServices, IMAGES, VIDEOS } from "@/lib/salon";
import { sweepDelay } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "لمسة ورد | جمالك يبدأ من هنا" }],
  }),
  component: Index,
});

function Index() {
  const { t, dir } = useI18n();
  const cards = fetchServices().slice(0, 3);

  return (
    <div className="home-lock relative">
      <div className="absolute inset-0">
        <SalonVideo
          src={VIDEOS.salon}
          poster={IMAGES.hero}
          label={t("brand")}
          className="ken-burns h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,18,28,0.35)_0%,rgba(40,18,28,0.58)_52%,rgba(40,18,28,0.78)_100%)]" />
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
      </div>

      <SiteHeader ghost />

      <div className="relative z-10 flex h-full flex-col items-center justify-center overflow-x-clip px-4 pt-20 pb-16 text-center text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.55)] sm:px-5 sm:pt-16 sm:pb-12">
        <p className="sweep-in mb-3 max-w-[18rem] text-[10px] tracking-[0.18em] text-white/90 sm:mb-4 sm:max-w-none sm:text-[11px] sm:tracking-[0.35em]">
          {t("hero_kicker")}
        </p>
        <h1
          className="sweep-in font-display max-w-3xl text-4xl leading-tight md:text-6xl lg:text-7xl"
          style={{ animationDelay: "90ms" }}
        >
          {t("hero_title")}
        </h1>
        <p
          className="sweep-in mt-3 max-w-md px-1 text-[13px] leading-7 text-white/88 sm:mt-4 sm:max-w-xl sm:text-sm md:text-base"
          style={{ animationDelay: "180ms" }}
        >
          {t("hero_sub")}
        </p>
        <div
          className="sweep-in mt-8 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "260ms" }}
        >
          <Link
            to="/booking"
            className="rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-[1.04]"
          >
            {t("hero_cta")}
          </Link>
          <Link
            to="/services"
            className="rounded-full border border-white/45 bg-white/12 px-6 py-3 text-sm backdrop-blur-md transition-colors hover:bg-white/22"
          >
            {t("hero_scroll")}
          </Link>
        </div>

        <div className="hero-cards-row mt-6 flex w-full max-w-3xl items-end justify-center gap-3 sm:mt-10 sm:gap-8">
          {cards.map((card, i) => (
            <div
              key={card.id}
              className="sweep-in"
              style={{ animationDelay: `${320 + sweepDelay(i, cards.length, dir, 90)}ms` }}
            >
              <HeroServiceCard service={card} featured={i === 1} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-[max(0.7rem,env(safe-area-inset-bottom))] pt-2">
        <p className="mx-auto max-w-[20rem] text-center text-[10px] leading-5 text-white/75 sm:max-w-none sm:text-[11px]">
          <span className="block sm:inline">
            {t("brand")} — {t("address")}
          </span>
          <Link
            to="/admin"
            className="ms-0 mt-1 inline-block opacity-50 transition-opacity hover:opacity-100 sm:ms-2 sm:mt-0"
          >
            · {t("admin_link")}
          </Link>
        </p>
      </div>
    </div>
  );
}
