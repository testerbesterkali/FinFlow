import React, { useEffect, useRef } from 'react'
import { createChart, ColorType, IChartApi } from 'lightweight-charts'
import {
    ChevronLeft,
    Activity,
    Target,
    AlertTriangle,
    Info,
    TrendingUp,
    Zap
} from 'lucide-react'
import { cn } from '../lib/utils'

interface AssetDeepDiveProps {
    symbol: string
    onBack?: () => void
}

export default function AssetDeepDive({ symbol = 'AAPL', onBack }: AssetDeepDiveProps) {
    const chartContainerRef = useRef<HTMLDivElement>(null)
    const chartRef = useRef<IChartApi | null>(null)

    useEffect(() => {
        if (!chartContainerRef.current) return

        const handleResize = () => {
            if (chartRef.current && chartContainerRef.current) {
                chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth })
            }
        }

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'transparent' },
                textColor: '#64748B',
            },
            grid: {
                vertLines: { color: 'rgba(0, 0, 0, 0.05)' },
                horzLines: { color: 'rgba(0, 0, 0, 0.05)' },
            },
            width: chartContainerRef.current.clientWidth,
            height: 400,
        })

        const lineSeries = chart.addLineSeries({
            color: '#3b82f6',
            lineWidth: 3,
            priceFormat: { type: 'price', precision: 2, minMove: 0.01 },
        })

        lineSeries.setData([
            { time: '2024-02-10', value: 180.34 },
            { time: '2024-02-11', value: 182.12 },
            { time: '2024-02-12', value: 181.56 },
            { time: '2024-02-13', value: 184.34 },
            { time: '2024-02-14', value: 185.12 },
            { time: '2024-02-15', value: 183.56 },
            { time: '2024-02-16', value: 187.34 },
        ])

        chartRef.current = chart
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            chart.remove()
        }
    }, [])

    return (
        <div className="min-h-screen bg-[#E3E9F0] text-slate-900 flex flex-col p-8 gap-8 overflow-y-auto page-transition">
            {/* Navigation */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-slate-500 hover:text-black transition-all group w-fit"
            >
                <div className="p-2 bg-white rounded-xl shadow-sm border border-white/40 group-hover:scale-110 transition-transform">
                    <ChevronLeft className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm tracking-tight">Return to Intelligence Center</span>
            </button>

            {/* Header Info */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white font-bold text-xl">{symbol[0]}</div>
                        <div>
                            <h1 className="text-5xl font-extrabold tracking-tighter text-black">{symbol}</h1>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Apple Inc. • Technology Sector</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-3xl font-mono font-bold text-slate-900">$185.40</span>
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 font-bold text-sm rounded-xl border border-emerald-100">+1.24% today</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="premium-card bg-white px-6 py-4 flex flex-col items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">AI Regime</span>
                        <span className="text-emerald-500 font-bold flex items-center gap-2">
                            <TrendingUp size={16} /> BULLISH
                        </span>
                    </div>
                    <div className="premium-card bg-white px-6 py-4 flex flex-col items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Volatility</span>
                        <span className="text-slate-900 font-bold">Low (14.2)</span>
                    </div>
                </div>
            </div>

            {/* Charts & Synthesis */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
                {/* Chart Column */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="premium-card bg-white h-[500px] p-8 flex flex-col gap-6 shadow-xl">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-lg flex items-center gap-2"><Activity size={20} className="text-blue-500" /> Executive Price Action</h3>
                            <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
                                {['1H', '1D', '1W', '1M', 'YTD'].map(t => (
                                    <button key={t} className={cn(
                                        "px-4 py-1.5 text-[10px] font-bold rounded-lg transition-all",
                                        t === '1D' ? "bg-white text-black shadow-sm" : "text-slate-500 hover:text-black"
                                    )}>{t}</button>
                                ))}
                            </div>
                        </div>
                        <div ref={chartContainerRef} className="w-full flex-1" />
                    </div>
                </div>

                {/* Intelligence Column */}
                <div className="space-y-8">
                    {/* FICC Insight Card */}
                    <div className="premium-card bg-black text-white p-10 flex flex-col gap-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl" />
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Zap size={20} className="text-blue-400" /></div>
                            <h3 className="font-bold text-xl tracking-tight">AI Synthesis</h3>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">The Thesis</div>
                                <p className="text-sm text-slate-300 leading-relaxed italic border-l-2 border-blue-500/50 pl-4 py-1">
                                    "Accumulation confirmed at $180 support range. Institutional volume nodes suggest a run toward $195 gap-fill."
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Confidence</div>
                                    <div className="text-2xl font-bold">84%</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Risk Mode</div>
                                    <div className="text-2xl font-bold text-emerald-400">Risk-On</div>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-bold text-sm transition-all">
                            Generate Full Report
                        </button>
                    </div>

                    {/* Factors / Risk */}
                    <div className="premium-card bg-white/50 p-8 space-y-6">
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2"><Info size={16} className="text-slate-400" /> Key Factors</h4>
                        <div className="space-y-4">
                            <FactorItem label="Institutional Inflow" value="High" trend="up" />
                            <FactorItem label="Option Flow Sentiment" value="Bullish" trend="up" />
                            <FactorItem label="Sector Correlation" value="Strong" trend="neutral" />
                        </div>
                    </div>

                    {/* Risk Framework */}
                    <div className="premium-card bg-rose-50/50 border border-rose-100 p-8">
                        <h4 className="text-sm font-bold text-rose-950 flex items-center gap-2 mb-4"><AlertTriangle size={16} className="text-rose-500" /> Risk Anchors</h4>
                        <ul className="space-y-3">
                            <li className="text-[11px] text-rose-800 leading-relaxed flex gap-2">
                                <span className="w-1 h-1 bg-rose-500 rounded-full mt-1.5 shrink-0" />
                                Major resistance at $192.40 psychological level.
                            </li>
                            <li className="text-[11px] text-rose-800 leading-relaxed flex gap-2">
                                <span className="w-1 h-1 bg-rose-500 rounded-full mt-1.5 shrink-0" />
                                CPI print on Feb 22 may invalidate current regime.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

function FactorItem({ label, value, trend }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">{label}</span>
            <span className={cn(
                "text-xs font-bold px-2 py-1 rounded-lg",
                trend === 'up' ? "bg-emerald-50 text-emerald-600" :
                    trend === 'down' ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-600"
            )}>{value}</span>
        </div>
    )
}
