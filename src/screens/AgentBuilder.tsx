import React, { useState } from 'react'
import { cn } from '../lib/utils'
import {
    Plus,
    Trash2,
    ArrowRight,
    Zap,
    BarChart3,
    Bell,
    Search,
    ChevronRight,
    Settings,
    Play,
    Activity,
    Maximize2
} from 'lucide-react'

const nodeTypes = {
    TRIGGER: { icon: Play, color: 'emerald', label: 'Market Trigger' },
    CONDITION: { icon: Search, color: 'amber', label: 'Logical Constraint' },
    ANALYSIS: { icon: Zap, color: 'blue', label: 'AI Inference' },
    ACTION: { icon: Bell, color: 'purple', label: 'Dispatch Action' }
}

interface AgentBuilderProps {
    onBack?: () => void
}

export default function AgentBuilder({ onBack }: AgentBuilderProps) {
    const [nodes] = useState([
        { id: 1, type: 'TRIGGER' as const, label: 'Price crosses $190', value: 'price_cross' },
        { id: 2, type: 'CONDITION' as const, label: 'VIX < 20', value: 'vix_threshold' },
        { id: 3, type: 'ANALYSIS' as const, label: 'Run AI Breakout Analysis', value: 'ai_breakout' },
        { id: 4, type: 'ACTION' as const, label: 'Send Telegram Alert', value: 'telegram_notify' }
    ])

    return (
        <div className="h-screen w-screen bg-[#E3E9F0] text-slate-900 flex flex-col page-transition overflow-hidden">
            {/* Header */}
            <header className="px-10 py-6 bg-white border-b border-slate-200 flex items-center justify-between z-10 shadow-sm">
                <div className="flex items-center gap-6">
                    <button onClick={onBack} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 hover:scale-105 transition-all">
                        <ArrowRight className="w-5 h-5 rotate-180" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black tracking-tighter text-black">Agent Architect</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            Draft: Institutional Breakout Hunter • <span className="text-blue-500">v1.4.2</span>
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-slate-100 text-slate-700 font-bold text-sm rounded-[1.25rem] hover:bg-slate-200 transition-all">Dry Run</button>
                    <button className="px-8 py-3 bg-black text-white font-bold text-sm rounded-[1.25rem] hover:shadow-xl transition-all shadow-black/10">Deploy Agent</button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar: Palette */}
                <aside className="w-80 border-r border-slate-200 bg-white/50 p-8 space-y-8 overflow-y-auto">
                    <div>
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Component Library</h3>
                        <div className="space-y-4">
                            {Object.entries(nodeTypes).map(([key, type]) => {
                                const Icon = type.icon
                                return (
                                    <div
                                        key={key}
                                        className="p-5 bg-white border border-slate-200 rounded-[2rem] cursor-grab active:cursor-grabbing hover:border-blue-500/30 hover:shadow-lg transition-all group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={cn("p-3 rounded-2xl bg-slate-50 text-slate-600 group-hover:bg-black group-hover:text-white transition-colors")}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold">{type.label}</div>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Infrastructure</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-200 space-y-4">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Backtest Baseline</h3>
                        <div className="premium-card p-6 bg-emerald-50 border-emerald-100">
                            <div className="flex items-center gap-2 text-emerald-600 font-black text-xs mb-2">
                                <Activity size={14} /> EXPECTED PRECISION
                            </div>
                            <div className="text-3xl font-black text-black">71.4%</div>
                        </div>
                    </div>
                </aside>

                {/* Canvas Area */}
                <main className="flex-1 relative bg-[radial-gradient(circle_at_center,_#EDF2F7,_#E3E9F0)] p-20 overflow-y-auto scrollbar-none">
                    <div className="max-w-xl mx-auto space-y-6">
                        {nodes.map((node, index) => {
                            const type = nodeTypes[node.type]
                            const Icon = type.icon
                            return (
                                <React.Fragment key={node.id}>
                                    <div className="group relative">
                                        <div className="absolute -left-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                            <button className="p-3 bg-white shadow-md border border-slate-200 rounded-[1.5rem] text-rose-500 hover:bg-rose-50 transition-all">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="p-8 bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2.5rem] shadow-xl flex items-center justify-between hover:border-blue-500/40 transition-all cursor-pointer">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 rounded-3xl bg-black flex items-center justify-center text-white shadow-lg">
                                                    <Icon className="w-7 h-7" />
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{type.label}</div>
                                                    <div className="text-xl font-black text-black tracking-tight">{node.label}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="text-[10px] font-bold text-blue-500 px-2 py-1 bg-blue-50 rounded-lg border border-blue-100 uppercase">Live</div>
                                                <Settings className="w-5 h-5 text-slate-300 hover:text-black transition-colors" />
                                            </div>
                                        </div>
                                    </div>

                                    {index < nodes.length - 1 && (
                                        <div className="flex justify-center py-4">
                                            <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-transparent rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                                        </div>
                                    )}
                                </React.Fragment>
                            )
                        })}

                        <div className="flex justify-center pt-8">
                            <button className="flex items-center gap-3 px-10 py-5 bg-white/40 border-2 border-dashed border-slate-300 rounded-[2.5rem] text-slate-500 font-bold hover:text-black hover:border-black transition-all">
                                <Plus className="w-5 h-5" /> Add Strategic Logic Node
                            </button>
                        </div>
                    </div>
                </main>

                {/* Intelligence Side Pane */}
                <aside className="w-96 border-l border-slate-200 bg-white/30 p-10 flex flex-col gap-10">
                    <div>
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Market Simulation</h3>
                        <div className="premium-card bg-black p-8 text-white space-y-6 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl" />
                            <div className="flex items-center gap-3">
                                <Maximize2 size={18} className="text-emerald-400" />
                                <span className="font-bold tracking-tight">Real-time Performance</span>
                            </div>
                            <div className="h-[120px] flex items-end gap-1 px-2 mb-4">
                                {[3, 5, 2, 7, 4, 8, 5, 9, 7].map((h, i) => (
                                    <div key={i} className="flex-1 bg-white/20 hover:bg-white rounded-t-lg transition-all hover:shadow-[0_0_10px_white]" style={{ height: `${h * 10}%` }} />
                                ))}
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Total Catch</div>
                                    <div className="text-2xl font-black">124<span className="text-sm font-normal text-slate-400 ml-1">alerts</span></div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Profit/Risk</div>
                                    <div className="text-emerald-400 font-black text-2xl">3.2x</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-6">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Matched Logic Patterns</h3>
                        <div className="space-y-3">
                            {['Double Bottom Confirmation', 'RSI Oversold Filter', 'Institutional Block Trade'].map(p => (
                                <div key={p} className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-blue-500/20">
                                    <span className="text-xs font-bold text-slate-700">{p}</span>
                                    <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="premium-card p-6 bg-blue-50 border-blue-100 flex items-center gap-4">
                        <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg"><Zap size={20} /></div>
                        <div className="text-[10px] font-black text-blue-900 leading-tight">AI Optimizing your agent triggers based on last 48hr volatility.</div>
                    </div>
                </aside>
            </div>
        </div>
    )
}
