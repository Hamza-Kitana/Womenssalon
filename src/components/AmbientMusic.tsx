import { useCallback, useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useI18n } from "@/lib/i18n";

function readStoredVolume() {
  if (typeof window === "undefined") return 28;
  const raw = Number(localStorage.getItem("music-volume"));
  return Number.isFinite(raw) && raw >= 0 ? Math.min(100, raw) : 28;
}

function readStoredMuted() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("music-muted") === "1";
}

export function AmbientMusic() {
  const { t } = useI18n();
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(readStoredVolume);
  const [muted, setMuted] = useState(readStoredMuted);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const startedRef = useRef(false);
  const volumeRef = useRef(volume);
  const mutedRef = useRef(muted);

  volumeRef.current = volume;
  mutedRef.current = muted;

  const level = () => (mutedRef.current ? 0 : (volumeRef.current / 100) * 0.08);

  const start = useCallback(async () => {
    if (startedRef.current && ctxRef.current) {
      if (ctxRef.current.state === "suspended") await ctxRef.current.resume();
      setPlaying(true);
      return;
    }

    const AudioCtx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const master = ctx.createGain();
    master.gain.value = 0.0001;

    const air = ctx.createBiquadFilter();
    air.type = "lowpass";
    air.frequency.value = 3200;

    const delay = ctx.createDelay();
    delay.delayTime.value = 0.32;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.22;
    const wet = ctx.createGain();
    wet.gain.value = 0.18;

    master.connect(air);
    air.connect(ctx.destination);
    master.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wet);
    wet.connect(air);

    ctxRef.current = ctx;
    gainRef.current = master;
    startedRef.current = true;

    const melody = [
      698.46, 880.0, 1046.5, 880.0, 783.99, 698.46, 659.25, 587.33, 698.46, 783.99, 880.0, 1046.5,
      1174.66, 1046.5, 880.0, 783.99,
    ];

    let i = 0;
    const playNote = () => {
      if (ctx.state === "closed") return;
      const now = ctx.currentTime;
      const freq = melody[i % melody.length]!;

      const bell = ctx.createOscillator();
      const bellGain = ctx.createGain();
      bell.type = "sine";
      bell.frequency.value = freq;
      bellGain.gain.setValueAtTime(0.0001, now);
      bellGain.gain.exponentialRampToValueAtTime(0.28, now + 0.03);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
      bell.connect(bellGain).connect(master);
      bell.start(now);
      bell.stop(now + 3);

      const sparkle = ctx.createOscillator();
      const sparkleGain = ctx.createGain();
      sparkle.type = "triangle";
      sparkle.frequency.value = freq * 2;
      sparkleGain.gain.setValueAtTime(0.0001, now);
      sparkleGain.gain.exponentialRampToValueAtTime(0.07, now + 0.04);
      sparkleGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
      sparkle.connect(sparkleGain).connect(master);
      sparkle.start(now);
      sparkle.stop(now + 1.8);

      if (i % 2 === 0) {
        const pad = ctx.createOscillator();
        const padGain = ctx.createGain();
        pad.type = "sine";
        pad.frequency.value = freq / 2;
        padGain.gain.setValueAtTime(0.0001, now);
        padGain.gain.exponentialRampToValueAtTime(0.08, now + 0.5);
        padGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.6);
        pad.connect(padGain).connect(master);
        pad.start(now);
        pad.stop(now + 3.8);
      }

      i += 1;
    };

    playNote();
    timerRef.current = window.setInterval(playNote, 2100);
    master.gain.exponentialRampToValueAtTime(Math.max(level(), 0.0001), ctx.currentTime + 1.4);

    if (ctx.state === "suspended") await ctx.resume();
    setPlaying(true);
  }, []);

  useEffect(() => {
    if (gainRef.current && ctxRef.current && ctxRef.current.state !== "closed") {
      gainRef.current.gain.setTargetAtTime(
        Math.max(level(), 0.0001),
        ctxRef.current.currentTime,
        0.25,
      );
    }
    localStorage.setItem("music-volume", String(volume));
    localStorage.setItem("music-muted", muted ? "1" : "0");
  }, [volume, muted]);

  useEffect(() => {
    const unlock = () => {
      void start();
    };

    void start();

    const events: Array<keyof WindowEventMap> = ["pointerdown", "keydown", "touchstart"];
    events.forEach((event) =>
      window.addEventListener(event, unlock, { once: true, passive: true }),
    );

    return () => {
      events.forEach((event) => window.removeEventListener(event, unlock));
      if (timerRef.current) window.clearInterval(timerRef.current);
      void ctxRef.current?.close();
    };
  }, [start]);

  const toggleMute = () => {
    setMuted((m) => !m);
    void start();
  };

  return (
    <div className="glass-card fixed bottom-[max(1.1rem,env(safe-area-inset-bottom))] start-4 z-50 flex items-center gap-2.5 rounded-full py-1.5 ps-1.5 pe-3 shadow-[var(--shadow-soft)]">
      <button
        type="button"
        onClick={toggleMute}
        aria-label={t("sound")}
        className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground"
      >
        {muted ? <VolumeX className="size-4" /> : <Music className={playing ? "size-4 animate-pulse" : "size-4"} />}
      </button>
      <Slider
        dir="ltr"
        className="w-20 sm:w-24"
        value={[muted ? 0 : volume]}
        max={100}
        step={1}
        onValueChange={(v) => {
          const next = v[0] ?? 0;
          setVolume(next);
          setMuted(next <= 0);
          void start();
        }}
        aria-label={t("sound")}
      />
    </div>
  );
}
