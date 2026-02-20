import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");

console.log("AI Orchestrator active");

interface RequestBody {
    prompt: string;
    context?: any;
    assetClass?: string;
}

serve(async (req: Request) => {
    try {
        const { prompt, context, assetClass }: RequestBody = await req.json();

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3-70b-8192",
                messages: [
                    {
                        role: "system",
                        content: `You are FinFlow AI, a senior institutional FICC analyst. 
                    You ALWAYS output valid JSON. Your output must strictly follow the FICC (Facts, Interpretation, Confidence, Caveats) standard.
                    
                    Required JSON Schema:
                    {
                        "symbol": string,
                        "asset_class": "equity" | "crypto" | "forex" | "commodity",
                        "thesis": string (max 300 chars),
                        "confidence": number (1-100),
                        "conviction": {
                            "technical": number (1-30),
                            "fundamental": number (1-30),
                            "sentiment": number (1-20),
                            "macro": number (1-20)
                        },
                        "key_levels": string[] (3-5 specific levels or anchors),
                        "regime": string
                    }
                    
                    NEVER provide investment advice. Return ONLY the JSON.`
                    },
                    { role: "user", content: `Context: ${JSON.stringify(context)}\nAsset Class: ${assetClass}\n\nTask: ${prompt}` }
                ],
                temperature: 0.1,
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        const content = JSON.parse(data.choices[0].message.content);

        return new Response(JSON.stringify(content), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (err: any) {
        console.error(err);
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
});
