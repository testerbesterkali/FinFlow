import React from 'react'
import { cn } from '../lib/utils'
import {
    Home,
    Briefcase,
    Layers,
    Mail,
    PieChart,
    Layout as AgentIcon,
    Settings,
    Bell,
    MessageCircle,
    ChevronDown,
    History
} from 'lucide-react'

const sidebarItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard' },
    { icon: Briefcase, label: 'Portfolio', id: 'portfolio' },
    { icon: Layers, label: 'Radar', id: 'radar' },
    { icon: Mail, label: 'Messages', id: 'messages' },
    { icon: PieChart, label: 'Analytics', id: 'analytics' },
    { icon: History, label: 'History', id: 'history' },
    { icon: AgentIcon, label: 'Agents', id: 'agentbuilder' },
]

interface MainLayoutProps {
    children: React.ReactNode
    activeView: string
    onViewChange: (view: string) => void
}

export default function MainLayout({ children, activeView, onViewChange }: MainLayoutProps) {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[#E3E9F0]">
            {/* Sidebar (Deep Navy/Black, Sharper) */}
            <aside className="w-[100px] bg-[#0A0D12] flex flex-col items-center py-10 gap-8 shrink-0 border-r border-white/5">
                <div className="text-white font-black text-xl mb-6 italic tracking-tighter hover:scale-110 transition-transform cursor-pointer">ff.</div>

                <div className="flex-1 flex flex-col gap-5">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon
                        const isActive = activeView === item.id || (activeView === 'deepdive' && item.id === 'dashboard')
                        return (
                            <div
                                key={item.id}
                                onClick={() => onViewChange(item.id)}
                                className={cn(
                                    "sidebar-icon group relative w-12 h-12",
                                    isActive && "sidebar-icon-active"
                                )}
                            >
                                <Icon size={20} />
                                <span className="absolute left-full ml-4 px-3 py-1.5 bg-[#1A1F26] text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-xl border border-white/5">
                                    {item.label}
                                </span>
                                {isActive && (
                                    <div className="absolute -left-3 w-1 h-6 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className="sidebar-icon w-12 h-12 mt-auto">
                    <Settings size={20} />
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar (Consistent Header) */}
                <header className="px-10 py-6 flex items-center justify-between bg-white/30 backdrop-blur-md border-bottom border-white/20 flex-shrink-0 z-40">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_#10B981]" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.25em]">Live Institutional Feed</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <button className="p-2.5 hover:bg-white/80 rounded-xl transition-all border border-transparent hover:border-white/40"><MessageCircle size={18} className="text-slate-500" /></button>
                            <button onClick={() => onViewChange('history')} className="p-2.5 hover:bg-white/80 rounded-xl transition-all relative border border-transparent hover:border-white/40">
                                <Bell size={18} className="text-slate-500" />
                                <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#E3E9F0]" />
                            </button>
                        </div>
                        <div className="h-8 w-[1px] bg-slate-200" />
                        <div className="flex items-center gap-3 bg-white/60 p-1 pr-4 rounded-full border border-white/40 shadow-sm cursor-pointer hover:bg-white/90 transition-all group">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=James" className="w-8 h-8 rounded-full border border-white shadow-sm" alt="avatar" />
                            <span className="text-[13px] font-bold text-slate-700">James W.</span>
                            <ChevronDown size={12} className="text-slate-400 group-hover:text-black transition-colors" />
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <main className="flex-1 overflow-y-auto px-10 pb-10 pt-8 scrollbar-none">
                    {children}
                </main>
            </div>
        </div>
    )
}
