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
            prompt: `Analyze ${symbolData.symbol} for a potential breakout or trend change. Current price: ${symbolData.price}, Source: ${symbolData.source}`,
            context: { agent_config: agent.configuration, market_data: symbolData },
            assetClass: symbolData.assetClass
        })
    });
    return await response.json();
}

async function sendTelegramAlert(telegramId: string, alert: any) {
    const message = `
🚨 *[SIGNAL]* ${alert.symbol} @ $${alert.price}
📊 Confidence: ${alert.confidence}%
    
*Thesis:*
${alert.thesis}

*Key Levels:*
${alert.key_levels.map((l: string) => `• ${l}`).join('\n')}

[View Deep Dive](${Deno.env.get("FRONTEND_URL")})
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

serve(async (req: Request) => {
    try {
        const { data: agents, error: agentsError } = await supabase
            .from("agents")
            .select("*, profiles(telegram_id)")
            .eq("status", "active");

        if (agentsError) throw agentsError;

        for (const agent of agents || []) {
            const symbols = agent.configuration?.symbols || [{ symbol: 'BTC', assetClass: 'crypto' }];
            for (const symbolObj of symbols) {
                try {
                    const symbolData = await fetchLatestPrice(symbolObj.symbol, symbolObj.assetClass);

                    // Signal Detection: Frequency capping
                    const { data: recentAlerts } = await supabase
                        .from("alerts")
                        .select("id")
                        .eq("agent_id", agent.id)
                        .eq("symbol", symbolData.symbol)
                        .gt("created_at", new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString());

                    if (recentAlerts && recentAlerts.length > 0) continue;

                    // AI Pipeline
                    const aiResult = await generateAIAlert(agent, symbolData);

                    // Validation: Only post if high confidence
                    if (aiResult && aiResult.confidence >= 70) {
                        const { error: insertError } = await supabase
                            .from("alerts")
                            .insert({
                                agent_id: agent.id,
                                symbol: aiResult.symbol,
                                asset_class: aiResult.asset_class,
                                price: symbolData.price,
                                change_percent: symbolData.changePercent || 0,
                                confidence: aiResult.confidence,
                                thesis: aiResult.thesis,
                                conviction: aiResult.conviction,
                                key_levels: aiResult.key_levels,
                                outcome_status: 'watched',
                                is_delivered: !!agent.profiles?.telegram_id,
                                delivered_at: new Date().toISOString()
                            });

                        if (insertError) throw insertError;

                        if (agent.profiles?.telegram_id) {
                            await sendTelegramAlert(agent.profiles.telegram_id, {
                                ...aiResult,
                                price: symbolData.price
                            });
                        }
                    }
                } catch (err: any) {
                    console.error(`Error processing ${symbolObj.symbol}:`, err.message);
                }
            }
        }

        return new Response(JSON.stringify({ status: "Success" }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
});
