import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const YAHOO_FINANCE_BASE_URL = "https://query1.finance.yahoo.com/v8/finance/chart/";
const BINANCE_API_URL = "https://api.binance.com/api/v3/ticker/price";

async function fetchYahooPrice(symbol: string) {
    try {
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
            source: "Yahoo Finance"
        };
    } catch (err) {
        console.error(`Error fetching Yahoo price for ${symbol}:`, err);
        throw err;
    }
}

async function fetchBinancePrice(symbol: string) {
    try {
        // Binance symbols are like BTCUSDT
        const binanceSymbol = symbol.endsWith("USDT") ? symbol : `${symbol}USDT`;
        const response = await fetch(`${BINANCE_API_URL}?symbol=${binanceSymbol}`);
        const data = await response.json();

        return {
            symbol,
            price: parseFloat(data.price),
            changePercent: null, // Binance ticker/price doesn't give 24h change, would need ticker/24hr
            timestamp: new Date().toISOString(),
            source: "Binance"
        };
    } catch (err) {
        console.error(`Error fetching Binance price for ${symbol}:`, err);
        throw err;
    }
}

serve(async (req) => {
    const { symbol, assetClass } = await req.json();

    try {
        let data;
        if (assetClass === "crypto") {
            data = await fetchBinancePrice(symbol);
        } else {
            // Stocks, FX (e.g. EURUSD=X), Commodities (e.g. CL=F)
            data = await fetchYahooPrice(symbol);
        }

        return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: "Failed to fetch market data", details: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
});
