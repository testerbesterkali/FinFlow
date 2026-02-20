import React from 'react'
import { cn } from '../lib/utils'
import {
    ArrowLeft,
    Target,
    Zap,
    ShieldCheck,
    TrendingUp,
    ExternalLink,
    Users,
    Compass,
    ArrowRight
} from 'lucide-react'

export default function OpportunityDetail({ opportunity, onBack }) {
    const data = opportunity || {
        symbol: 'SMCI',
        category: 'BREAKOUT',
        confidence: 89,
        thesis: 'Super Micro Computer Inc. is forming a structurally perfect high-handle breakout on the daily frame. AI server demand persists with strong forward guidance and institutional buy-side support.',
        conviction: {
            technical: 30,
            fundamental: 25,
            sentiment: 20,
            macro: 14
        }
    }

    return (
        <div className="min-h-screen bg-[#E3E9F0] text-slate-900 p-8 flex flex-col gap-12 max-w-6xl mx-auto pb-32 page-transition overflow-y-auto">
            {/* Back nav */}
            <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-black transition-all group w-fit">
                <div className="p-2 bg-white rounded-xl shadow-sm border border-white/40 group-hover:scale-110 transition-transform">
                    <ArrowLeft className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm tracking-tight">Return to Global Radar</span>
            </button>

            {/* Hero Header */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-black text-white text-[10px] font-black rounded-lg tracking-widest uppercase">High Conviction</div>
                        <span className="text-blue-600 font-bold tracking-widest text-[10px] uppercase flex items-center gap-2"><Compass size={14} /> Intelligence Alpha</span>
                    </div>
                    <h1 className="text-7xl lg:text-8xl font-black text-black tracking-tighter leading-[0.8]">{data.symbol}</h1>
                    <p className="text-xl text-slate-500 leading-relaxed font-medium">
                        {data.thesis}
                    </p>
                </div>

                <div className="premium-card bg-black text-white p-12 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-blue-500/10 blur-3xl" />
                    <div className="text-[10px] uppercase font-bold text-slate-500 mb-4 tracking-widest">AI Component Confidence</div>
                    <div className="text-[120px] font-black leading-none tracking-tighter mb-2">{data.confidence}<span className="text-blue-500 text-5xl">%</span></div>
                    <div className="px-4 py-2 bg-white/10 rounded-2xl text-xs font-bold border border-white/10">Strong Signal Authenticated</div>
                </div>
            </section>

            {/* Factor Breakdown */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 premium-card bg-white p-12 shadow-sm space-y-10">
                    <h3 className="text-2xl font-bold tracking-tight mb-8 flex items-center gap-3">
                        <TrendingUp size={24} className="text-emerald-500" /> Conviction Matrix
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {Object.entries(data.conviction).map(([key, val]) => (
                            <div key={key} className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs uppercase font-extrabold text-slate-400 tracking-widest">{key}</span>
                                    <span className="text-2xl font-black text-black">{val}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.3)] transition-all duration-1000"
                                        style={{ width: `${(val / 30) * 100}%` }}
                                    />
                                </div>
                                <div className="text-[10px] text-slate-400 font-bold leading-tight uppercase">
                                    {key === 'technical' ? 'Price structure and volume nodes confirmed' :
                                        key === 'fundamental' ? 'Forward guidance and P/E relative to peer group' :
                                            key === 'sentiment' ? 'Divergence in retail vs institutional positioning' :
                                                'Global liquidity backdrop and interest rate curve'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Risk Card */}
                    <div className="premium-card bg-rose-50 border-rose-100 p-10 space-y-6">
                        <h4 className="font-bold flex items-center gap-2 text-rose-950"><ShieldCheck size={20} className="text-rose-500" /> Execution Anchors</h4>
                        <ul className="space-y-4">
                            <CheckItem label="Confirmed daily close above $980" />
                            <CheckItem label="Institutional volume expansion >1.5x" />
                            <CheckItem label="RSI divergence verification" />
                            <CheckItem label="Stop loss authenticated at $925" />
                        </ul>
                    </div>

                    {/* Social Signal */}
                    <div className="premium-card bg-white/50 p-10 space-y-4">
                        <h4 className="font-bold text-slate-900 flex items-center gap-2"><Users size={20} className="text-indigo-500" /> Market Pulse</h4>
                        <div className="flex justify-between text-xs font-bold mb-1">
                            <span className="text-emerald-500">62% BULLISH</span>
                            <span className="text-rose-400">14% BEARISH</span>
                        </div>
                        <div className="h-4 bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
                            <div className="h-full bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]" style={{ width: '62%' }} />
                            <div className="h-full bg-slate-400" style={{ width: '24%' }} />
                        </div>
                        <p className="text-[10px] text-slate-400 italic text-center leading-tight">
                            Aggregate sentiment from institutional flows and authorized FinFlow nodes.
                        </p>
                    </div>
                </div>
            </section>

            {/* Execution Footer */}
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex gap-6 z-50">
                <button className="px-16 py-6 bg-black text-white font-black text-lg rounded-[2rem] hover:scale-105 transition-all shadow-2xl shadow-black/20 flex items-center gap-4">
                    Activate Paper Trade <ArrowRight size={24} />
                </button>
                <button className="p-6 bg-white border border-white/40 text-black rounded-[2rem] hover:bg-slate-50 transition-all shadow-xl shadow-white/10 active:scale-95">
                    <ExternalLink size={24} />
                </button>
            </div>
        </div>
    )
}

function CheckItem({ label }) {
    return (
        <li className="flex gap-3 text-xs font-bold text-rose-900">
            <div className="w-2 h-2 rounded-full bg-rose-400 mt-1 shrink-0" />
            {label}
        </li>
    )
}
