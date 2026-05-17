import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Ornament } from "./Ornament";
import { sendRsvp } from "@/lib/rsvp.functions";

export function RsvpForm() {
  const send = useServerFn(sendRsvp);
  const [name, setName] = useState("");
  const [attend, setAttend] = useState<"yes" | "no" | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !attend || loading) return;
    setLoading(true);
    setError(null);
    try {
      await send({ data: { name: name.trim(), attend } });
      setSent(true);
    } catch (err) {
      console.error(err);
      setError("Жіберілмеді. Қайталап көріңіз.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="text-center">
        <Ornament className="mb-6" />
        <h3 className="text-3xl font-light text-foreground sm:text-4xl">Рахмет!</h3>
        <p className="mt-4 text-lg italic text-muted-foreground">
          {attend === "yes"
            ? "Сізді тойымызда көруге қуаныштымыз."
            : "Жауабыңыз үшін алғыс айтамыз."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-7">
      <div>
        <label className="mb-2 block text-center text-sm uppercase tracking-[0.25em] text-muted-foreground">
          Есіміңіз
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border-0 border-b border-[var(--gold-deep)]/40 bg-transparent px-2 py-3 text-center text-xl font-light text-foreground outline-none transition focus:border-[var(--gold-deep)]"
          placeholder="..."
        />
      </div>

      <div>
        <p className="mb-4 text-center text-sm uppercase tracking-[0.25em] text-muted-foreground">
          Келе аласыз ба?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {(["yes", "no"] as const).map((v) => (
            <button
              type="button"
              key={v}
              onClick={() => setAttend(v)}
              className={`rounded-md border px-4 py-3 text-sm uppercase tracking-widest transition ${
                attend === v
                  ? "border-[var(--gold-deep)] bg-[var(--gold-deep)] text-primary-foreground"
                  : "border-[var(--gold-deep)]/40 bg-transparent text-foreground hover:bg-[var(--gold)]/15"
              }`}
            >
              {v === "yes" ? "Келемін" : "Келе алмаймын"}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-center text-sm text-red-500">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md py-3 text-sm uppercase tracking-[0.3em] text-primary-foreground transition hover:opacity-95 disabled:opacity-60"
        style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-soft)" }}
      >
        {loading ? "Жіберілуде..." : "Жіберу"}
      </button>
    </form>
  );
}
