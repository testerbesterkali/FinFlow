import React, { useState } from 'react'
import { cn } from '../lib/utils'
import {
    Briefcase,
    Layout,
    Bell,
    MessageCircle,
    ChevronRight,
    TrendingUp,
    Search,
    Plus
} from 'lucide-react'

export default function Dashboard({ onSelectAsset, onOpenAgents, onOpenRadar, onOpenHistory }) {
    return (
        <div className="flex flex-col gap-12 pt-4 page-transition">
            {/* Hero Greeting */}
            <div>
                <h1 className="text-6xl font-black text-slate-950 tracking-tight leading-tight">Good morning, James.</h1>
                <p className="text-xl text-slate-500 font-medium">Your portfolio is outperforming the benchmark by <span className="text-emerald-500 font-bold">+4.2%</span> today.</p>
            </div>

            {/* Primary KPI Cards (Bigger) */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <HeaderCard label="Net Liquidity" value="$143,624" subtext="Institutional Balances" color="blue" />
                <HeaderCard label="Daily Alpha" value="+2.41%" subtext="vs SPX 500 Index" color="emerald" />
                <HeaderCard label="Agent Coverage" value="92.4%" subtext="12 Active Nodes" color="purple" />
                <HeaderCard label="Alert Efficiency" value="98%" subtext="Zero Latency Streak" color="amber" />
            </section>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Chart / Market State */}
                <div className="lg:col-span-2 space-y-12">
                    <div className="premium-card p-12 bg-white shadow-xl flex flex-col gap-10">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-black text-slate-900">Market Regime</h3>
                                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Global Volatility Index (GVI)</p>
                            </div>
                            <div className="flex items-center gap-6 text-xs font-black text-slate-400">
                                <span className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-slate-900" /> Current</span>
                                <span className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-blue-400" /> Projected</span>
                            </div>
                        </div>
                        <div className="h-[320px] w-full relative">
                            <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
                                <path d="M0,150 C200,50 400,250 600,100 C800,200 1000,50" fill="none" stroke="#1A1D21" strokeWidth="6" />
                                <path d="M0,180 C200,80 400,280 600,130 C800,230 1000,80" fill="none" stroke="#60A5FA" strokeWidth="3" strokeDasharray="12,6" />
                            </svg>
                        </div>
                        <div className="flex justify-between text-xs font-black text-slate-400 tracking-[0.3em] uppercase px-4 border-t border-slate-50 pt-8">
                            <span>Feb 14</span>
                            <span>Feb 16</span>
                            <span>Feb 18</span>
                            <span>Feb 20</span>
                        </div>
                    </div>

                    {/* Watchlist Section (Bigger rows) */}
                    <div className="premium-card p-12 bg-white/40">
                        <div className="flex justify-between items-center mb-12">
                            <h3 className="text-3xl font-black tracking-tight">Watchlist</h3>
                            <div className="flex gap-4">
                                <div className="relative">
                                    <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input type="text" placeholder="Search Markets..." className="bg-white border border-slate-200 rounded-full pl-14 pr-6 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-500/10 outline-none w-72 transition-all focus:w-96" />
                                </div>
                                <button className="glass-button w-14 h-14 rounded-full flex items-center justify-center"><Plus size={24} className="text-slate-900" /></button>
                            </div>
                        </div>
                        <div className="space-y-6">
                            {['AAPL', 'BTC', 'TSLA', 'SMCI'].map((sym) => (
                                <div
                                    key={sym}
                                    onClick={() => onSelectAsset?.(sym)}
                                    className="flex items-center justify-between p-8 bg-white/60 hover:bg-white rounded-[2.5rem] border border-transparent hover:border-slate-200 transition-all cursor-pointer group shadow-sm hover:shadow-lg"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-3xl bg-black flex items-center justify-center font-black text-white text-xl shadow-lg">{sym[0]}</div>
                                        <div>
                                            <div className="text-2xl font-black text-slate-900">{sym}</div>
                                            <div className="text-[11px] text-slate-400 uppercase font-black tracking-widest">{sym === 'BTC' ? 'Cryptocurrency' : 'Technology Equity'}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-12 pr-4">
                                        <div className="text-right">
                                            <div className="text-2xl font-black font-mono tracking-tight">$185.40</div>
                                            <div className="text-xs text-emerald-500 font-extrabold">+1.24% today</div>
                                        </div>
                                        <ChevronRight size={24} className="text-slate-300 group-hover:text-black group-hover:translate-x-2 transition-all" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Info Panel */}
                <aside className="space-y-12">
                    <div className="bg-black text-white rounded-[3.5rem] p-12 flex flex-col gap-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 blur-[100px] group-hover:bg-blue-500/40 transition-all duration-700" />
                        <div className="space-y-1">
                            <h4 className="font-black text-3xl tracking-tight">Agent Status</h4>
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Optimizing Breakout Nodes</div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white/10 h-3 rounded-full relative overflow-hidden shadow-inner">
                                <div className="bg-white h-full w-3/4 rounded-full shadow-[0_0_20px_white]" />
                            </div>
                            <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
                                <span>Processing</span>
                                <span>75%</span>
                            </div>
                        </div>

                        <div className="text-center py-6 bg-white/5 rounded-[2rem] border border-white/5">
                            <div className="text-slate-400 text-xs mb-1 uppercase tracking-[0.2em] font-black">Success Confidence</div>
                            <div className="text-5xl font-black tracking-tighter">84<span className="text-xl text-blue-400 font-bold ml-1">%</span></div>
                        </div>

                        <button
                            onClick={onOpenAgents}
                            className="w-full py-6 bg-white text-black font-black text-lg rounded-[2rem] hover:bg-slate-100 transition-all shadow-2xl active:scale-95 translate-y-0 hover:-translate-y-1"
                        >
                            Configure Fleet
                        </button>
                    </div>

                    {/* Alerts List (Bigger) */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4 ml-2">Recent Logic Matches</h4>
                        {[
                            { label: 'Macro Vol Expansion', time: '2h ago', status: 'Acted' },
                            { label: 'BTC Trend Breakout', time: '4h ago', status: 'Acted' },
                            { label: 'Equity Liquidity Map', time: '1d ago', status: 'Dismissed' }
                        ].map((alert, i) => (
                            <div key={i} className="flex items-center gap-6 p-6 bg-white/60 rounded-[2.5rem] hover:bg-white transition-all border border-transparent hover:border-slate-200 group cursor-pointer shadow-sm">
                                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-black group-hover:text-white transition-all">
                                    <TrendingUp size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-lg font-black text-slate-900 leading-tight">{alert.label}</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{alert.time}</div>
                                </div>
                                <ChevronRight size={18} className="text-slate-200 group-hover:text-black transition-all" />
                            </div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="premium-card p-12 bg-slate-950 text-white relative overflow-hidden group cursor-pointer">
                        <div className="absolute inset-0 bg-blue-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h4 className="text-2xl font-black mb-4 gap-2 flex items-center">FinFlow Elite <span className="px-2 py-0.5 bg-blue-500 text-[10px] rounded uppercase">Pro</span></h4>
                        <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8">
                            Access ultra-low latency data feeds and institutional memory maps.
                        </p>
                        <div className="text-[11px] font-black text-blue-400 uppercase tracking-[0.2em]">Upgrade Membership <ChevronRight size={12} className="inline ml-1" /></div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

function HeaderCard({ label, value, subtext, color }) {
    const colorStyles = {
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
        purple: "bg-purple-50 text-purple-600 border-purple-100",
        amber: "bg-amber-50 text-amber-600 border-amber-100",
    }

    return (
        <div className="premium-card bg-white hover:bg-white p-10 flex flex-col gap-6 group hover:shadow-2xl">
            <div className={cn("px-4 py-2 w-fit rounded-xl font-black text-[10px] uppercase tracking-widest border shadow-sm", colorStyles[color])}>
                {label}
            </div>
            <div>
                <div className="text-5xl font-black tracking-tighter mb-2">{value}</div>
                <div className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em]">{subtext}</div>
            </div>
        </div>
    )
}
