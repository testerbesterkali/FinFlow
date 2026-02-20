# Product Requirements Document (PRD)

## FinFlow AI: Intelligent Market Intelligence Platform

| Field | Value |
|-------|-------|
| **Version** | 2.0 |
| **Date** | February 20, 2026 |
| **Product Owner** | [Your Name] |
| **Status** | Draft for Development |
| **Tech Stack** | React + Vite + Supabase + Telegram Bot API + AI/LLM Services |
| **Document Type** | Living Document — Requires PO approval for changes |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Market Opportunity & User Personas](#2-market-opportunity--user-personas)
3. [Product Vision & North Star Metrics](#3-product-vision--north-star-metrics)
4. [Architecture Overview](#4-architecture-overview)
5. [Feature Specifications](#5-feature-specifications)
6. [Screen Specifications](#6-screen-specifications)
7. [Data Strategy & AI Implementation](#7-data-strategy--ai-implementation)
8. [Monetization Model](#8-monetization-model)
9. [Technical Requirements](#9-technical-requirements)
10. [Success Metrics & Analytics](#10-success-metrics--analytics)
11. [Roadmap Phases](#11-roadmap-phases)
12. [Risk Assessment](#12-risk-assessment)
13. [Open Questions & Dependencies](#13-open-questions--dependencies)
14. [Appendix: AI Prompt Engineering Standards](#14-appendix-ai-prompt-engineering-standards)

---

## 1. Executive Summary

FinFlow AI is a next-generation financial intelligence platform that transforms how retail and professional investors consume market data. By integrating directly with Telegram — where traders already communicate — we eliminate friction and deliver institutional-grade analytics through conversational AI. The platform serves as a 24/7 autonomous agent monitoring global markets (stocks, commodities, precious metals, forex) and proactively surfacing alpha-generating opportunities.

### Core Value Proposition

> *Democratize institutional-quality financial analysis by combining real-time market data, generative AI reasoning, and ubiquitous messaging infrastructure.*

### Why Now?

- **500M+ Telegram users** already use the platform for financial discussions, trading groups, and signal channels — FinFlow meets users where they already are.
- **LLM inference costs have dropped 10x** in 18 months, making real-time AI analysis economically viable at retail price points.
- **Retail investor TAM is expanding** in emerging markets where Bloomberg/Reuters are inaccessible, creating a greenfield opportunity.
- **Existing solutions are fragmented** — traders cobble together TradingView + Twitter + Discord + newsletters. FinFlow unifies this.

### Problem Statement

Retail traders lack access to the real-time, contextualized, cross-asset analysis that institutional desks take for granted. They miss moves, over-trade on noise, and lack the analytical infrastructure to systematically improve. FinFlow closes this gap.

---

## 2. Market Opportunity & User Personas

### 2.1 Market Sizing

| Market | Size | FinFlow Addressable |
|--------|------|---------------------|
| Global retail trading accounts | ~500M | Telegram-active subset (~50M) |
| Financial information services (TAM) | $34B | SaaS/mobile-first slice (~$4B) |
| Crypto/TradFi crossover users | ~80M | Active traders (~15M) |

### 2.2 Target Segments

| Segment | Description | Pain Points | Value Received |
|---------|-------------|-------------|----------------|
| **Active Retail Traders** | 25–40, self-directed, use Robinhood/IBKR | Information overload, no 24/7 monitoring | Curated alerts, AI-synthesized news |
| **Side-Hustle Investors** | 30–50, employed full-time, invest passively | Miss opportunities while working, analysis paralysis | Digestible evening summaries, clear entry/exit signals |
| **Emerging Market Operators** | Global users in LATAM, SE Asia, Africa | Limited Bloomberg/Reuters access, high data costs | Free tier with essential data, local market coverage |
| **Crypto-Native Crossover** | DeFi participants diversifying into TradFi | Unfamiliar with traditional market mechanics | Familiar chat interface, technical analysis parity |

### 2.3 Primary User Persona: "Momentum Mike"

```
Name:       Mike R.
Age:        32
Occupation: Software Engineer
Portfolio:  $50K actively managed
Trade Freq: 5–10x monthly, checks portfolio 3x daily

Current Workflow:
  Bloomberg TV → Twitter/X → TradingView → Discord groups

Core Frustration:
  "I miss breakout moves because I'm in meetings. I want something
   that watches for me and explains *why* something is moving."

FinFlow Solution:
  Custom alert agents that ping him in Telegram with context +
  AI-generated trade thesis — while he's heads-down at work.
```

### 2.4 Secondary Persona: "Emerging Market Elena"

```
Name:       Elena S.
Age:        28
Location:   São Paulo, Brazil
Portfolio:  $8K in local equities + crypto
Access:     No Bloomberg, limited English financial media

Core Frustration:
  "Most good financial analysis tools cost $300/month or are
   only focused on US markets. I invest in Brazil AND the US."

FinFlow Solution:
  Free tier with multi-market coverage, Portuguese-language
  AI summaries, local macro calendar integration.
```

---

## 3. Product Vision & North Star Metrics

### Vision

> Become the default AI co-pilot for the 500M+ global retail investor community by 2028.

### North Star Metric

**Weekly Active Alert Interactions (WAAI)** — users who receive, meaningfully engage with, or act upon AI-generated alerts in a given week.

*Rationale: WAAI captures both delivery (alert sent) and value realization (user engaged), making it a leading indicator of retention and conversion.*

### Supporting KPIs

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Day 7 Retention | > 40% | Cohort analysis (PostHog) |
| Day 30 Retention | > 20% | Cohort analysis |
| Alerts-to-Trade Conversion | > 15% | Self-reported via in-app tracking |
| Free-to-Paid Conversion | > 8% | Subscription events |
| Average Weekly Session Frequency | 4.2x | Telegram + web sessions |
| AI Response Satisfaction | > 75% 👍 rate | In-chat thumbs up/down |
| Alert Delivery Latency (p95) | < 30 seconds | Infrastructure monitoring |

### Anti-Goals (What We Are Not Building)

- **Brokerage / trade execution** — FinFlow is intelligence-only; we do not hold user funds or place trades.
- **Social trading / copy-trading platform** — We surface ideas, not a leaderboard to follow.
- **Full-featured charting platform** — TradingView exists; we embed lightweight charts contextually.
- **Investment advisory** — All outputs are explicitly educational, not regulated advice.

---

## 4. Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                         │
│   React + Vite SPA (Dashboard, Configuration, Analytics)    │
│   Telegram Mini App (Embedded trading view, quick actions)  │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                     SUPABASE BACKEND                        │
│  • Auth         (Telegram OAuth, Magic Link)                │
│  • PostgreSQL   (User prefs, Alert history, Watchlists)     │
│  • Realtime     (Live price streaming via Edge Functions)   │
│  • pgvector     (Semantic memory for conversation context)  │
│  • Storage      (User-generated charts, exported reports)   │
│  • Edge Funcs   (Telegram bot handlers, AI orchestration)   │
└──────────────┬───────────────────┬──────────────────────────┘
               │                   │
    ┌──────────▼───────┐  ┌────────▼──────────────────────────┐
    │    INTEGRATIONS  │  │         AI/LLM ENGINE             │
    │                  │  │  • Primary:   Groq (Llama 3.3 70B)│
    │  Market Data:    │  │  • Secondary: OpenRouter           │
    │  • Yahoo Finance │  │  • Research:  Perplexity Sonar Pro │
    │  • Alpha Vantage │  │  • Fallback:  Ollama (local LLM)  │
    │  • ForexFeed     │  └───────────────────────────────────┘
    │  • EDGAR (SEC)   │
    │  • Binance WS    │  ┌───────────────────────────────────┐
    │  • Trading Econ. │  │        TELEGRAM LAYER             │
    │  • Reddit/X feeds│  │  • Bot API (alerts, commands)     │
    └──────────────────┘  │  • Mini App (rich UI embeds)      │
                          │  • Payments (Stars / Stripe)      │
                          └───────────────────────────────────┘
```

### 4.1 Data Flow: Alert Generation

```
Cron / Webhook Trigger
        │
        ▼
Market Data Ingestion (Edge Function)
        │
        ▼
Signal Detection Engine (rule + ML scoring)
        │
  Confidence ≥ threshold?
        │ YES
        ▼
AI Analysis Pipeline (Groq → format → enrich)
        │
        ▼
Cache Check (pgvector similarity — serve if < 6h old)
        │
        ▼
Alert Formatter (style: concise / standard / deep dive)
        │
        ▼
Telegram Bot API → User delivery (< 30s SLA)
        │
        ▼
Outcome tracking record created (pending user feedback)
```

---

## 5. Feature Specifications

### 5.1 Multi-Asset Intelligence Engine

**Description:** Unified AI analysis across equities, commodities, metals, and FX, with asset-class-specific prompt engineering.

#### Supported Asset Classes

| Asset Class | Data Inputs | AI Analysis Focus | Alert Types |
|-------------|-------------|-------------------|-------------|
| **Stocks** | Price, volume, fundamentals, earnings calendar, options flow | Earnings surprise prediction, breakout patterns, sentiment divergence | Earnings prep, breakout, unusual options activity |
| **Commodities** | Futures curves, inventory reports (EIA, USDA), weather data | Supply/demand imbalance, contango/backwardation | Inventory shock, weather disruption, curve inversion |
| **Precious Metals** | Spot, ETF flows, real yields, USD correlation | Safe-haven detection, Fed policy impact | Correlation breakdown, flow anomalies, macro regime shift |
| **Forex** | Spot, COT reports, CB calendar, macro surprises | Carry trades, intervention risk, divergence | CB policy divergence, positioning extremes, vol expansion |

#### AI Provider Strategy (Cost-Optimized)

| Role | Provider | Model | Est. Cost | Rationale |
|------|----------|-------|-----------|-----------|
| **Primary inference** | Groq | Llama 3.3 70B | $0.59/M tokens | Best cost/performance, 1000+ TPS |
| **Specialized tasks** | OpenRouter | Model routing | Variable | Flexibility for specific use cases |
| **Web-grounded research** | Perplexity | Sonar Pro | Pay-per-query | Real-time web context for news analysis |
| **Fallback / cost control** | Ollama (self-hosted) | Mistral 7B | ~$0 (compute only) | Zero API cost, higher latency acceptable |

#### Caching Strategy

- All AI analyses stored with vector embeddings in `supabase/pgvector`
- Similarity search before new generation: if identical market regime analyzed within 6 hours → serve cache
- Estimated cache hit rate target: 40–60% during high-traffic periods, reducing AI costs proportionally

---

### 5.2 Autonomous Alert Agent System

**Description:** User-configurable AI agents that monitor markets continuously and deliver contextual intelligence via Telegram — even when the user is offline.

#### Agent Configuration Schema

```
AGENT BUILDER MODULE
├── Market Scope
│   ├── Watchlist (max 50 symbols free / 200 paid)
│   ├── Asset class mix (Stocks / Commodities / FX / Metals / Crypto)
│   └── Geographic focus (Global / US / EU / APAC / EM)
│
├── Signal Types (Multi-select)
│   ├── Technical   (breakouts, pattern completion, MA crosses)
│   ├── Fundamental (earnings beats, economic data, guidance changes)
│   ├── Sentiment   (social volume spikes, fear/greed extremes)
│   ├── Macro       (yield curve shifts, USD index, VIX regime)
│   └── Custom      (natural language description, AI-interpreted)
│
├── Alert Frequency
│   ├── Real-time   (immediate push, max 10/day on free tier)
│   ├── Digest      (3x daily: Asia close, London close, NY close)
│   └── Threshold   (only when AI confidence > user-defined %)
│
├── Delivery Style
│   ├── Concise    (emoji + price + 1-sentence thesis)
│   ├── Standard   (thesis + 3 supporting bullets)
│   └── Deep Dive  (full analysis with risk management framework)
│
└── Risk Filters
    ├── Max position size threshold
    ├── Volatility ceiling (suppress alerts if VIX > X)
    └── Correlation limits (skip if portfolio already exposed)
```

#### Alert Message Format (Telegram)

```
🚨 [BREAKOUT ALERT] NVDA $875.40 (+4.2%)

📊 AI Confidence: 87% | Technical + Earnings Momentum

🎯 THESIS:
NVIDIA breaking ascending triangle ahead of GTC keynote.
Volume 2.3x average. Options market pricing 8% move.

📈 KEY LEVELS:
• Entry:  $872 (confirmed break)
• Target: $920 (measured move)
• Stop:   $845 (below 20EMA)

⚠️ RISK FACTORS:
• Broad market VIX elevated (22.4)
• Semis sector showing divergence (SMH -1.2%)

[View Chart]  [Set Reminder]  [Paper Trade]

⚖️ For educational purposes only. Not investment advice.
```

#### Agent Templates (Pre-built)

| Template | Strategy | Primary Signals |
|----------|----------|-----------------|
| 🚀 The Breakout Hunter | Technical momentum | Price/volume breakouts, MA crosses |
| 🔄 The Contrarian | Mean reversion | Oversold RSI, capitulation volume |
| 🌍 The Macro Tourist | FX / commodities regime | CB policy divergence, yield spreads |
| 📅 The Earnings Player | Event-driven vol | IV rank, earnings surprise history |
| 🥇 The Safe Haven Watcher | Risk-off / metals | Gold/USD/VIX correlations |

---

### 5.3 Conversational Intelligence Interface

**Description:** Natural language market research through Telegram chat with persistent multi-turn context powered by vector memory.

#### Conversation Capabilities

| Query Type | Example Prompt | AI Response Structure |
|------------|---------------|----------------------|
| **Asset Deep Dive** | "Analyze copper's supply outlook" | Supply chain → Inventory trajectory → Price implications → Key levels |
| **Comparative Analysis** | "XLE vs OXY for energy exposure?" | Factor decomposition → Correlation matrix → Vol-adjusted return potential |
| **Scenario Planning** | "What happens to gold if CPI prints 0.4%?" | Scenario tree → Probability-weighted outcomes → Positioning |
| **Portfolio Context** | "Am I overexposed to tech?" | Upload portfolio → Sector decomp → Concentration risk → Hedge suggestions |
| **Historical Pattern** | "Show me similar setups to current TSLA" | Pattern match → Analog years → Outcome distribution |
| **Quick Lookup** | "What's the 10Y yield right now?" | Direct data response, sourced |

#### Context Memory Architecture

- Supabase stores all conversation threads with `pgvector` embeddings
- Semantic recall supports long-horizon queries: *"What was that uranium stock you mentioned last month?"*
- RAG pipeline retrieves relevant prior context before generating responses
- Memory scoped per-user; shared context for market data (efficiency)
- **Privacy:** Users can purge conversation history at any time from settings

---

### 5.4 Opportunity Radar

**Description:** Proactive AI-curated trade ideas based on cross-asset screening and macro regime detection. Delivered as a daily Morning Briefing push + real-time flashes for high-conviction setups.

#### Radar Categories

| Category | Description | Example |
|----------|-------------|---------|
| 🚀 **Momentum Surge** | Assets gaining traction across social, technical, and flow metrics | Small-cap biotech with unusual options + social spike |
| 🔄 **Mean Reversion** | Oversold quality names with imminent catalyst | Blue-chip at 52W low before earnings |
| 🌐 **Macro Inflection** | Assets positioned for regime change | Gold ahead of Fed pivot signals |
| 📅 **Event-Driven** | Earnings / CB plays with mispriced volatility | Low IV rank stock pre-earnings |
| ⚖️ **Cross-Asset Arbitrage** | Dislocations between correlated instruments | Brent/WTI spread at historical extreme |

#### Morning Briefing Format

Delivered daily at 7:00 AM user's local time:

```
☀️ FinFlow Morning Briefing — [Date]

🌍 MARKET REGIME: Risk-On (Confidence: 72%)
  S&P Futures: +0.4% | VIX: 18.2 (↓) | DXY: 103.4 (↓)

🔥 TOP 3 OPPORTUNITIES TODAY:
  1. [MACRO] Gold — Safe-haven bid building, see details
  2. [BREAKOUT] SMCI — Cup-and-handle on daily, 89% confidence
  3. [EVENT] ECB decision today — EUR/USD key levels

📅 CALENDAR:
  08:30 ET — US PPI
  14:15 ET — ECB Rate Decision
  16:00 ET — EIA Crude Inventories

[View Full Briefing] [Customize]
```

---

### 5.5 Performance Intelligence & AI Coaching

**Description:** Post-trade analysis and behavioral analytics to systematically improve user decision-making quality over time.

#### Tracking Metrics

- Alert-to-trade latency (how quickly users act)
- Win rate by alert type, asset class, time of day
- Risk/reward realization vs. AI suggestion
- Behavioral bias detection (FOMO chasing, premature exits, overconcentration)
- Opportunity cost tracking (ignored alerts that subsequently triggered)

#### AI Coaching Reports

**Weekly "Trading Psychology Report"** identifies patterns in execution vs. recommendations:

```
📊 WEEKLY COACHING REPORT

Your Alert Engagement: 23 alerts → 7 acted on → 4 profitable (57% win rate)

🔍 PATTERN DETECTED:
You consistently act faster on tech alerts (+3 min avg) than on
commodities alerts (+18 min avg). Commodities alerts have your
highest win rate (71%). Slowing down on tech may improve outcomes.

⚠️ BIAS ALERT:
3 of your 4 losses this week were "FOMO re-entries" — buying back
after you initially sold. Consider adding a 1-hour cooling period rule.

🏆 THIS WEEK'S BEST IGNORED ALERT:
BTC breakout (Mon 9:14 AM) +12.4% in 48h. You opened it but didn't act.
```

---

## 6. Screen Specifications

### 6.1 Screen: Onboarding & Telegram Connection

**Purpose:** Frictionless account creation and bot authorization in under 2 minutes.

**Flow:**

```
Step 1: Landing
  • Hero: "Your 24/7 AI Market Analyst, in Telegram"
  • 3 benefit callouts with animated icons
  • CTA: "Get Started Free"

Step 2: Telegram Connection
  • Telegram OAuth button (deep link to @FinFlowAIBot)
  • QR code option for desktop users
  • Phone number auto-detect on mobile
  • Privacy note: "We only access your Telegram ID, never messages"

Step 3: Asset Class Selection
  • Toggle cards: Stocks | Commodities | Precious Metals | FX | Crypto
  • "Mix" option for multi-asset users
  • Skip → AI learns from behavior

Step 4: Watchlist Import
  • Search + add symbols
  • Popular tickers by category (pre-populated)
  • CSV import for existing watchlists
  • Skip → start with empty watchlist

Step 5: Alert Style Preference
  • Conservative (3 alerts/day, deep dive format)
  • Balanced (10 alerts/day, standard format)
  • Aggressive (unlimited, concise format)
  • Skip → defaults to Balanced

Completion:
  ✅ First AI-generated "Market Snapshot" delivered in Telegram
  ✅ Dashboard link sent
  ✅ Quick-start guide with 3 first commands
```

**Success Metric:** Onboarding completion rate > 65% (Step 1 → first Telegram alert).

---

### 6.2 Screen: Command Center Dashboard

**Purpose:** Central hub for monitoring all active intelligence streams. Default landing screen post-onboarding.

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                     │
│  Portfolio Pulse (P&L if connected) | Market Regime Badge  │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │
│  │  ACTIVE       │  │  TODAY'S      │  │  AGENT        │   │
│  │  ALERTS  (3)  │  │  OPPS    (7)  │  │  STATUS  🟢   │   │
│  └───────────────┘  └───────────────┘  └───────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  [ Watchlist ]  [ Radar ]  [ Agents ]  [ History ]  [ Learn]│
├─────────────────────────────────────────────────────────────┤
│  WATCHLIST (Default Tab)                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ SYMBOL │  PRICE  │ CHANGE │ AI SIGNAL  │ AGENT     │   │
│  │ AAPL   │  $185   │ +1.2%  │ 🟢 Bullish │ Active    │   │
│  │ GC=F   │  $2034  │ -0.4%  │ 🟡 Neutral │ Pending   │   │
│  │ EURUSD │  1.085  │ +0.2%  │ 🔴 Bearish │ Active    │   │
│  │ CL=F   │  $78.4  │ +0.8%  │ 🟢 Bullish │ — (off)   │   │
│  └─────────────────────────────────────────────────────┘   │
│  [ + Add Symbol ]  [ Import Portfolio ]  [ AI Screen ]     │
├─────────────────────────────────────────────────────────────┤
│  BOTTOM NAV                                                 │
│  💬 Quick Ask: "Ask FinFlow anything..."          [Send ↑] │
└─────────────────────────────────────────────────────────────┘
```

**Interactions:**
- **Swipe left** on asset row → Quick actions (Alert Me / Deep Dive / Remove)
- **Pull to refresh** → Updates with AI commentary on changes since last visit
- **Long press row** → Asset detail modal with mini-chart and AI summary
- **AI Screen button** → Natural language screener ("Show me oversold large-caps near support")

---

### 6.3 Screen: Asset Intelligence Deep Dive

**Purpose:** Comprehensive single-asset analysis with AI-generated narrative, charts, and actionable levels.

**Sections:**

1. **Price Action Header** — Real-time chart (TradingView Lightweight Charts) with AI-annotated key levels (support, resistance, pattern targets)
2. **AI Regime Panel** — Current classification: `Trending ↑ / Ranging / Volatile / Distribution` with confidence score and last-updated timestamp
3. **Multi-Timeframe Analysis** — Daily / Weekly / Monthly AI summaries with alignment score (e.g., "2/3 timeframes bullish")
4. **Fundamental Snapshot** — Key metrics vs. 5-year history; upcoming events calendar (earnings, dividends, macro releases)
5. **Sentiment Composite** — Aggregated: news sentiment score, social volume trend, options skew (put/call), institutional flow proxy
6. **Related Opportunities** — Correlated assets showing divergence (e.g., "XOM up 2% while OXY flat — divergence alert")
7. **AI Forecast** — Probabilistic price path: Bull / Base / Bear scenarios with probability weights and key catalysts

**Design Notes:**
- Dark mode default (trader-friendly, reduces eye strain)
- Heat map for sentiment indicators
- Animated transitions when regime classification changes
- Disclaimer banner persistent on AI Forecast section

---

### 6.4 Screen: Agent Builder

**Purpose:** Visual, no-code configuration of autonomous monitoring agents.

**Layout:**

```
┌──────────────┬──────────────────────────────┬────────────────┐
│  AGENT LIST  │     VISUAL WORKFLOW CANVAS   │  BACKTEST PANE │
│              │                              │                │
│  🤖 Agent 1  │  [Trigger] → [Condition] →  │ "Would have    │
│  🤖 Agent 2  │  [Analysis] → [Action]      │  triggered     │
│  + New       │                              │  14x last 30d" │
│              │  Drag-and-drop nodes         │                │
│  Templates:  │  IFTTT-style builder         │  [Timeline of  │
│  • Breakout  │                              │   past alerts] │
│  • Contrarian│                              │                │
│  • Earnings  │                              │  Precision: 71%│
│  • Macro     │                              │  Recall:   84% │
└──────────────┴──────────────────────────────┴────────────────┘
```

**Node Types:**

| Node Category | Examples |
|---------------|---------|
| **Trigger** | Price crosses level, % move in session, volume spike, news keyword detected |
| **Condition** | Only during market hours, VIX < 20, not within 48h of earnings |
| **Analysis** | Run AI thesis generation, check sector alignment, evaluate options flow |
| **Action** | Send Telegram alert, log to history, create paper trade, notify group channel |

**Backtest Panel (Right):**
- Run agent logic against last 30 days of data
- Shows would-have-triggered alerts on a timeline
- Reports precision (alerts that were "correct") and recall (moves the agent would have caught)
- Helps users calibrate sensitivity before going live

---

### 6.5 Screen: Opportunity Detail

**Purpose:** Full context for AI-curated trade ideas from the Opportunity Radar.

**Sections:**

- **Conviction Meter** — Visual gauge (0–100%) with component breakdown:
  - Technical: 30% | Fundamental: 25% | Sentiment: 20% | Macro: 15% | Flow: 10%
- **AI Thesis** — 3-paragraph narrative with embedded mini-charts and supporting data points
- **Risk Framework** — Suggested max position size, portfolio correlation impact, tail-risk scenarios
- **Execution Checklist** — Entry triggers, position sizing calculator (based on user's self-reported portfolio size), stop management guide
- **Community Pulse** — Anonymous poll: "Other FinFlow users on this setup: 62% Bullish / 21% Bearish / 17% Watching"
- **Paper Trade Button** — One-tap simulation entry with automatic outcome tracking

**Important:** Community Pulse is display-only. FinFlow does not facilitate copy-trading or group positions.

---

### 6.6 Screen: Alert History & Performance

**Purpose:** Review past intelligence, measure AI accuracy, and identify personal behavioral patterns.

**Features:**

- Filterable timeline of all alerts received (by asset, type, confidence, outcome)
- Outcome logging: user marks each alert as **Ignored / Watched / Acted / Acted + Outcome**
- AI accuracy dashboard broken down by signal type and asset class
- Personal behavioral analytics (section feeds into the AI Coaching report)
- Export to CSV for external analysis
- **"Replay Market" mode** — Scrub back through historical alerts overlaid on subsequent price action; visually see whether alerts were "correct"

---

### 6.7 Screen: Telegram Mini App

**Purpose:** Rich UI interactions embedded natively within Telegram — no context switching required.

**Capabilities:**

- Quick chart view with AI key-level annotations
- Position logging (track actual trades against alerts for performance attribution)
- Voice-to-text queries ("Hey FinFlow, what's happening with oil?")
- Mini dashboard showing top 3 most relevant alerts in real time
- Social sharing: anonymized trade idea sharing to public FinFlow Telegram channel (opt-in)
- Inline keyboard buttons on alerts for one-tap actions (Paper Trade, Set Reminder, View Chart)

**Mini App Technical Notes:**
- Built with Telegram Web App JS SDK
- Communicates with Supabase via Telegram-authenticated API calls
- Offline-capable for recent alert history (service worker cache)

---

## 7. Data Strategy & AI Implementation

### 7.1 Market Data Architecture

| Data Type | Source | Update Frequency | Cost |
|-----------|--------|------------------|------|
| US Equities (delayed) | Yahoo Finance | 15-min delay | Free |
| US Equities (real-time) | Alpha Vantage Premium | Per-request | Paid tier |
| Crypto spot + pairs | Binance API (WebSocket) | Real-time | Free |
| Forex rates | ForexFeed / Open Exchange Rates | 1-hour | Free tier |
| Economic calendar | Trading Economics API | Daily updates | Free tier |
| News & web context | Perplexity Sonar Pro | On-demand (cached) | Pay-per-use |
| SEC filings | EDGAR direct API | Real-time | Free |
| Social sentiment | Reddit API + X/Twitter scraper | 15-min | Self-hosted |
| Futures curves | Yahoo Finance (commodities) | 15-min delay | Free |

**Data Quality SLAs:**
- Missing data triggers fallback source, not silent failure
- Stale data (> 2x normal update interval) surfaces a user-visible freshness warning
- Data anomaly detection (price jumps > 20% in < 1 min) triggers validation before alert dispatch

### 7.2 AI Intelligence Tiers

| Tier | Models Used | Request Limit | Latency Target |
|------|------------|---------------|----------------|
| **Free** | Ollama local (Mistral 7B) | Quota-managed | < 8s |
| **Freemium** | Groq Llama 3.3 70B | 50 requests/day | < 3s |
| **Pro** | Groq + Perplexity Sonar mix | Unlimited | < 3s |
| **Alpha** | All models + custom fine-tuning | Unlimited + priority | < 2s |

### 7.3 Prompt Engineering Pipeline

All AI outputs follow the **FICC** output standard:

```
F — Facts:          Observable market data only (sourced, timestamped)
I — Interpretation: AI reasoning, clearly labeled as AI analysis
C — Confidence:     Numerical score (0–100%) with methodology
C — Caveats:        Explicit limitations, alternative scenarios, disclaimers
```

Asset-class-specific prompt packs are maintained in a versioned prompt library in Supabase. Prompt versions are tracked; A/B testing runs automatically across 10% of requests for continuous improvement.

---

## 8. Monetization Model

### 8.1 Pricing Tiers

| Tier | Price | Core Limits | Key Differentiators |
|------|-------|-------------|---------------------|
| **Free** | $0/mo | 3 agents, 10 alerts/day, 50 watchlist items, 24h history | Enough to experience core value; clear upgrade triggers |
| **Pro** | $19/mo | 10 agents, unlimited alerts, 200 watchlist, full history | Advanced AI (Perplexity), priority data, performance analytics |
| **Alpha** | $49/mo | Unlimited agents + watchlist, API access | Custom data sources, portfolio integration, 1:1 AI fine-tuning |
| **Institutional** | Custom | Unlimited everything | White-label, team collaboration, compliance audit trails, SLAs |

### 8.2 Upgrade Trigger Moments (In-Product)

- Free user hits 10-alert daily limit → "You have 0 alerts remaining today. Upgrade to Pro for unlimited."
- Free user tries to add 51st watchlist item → Upgrade prompt
- Free user tries to create 4th agent → Upgrade prompt
- Free user's history expires (> 24h) → "This alert was from 3 days ago. Upgrade to access full history."
- After a high-confidence alert that performs → "This alert was 91% accurate. Pro users get 5x more of these daily."

### 8.3 Revenue Projections (Year 1)

| Scenario | MAU | Free/Pro Split | MRR |
|----------|-----|----------------|-----|
| Conservative | 5,000 | 94% / 6% | ~$5,700 |
| Base | 20,000 | 92% / 8% | ~$30,400 |
| Optimistic | 60,000 | 90% / 10% | ~$114,000 |

*Assumptions: Average blended ARPU of Pro+Alpha ~$24/mo. Institutional adds upside.*

---

## 9. Technical Requirements

### 9.1 Performance SLAs

| Operation | Target | Measurement |
|-----------|--------|-------------|
| Alert delivery (trigger → Telegram) | < 30 seconds (p95) | Edge Function instrumentation |
| Dashboard initial load | < 2 seconds | Lighthouse / RUM |
| Dashboard subsequent navigation | < 500ms | RUM |
| AI standard query response | < 3 seconds | API latency logs |
| AI deep research response | < 8 seconds | API latency logs |
| Platform uptime | 99.9% | Uptime Robot + PagerDuty |

### 9.2 Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | React 18 + Vite | Fast builds, great DX, Telegram Mini App compatible |
| Styling | Tailwind CSS + shadcn/ui | Rapid UI development, accessible components |
| Charts | TradingView Lightweight Charts | Free, performant, industry-standard look |
| Backend | Supabase (Postgres + Edge Functions) | Auth, DB, realtime, vector store in one platform |
| AI Inference | Groq (primary) + Ollama (fallback) | Cost-optimized, fast inference |
| Bot | Telegraf.js on Supabase Edge Functions | Webhook-based, serverless, zero idle cost |
| Caching | Supabase pgvector + Redis (optional) | Semantic + key-value caching layers |
| Monitoring | PostHog (product) + Sentry (errors) | Full observability stack |
| Deployment | Vercel (frontend) + Supabase Cloud | Auto-scaling, global CDN |

### 9.3 Security & Compliance

- **No brokerage credentials stored** — read-only portfolio import via Plaid (optional, user-initiated)
- **Data encryption** — AES-256 at rest (Supabase), TLS 1.3 in transit
- **Telegram data** — Only Telegram user ID and username stored; no message content from other chats
- **GDPR / CCPA** — Data deletion endpoint, export endpoint, privacy policy in onboarding
- **FINRA / SEC disclaimer** — "For educational and informational purposes only. Not investment advice." on all AI outputs; cannot be dismissed permanently
- **Rate limiting** — All API endpoints rate-limited; bot commands throttled per-user to prevent abuse

### 9.4 Scalability Plan

| Scale Milestone | Infrastructure Change |
|----------------|-----------------------|
| 0–10K MAU | Supabase Free/Pro, Vercel Hobby/Pro — no changes needed |
| 10K–100K MAU | Supabase Business (read replicas), Redis caching layer, Groq enterprise |
| 100K+ MAU | Multi-region Supabase, Cloudflare Workers for bot layer, dedicated AI inference |

---

## 10. Success Metrics & Analytics

### 10.1 Product Analytics (PostHog)

| Metric | How Measured |
|--------|-------------|
| Feature adoption — Agent builder completion | Funnel: Agent Builder opened → first agent saved |
| Alert engagement rate | Telegram alert sent / Telegram link clicked |
| Deep dive usage | Asset detail screen views per session |
| Conversation depth | Average turns per AI conversation session |
| Retention cohorts (D1/D7/D30) | User cohort analysis by signup week |

### 10.2 AI Performance Metrics

| Metric | Target | Method |
|--------|--------|--------|
| Alert accuracy (user-reported) | > 55% profitable (informed by efficient market caveats) | User outcome logging |
| Query satisfaction (👍 / 👎) | > 75% positive | In-chat rating |
| Hallucination rate | < 2% of audited responses | Weekly human review (10% sample) |
| Cache hit rate | > 40% | Edge Function logs |

### 10.3 Business Metrics

| Metric | Target |
|--------|--------|
| CAC (Telegram organic) | < $5 |
| CAC (paid acquisition) | < $25 |
| LTV / CAC ratio | > 3x |
| Net Revenue Retention | > 120% (expansion from tier upgrades) |
| Referral rate | > 15% of new signups from referrals |

---

## 11. Roadmap Phases

### Phase 1 — Foundation (Months 1–2)
**Goal:** Working product with core alert functionality. Validate user demand.

- [ ] Telegram bot setup with `/start`, `/alert`, `/price`, `/analyze` commands
- [ ] Basic price alerts (threshold-based) for stocks + major FX
- [ ] Single-agent configuration (simplified, no visual builder)
- [ ] Groq LLM integration for alert enrichment
- [ ] Supabase backend (auth, user prefs, alert history)
- [ ] Simple React dashboard (watchlist + alert history)
- [ ] Free tier only — focus on user acquisition, no payment infra yet
- [ ] 50 beta users recruited

**Success Criteria:** 50 beta users, D7 retention > 30%, at least 5 user interviews completed.

---

### Phase 2 — Intelligence Layer (Months 3–4)
**Goal:** Full multi-asset coverage, Web dashboard launch, first revenue.

- [ ] Multi-asset support: commodities (EIA/USDA data), precious metals, expanded FX
- [ ] Agent Builder v1 (form-based, not visual canvas yet)
- [ ] Web dashboard full release (all screens from Section 6)
- [ ] Pro tier launch ($19/mo via Stripe or Telegram Payments)
- [ ] Perplexity Sonar integration for news-grounded alerts
- [ ] Conversation memory (pgvector + RAG)
- [ ] Morning Briefing daily push feature
- [ ] Performance tracking + basic coaching report

**Success Criteria:** 500 MAU, 40 paying users (8% conversion), MRR > $800.

---

### Phase 3 — Autonomy (Months 5–6)
**Goal:** Predictive capabilities, portfolio integration, social features.

- [ ] Visual Agent Builder (node-based canvas with backtest panel)
- [ ] Predictive alerts (pre-move detection via volume/options leading indicators)
- [ ] Portfolio context integration (Plaid read-only import)
- [ ] Paper trading simulation with performance tracking
- [ ] Social sentiment data (Reddit + X feeds)
- [ ] Weekly Trading Psychology AI Coaching Report
- [ ] Alpha tier launch ($49/mo)

**Success Criteria:** 2,000 MAU, 160+ paying users, NPS > 40.

---

### Phase 4 — Ecosystem (Months 7–12)
**Goal:** Platform maturity, Telegram Mini App, community, institutional pipeline.

- [ ] Telegram Mini App full feature parity with web dashboard
- [ ] Community features (opt-in anonymous alpha sharing, public FinFlow channel)
- [ ] Developer API (Alpha tier + paid add-on)
- [ ] Institutional tier with white-label and compliance features
- [ ] Multi-language support (Spanish, Portuguese, Bahasa as priority)
- [ ] Mobile app wrapper (React Native or Capacitor)
- [ ] Series of educational content (Learn tab)

**Success Criteria:** 10,000 MAU, MRR > $30K, first institutional client signed.

---

## 12. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| AI hallucination causes user losses | Medium | High | Mandatory disclaimers, confidence thresholds, human-in-loop for high-conviction; clear "educational only" framing |
| Market data feed interruption | Medium | High | Multi-source redundancy (Yahoo → Alpha Vantage fallback); graceful degradation to delayed data with user-visible notice |
| Telegram API policy changes | Low | High | Abstraction layer isolating Telegram-specific code; fallback delivery via email/SMS in user prefs |
| Regulatory scrutiny (investment advice) | Medium | High | No execution capabilities, no personalized recommendations framed as advice, legal review before launch |
| AI cost overruns | High | Medium | Aggressive caching strategy, local LLM fallback, per-user quotas, cost dashboards with auto-alerts |
| Low Day 7 retention | Medium | High | Onboarding optimization, first-alert value delivery within 5 min, re-engagement sequences |
| Data quality issues surfaced in alerts | Medium | High | Validation pipeline before alert dispatch; anomaly detection; user reporting mechanism |
| Competition from well-funded players | High | Medium | Focus on Telegram-native UX and emerging market accessibility; move fast on niche wedge |

---

## 13. Open Questions & Dependencies

### Open Questions (Need Resolution Before Phase 1 Build)

| # | Question | Owner | Target Resolution |
|---|----------|-------|-------------------|
| 1 | Which Groq model for primary inference — Llama 3.3 70B vs. newer releases? | Tech Lead | Sprint 1 |
| 2 | Telegram Payments vs. Stripe for subscription billing? | PM + Finance | Sprint 1 |
| 3 | Do we need legal review before beta launch given financial content? | PM + Legal | Pre-launch |
| 4 | Free tier real-time vs. 15-min delayed data — user research needed | PM + UX | End of Month 1 |
| 5 | Self-hosting Ollama on Supabase Edge Functions — feasibility confirmed? | Tech Lead | Sprint 1 |
| 6 | What's the minimum viable Morning Briefing format for Phase 2? | PM + UX | Month 2 |

### External Dependencies

- Telegram Bot API stability and Mini App SDK maturity
- Groq API availability and enterprise pricing negotiation
- Alpha Vantage real-time tier pricing for scale
- Perplexity Sonar API rate limits at scale
- Supabase pgvector performance at 10K+ user embedding scale

---

## 14. Appendix: AI Prompt Engineering Standards

### FICC Output Standard

All AI-generated content must conform to the **FICC** structure:

```
F — FACTS
    Observable market data only. Must include source and timestamp.
    Example: "AAPL closed at $185.40 (+1.2%) on Feb 19, 2026 [Yahoo Finance]"

I — INTERPRETATION
    AI reasoning, clearly labeled. Hedged language required.
    Example: "This price action suggests [analysis], though this is AI-generated
    interpretation and should not be treated as financial advice."

C — CONFIDENCE
    Numerical score (0–100%) with brief methodology explanation.
    Example: "Confidence: 74% — based on technical pattern completion (40%),
    volume confirmation (30%), and sector alignment (30%)"

C — CAVEATS
    Explicit limitations and at least one alternative scenario.
    Example: "This analysis assumes continued risk-on sentiment. A broader
    market selloff could invalidate this setup."
```

### Mandatory Disclaimer (All AI Outputs)

> ⚖️ *FinFlow AI provides financial information for educational purposes only. Nothing herein constitutes investment advice, a solicitation, or a recommendation to buy or sell any security. Past performance is not indicative of future results. Always consult a qualified financial advisor before making investment decisions.*

### Prompt Versioning

- All prompts stored in `supabase/prompts` table with version, asset class, and output type tags
- Changes to prompts require PM approval and must pass automated output quality tests before deployment
- A/B testing: 10% of requests routed to "challenger" prompts; winners promoted after statistical significance

### Prohibited Output Types

AI responses must never:
- Provide specific buy/sell recommendations framed as personalized advice
- Make price predictions stated as certainties (e.g., "AAPL will reach $200")
- Reference specific portfolio amounts or suggest specific dollar amounts to invest
- Discuss regulated securities products (options strategies, margin) without explicit educational framing

---

## Document Control

| Field | Value |
|-------|-------|
| Author | [PM Name] |
| Engineering Review | [Engineering Lead] — *Pending* |
| Design Review | [Design Lead] — *Pending* |
| Compliance Review | [Compliance Advisor] — *Pending* |
| Executive Approval | [Sponsor] — *Pending* |
| Last Updated | February 20, 2026 |
| Next Review | March 6, 2026 |

### Immediate Next Steps

1. **Technical architecture review** with engineering lead — validate Supabase Edge Function + Ollama feasibility
2. **AI provider contract** — initiate Groq enterprise tier discussion
3. **Telegram Bot setup** — register @FinFlowAIBot via BotFather; configure Mini App domain
4. **Design system** — Figma component library based on dark trading-UI aesthetic
5. **Legal review** — financial content disclaimer language with counsel before any user-facing beta
6. **User interviews** — schedule 5–8 sessions with target personas (Momentum Mike archetype priority)
7. **Sprint 1 kickoff** — align on Phase 1 scope, velocity, and definition of done

---

*This PRD is a living document. All substantive changes require Product Owner approval and engineering re-estimation.*