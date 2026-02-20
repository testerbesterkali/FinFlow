import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Telegraf } from "https://esm.sh/telegraf@4.11.2";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") || "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
);

const bot = new Telegraf(Deno.env.get("TELEGRAM_BOT_TOKEN") || "");

bot.start((ctx: any) => {
  ctx.reply("Welcome to FinFlow AI! 🚀\n\nI am your 24/7 autonomous market analyst. Link your account to get started.", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Connect Account", url: `${Deno.env.get("FRONTEND_URL")}/auth?telegram_id=${ctx.from?.id}` }],
        [{ text: "Open Mini App", web_app: { url: Deno.env.get("FRONTEND_URL") || "" } }]
      ]
    }
  });
});

bot.command("radar", async (ctx: any) => {
  try {
    const { data: alerts, error } = await supabase
      .from("alerts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (error || !alerts || alerts.length === 0) {
      return ctx.reply("System status: NO ACTIVE SIGNALS.");
    }

    const message = alerts.map((a: any) => `
🚨 *[${a.symbol}]* @ $${a.price}
📊 Confidence: ${a.confidence}%
    
*Thesis:* ${a.thesis.substring(0, 100)}...
    `).join('\n---\n');

    ctx.reply(`*CURRENT RADAR LOGS*\n${message}`, { parse_mode: "Markdown" });
  } catch (err: any) {
    ctx.reply("Error fetching radar data.");
  }
});

bot.help((ctx: any) => {
  ctx.reply(`
Available commands:
/start - Initialize connection
/radar - View current opportunities
/help - Show this message
  `);
});

serve(async (req: Request) => {
  try {
    const url = new URL(req.url);
    if (url.searchParams.get("secret") !== Deno.env.get("FUNCTION_SECRET")) {
      return new Response("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    await bot.handleUpdate(body);
    return new Response("OK");
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
});
