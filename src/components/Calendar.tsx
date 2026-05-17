const WEEKDAYS = ["Дс", "Сс", "Ср", "Бс", "Жм", "Сб", "Жс"];

// August 2026: starts Saturday (Sat=Aug 1). Mon-first grid offset = 5.
const DAYS_IN_MONTH = 31;
const FIRST_OFFSET = 5;
const TARGET_DAY = 21;

export function Calendar() {
  const cells: (number | null)[] = [];
  for (let i = 0; i < FIRST_OFFSET; i++) cells.push(null);
  for (let d = 1; d <= DAYS_IN_MONTH; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="mx-auto max-w-sm">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold-deep)]">
          Тамыз · 2026
        </p>
      </div>

      <div
        className="mt-6 rounded-lg border border-[var(--gold)]/30 bg-card p-5 sm:p-7"
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        <div className="grid grid-cols-7 gap-1 pb-3">
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              className="text-center text-[10px] uppercase tracking-widest text-muted-foreground"
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            if (d === null) return <div key={i} className="aspect-square" />;
            const isTarget = d === TARGET_DAY;
            return (
              <div
                key={i}
                className={`relative flex aspect-square items-center justify-center rounded-md text-sm font-light transition ${
                  isTarget
                    ? "text-primary-foreground"
                    : "text-foreground/80"
                }`}
                style={
                  isTarget
                    ? {
                        background: "var(--gradient-gold)",
                        boxShadow: "var(--shadow-soft)",
                      }
                    : undefined
                }
              >
                {isTarget && (
                  <span
                    className="absolute inset-0 rounded-md ring-2 ring-[var(--gold-deep)]/50"
                    style={{
                      animation: "pulse-ring 2.4s ease-out infinite",
                    }}
                  />
                )}
                <span className="relative">{d}</span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-5 text-center text-xs italic text-muted-foreground">
        21 Тамыз · Жұма · 17:00
      </p>
    </div>
  );
}
