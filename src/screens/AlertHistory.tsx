import React from 'react'
import { cn } from '../lib/utils'
import {
    CheckCircle2,
    XCircle,
    Clock,
    TrendingUp,
    ArrowUpRight,
    Filter
} from 'lucide-react'

const mockHistory = [
    { symbol: 'BTC', price: 52140, change: 4.2, status: 'Acted', outcome: 'Win', time: '2h ago', regime: 'Risk-On' },
    { symbol: 'TSLA', price: 182.10, change: -2.1, status: 'Acted', outcome: 'Loss', time: '1d ago', regime: 'Volatility' },
    { symbol: 'GLD', price: 188.40, change: 0.5, status: 'Watched', outcome: 'Neutral', time: '2d ago', regime: 'Defensive' },
    { symbol: 'MSFT', price: 405.20, change: 1.2, status: 'Ignored', outcome: 'Miss', time: '3d ago', regime: 'Earnings' },
]

export default function AlertHistory() {
    return (
        <div className="flex flex-col gap-10 page-transition">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none mb-2">Intelligence Logs</h1>
                    <p className="text-lg text-slate-500 font-medium">Historical Performance Audit. <span className="text-slate-400 italic">Institutional validation logs.</span></p>
                </div>

                <div className="flex gap-6">
                    <div className="premium-card bg-white px-8 py-5 flex flex-col items-center border border-white/80 shadow-md">
                        <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1.5">Success Rate</span>
                        <span className="text-3xl font-black text-emerald-500 tracking-tighter">58.4<span className="text-base ml-0.5">%</span></span>
                    </div>
                    <div className="premium-card bg-black text-white px-8 py-5 flex flex-col items-center shadow-huge border border-white/5">
                        <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1.5">Alpha Gen</span>
                        <span className="text-3xl font-black text-white tracking-tighter">1,240<span className="text-base ml-0.5">bps</span></span>
                    </div>
                </div>
            </header>

            {/* Filter Bar */}
            <div className="flex items-center justify-between">
                <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
                    {['All History', 'High Conviction', 'Trends', 'Earnings'].map((f, i) => (
                        <button key={f} className={cn(
                            "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                            i === 0 ? "bg-black text-white shadow-xl" : "bg-white/60 text-slate-500 hover:bg-white hover:text-black border border-white/40"
                        )}>{f}</button>
                    ))}
                </div>
                <button className="p-3 bg-white rounded-xl border border-white/40 text-slate-400 hover:text-black transition-all shadow-sm">
                    <Filter size={18} />
                </button>
            </div>

            {/* List of Historical Alerts */}
            <div className="space-y-4">
                {mockHistory.map((item, i) => (
                    <div key={i} className="premium-card bg-white/40 hover:bg-white p-6 flex flex-col md:flex-row items-center justify-between gap-8 group cursor-pointer transition-all border border-transparent hover:border-slate-200">
                        <div className="flex items-center gap-8 flex-1">
                            <div className={cn(
                                "w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:rotate-6 shadow-sm border-white/50",
                                item.outcome === 'Win' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                    item.outcome === 'Loss' ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-slate-100 text-slate-500 border-slate-200"
                            )}>
                                {item.outcome === 'Win' ? <CheckCircle2 size={24} /> :
                                    item.outcome === 'Loss' ? <XCircle size={24} /> : <Clock size={24} />}
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl font-black tracking-tighter text-black">{item.symbol}</span>
                                    <span className="px-3 py-1 bg-slate-900/5 rounded-md text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{item.regime}</span>
                                </div>
                                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-tight flex items-center gap-2">
                                    {item.time} • ${item.price.toLocaleString()} authenticated entry
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-12 pr-4">
                            <div className="text-right">
                                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Return</div>
                                <div className={cn(
                                    "text-xl font-black font-mono tracking-tighter",
                                    item.change >= 0 ? "text-emerald-500" : "text-rose-500"
                                )}>{item.change >= 0 ? '+' : ''}{item.change}%</div>
                            </div>

                            <div className="text-right hidden xl:block">
                                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Decision</div>
                                <div className="text-lg font-black text-slate-900 leading-none">{item.status}</div>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                                <ArrowUpRight size={20} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Accuracy Analytics */}
            <section className="bg-[#0F172A] text-white rounded-[2.5rem] p-12 mt-4 shadow-huge relative overflow-hidden flex flex-col lg:flex-row gap-16 items-center border border-white/5">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px]" />
                <div className="space-y-4 max-w-sm">
                    <div className="p-4 bg-white/5 rounded-2xl w-fit shadow-inner border border-white/5"><TrendingUp size={28} className="text-emerald-400" /></div>
                    <h3 className="text-3xl font-black tracking-tighter">Precision Mapping</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                        Metrics adjusted for liquidity drift and execution lag across normalized regimes.
                    </p>
                </div>

                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
                    <MetricBar label="Equity Alpha" value={72} color="emerald" />
                    <MetricBar label="Crypto Vol" value={44} color="blue" />
                    <MetricBar label="Forex Trend" value={61} color="purple" />
                </div>
            </section>
        </div>
    )
}

function MetricBar({ label, value, color }: { label: string, value: number, color: 'emerald' | 'blue' | 'purple' }) {
    const colors = {
        emerald: "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
        blue: "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]",
        purple: "bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
    }
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</span>
                <span className="text-2xl font-black font-mono">{value}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full transition-all duration-1000", colors[color])} style={{ width: `${value}%` }} />
            </div>
        </div>
    )
}
