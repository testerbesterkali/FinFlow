import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import {
    TrendingUp,
    TrendingDown,
    ChevronRight,
    Target,
    Zap,
    Shield,
    History as HistoryIcon,
    Loader2
} from 'lucide-react'
import { cn } from '../lib/utils'

interface DashboardProps {
    onOpenAsset: (id: string) => void
    onOpenOpportunity: (id: string | any) => void
    onOpenHistory: () => void
}

export default function Dashboard({ onOpenAsset, onOpenOpportunity, onOpenHistory }: DashboardProps) {
    const [opportunities, setOpportunities] = useState<any[]>([])
    const [watchlist, setWatchlist] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const stats = [
        { label: 'Network Power', value: '4.8kW', change: '+12%', icon: Zap, color: 'text-amber-500' },
        { label: 'Active Agents', value: '18', change: 'Stable', icon: Shield, color: 'text-emerald-500' },
        { label: 'Signal Accuracy', value: '94.2%', change: '+2.4%', icon: Target, color: 'text-blue-500' },
    ]

    useEffect(() => {
        fetchData()

        // Real-time subscription for alerts
        const channel = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'alerts'
                },
                () => fetchData()
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    const fetchData = async () => {
        try {
            // Fetch latest alerts as opportunities
            const { data: alertsData } = await supabase
                .from('alerts')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5)

            if (alertsData && alertsData.length > 0) {
                setOpportunities(alertsData)
            } else {
                // Fallback to mock data if DB is empty
                setOpportunities([
                    { id: '1', symbol: 'NVDA', type: 'Long', confidence: 92, price: 724.12, thesis: 'Accumulation detected by institutional tier-1 liquidity nodes.', outcome_status: 'ignored' },
                    { id: '2', symbol: 'BTC', type: 'Short', confidence: 78, price: 52140, thesis: 'Resistance rejection at local supply zone. Bearish divergence.', outcome_status: 'ignored' },
                ])
            }

            // Fetch watchlist (mocked for now until user watchlist logic is fully defined)
            setWatchlist([
                { symbol: 'AAPL', price: '$182.31', change: '+1.2%', trend: 'bull' },
                { symbol: 'TSLA', price: '$193.57', change: '-2.4%', trend: 'bear' },
                { symbol: 'MSFT', price: '$404.06', change: '+0.8%', trend: 'bull' },
            ])
        } catch (err) {
            console.error('Error fetching data:', err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin opacity-20" />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8 page-transition">
            {/* Hero Section */}
            <section className="flex flex-col gap-1">
                <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none mb-1">Command Center</h1>
                <p className="text-lg text-slate-500 font-medium">Market Regime: <span className="text-emerald-600 font-bold uppercase tracking-widest ml-1 bg-emerald-100/50 px-2 py-0.5 rounded-lg text-sm">High Conviction Bullish</span></p>
            </section>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon
                    return (
                        <div key={i} className="premium-card p-8 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div className={cn("p-3 rounded-xl bg-white shadow-sm border border-slate-100", stat.color)}>
                                    <Icon size={20} />
                                </div>
                                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100 uppercase tracking-widest">{stat.change}</span>
                            </div>
                            <div>
                                <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                                <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Feed: Opportunities */}
                <div className="lg:col-span-8 flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            Intelligence Radar
                            <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-lg uppercase tracking-widest font-black animate-pulse">Live</span>
                        </h2>
                        <button
                            onClick={onOpenHistory}
                            className="group flex items-center gap-2 text-slate-400 font-bold hover:text-black transition-colors text-xs"
                        >
                            <HistoryIcon size={14} className="group-hover:rotate-[-20deg] transition-transform" />
                            <span>Full History</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        {opportunities.map((opp) => (
                            <div
                                key={opp.id}
                                onClick={() => onOpenOpportunity(opp)}
                                className="premium-card p-6 group cursor-pointer hover:shadow-xl transition-all duration-500 border-l-8 border-l-slate-200 hover:border-l-blue-500"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-black text-slate-900 tracking-tighter">{opp.symbol}</span>
                                            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{opp.type || 'Breakout'} Potential</span>
                                        </div>

                                        <div className="h-8 w-[1px] bg-slate-200" />

                                        <div className="flex flex-col">
                                            <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Conviction</span>
                                            <div className="flex items-center gap-1.5">
                                                <div className="flex gap-1">
                                                    {[1, 2, 3].map(i => (
                                                        <div key={i} className={cn("w-2 h-2 rounded-full", i <= (opp.confidence > 85 ? 3 : 2) ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-200")} />
                                                    ))}
                                                </div>
                                                <span className="text-[11px] font-black text-slate-700">{opp.confidence > 85 ? 'Extreme' : 'High'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest mb-0.5">Entry Target</p>
                                            <p className="text-xl font-black text-emerald-600 tracking-tighter">${opp.price}</p>
                                        </div>
                                        <div className="p-2.5 rounded-xl bg-slate-900 text-white group-hover:bg-blue-600 transition-colors shadow-lg">
                                            <ChevronRight size={18} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Feed: Watchlist */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Watchlist</h2>
                    <div className="premium-card p-6">
                        <div className="space-y-6">
                            {watchlist.map((asset) => (
                                <div
                                    key={asset.symbol}
                                    onClick={() => onOpenAsset(asset.symbol)}
                                    className="flex items-center justify-between group cursor-pointer"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-lg font-black text-slate-900 tracking-tighter group-hover:text-blue-600 transition-colors">{asset.symbol}</span>
                                        <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Feed Active</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-slate-900 tracking-tight">{asset.price}</p>
                                        <div className={cn(
                                            "flex items-center justify-end gap-0.5 font-black text-[10px]",
                                            asset.trend === 'bull' ? "text-emerald-500" : "text-rose-500"
                                        )}>
                                            {asset.trend === 'bull' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                            {asset.change}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-6 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-2xl text-slate-500 font-black text-[10px] uppercase tracking-widest transition-all">
                            Manage
                        </button>
                    </div>

                    {/* AI Insight Pill */}
                    <div className="mt-2 p-6 bg-blue-600 rounded-[2rem] text-white shadow-xl shadow-blue-200/50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 transform group-hover:scale-110 transition-transform opacity-10">
                            <Target size={80} />
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-[0.25em] mb-2 opacity-80">Thesis Intelligence</p>
                        <h3 className="text-lg font-black leading-snug mb-3 relative z-10">Accumulation detected in NVIDIA by institutional bots.</h3>
                        <p className="text-[11px] font-medium opacity-80 leading-relaxed mb-4">Breakout probability: 82.4% based on current flow imbalance.</p>
                        <button className="px-5 py-2.5 bg-white text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-colors">
                            View Thesis
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
