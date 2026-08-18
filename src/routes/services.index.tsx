import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { SalonImage } from "@/components/SalonImage";
import { ServiceCard } from "@/components/ServiceCard";
import { useI18n } from "@/lib/i18n";
import { fetchServices, IMAGES } from "@/lib/salon";
import { sweepDelay } from "@/lib/utils";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [{ title: "الخدمات | لمسة ورد" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t, dir } = useI18n();
  const services = fetchServices();

  return (
    <PageShell flush ghost>
      <section className="relative h-[200px] w-full overflow-hidden md:h-[240px]">
        <SalonImage
          src={IMAGES.interior}
          alt={t("services_title")}
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,18,28,0.22)_0%,rgba(40,18,28,0.4)_45%,rgba(40,18,28,0.88)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-4 text-start text-white sm:px-6 md:pb-5 lg:px-8">
          <span className="mb-2 block h-px w-16 bg-[var(--gradient-gold)]" />
          <h1 className="font-display text-3xl drop-shadow md:text-5xl">{t("services_title")}</h1>
          <p className="mt-1.5 max-w-xl text-sm text-white/85 md:text-base">{t("services_sub")}</p>
        </div>
      </section>

      <div className="grid w-full gap-5 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={sweepDelay(i, services.length, dir)}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
