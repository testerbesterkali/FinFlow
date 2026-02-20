import React, { useState } from 'react'
import { cn } from '../lib/utils'
import {
    Plus,
    Zap,
    Bell,
    Search,
    Settings,
    Play,
    Maximize2
} from 'lucide-react'

const nodeTypes = {
    TRIGGER: { icon: Play, color: 'emerald', label: 'Trigger' },
    CONDITION: { icon: Search, color: 'amber', label: 'Rule' },
    ANALYSIS: { icon: Zap, color: 'blue', label: 'Inference' },
    ACTION: { icon: Bell, color: 'purple', label: 'Alert' }
}

export default function AgentBuilder() {
    const [nodes] = useState([
        { id: 1, type: 'TRIGGER' as const, label: 'Price crosses $190', value: 'price_cross' },
        { id: 2, type: 'ANALYSIS' as const, label: 'Run AI Breakout Analysis', value: 'ai_breakout' },
        { id: 4, type: 'ACTION' as const, label: 'Send Telegram Alert', value: 'telegram_notify' }
    ])

    return (
        <div className="flex flex-col gap-10 page-transition">
            <div className="flex items-center justify-between gap-10">
                <div>
                    <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none mb-2">Agent Architect.</h1>
                    <p className="text-lg text-slate-500 font-medium">Design autonomous workflows for institutional execution.</p>
                </div>
                <div className="flex gap-4 shrink-0">
                    <button className="px-8 py-4 bg-white text-slate-700 font-black text-sm rounded-2xl hover:bg-slate-50 transition-all border border-slate-200 shadow-sm active:scale-95">Simulation</button>
                    <button className="px-10 py-4 bg-black text-white font-black text-sm rounded-2xl hover:shadow-xl transition-all shadow-lg active:scale-95">Deploy Agent</button>
                </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row gap-10 min-h-0">
                {/* Canvas Area (Big) */}
                <main className="flex-1 relative bg-white/40 rounded-[2.5rem] border border-white/60 p-12 overflow-y-auto scrollbar-none shadow-inner min-h-[600px]">
                    <div className="max-w-xl mx-auto space-y-8">
                        {nodes.map((node, index) => {
                            const type = nodeTypes[node.type]
                            const Icon = type.icon
                            return (
                                <React.Fragment key={node.id}>
                                    <div className="group relative">
                                        <div className="p-8 bg-white border border-white/80 shadow-xl rounded-[2.5rem] flex items-center justify-between hover:border-blue-500/20 transition-all cursor-pointer hover:scale-[1.01] duration-300">
                                            <div className="flex items-center gap-8">
                                                <div className="w-16 h-16 rounded-2xl bg-[#0F172A] flex items-center justify-center text-white shadow-lg group-hover:rotate-3 transition-all duration-300">
                                                    <Icon size={28} />
                                                </div>
                                                <div>
                                                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] mb-1.5">{type.label}</div>
                                                    <div className="text-2xl font-black text-black tracking-tighter leading-none">{node.label}</div>
                                                </div>
                                            </div>
                                            <div className="p-3 rounded-full hover:bg-slate-50 transition-colors">
                                                <Settings size={20} className="text-slate-200 group-hover:text-black transition-colors" />
                                            </div>
                                        </div>
                                    </div>

                                    {index < nodes.length - 1 && (
                                        <div className="flex justify-center py-2">
                                            <div className="w-1.5 h-12 bg-gradient-to-b from-blue-500/30 via-blue-500/10 to-transparent rounded-full" />
                                        </div>
                                    )}
                                </React.Fragment>
                            )
                        })}

                        <div className="flex justify-center pt-8">
                            <button className="flex items-center gap-4 px-10 py-8 bg-white/40 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-slate-400 font-black text-base hover:text-black hover:border-blue-500/30 transition-all group shadow-sm">
                                <Plus size={24} className="transition-transform group-hover:rotate-90" /> Add Intelligence Node
                            </button>
                        </div>
                    </div>
                </main>

                {/* Side Controls */}
                <aside className="lg:w-[420px] flex flex-col gap-10">
                    <div className="premium-card bg-[#0F172A] text-white p-10 space-y-8 shadow-huge border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] group-hover:bg-emerald-500/10 transition-all duration-1000" />
                        <h3 className="text-2xl font-black tracking-tight flex items-center gap-4 relative z-10">Simulation <Maximize2 size={24} className="text-emerald-500" /></h3>
                        <div className="h-32 flex items-end gap-2 px-2 relative z-10">
                            {[4, 6, 3, 8, 5, 9, 6, 10, 8].map((h, i) => (
                                <div key={i} className="flex-1 bg-white/10 rounded-t-lg hover:bg-emerald-500 transition-all" style={{ height: `${h * 10}%` }} />
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-8 relative z-10">
                            <div>
                                <div className="text-[10px] text-slate-500 font-black uppercase mb-1.5 tracking-widest">Expected ROI</div>
                                <div className="text-3xl font-black tracking-tighter">2.4<span className="text-lg text-emerald-400 font-black ml-0.5">x</span></div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] text-slate-500 font-black uppercase mb-1.5 tracking-widest">Sharpe</div>
                                <div className="text-3xl font-black text-white tracking-tighter">4.2</div>
                            </div>
                        </div>
                    </div>

                    <div className="premium-card bg-white p-8 flex-1 space-y-8">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2 leading-none">Operational Metrics</h4>
                        <div className="space-y-4">
                            <Metric label="Latency" value="2.4ms" color="emerald" />
                            <Metric label="Node Load" value="14.2%" color="blue" />
                            <Metric label="Memory" value="NVP" color="slate" />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

function Metric({ label, value, color }: { label: string, value: string, color: 'emerald' | 'blue' | 'slate' }) {
    const colors = {
        emerald: "text-emerald-500",
        blue: "text-blue-500",
        slate: "text-slate-400"
    }
    return (
        <div className="flex justify-between items-center bg-slate-50/50 p-6 rounded-2xl border border-slate-100/50 hover:bg-slate-50 transition-colors">
            <span className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400">{label}</span>
            <span className={cn("text-xl font-black tracking-tighter", colors[color])}>{value}</span>
        </div>
    )
}
