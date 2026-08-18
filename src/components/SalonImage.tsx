import { useEffect, useState } from "react";
import { IMAGES } from "@/lib/salon";
import { cn } from "@/lib/utils";

const PLACEHOLDER =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f7eee9"/><stop offset="1" stop-color="#e8d0c6"/></linearGradient></defs><rect width="1200" height="800" fill="url(#g)"/></svg>`,
  );

export function SalonImage({
  src,
  alt,
  className,
  loading = "lazy",
  fetchPriority,
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
}) {
  const [url, setUrl] = useState(src);

  useEffect(() => {
    setUrl(src);
  }, [src]);

  return (
    <img
      src={url}
      alt={alt}
      className={cn("bg-[color-mix(in_oklab,var(--rose)_16%,var(--background))]", className)}
      referrerPolicy="no-referrer"
      loading={loading}
      {...(fetchPriority ? { fetchPriority } : {})}
      onError={() => {
        if (url === PLACEHOLDER) return;
        setUrl(url === IMAGES.hero ? PLACEHOLDER : IMAGES.hero);
      }}
    />
  );
}

export function SalonVideo({
  src,
  poster,
  className,
  label,
}: {
  src: string;
  poster: string;
  className?: string;
  label: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <SalonImage
        src={poster}
        alt={label}
        loading="eager"
        fetchPriority="high"
        {...(className ? { className } : {})}
      />
    );
  }

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      aria-label={label}
      onError={() => setFailed(true)}
      {...(className ? { className } : {})}
    >
      <source src={src} type="video/mp4" onError={() => setFailed(true)} />
    </video>
  );
}
