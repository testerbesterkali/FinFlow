import React, { useEffect, useRef } from 'react'
import { createChart, ColorType, IChartApi } from 'lightweight-charts'
import {
    ChevronLeft,
    Activity,
    TrendingUp,
    Zap,
    Info
} from 'lucide-react'
import { cn } from '../lib/utils'

interface AssetDeepDiveProps {
    symbol?: string
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
                textColor: '#94A3B8',
                fontSize: 12,
            },
            grid: {
                vertLines: { color: 'rgba(0, 0, 0, 0.02)' },
                horzLines: { color: 'rgba(0, 0, 0, 0.02)' },
            },
            width: chartContainerRef.current.clientWidth,
            height: 480,
        })

        const lineSeries = chart.addLineSeries({
            color: '#3b82f6',
            lineWidth: 3,
            crosshairMarkerVisible: true,
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
        <div className="flex flex-col gap-10 page-transition">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-6">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-slate-400 hover:text-black transition-all group font-black text-[10px] uppercase tracking-[0.2em]"
                    >
                        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Control Center
                    </button>

                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-lg">{symbol[0]}</div>
                        <div>
                            <h1 className="text-5xl font-black tracking-tighter text-black leading-none mb-2">{symbol}</h1>
                            <p className="text-sm text-slate-400 font-bold uppercase tracking-[0.2em]">Institutional Equity Stream • NASDAQ</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 pb-2">
                    <div className="premium-card bg-white px-8 py-5 flex flex-col items-center shadow-lg border border-white/80">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">AI Pulse</span>
                        <span className="text-emerald-500 font-black text-xl flex items-center gap-2">
                            <TrendingUp size={20} /> BULLISH
                        </span>
                    </div>
                    <div className="premium-card bg-white px-8 py-5 flex flex-col items-center shadow-lg border border-white/80">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Vol Regime</span>
                        <span className="text-slate-900 font-black text-xl">STABLE</span>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 premium-card bg-white p-10 min-h-[580px] flex flex-col gap-6 shadow-xl border border-white/80">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-black flex items-center gap-3"><Activity size={24} className="text-blue-500" /> Price Action Velocity</h3>
                        <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
                            {['1D', '1W', '1M', 'ALL'].map(t => (
                                <button key={t} className={cn(
                                    "px-4 py-1.5 text-[10px] font-black rounded-lg transition-all",
                                    t === '1D' ? "bg-white text-black shadow-sm" : "text-slate-400 hover:text-black"
                                )}>{t}</button>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 w-full bg-slate-50/30 rounded-2xl p-4 relative">
                        <div ref={chartContainerRef} className="w-full h-full" />
                    </div>
                </div>

                <div className="space-y-10">
                    <div className="premium-card bg-[#0F172A] text-white p-10 flex flex-col gap-8 shadow-huge relative overflow-hidden group border border-white/5">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] group-hover:bg-blue-500/20 transition-all duration-1000" />
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 shadow-inner"><Zap size={24} className="text-blue-400" /></div>
                            <h3 className="font-black text-2xl tracking-tight">AI Thesis</h3>
                        </div>

                        <div className="space-y-6 relative z-10">
                            <p className="text-base text-slate-300 font-medium leading-relaxed italic border-l-4 border-blue-500/30 pl-6 py-2">
                                "Institutional liquidity nodes are congregating at $184.20. Order flow imbalance indicates a high-probability breakout."
                            </p>

                            <div className="grid grid-cols-1 gap-6 bg-white/5 p-8 rounded-2xl border border-white/5">
                                <div className="flex items-center justify-between">
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Confidence</div>
                                    <div className="text-4xl font-black">94<span className="text-base text-blue-400 ml-0.5">%</span></div>
                                </div>
                                <div className="h-[1px] bg-white/5" />
                                <div className="flex items-center justify-between">
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Prob</div>
                                    <div className="text-3xl font-black text-emerald-400 tracking-tighter uppercase">Extreme</div>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-5 bg-white text-black font-black text-base rounded-2xl hover:bg-slate-100 transition-all shadow-xl active:scale-95 relative z-10">
                            Generate Audit
                        </button>
                    </div>

                    <div className="premium-card bg-white p-8 space-y-6 shadow-xl border border-white/80">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3 mb-1 leading-none"><Info size={18} /> Matrix Factors</h4>
                        <div className="space-y-5">
                            <FactorItem label="Inflow Intensity" value="Institutional" status="emerald" />
                            <FactorItem label="Macro Correlation" value="Negative" status="rose" />
                            <FactorItem label="Liquidity Depth" value="High" status="blue" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function FactorItem({ label, value, status }: { label: string, value: string, status: 'emerald' | 'rose' | 'blue' }) {
    const colors = {
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
        rose: "bg-rose-50 text-rose-600 border-rose-100",
        blue: "bg-blue-50 text-blue-600 border-blue-100"
    }
    return (
        <div className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2.5 rounded-xl transition-all border border-transparent hover:border-slate-100">
            <span className="text-[11px] text-slate-400 font-extrabold uppercase tracking-tight">{label}</span>
            <span className={cn(
                "text-[9px] font-black px-4 py-1 rounded-lg border shadow-sm transition-all group-hover:scale-105",
                colors[status] || "bg-slate-50 text-slate-600 border-slate-100"
            )}>{value}</span>
        </div>
    )
}
