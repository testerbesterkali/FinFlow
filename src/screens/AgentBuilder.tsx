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
    Play
} from 'lucide-react'

const nodeTypes = {
    TRIGGER: { icon: Play, color: 'emerald', label: 'Trigger' },
    CONDITION: { icon: Search, color: 'amber', label: 'Condition' },
    ANALYSIS: { icon: Zap, color: 'blue', label: 'Analysis' },
    ACTION: { icon: Bell, color: 'purple', label: 'Action' }
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
        <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
            {/* Header */}
            <header className="px-6 py-4 bg-slate-900/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors">
                        <ArrowRight className="w-5 h-5 rotate-180" />
                    </button>
                    <h1 className="text-xl font-bold text-white">Agent Builder</h1>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <aside className="w-72 border-r border-white/5 bg-slate-900/20 p-6 space-y-6 overflow-y-auto">
                    <div>
                        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Node Palette</h3>
                        <div className="space-y-3">
                            {Object.entries(nodeTypes).map(([key, type]) => {
                                const Icon = type.icon
                                return (
                                    <div
                                        key={key}
                                        className="p-4 bg-slate-900/60 border border-white/5 rounded-xl cursor-grab active:cursor-grabbing hover:border-white/10 transition-colors group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn("p-2 rounded-lg bg-slate-800")}>
                                                <Icon className={cn("w-4 h-4 text-slate-400")} />
                                            </div>
                                            <span className="text-sm font-semibold">{type.label}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </aside>

                {/* Canvas Area */}
                <main className="flex-1 relative p-12 overflow-y-auto">
                    <div className="max-w-xl mx-auto space-y-4">
                        {nodes.map((node, index) => {
                            const type = nodeTypes[node.type]
                            const Icon = type.icon
                            return (
                                <React.Fragment key={node.id}>
                                    <div className="group relative">
                                        <div className="p-6 bg-slate-900 border border-white/10 rounded-2xl shadow-xl flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={cn("p-3 rounded-xl bg-slate-800")}>
                                                    <Icon className={cn("w-6 h-6 text-slate-400")} />
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{type.label}</div>
                                                    <div className="text-lg font-bold text-white">{node.label}</div>
                                                </div>
                                            </div>
                                            <Settings className="w-5 h-5 text-slate-600 cursor-pointer" />
                                        </div>
                                    </div>
                                    {index < nodes.length - 1 && (
                                        <div className="flex justify-center py-2">
                                            <div className="w-px h-8 bg-gradient-to-b from-blue-500/50 to-transparent" />
                                        </div>
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </div>
                </main>

                {/* Backtest Panel */}
                <aside className="w-80 border-l border-white/5 bg-slate-900/40 p-6 flex flex-col">
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Simulation</h3>
                    <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                        <div className="text-xs text-blue-400 font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" /> Performance (30D)
                        </div>
                        <div className="text-xl font-bold text-white">71% Accuracy</div>
                    </div>
                </aside>
            </div>
        </div>
    )
}
