import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const supabase = createClient(
    Deno.env.get("SUPABASE_URL") || "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
);

async function fetchLatestPrice(symbol: string, assetClass: string) {
    const response = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/market-data`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ symbol, assetClass })
    });
    return await response.json();
}

async function generateAIAlert(agent: any, symbolData: any) {
    const response = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/ai-orchestrator`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: `Analyze ${symbolData.symbol} for a potential breakout. Current price: ${symbolData.price}, Change: ${symbolData.changePercent}%`,
            context: { agent_config: agent.configuration, market_data: symbolData },
            assetClass: symbolData.assetClass
        })
    });
    return await response.json();
}

async function sendTelegramAlert(telegramId: string, alert: any) {
    // Simple Telegram Bot API call
    const message = `
🚨 [ALERT] ${alert.symbol} $${alert.price} (${alert.changePercent}%)

${alert.analysis}

[View Dashboard](${Deno.env.get("FRONTEND_URL")})
  `;

    await fetch(`https://api.telegram.org/bot${Deno.env.get("TELEGRAM_BOT_TOKEN")}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: telegramId,
            text: message,
            parse_mode: "Markdown"
        })
    });
}

serve(async (req) => {
    try {
        // 1. Get all active agents
        const { data: agents, error: agentsError } = await supabase
            .from("agents")
            .select("*, profiles(telegram_id)")
            .eq("status", "active");

        if (agentsError) throw agentsError;

        for (const agent of agents) {
            const { symbols } = agent.configuration; // Assuming config has a symbols list
            for (const symbolObj of symbols) {
                const symbolData = await fetchLatestPrice(symbolObj.symbol, symbolObj.assetClass);

                // 2. Simple signal detection (e.g., price move > 2%)
                // In production, this would be more complex logic stored in DB or code
                if (Math.abs(symbolData.changePercent) >= 2) {

                    // 3. Check if we already sent an alert recently (deduplication)
                    const { data: recentAlerts } = await supabase
                        .from("alerts")
                        .select("id")
                        .eq("agent_id", agent.id)
                        .eq("symbol", symbolData.symbol)
                        .gt("created_at", new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()); // 4 hours window

                    if (recentAlerts && recentAlerts.length > 0) continue;

                    // 4. Generate AI Analysis
                    const aiResult = await generateAIAlert(agent, symbolData);

                    // 5. Store alert
                    const { data: newAlert, error: insertError } = await supabase
                        .from("alerts")
                        .insert({
                            agent_id: agent.id,
                            symbol: symbolData.symbol,
                            price: symbolData.price,
                            change_percent: symbolData.changePercent,
                            confidence: 85, // Placeholder for AI confidence
                            thesis: aiResult.analysis,
                            is_delivered: true,
                            delivered_at: new Date().toISOString()
                        })
                        .select()
                        .single();

                    if (insertError) throw insertError;

                    // 6. Dispatch to Telegram
                    await sendTelegramAlert(agent.profiles.telegram_id, {
                        symbol: symbolData.symbol,
                        price: symbolData.price,
                        changePercent: symbolData.changePercent,
                        analysis: aiResult.analysis
                    });
                }
            }
        }

        return new Response(JSON.stringify({ status: "Alert processing complete" }));
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
});
