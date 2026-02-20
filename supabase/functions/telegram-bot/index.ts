import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Telegraf } from "https://esm.sh/telegraf@4.11.2";

const bot = new Telegraf(Deno.env.get("TELEGRAM_BOT_TOKEN") || "");

bot.start((ctx) => {
  ctx.reply("Welcome to FinFlow AI! 🚀\n\nI am your 24/7 autonomous market analyst. Link your account to get started.", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Connect Account", url: `${Deno.env.get("FRONTEND_URL")}/auth/telegram?id=${ctx.from?.id}` }],
        [{ text: "Open Mini App", web_app: { url: Deno.env.get("FRONTEND_URL") || "" } }]
      ]
    }
  });
});

bot.command("price", (ctx) => {
  ctx.reply("Please specify a ticker, e.g., /price BTC");
});

bot.help((ctx) => {
  ctx.reply(`
Available commands:
/start - Initialize connection
/price <ticker> - Get real-time quote
/analyze <ticker> - Get AI analysis
/alert <ticker> <price> - Set manual alert
/radar - View current opportunities
/history - View alert history
/settings - Manage preferences
  `);
});

serve(async (req) => {
  try {
    const url = new URL(req.url);
    if (url.searchParams.get("secret") !== Deno.env.get("FUNCTION_SECRET")) {
      return new Response("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    await bot.handleUpdate(body);
    return new Response("OK");
  } catch (err) {
    console.error(err);
    return new Response("Error", { status: 500 });
  }
});
