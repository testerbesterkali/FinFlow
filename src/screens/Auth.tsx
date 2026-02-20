import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Zap, Mail, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'
import { cn } from '../lib/utils'

export default function Auth() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [telegramLinking, setTelegramLinking] = useState(false)

    useEffect(() => {
        // Handle Telegram Linking from URL params
        const params = new URLSearchParams(window.location.search)
        const telegramId = params.get('telegram_id')
        if (telegramId) {
            setTelegramLinking(true)
            localStorage.setItem('pending_telegram_id', telegramId)
        }
    }, [])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: window.location.origin,
            },
        })

        if (error) {
            setError(error.message)
        } else {
            setSent(true)
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-[#E3E9F0] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-md w-full page-transition relative z-10">
                <div className="flex flex-col items-center text-center mb-10">
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white rotate-2 shadow-lg mb-6">
                        <Zap size={24} />
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-950 mb-3">Institutional Access</h1>
                    <p className="text-slate-500 font-medium">
                        {telegramLinking
                            ? "Sign in to complete your Telegram connection."
                            : "Enter your email to receive a secure access link."}
                    </p>
                </div>

                <div className="premium-card bg-white p-10 border border-white/80 shadow-huge">
                    {sent ? (
                        <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-100/50">
                                <CheckCircle2 className="text-emerald-500 w-10 h-10" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-slate-900 leading-none">Check your email</h3>
                                <p className="text-slate-500 font-medium">We've sent a magic link to <span className="text-black font-bold">{email}</span>.</p>
                            </div>
                            <button
                                onClick={() => setSent(false)}
                                className="text-blue-500 font-black text-xs uppercase tracking-widest hover:text-blue-600 transition-colors"
                            >
                                Use a different email
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-5 flex items-center text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@company.com"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 pl-14 pr-6 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-[11px] font-bold text-center">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black text-white py-5 rounded-2xl font-black text-base shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                                    <>
                                        Get Magic Link <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Institutional Intelligence for everyone.
                    </p>
                </div>
            </div>
        </div>
    )
}
