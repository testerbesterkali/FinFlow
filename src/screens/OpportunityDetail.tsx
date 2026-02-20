import React from 'react'
import { cn } from '../lib/utils'
import {
    ChevronLeft,
    Zap,
    ShieldCheck,
    TrendingUp,
    ExternalLink,
    Users,
    Compass,
    ArrowRight
} from 'lucide-react'

export default function OpportunityDetail({ opportunity, onBack }: { opportunity?: any, onBack?: () => void }) {
    // Map DB fields to UI-friendly structure
    const data = {
        symbol: opportunity?.symbol || 'SMCI',
        category: opportunity?.asset_class || 'BREAKOUT',
        confidence: opportunity?.confidence || 89,
        thesis: opportunity?.thesis || 'Super Micro Computer Inc. is forming a structurally perfect high-handle breakout. AI server demand persists with strong forward guidance.',
        conviction: opportunity?.conviction || {
            technical: 30,
            fundamental: 25,
            sentiment: 20,
            macro: 14
        },
        key_levels: opportunity?.key_levels || [
            'Confirmed daily close above $980',
            'Volume expansion >1.5x',
            'Stop loss authenticated at $925'
        ]
    }

    return (
        <div className="flex flex-col gap-12 page-transition pb-24">
            {/* Back nav */}
            <button onClick={onBack} className="flex items-center gap-3 text-slate-400 hover:text-black transition-all group w-fit font-black text-[10px] uppercase tracking-[0.2em]">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-white/80 group-hover:scale-105 transition-transform">
                    <ChevronLeft className="w-5 h-5" />
                </div>
                Return to Radar
            </button>

            {/* Hero Header */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div className="lg:col-span-7 space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="px-4 py-1.5 bg-black text-white text-[10px] font-black rounded-lg tracking-widest uppercase shadow-md">
                            {data.confidence > 85 ? 'Extreme' : 'High'} Conviction
                        </div>
                        <span className="text-blue-600 font-bold tracking-[0.25em] text-[10px] uppercase flex items-center gap-2">
                            <Compass size={16} /> {opportunity ? 'Signal Authenticated' : 'Intelligence Alpha'}
                        </span>
                    </div>
                    <h1 className="text-6xl lg:text-7xl font-black text-black tracking-tighter leading-none mb-4">{data.symbol}</h1>
                    <p className="text-xl text-slate-500 leading-relaxed font-bold tracking-tight border-l-8 border-slate-200 pl-8 max-w-2xl">
                        {data.thesis}
                    </p>
                </div>

                <div className="lg:col-span-5 premium-card bg-[#0F172A] text-white p-12 flex flex-col items-center justify-center relative overflow-hidden shadow-huge border border-white/5">
                    <div className="absolute inset-0 bg-blue-500/10 blur-[100px]" />
                    <div className="text-[10px] uppercase font-black text-slate-500 mb-6 tracking-[0.3em] relative z-10">Signal Confidence</div>
                    <div className="text-[100px] font-black leading-none tracking-tighter mb-2 relative z-10">{data.confidence}<span className="text-blue-500 text-3xl ml-1">%</span></div>
                    <div className="px-5 py-2 bg-white/10 rounded-xl text-[10px] font-black border border-white/10 tracking-[0.2em] uppercase relative z-10 shadow-inner">Institutional Tier</div>
                </div>
            </section>

            {/* Factor Breakdown */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 premium-card bg-white p-10 shadow-huge border border-white/80 space-y-10">
                    <h3 className="text-2xl font-black tracking-tighter mb-8 flex items-center gap-4">
                        <TrendingUp size={28} className="text-emerald-500" /> Conviction Matrix
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {Object.entries(data.conviction).map(([key, val]: [string, any]) => (
                            <div key={key} className="space-y-6">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">{key}</span>
                                    <span className="text-3xl font-black text-black tracking-tighter">{val}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-600 shadow-[0_0_12px_rgba(59,130,246,0.3)] transition-all duration-1000 rounded-full"
                                        style={{ width: `${(val / 30) * 100}%` }}
                                    />
                                </div>
                                <div className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase tracking-wide">
                                    {key === 'technical' ? 'Confirmed price nodes' :
                                        key === 'fundamental' ? 'Forward guidance bias' :
                                            key === 'sentiment' ? 'Flow divergence' :
                                                'Macro backdrop audit'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-10">
                    {/* Risk Card */}
                    <div className="premium-card bg-rose-50 border border-rose-100 p-8 space-y-8 shadow-sm">
                        <h4 className="font-black flex items-center gap-3 text-rose-950 text-xl tracking-tight"><ShieldCheck size={24} className="text-rose-500" /> Signal Anchors</h4>
                        <ul className="space-y-6">
                            {(data.key_levels as string[]).map((level, idx) => (
                                <CheckItem key={idx} label={level} />
                            ))}
                        </ul>
                    </div>

                    {/* Social Signal */}
                    <div className="premium-card bg-white p-10 space-y-6 shadow-xl border border-white/80">
                        <h4 className="font-black text-2xl tracking-tight text-slate-900 flex items-center gap-4"><Users size={24} className="text-indigo-500" /> Market Pulse</h4>
                        <div className="flex justify-between text-[10px] font-black mb-1 tracking-widest">
                            <span className="text-emerald-500">62% BULLISH</span>
                            <span className="text-rose-500">14% BEARISH</span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                            <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]" style={{ width: '62%' }} />
                            <div className="h-full bg-slate-300 rounded-full ml-1" style={{ width: '24%' }} />
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium italic text-center leading-relaxed mt-2 opacity-80">
                            Aggregate flows from authorized FinFlow nodes.
                        </p>
                    </div>
                </div>
            </section>

            {/* Execution Footer */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-6 z-50">
                <button className="px-16 py-6 bg-black text-white font-black text-lg rounded-2xl hover:bg-slate-900 transition-all shadow-huge flex items-center gap-4 group active:scale-95">
                    Activate Execution <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="p-6 bg-white border border-white/80 text-black rounded-2xl hover:bg-slate-50 transition-all shadow-large active:scale-95">
                    <ExternalLink size={24} />
                </button>
            </div>
        </div>
    )
}

function CheckItem({ label }: { label: string }) {
    return (
        <li className="flex gap-4 text-xs font-black text-rose-900 tracking-tight items-center group cursor-pointer">
            <div className="w-3 h-3 rounded-full border-2 border-rose-400 group-hover:bg-rose-400 transition-colors shrink-0" />
            {label}
        </li>
    )
}
