import React from 'react'
import { cn } from '../lib/utils'
import {
    Home,
    Briefcase,
    Layers,
    Mail,
    PieChart,
    Users as UsersIcon,
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
            {/* Sidebar (Black, Minimal) */}
            <aside className="w-[120px] bg-black flex flex-col items-center py-12 gap-10 shrink-0">
                <div className="text-white font-black text-2xl mb-8 italic tracking-tighter">df</div>

                <div className="flex-1 flex flex-col gap-6">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon
                        const isActive = activeView === item.id || (activeView === 'deepdive' && item.id === 'dashboard')
                        return (
                            <div
                                key={item.id}
                                onClick={() => onViewChange(item.id)}
                                className={cn(
                                    "sidebar-icon group relative w-14 h-14",
                                    isActive && "sidebar-icon-active"
                                )}
                            >
                                <Icon size={24} />
                                <span className="absolute left-full ml-6 px-3 py-1.5 bg-black text-white text-[11px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-2xl">
                                    {item.label}
                                </span>
                                {isActive && (
                                    <div className="absolute -left-2 w-1.5 h-8 bg-white rounded-r-full shadow-[0_0_15px_white]" />
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className="sidebar-icon w-14 h-14 mt-auto">
                    <Settings size={24} />
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar (Consistent Header) */}
                <header className="px-12 py-8 flex items-center justify-between bg-transparent flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10B981]" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Institutional System Live</span>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4">
                            <button className="p-3 hover:bg-white/80 rounded-2xl transition-all border border-transparent hover:border-white/40"><MessageCircle size={22} className="text-slate-500" /></button>
                            <button onClick={() => onViewChange('history')} className="p-3 hover:bg-white/80 rounded-2xl transition-all relative border border-transparent hover:border-white/40">
                                <Bell size={22} className="text-slate-500" />
                                <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#E3E9F0]" />
                            </button>
                        </div>
                        <div className="flex items-center gap-3 bg-white/60 p-1.5 pr-4 rounded-full border border-white/40 shadow-sm cursor-pointer hover:bg-white/90 transition-all group">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=James" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="avatar" />
                            <span className="text-sm font-bold text-slate-700">James W.</span>
                            <ChevronDown size={14} className="text-slate-400 group-hover:text-black transition-colors" />
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <main className="flex-1 overflow-y-auto px-12 pb-12 scrollbar-none">
                    {children}
                </main>
            </div>
        </div>
    )
}
