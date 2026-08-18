import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, Sparkles } from "lucide-react";
import { PageShell } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { SalonImage } from "@/components/SalonImage";
import { ServiceCard } from "@/components/ServiceCard";
import { useI18n } from "@/lib/i18n";
import {
  fetchServices,
  formatDuration,
  formatMoney,
  getService,
  serviceExtra,
  serviceImage,
  serviceIncludes,
  serviceLong,
  serviceName,
  serviceSteps,
} from "@/lib/salon";
import { sweepDelay } from "@/lib/utils";

export const Route = createFileRoute("/services/$id")({
  head: ({ params }) => {
    const service = getService(params.id);
    return {
      meta: [{ title: service ? `${service.name_ar} | لمسة ورد` : "لمسة ورد" }],
    };
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { id } = Route.useParams();
  const { t, lang, dir } = useI18n();
  const service = getService(id);

  if (!service?.is_active) {
    return (
      <PageShell>
        <div className="mx-auto max-w-lg text-center">
          <h1 className="font-display text-3xl text-foreground">{t("not_found")}</h1>
          <Link
            to="/services"
            className="mt-6 inline-flex rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground"
          >
            {t("back_services")}
          </Link>
        </div>
      </PageShell>
    );
  }

  const extra = serviceExtra(service);
  const related = fetchServices()
    .filter((s) => s.id !== service.id)
    .slice(0, 4);
  const includes = serviceIncludes(service, lang);
  const steps = serviceSteps(service, lang);
  const story = serviceLong(service, lang)
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const duration = formatDuration(service.duration_min, {
    hour: t("hour_unit"),
    minute: t("minutes"),
  });

  return (
    <PageShell flush ghost>
      <section className="relative h-[38vh] min-h-[240px] w-full overflow-hidden md:h-[42vh]">
        <SalonImage
          src={serviceImage(service.image_key)}
          alt={serviceName(service, lang)}
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,18,28,0.18)_0%,rgba(40,18,28,0.28)_38%,rgba(40,18,28,0.92)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-8 text-start text-white sm:px-6 lg:px-8">
          <Link
            to="/services"
            className="mb-5 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <ArrowRight className={`size-4 ${lang === "en" ? "rotate-180" : ""}`} />
            {t("back_services")}
          </Link>
          <span className="mb-3 block h-px w-16 bg-[var(--gradient-gold)]" />
          <h1 className="font-display text-4xl drop-shadow md:text-6xl">
            {serviceName(service, lang)}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm backdrop-blur-md">
              {formatMoney(Number(service.price), t("currency"))}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-4 py-1.5 text-sm backdrop-blur-md">
              <Clock className="size-3.5" />
              {duration}
            </span>
            <Link
              to="/booking"
              search={{ service: service.id }}
              className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground shadow-[var(--shadow-soft)]"
            >
              {t("book_this")}
            </Link>
          </div>
        </div>
      </section>

      <div className="w-full px-4 py-10 sm:px-6 lg:px-8">
        <Reveal>
          <section className="luxury-card w-full rounded-[2rem] p-6 text-start md:p-8">
            <h2 className="mb-4 font-display text-2xl text-foreground md:text-3xl">
              {t("service_about")}
            </h2>
            <div className="space-y-4 text-base leading-8 text-foreground/85">
              {story.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            {includes.length > 0 ? (
              <div className="mt-8">
                <h3 className="mb-5 flex items-center gap-2 font-display text-2xl text-foreground">
                  <Sparkles className="size-5 text-primary" />
                  {t("includes")}
                </h3>
                <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {includes.map((item, i) => (
                    <li
                      key={`${item}-${i}`}
                      className="sweep-in flex items-start gap-2 rounded-2xl bg-secondary/70 px-4 py-3 text-sm text-foreground"
                      style={{ animationDelay: `${sweepDelay(i, includes.length, dir, 45)}ms` }}
                    >
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
                        <Check className="size-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        </Reveal>

        {steps.length > 0 ? (
          <section className="mt-8 w-full text-start">
            <h2 className="mb-5 font-display text-2xl text-foreground md:text-3xl">
              {t("how_we_work")}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {steps.map((step, i) => (
                <Reveal key={step} delay={sweepDelay(i, steps.length, dir)}>
                  <article className="luxury-card h-full rounded-[1.6rem] p-5">
                    <span className="font-display text-3xl text-primary/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-3 text-sm leading-7 text-foreground">{step}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}

        {extra.gallery.length > 0 ? (
          <section className="mt-10 w-full text-start">
            <h2 className="mb-5 font-display text-2xl text-foreground md:text-3xl">
              {t("service_gallery")}
            </h2>
            <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {extra.gallery.map((src, i) => (
                <Reveal key={`${src}-${i}`} delay={sweepDelay(i, extra.gallery.length, dir)}>
                  <SalonImage
                    src={src}
                    alt={serviceName(service, lang)}
                    className="h-56 w-full rounded-[1.5rem] object-cover shadow-[var(--shadow-soft)] md:h-72"
                  />
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-8 flex w-full flex-wrap items-center justify-between gap-4 rounded-[1.8rem] bg-primary px-5 py-5 text-primary-foreground sm:px-8">
          <div className="text-start">
            <p className="font-display text-2xl">{serviceName(service, lang)}</p>
            <p className="mt-1 text-sm text-primary-foreground/85">
              {formatMoney(Number(service.price), t("currency"))} · {duration}
            </p>
          </div>
          <Link
            to="/booking"
            search={{ service: service.id }}
            className="rounded-full bg-background px-6 py-2.5 text-sm text-foreground shadow-sm"
          >
            {t("book_this")}
          </Link>
        </div>

        {related.length > 0 ? (
          <section className="mt-14 w-full text-start">
            <h2 className="mb-2 font-display text-2xl text-foreground md:text-3xl">{t("related")}</h2>
            <span className="mb-6 block h-px w-16 bg-[var(--gradient-gold)]" />
            <div className="grid w-full grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {related.map((item, i) => (
                <Reveal key={item.id} delay={sweepDelay(i, related.length, dir)}>
                  <ServiceCard service={item} compact />
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </PageShell>
  );
}
