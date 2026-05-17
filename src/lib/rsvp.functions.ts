import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const RsvpSchema = z.object({
  name: z.string().min(1).max(100),
  attend: z.enum(["yes", "no"]),
});

export const sendRsvp = createServerFn({ method: "POST" })
  .inputValidator((input) => RsvpSchema.parse(input))
  .handler(async ({ data }) => {
    const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_API_KEY) {
      throw new Error("TELEGRAM_API_KEY орнатылмаған");
    }
    if (!TELEGRAM_CHAT_ID) {
      throw new Error("TELEGRAM_CHAT_ID орнатылмаған");
    }

    const attendText =
      data.attend === "yes" ? "✅ Келемін" : "❌ Келе алмаймын";

    const text =
      `🎀 <b>Жаңа анкета — Инжудин тойы</b>\n\n` +
      `👤 Есімі: <b>${escapeHtml(data.name)}</b>\n` +
      `📩 Жауабы: ${attendText}`;

    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_API_KEY}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    });

    const body = await res.json();
    if (!res.ok) {
      throw new Error(
        `Telegram қатесі [${res.status}]: ${JSON.stringify(body)}`
      );
    }

    return { ok: true };
  });

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
