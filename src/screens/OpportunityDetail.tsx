import React from 'react'
import {
    ArrowLeft,
    ShieldCheck,
    TrendingUp,
    ExternalLink,
    Users
} from 'lucide-react'

interface OpportunityDetailProps {
    onBack?: () => void
    opportunity?: any
}

export default function OpportunityDetail({ opportunity, onBack }: OpportunityDetailProps) {
    const data = opportunity || {
        symbol: 'SMCI',
        category: 'BREAKOUT',
        confidence: 89,
        thesis: 'Super Micro Computer Inc. forming high-handle breakout on daily chart.',
        conviction: {
            technical: 30,
            fundamental: 25,
            sentiment: 20,
            macro: 14
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-6 max-w-4xl mx-auto space-y-8 pb-32">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" /> Back to Radar
            </button>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-5xl font-bold text-white mb-2">{data.symbol}</h1>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">{data.thesis}</p>
                </div>
                <div className="bg-slate-900 border border-blue-500/30 p-6 rounded-3xl text-center min-w-[160px]">
                    <div className="text-5xl font-bold text-white mb-1">{data.confidence}%</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-500" /> Execution Checklist
                    </h3>
                </section>

                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Users className="w-5 h-5 text-indigo-500" /> Community Pulse
                    </h3>
                    <div className="p-6 bg-slate-900/40 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-emerald-400 font-bold">62% Bullish</span>
                        </div>
                    </div>
                </section>
            </div>

            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
                <button className="px-12 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all">
                    Paper Trade Setup
                </button>
                <button className="px-6 py-4 bg-slate-900 border border-white/10 hover:bg-slate-800 text-white font-bold rounded-2xl">
                    <ExternalLink className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}
