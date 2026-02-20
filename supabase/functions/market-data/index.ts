import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const TWELVE_DATA_API_KEY = Deno.env.get("TWELVE_DATA_API_KEY");
const BINANCE_API_URL = "https://api.binance.com/api/v3/ticker/price";
const YAHOO_FINANCE_BASE_URL = "https://query1.finance.yahoo.com/v8/finance/chart/";

async function fetchTwelveDataPrice(symbol: string) {
    if (!TWELVE_DATA_API_KEY) throw new Error("TWELVE_DATA_API_KEY not set");

    // Twelve Data can handle most symbols (AAPL, BTC/USD, EUR/USD)
    const response = await fetch(`https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${TWELVE_DATA_API_KEY}`);
    const data = await response.json();

    if (data.status === "error") throw new Error(data.message);

    return {
        symbol: data.symbol,
        price: parseFloat(data.close),
        changePercent: parseFloat(data.percent_change),
        timestamp: new Date().toISOString(),
        source: "Twelve Data"
    };
}

async function fetchBinancePrice(symbol: string) {
    const binanceSymbol = symbol.endsWith("USDT") ? symbol : `${symbol}USDT`;
    const response = await fetch(`${BINANCE_API_URL}?symbol=${binanceSymbol}`);
    const data = await response.json();

    return {
        symbol,
        price: parseFloat(data.price),
        changePercent: null,
        timestamp: new Date().toISOString(),
        source: "Binance"
    };
}

// Fallback legacy method
async function fetchYahooPrice(symbol: string) {
    const response = await fetch(`${YAHOO_FINANCE_BASE_URL}${symbol}?interval=1m&range=1d`);
    const data = await response.json();
    const result = data.chart.result[0];
    const quote = result.indicators.quote[0];
    const close = quote.close[quote.close.length - 1];
    const prevClose = result.meta.previousClose;
    const change = ((close - prevClose) / prevClose) * 100;

    return {
        symbol,
        price: close,
        changePercent: change,
        timestamp: new Date().toISOString(),
        source: "Yahoo Finance (Legacy)"
    };
}

serve(async (req: Request) => {
    try {
        const { symbol, assetClass } = await req.json();

        let data;

        // 1. Try Twelve Data (Primary)
        if (TWELVE_DATA_API_KEY) {
            try {
                data = await fetchTwelveDataPrice(symbol);
            } catch (err) {
                console.warn(`Twelve Data failed for ${symbol}, falling back...`, err.message);
            }
        }

        // 2. Fallbacks
        if (!data) {
            if (assetClass === "crypto") {
                data = await fetchBinancePrice(symbol);
            } else {
                data = await fetchYahooPrice(symbol);
            }
        }

        return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
});
