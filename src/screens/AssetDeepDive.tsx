import React, { useEffect, useRef } from 'react'
import { createChart, ColorType, IChartApi } from 'lightweight-charts'
import {
    ChevronLeft,
    Activity,
    Target,
    AlertTriangle,
    Info
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
                textColor: '#94a3b8',
            },
            grid: {
                vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
                horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
            },
            width: chartContainerRef.current.clientWidth,
            height: 300,
        })

        const lineSeries = chart.addLineSeries({ color: '#3b82f6', lineWidth: 2 })
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
        <div className="min-h-screen bg-slate-950 text-slate-200 p-6 space-y-8">
            {/* Navigation */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
            >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
            </button>

            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-4xl font-bold text-white">{symbol}</h1>
                        <span className="text-slate-500 uppercase font-mono">Apple Inc.</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-mono text-white">$185.40</span>
                        <span className="text-emerald-400 font-bold">+1.2%</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">AI Regime</div>
                    <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                        <span className="text-emerald-400 font-bold">TRENDING ↑</span>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="bg-slate-900/40 rounded-3xl border border-white/5 p-6 pb-2">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-500" /> Price Action
                    </h3>
                    <div className="flex gap-2">
                        {['1H', '1D', '1W', '1M', '1Y'].map(t => (
                            <button key={t} className={cn(
                                "px-3 py-1 text-xs rounded-md transition-all",
                                t === '1D' ? "bg-white/10 text-white" : "text-slate-500 hover:text-white"
                            )}>{t}</button>
                        ))}
                    </div>
                </div>
                <div ref={chartContainerRef} className="w-full" />
            </div>

            {/* AI Intelligence Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-900/60 rounded-2xl border border-white/5 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Target className="w-20 h-20 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        AI Thesis <Target className="w-4 h-4 text-blue-500" />
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                        NVIDIA breaking ascending triangle ahead of GTC keynote.
                    </p>
                    <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
                        <div>
                            <div className="text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider">Entry</div>
                            <div className="text-sm font-mono text-emerald-400">$872.00</div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-slate-900/60 rounded-2xl border border-white/5">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        Risk Framework <AlertTriangle className="w-4 h-4 text-rose-500" />
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex gap-3 items-start">
                            <div className="p-1 bg-rose-500/10 rounded mt-0.5"><AlertTriangle className="w-3 h-3 text-rose-500" /></div>
                            <div>
                                <span className="text-sm font-semibold block">Volatility Spike</span>
                                <span className="text-xs text-slate-500">Broad market VIX elevated (22.4).</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
