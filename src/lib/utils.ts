import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Stagger from the visual right toward the left. */
export function sweepDelay(index: number, total: number, dir: "rtl" | "ltr", step = 85) {
  const order = dir === "rtl" ? index : Math.max(total - 1 - index, 0);
  return order * step;
}
