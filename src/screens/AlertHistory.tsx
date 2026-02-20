import React from 'react'
import { cn } from '../lib/utils'
import {
    History as HistoryIcon,
    CheckCircle2,
    XCircle,
    Clock,
    ChevronRight,
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

interface AlertHistoryProps {
    onBack?: () => void
}

export default function AlertHistory({ onBack }: AlertHistoryProps) {
    return (
        <div className="min-h-screen bg-[#E3E9F0] text-slate-900 p-8 flex flex-col gap-12 max-w-6xl mx-auto pb-24 page-transition overflow-y-auto">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-3 bg-white rounded-2xl shadow-sm border border-white/40 hover:scale-110 transition-all">
                        <HistoryIcon className="w-6 h-6 rotate-180" />
                    </button>
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tighter text-black">Alert Intelligence</h1>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Historical Performance Audit</p>
                    </div>
                </div>

                <div className="flex gap-8">
                    <div className="premium-card bg-white px-8 py-5 flex flex-col items-center">
                        <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">Success Rate</span>
                        <span className="text-3xl font-black text-emerald-500">58.4<span className="text-sm">%</span></span>
                    </div>
                    <div className="premium-card bg-black text-white px-8 py-5 flex flex-col items-center shadow-xl">
                        <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">Alpha Generated</span>
                        <span className="text-3xl font-black text-white">1,240<span className="text-sm">bps</span></span>
                    </div>
                </div>
            </header>

            {/* Filter Bar */}
            <div className="flex items-center justify-between">
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {['All History', 'High Conviction', 'Macro Trends', 'Earnings Pulse'].map((f, i) => (
                        <button key={f} className={cn(
                            "px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                            i === 0 ? "bg-black text-white shadow-lg" : "bg-white/60 text-slate-500 hover:bg-white hover:text-black border border-white/40"
                        )}>{f}</button>
                    ))}
                </div>
                <button className="p-2.5 bg-white rounded-xl border border-white/40 text-slate-500 hover:text-black transition-all">
                    <Filter size={18} />
                </button>
            </div>

            {/* List of Historical Alerts */}
            <div className="space-y-4">
                {mockHistory.map((item, i) => (
                    <div key={i} className="premium-card bg-white/40 hover:bg-white p-6 flex flex-col md:flex-row items-center justify-between gap-8 group cursor-pointer transition-all border border-transparent hover:border-slate-200">
                        <div className="flex items-center gap-8 flex-1">
                            <div className={cn(
                                "w-16 h-16 rounded-[2rem] flex items-center justify-center border transition-all duration-500 group-hover:rotate-6",
                                item.outcome === 'Win' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                    item.outcome === 'Loss' ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-slate-100 text-slate-500 border-slate-200"
                            )}>
                                {item.outcome === 'Win' ? <CheckCircle2 size={32} /> :
                                    item.outcome === 'Loss' ? <XCircle size={32} /> : <Clock size={32} />}
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl font-black tracking-tighter text-black">{item.symbol}</span>
                                    <span className="px-2 py-0.5 bg-slate-900/5 rounded-md text-[8px] font-black text-slate-400 uppercase">{item.regime}</span>
                                </div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                                    {item.time} • ${item.price.toLocaleString()} entry authenticated
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-16 pr-4">
                            <div className="text-right">
                                <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Return</div>
                                <div className={cn(
                                    "text-xl font-black font-mono tracking-tighter",
                                    item.change >= 0 ? "text-emerald-500" : "text-rose-500"
                                )}>{item.change >= 0 ? '+' : ''}{item.change}%</div>
                            </div>

                            <div className="text-right hidden md:block">
                                <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Decision</div>
                                <div className="text-lg font-bold text-slate-900">{item.status}</div>
                            </div>

                            <div className="p-3 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-black group-hover:text-white transition-all">
                                <ArrowUpRight size={20} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Accuracy Analytics */}
            <section className="bg-black text-white rounded-[3rem] p-12 mt-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-12 items-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px]" />
                <div className="space-y-4 max-w-sm">
                    <div className="p-4 bg-white/10 rounded-3xl w-fit"><TrendingUp size={32} className="text-emerald-400" /></div>
                    <h3 className="text-3xl font-black tracking-tighter">AI Precision Mapping</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Calibration metrics across normalized market regimes. Precision is adjusted for liquidity drift and execution lag.
                    </p>
                </div>

                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                    <MetricBar label="Equity Alpha" value={72} color="emerald" />
                    <MetricBar label="Crypto Vol" value={44} color="blue" />
                    <MetricBar label="Forex Trend" value={61} color="purple" />
                </div>
            </section>
        </div>
    )
}

function MetricBar({ label, value, color }) {
    const colors = {
        emerald: "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]",
        blue: "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]",
        purple: "bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
    }
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</span>
                <span className="text-xl font-black font-mono">{value}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full transition-all duration-1000", colors[color])} style={{ width: `${value}%` }} />
            </div>
        </div>
    )
}
