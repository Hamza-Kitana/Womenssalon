import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { Tilt } from "@/components/Reveal";
import { SalonImage } from "@/components/SalonImage";
import { useI18n } from "@/lib/i18n";
import {
  formatDuration,
  formatMoney,
  serviceDesc,
  serviceImage,
  serviceName,
  type Service,
} from "@/lib/salon";

export function ServiceCard({
  service,
  compact = false,
}: {
  service: Service;
  compact?: boolean;
}) {
  const { t, lang } = useI18n();
  const name = serviceName(service, lang);
  const duration = formatDuration(service.duration_min, {
    hour: t("hour_unit"),
    minute: t("minutes"),
  });

  if (compact) {
    return (
      <Tilt>
        <Link
          to="/services/$id"
          params={{ id: service.id }}
          className="luxury-card group relative block overflow-hidden rounded-[1.7rem]"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <SalonImage
              src={serviceImage(service.image_key)}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,18,28,0.05)_20%,rgba(40,18,28,0.78)_100%)]" />
            <span className="absolute top-3 start-3 rounded-full bg-background/95 px-2.5 py-1 text-[11px] font-medium text-foreground shadow-sm">
              {formatMoney(Number(service.price), t("currency"))}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-4 text-start">
              <h3 className="font-display text-xl leading-tight text-white drop-shadow md:text-2xl">
                {name}
              </h3>
              <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-white/85">
                <Clock className="size-3" />
                {duration}
              </p>
            </div>
          </div>
        </Link>
      </Tilt>
    );
  }

  return (
    <Tilt>
      <Link
        to="/services/$id"
        params={{ id: service.id }}
        className="luxury-card group block overflow-hidden rounded-[2rem]"
      >
        <div className="relative h-64 overflow-hidden">
          <SalonImage
            src={serviceImage(service.image_key)}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <span className="absolute top-4 start-4 rounded-full bg-background/95 px-3 py-1 text-xs font-medium text-foreground shadow-sm">
            {formatMoney(Number(service.price), t("currency"))}
          </span>
          <span className="absolute bottom-4 start-4 font-display text-2xl text-white drop-shadow">
            {name}
          </span>
        </div>
        <div className="space-y-4 p-6">
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {serviceDesc(service, lang)}
          </p>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              {duration}
            </span>
            <span className="rounded-full bg-secondary px-4 py-1.5 text-xs text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              {t("view_details")}
            </span>
          </div>
        </div>
      </Link>
    </Tilt>
  );
}
