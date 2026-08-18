import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock3, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { PageShell, SectionTitle } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/lib/i18n";
import { MAPS_EMBED, MAPS_LINK } from "@/lib/salon";
import { sweepDelay } from "@/lib/utils";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [{ title: "الموقع | لمسة ورد" }],
  }),
  component: LocationPage,
});

function LocationPage() {
  const { t, dir } = useI18n();
  const cards = [
    { icon: MapPin, text: t("address") },
    { icon: Clock3, text: t("hours") },
    { icon: ShieldCheck, text: t("loc_privacy") },
    { icon: Sparkles, text: t("loc_welcome") },
  ];

  return (
    <PageShell>
      <SectionTitle title={t("location_title")} subtitle={t("location_sub")} />
      <Reveal>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] shadow-[var(--shadow-lift)]">
          <iframe
            title={t("location_title")}
            src={MAPS_EMBED}
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Reveal>
      <div className="mx-auto mt-8 grid max-w-5xl gap-4 overflow-x-clip md:grid-cols-2">
        {cards.map((card, i) => (
          <Reveal key={card.text} delay={sweepDelay(i, cards.length, dir)}>
            <div className="glass-card flex items-start gap-3 rounded-3xl p-5">
              <span className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
                <card.icon className="size-4" />
              </span>
              <p className="pt-2 text-sm leading-relaxed">{card.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noreferrer"
          className="sweep-in rounded-full border border-border bg-background px-5 py-2 text-sm text-foreground hover:bg-secondary"
          style={{ animationDelay: `${sweepDelay(0, 2, dir)}ms` }}
        >
          {t("open_maps")}
        </a>
        <Link
          to="/booking"
          className="sweep-in rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground"
          style={{ animationDelay: `${sweepDelay(1, 2, dir)}ms` }}
        >
          {t("hero_cta")}
        </Link>
      </div>
    </PageShell>
  );
}
