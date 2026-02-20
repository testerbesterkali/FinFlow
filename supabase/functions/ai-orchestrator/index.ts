import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

async function runGroqInference(prompt: string, model: string = "llama-3.3-70b-versatile") {
    const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${Deno.env.get("GROQ_API_KEY")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model,
            messages: [
                { role: "system", content: "You are FinFlow AI, a senior market analyst. You always follow the FICC (Facts, Interpretation, Confidence, Caveats) output standard. NEVER provide investment advice." },
                { role: "user", content: prompt }
            ],
            temperature: 0.2
        })
    });

    return await response.json();
}

serve(async (req) => {
    const { prompt, context, assetClass } = await req.json();

    try {
        // Build enhanced prompt with context (RAG or real-time data)
        const enhancedPrompt = `
      Context: ${JSON.stringify(context)}
      Task: ${prompt}
      Asset Class: ${assetClass}
      
      Requirements:
      1. Follow FICC standard strictly.
      2. Include mandatory disclaimer.
      3. Use conservative reasoning.
    `;

        const result = await runGroqInference(enhancedPrompt);
        const content = result.choices[0].message.content;

        return new Response(JSON.stringify({ analysis: content }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: "AI Inference failed", details: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
});
