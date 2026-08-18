import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => {
      el.style.transitionDelay = `${delay}ms`;
      el.classList.add("is-visible");
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show();
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: "48px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={cn("reveal", className)}>
      {children}
    </div>
  );
}

/** Element that drifts / scales as the page scrolls (parallax). */
export function Parallax({
  children,
  speed = 0.25,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Card that tilts in 3D toward the pointer. */
export function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateY(${px * 12}deg) rotateX(${-py * 12}deg) translateZ(26px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "rotateY(0deg) rotateX(0deg) translateZ(0)";
  };

  return (
    <div className={cn("scene-3d", className)} onMouseMove={onMove} onMouseLeave={reset}>
      <div ref={ref} className="tilt-3d h-full">
        {children}
      </div>
    </div>
  );
}
