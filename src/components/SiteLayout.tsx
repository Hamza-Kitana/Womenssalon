import { Link, useRouterState } from "@tanstack/react-router";
import { Flower2, Globe, MapPin, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/lib/i18n";
import { MAPS_LINK } from "@/lib/salon";
import { cn, sweepDelay } from "@/lib/utils";

const links = [
  { to: "/", key: "nav_home" },
  { to: "/services", key: "nav_services" },
  { to: "/booking", key: "nav_booking" },
  { to: "/gallery", key: "nav_gallery" },
  { to: "/location", key: "nav_location" },
] as const;

export function SiteHeader({ ghost = false }: { ghost?: boolean }) {
  const { t, lang, setLang, dir } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !ghost || scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 w-full transition-all duration-500",
        solid
          ? "border-b border-[color-mix(in_oklab,var(--gold)_28%,transparent)] bg-[color-mix(in_oklab,var(--card)_82%,transparent)] shadow-[var(--shadow-soft)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "flex w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8",
          solid ? "py-2.5" : "py-5",
        )}
      >
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
            <Flower2 className="size-4" />
          </span>
          <span
            className={cn(
              "font-display text-lg leading-none text-foreground",
              ghost && !solid && "text-white drop-shadow",
            )}
          >
            {t("brand")}
            <span
              className={cn(
                "block text-[10px] tracking-widest text-muted-foreground",
                ghost && !solid && "text-white/80",
              )}
            >
              {t("tagline")}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              style={{ animationDelay: `${sweepDelay(i, links.length, dir, 55)}ms` }}
              className={cn(
                "sweep-in rounded-full px-4 py-2 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground",
                ghost && !solid && "text-white drop-shadow hover:bg-white/15 hover:text-white",
              )}
              activeProps={{
                className:
                  ghost && !solid ? "bg-white/20 text-white" : "bg-secondary text-foreground",
              }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className={cn(
              "flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-secondary",
              ghost && !solid && "border-white/40 text-white hover:bg-white/15",
            )}
          >
            <Globe className="size-3.5" />
            {lang === "ar" ? "EN" : "عربي"}
          </button>
          <Link
            to="/booking"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            {t("nav_booking")}
          </Link>
          <button
            type="button"
            className={cn("text-foreground md:hidden", ghost && !solid && "text-white")}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t("menu_close") : t("menu_open")}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="flex w-full flex-col border-t border-border/50 bg-[color-mix(in_oklab,var(--card)_90%,transparent)] p-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm text-foreground transition-colors hover:bg-secondary"
            >
              {t(l.key)}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { t, dir } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 w-full border-t border-[color-mix(in_oklab,var(--gold)_32%,transparent)] bg-card/80 backdrop-blur">
      <div className="grid w-full gap-10 px-4 py-12 text-center sm:grid-cols-2 sm:px-6 sm:text-start lg:grid-cols-4 lg:gap-8 lg:px-8">
        <div className="mx-auto flex max-w-sm flex-col items-center sm:mx-0 sm:items-start">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
              <Flower2 className="size-4" />
            </span>
            <span className="font-display text-2xl leading-none text-foreground">{t("brand")}</span>
          </Link>
          <p className="mt-2 text-[11px] tracking-[0.22em] text-muted-foreground">{t("tagline")}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t("hero_sub")}</p>
          <Link
            to="/booking"
            className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:scale-[1.03]"
          >
            {t("hero_cta")}
          </Link>
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <h2 className="font-display text-lg text-foreground">{t("footer_explore")}</h2>
          <span className="mt-2 mb-4 block h-px w-10 bg-[var(--gradient-gold)]" />
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1 sm:flex-col sm:justify-start">
            {links.map((l, i) => (
              <Reveal key={l.to} delay={sweepDelay(i, links.length, dir, 45)}>
                <Link
                  to={l.to}
                  className="block py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t(l.key)}
                </Link>
              </Reveal>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <h2 className="font-display text-lg text-foreground">{t("footer_visit")}</h2>
          <span className="mt-2 mb-4 block h-px w-10 bg-[var(--gradient-gold)]" />
          <p className="flex max-w-xs items-start justify-center gap-2 text-sm leading-relaxed text-muted-foreground sm:justify-start">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            {t("address")}
          </p>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm text-primary transition-opacity hover:opacity-80"
          >
            {t("open_maps")}
          </a>
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <h2 className="font-display text-lg text-foreground">{t("footer_hours_title")}</h2>
          <span className="mt-2 mb-4 block h-px w-10 bg-[var(--gradient-gold)]" />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{t("hours")}</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{t("loc_privacy")}</p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-2 border-t border-border/60 px-4 py-4 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-6 sm:text-start lg:px-8">
        <span>
          © {year} {t("brand")} — {t("footer_rights")}
        </span>
        <Link
          to="/admin"
          className="opacity-40 transition-opacity hover:opacity-100 hover:text-primary"
        >
          {t("admin_link")}
        </Link>
      </div>
    </footer>
  );
}

export function PageShell({
  children,
  flush = false,
  ghost = false,
}: {
  children: ReactNode;
  flush?: boolean;
  ghost?: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="page-shell relative z-[1] min-h-screen">
      <SiteHeader ghost={ghost} />
      <main key={pathname} className={flush ? "page-enter" : "page-enter px-5 pt-32 pb-8"}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <span className="section-rule mx-auto mb-4 block h-px w-16 bg-[var(--gradient-gold)]" />
      <h1
        className="sweep-in font-display text-4xl text-foreground md:text-5xl"
        style={{ animationDelay: "80ms" }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="sweep-in mt-3 text-muted-foreground" style={{ animationDelay: "160ms" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
