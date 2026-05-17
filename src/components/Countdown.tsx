import { useEffect, useState } from "react";

const TARGET = new Date("2026-08-21T17:00:00+06:00").getTime();

function diff() {
  const d = TARGET - Date.now();
  if (d <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

export function Countdown() {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    setT(diff());
    const i = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(i);
  }, []);

  const items = [
    { label: "күн", value: t.days },
    { label: "сағат", value: t.hours },
    { label: "минут", value: t.minutes },
    { label: "секунд", value: t.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-5">
      {items.map((i) => (
        <div
          key={i.label}
          className="rounded-lg border border-[var(--gold)]/40 bg-card/70 px-2 py-4 text-center backdrop-blur-sm"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div className="gold-text text-3xl font-light sm:text-5xl">
            {String(i.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
            {i.label}
          </div>
        </div>
      ))}
    </div>
  );
}
