import { Flower2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LoadingScreen({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();

  if (compact) {
    return (
      <div className="flex items-center justify-center gap-3 py-8 text-muted-foreground">
        <span className="relative grid size-11 place-items-center">
          <span className="loader-ring absolute inset-0 rounded-full border border-primary/30" />
          <span className="loader-bloom grid size-8 place-items-center rounded-full bg-primary/12 text-primary">
            <Flower2 className="size-4" />
          </span>
        </span>
        <span className="text-sm">{t("loading_wait")}</span>
      </div>
    );
  }

  return (
    <div className="loader-scene relative grid min-h-screen place-items-center overflow-hidden bg-background px-6">
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
      <span className="loader-petal loader-petal-a" aria-hidden />
      <span className="loader-petal loader-petal-b" aria-hidden />
      <span className="loader-petal loader-petal-c" aria-hidden />
      <span className="loader-petal loader-petal-d" aria-hidden />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="loader-mark relative mb-8 grid size-32 place-items-center">
          <span className="loader-halo" aria-hidden />
          <span className="loader-ring absolute inset-0 rounded-full border border-dashed border-primary/35" />
          <span className="loader-ring-slow absolute inset-3 rounded-full border border-[color-mix(in_oklab,var(--gold)_70%,transparent)]" />
          <span className="loader-orbit" aria-hidden>
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="loader-bloom relative z-[1] grid size-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-gold)]">
            <Flower2 className="loader-flower size-7" />
          </span>
        </div>

        <p className="loader-kicker mb-3 max-w-[16rem] text-[11px] tracking-[0.18em] text-muted-foreground sm:max-w-none sm:tracking-[0.38em]">
          {t("tagline")}
        </p>
        <h1 className="loader-title font-display text-4xl text-foreground md:text-6xl">{t("brand")}</h1>
        <span className="loader-rule mx-auto mt-5 mb-5 block h-px w-20 bg-[var(--gradient-gold)]" />
        <div className="loader-bar mb-4 h-1 w-40 overflow-hidden rounded-full bg-secondary">
          <span className="loader-bar-fill block h-full rounded-full bg-[var(--gradient-gold)]" />
        </div>
        <p className="loader-wait max-w-[16rem] px-2 text-sm leading-6 text-muted-foreground">
          {t("loading_wait")}
        </p>
      </div>
    </div>
  );
}

export function AppSplash() {
  const [phase, setPhase] = useState<"show" | "hide" | "gone">("show");

  useEffect(() => {
    if (sessionStorage.getItem("lw-splash") === "1") {
      setPhase("gone");
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduce ? 350 : 2400;
    const hide = window.setTimeout(() => setPhase("hide"), hold);
    const gone = window.setTimeout(() => {
      sessionStorage.setItem("lw-splash", "1");
      setPhase("gone");
    }, hold + 560);
    return () => {
      window.clearTimeout(hide);
      window.clearTimeout(gone);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={cn("fixed inset-0 z-[80]", phase === "hide" && "loader-exit")}
      aria-busy="true"
      aria-live="polite"
    >
      <LoadingScreen />
    </div>
  );
}
