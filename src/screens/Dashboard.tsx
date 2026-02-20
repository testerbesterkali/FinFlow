import React from 'react'
import { cn } from '../lib/utils'
import {
    Settings,
    User,
    Plus,
    MessageSquare,
    ArrowUpRight,
    TrendingUp
} from 'lucide-react'

const mockWatchlist = [
    { symbol: 'AAPL', price: 185.40, change: 1.2, signal: 'Bullish', status: 'Active' },
    { symbol: 'CL=F', price: 78.42, change: 0.8, signal: 'Bullish', status: 'Off' },
    { symbol: 'EURUSD', price: 1.0852, change: -0.2, signal: 'Bearish', status: 'Active' },
]

interface DashboardProps {
    onSelectAsset?: (symbol: string) => void
    onOpenAgents?: () => void
    onOpenRadar?: () => void
    onOpenHistory?: () => void
}

export default function Dashboard({
    onSelectAsset,
    onOpenAgents,
    onOpenRadar,
    onOpenHistory
}: DashboardProps) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            {/* Header */}
            <header className="px-6 py-4 bg-slate-900/40 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold text-white tracking-tight">FinFlow AI</h1>
                        <div className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
                            <span className="text-[10px] font-bold text-blue-400">MARKET REGIME: RISK-ON</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={onOpenHistory} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400"><HistoryIcon className="w-5 h-5" /></button>
                        <button className="p-2 hover:bg-white/5 rounded-full transition-colors"><Settings className="w-5 h-5 text-slate-400" /></button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border border-white/10 flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div
                        onClick={onOpenHistory}
                        className="p-6 bg-slate-900/60 rounded-2xl border border-white/5 shadow-sm cursor-pointer hover:border-blue-500/30 transition-all"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-500">Active Alerts</span>
                            <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded text-[10px] font-bold uppercase tracking-wider">Live</span>
                        </div>
                        <div className="text-3xl font-bold text-white">3</div>
                    </div>
                    <div
                        onClick={onOpenRadar}
                        className="p-6 bg-slate-900/60 rounded-2xl border border-white/5 shadow-sm cursor-pointer hover:border-blue-500/30 transition-all"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-500">Today's Opps</span>
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div className="text-3xl font-bold text-white">7</div>
                    </div>
                    <div
                        onClick={onOpenAgents}
                        className="p-6 bg-slate-900/60 rounded-2xl border border-white/5 shadow-sm cursor-pointer hover:border-blue-500/30 transition-all"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-500">Agent Status</span>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <div className="text-lg font-bold text-white flex items-center gap-2">
                            Agents Active
                        </div>
                    </div>
                </div>

                {/* Watchlist Section */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            Watchlist <span className="text-slate-500 font-normal">({mockWatchlist.length})</span>
                        </h2>
                        <div className="flex items-center gap-2">
                            <button className="p-2 bg-slate-900/80 hover:bg-slate-800 rounded-lg border border-white/5 transition-colors">
                                <Plus className="w-4 h-4" />
                            </button>
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-all">
                                Run AI Screen
                            </button>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 rounded-2xl border border-white/5 overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                                    <th className="px-6 py-4">Symbol</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Change</th>
                                    <th className="px-6 py-4">AI Signal</th>
                                    <th className="px-6 py-4 text-right">Agent</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {mockWatchlist.map(item => (
                                    <tr
                                        key={item.symbol}
                                        onClick={() => onSelectAsset?.(item.symbol)}
                                        className="hover:bg-white/[0.02] cursor-pointer group transition-colors"
                                    >
                                        <td className="px-6 py-5 font-bold text-white">{item.symbol}</td>
                                        <td className="px-6 py-5 font-mono text-sm">${item.price.toFixed(2)}</td>
                                        <td className={cn(
                                            "px-6 py-5 font-bold text-sm",
                                            item.change >= 0 ? "text-emerald-400" : "text-rose-400"
                                        )}>
                                            {item.change >= 0 ? '+' : ''}{item.change.toFixed(1)}%
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className={cn(
                                                "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                                item.signal === 'Bullish' ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                                            )}>
                                                <div className={cn("w-1.5 h-1.5 rounded-full", item.signal === 'Bullish' ? "bg-emerald-500" : "bg-rose-500")} />
                                                {item.signal}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <span className={cn(
                                                "text-[10px] font-bold px-2 py-0.5 rounded border",
                                                item.status === 'Active' ? "border-emerald-500/20 text-emerald-500" : "border-slate-800 text-slate-600"
                                            )}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            {/* Floating Action / Ask Section */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6">
                <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center gap-2 shadow-2xl">
                    <div className="pl-4"><MessageSquare className="w-5 h-5 text-slate-500" /></div>
                    <input
                        type="text"
                        placeholder="Ask FinFlow anything..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-3 outline-none px-2"
                    />
                    <button className="bg-blue-600 hover:bg-blue-500 p-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/20">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        </div>
    )
}

function HistoryIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="m12 7v5l4 2" />
        </svg>
    )
}
