import { useEffect, useRef, useState } from "react";

const TRACK_TITLE = "Айкерим Калаубаева — Қыз ұзату";
const TRACK_SRC = "/music.mp3";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onEnd = () => setPlaying(false);
    const onErr = () => setAvailable(false);
    a.addEventListener("ended", onEnd);
    a.addEventListener("error", onErr);
    return () => {
      a.removeEventListener("ended", onEnd);
      a.removeEventListener("error", onErr);
    };
  }, []);

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => setAvailable(false));
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <audio ref={audioRef} src={TRACK_SRC} loop preload="none" />
      <button
        onClick={toggle}
        aria-label={playing ? "Пауза" : "Музыканы қосу"}
        title={available ? TRACK_TITLE : "music.mp3 файлын /public ішіне қосыңыз"}
        className="group flex items-center gap-3 rounded-full border border-[var(--gold)]/40 bg-card/90 px-4 py-3 backdrop-blur transition hover:border-[var(--gold-deep)]"
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        <span
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-primary-foreground"
          style={{ background: "var(--gradient-gold)" }}
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
          {playing && (
            <span
              className="absolute inset-0 rounded-full ring-2 ring-[var(--gold-deep)]/50"
              style={{ animation: "pulse-ring 1.8s ease-out infinite" }}
            />
          )}
        </span>
        <span className="hidden text-xs uppercase tracking-[0.25em] text-foreground/80 sm:flex sm:flex-col sm:items-start">
          <span className="text-[10px] text-muted-foreground">
            {playing ? "Ойналуда" : "Музыка"}
          </span>
          <span className="text-[11px] font-light normal-case italic">
            Қыз ұзату
          </span>
        </span>
      </button>
    </div>
  );
}
