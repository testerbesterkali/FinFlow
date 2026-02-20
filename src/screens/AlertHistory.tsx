import React from 'react'
import { cn } from '../lib/utils'
import {
    History as HistoryIcon,
    CheckCircle2,
    XCircle,
    Clock,
    ChevronRight,
    TrendingUp
} from 'lucide-react'

const mockHistory = [
    { symbol: 'BTC', price: 52140, change: 4.2, status: 'Acted', outcome: 'Win', time: '2h ago' },
    { symbol: 'TSLA', price: 182.10, change: -2.1, status: 'Acted', outcome: 'Loss', time: '1d ago' },
]

interface AlertHistoryProps {
    onBack?: () => void
}

export default function AlertHistory({ onBack }: AlertHistoryProps) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-6 space-y-8 max-w-5xl mx-auto">
            <header className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="text-slate-500 hover:text-white transition-colors">
                        <HistoryIcon className="w-6 h-6 rotate-180" />
                    </button>
                    <h1 className="text-3xl font-bold text-white">Alert History</h1>
                </div>
            </header>

            <div className="space-y-4">
                {mockHistory.map((item, i) => (
                    <div key={i} className="group p-6 bg-slate-900/40 hover:bg-slate-900/60 rounded-3xl border border-white/5 transition-all flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center",
                                item.outcome.includes('Win') ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                            )}>
                                {item.outcome.includes('Win') ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                            </div>
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xl font-bold text-white">{item.symbol}</span>
                                </div>
                            </div>
                        </div>
                        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl">
                            <ChevronRight className="w-5 h-5 text-slate-400" />
                        </button>
                    </div>
                ))}
            </div>

            <section className="mt-12 p-8 bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-3xl border border-blue-500/10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-blue-500/20 rounded-2xl"><TrendingUp className="w-6 h-6 text-blue-400" /></div>
                    <h3 className="text-xl font-bold text-white">Accuracy</h3>
                </div>
            </section>
        </div>
    )
}
