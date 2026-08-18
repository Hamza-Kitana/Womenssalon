import { Link } from "@tanstack/react-router";
import { Tilt } from "@/components/Reveal";
import { SalonImage } from "@/components/SalonImage";
import { useI18n } from "@/lib/i18n";
import { formatDuration, formatMoney, serviceImage, serviceName, type Service } from "@/lib/salon";
import { cn } from "@/lib/utils";

export function HeroServiceCard({
  service,
  featured = false,
}: {
  service: Service;
  featured?: boolean;
}) {
  const { t, lang } = useI18n();

  return (
    <Tilt className={cn("flex justify-center", featured && "z-10 -translate-y-1 sm:-translate-y-3")}>
      <Link
        to="/services/$id"
        params={{ id: service.id }}
        className={cn(
          "group flex flex-col items-center",
          featured ? "w-[6.35rem] sm:w-32 md:w-40" : "w-[5.5rem] sm:w-28 md:w-36",
        )}
      >
        <span className={cn("hero-card block w-full", featured && "hero-card-featured")}>
          <span className="hero-card-inner block aspect-square">
            <SalonImage
              src={serviceImage(service.image_key)}
              alt={serviceName(service, lang)}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <span className="hero-card-shine" />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(40,18,28,0.72)_100%)]" />
            <span className="hero-card-frame" aria-hidden />
            <span className="absolute inset-x-0 bottom-2 z-[3] mx-auto w-fit rounded-full bg-background/92 px-2 py-0.5 text-[9px] text-foreground shadow-sm sm:bottom-3 sm:px-2.5 sm:text-[11px]">
              {formatMoney(Number(service.price), t("currency"))}
            </span>
          </span>
        </span>
        <h3 className="mt-2.5 font-display text-[13px] leading-tight text-white drop-shadow sm:mt-3 sm:text-lg md:text-xl">
          {serviceName(service, lang)}
        </h3>
        <p className="mt-0.5 text-[10px] text-white/78 sm:text-[11px]">
          {formatDuration(service.duration_min, { hour: t("hour_unit"), minute: t("minutes") })}
        </p>
      </Link>
    </Tilt>
  );
}
