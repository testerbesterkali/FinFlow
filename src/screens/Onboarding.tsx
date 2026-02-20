import React, { useState } from 'react'
import { cn } from '../lib/utils'
import { Rocket, Shield, Bot, CheckCircle2, ChevronRight, Zap } from 'lucide-react'

const steps = [
    { id: 1, title: 'Experience' },
    { id: 2, title: 'Connectivity' },
    { id: 3, title: 'Activation' }
]

interface OnboardingProps {
    onComplete?: () => void
}

export default function Onboarding({ onComplete }: OnboardingProps) {
    const [currentStep, setCurrentStep] = useState(1)

    const nextStep = () => {
        if (currentStep === 3) {
            onComplete?.()
        } else {
            setCurrentStep(prev => prev + 1)
        }
    }

    return (
        <div className="min-h-screen bg-[#E3E9F0] text-slate-900 flex flex-col items-center justify-center p-8 overflow-hidden relative">
            {/* Abstract Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

            {/* Main Container */}
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center page-transition">

                {/* Left Side: Branding & Info */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3 text-2xl font-black text-black tracking-tighter italic">
                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white rotate-3">
                            <Zap size={20} />
                        </div>
                        finflow
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-950 leading-[0.9]">
                        Institutional <br />
                        <span className="text-blue-600 italic">intelligence</span> <br />
                        for all.
                    </h1>

                    <p className="text-lg text-slate-500 leading-relaxed max-w-sm">
                        Autonomous market monitoring. AI-powered FICC analysis. Direct to your Telegram, 24/7.
                    </p>

                    <div className="flex gap-4 items-center pt-8">
                        {steps.map(s => (
                            <div key={s.id} className={cn(
                                "h-1.5 transition-all duration-500 rounded-full",
                                currentStep === s.id ? "w-12 bg-black" : "w-6 bg-slate-300"
                            )} />
                        ))}
                    </div>
                </div>

                {/* Right Side: Interactive Card */}
                <div className="premium-card bg-white p-12 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
                    {currentStep === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="w-24 h-24 bg-blue-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-blue-100">
                                <Rocket className="text-blue-600 w-10 h-10" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Welcome to Alpha</h2>
                            <p className="text-slate-500 mb-10 leading-relaxed">
                                FinFlow agents monitor global markets while you sleep. Set triggers, get results.
                            </p>
                            <button
                                onClick={nextStep}
                                className="w-full bg-black text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 group transition-all hover:pr-4"
                            >
                                Continue <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="w-24 h-24 bg-sky-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-sky-100">
                                <Shield className="text-sky-600 w-10 h-10" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Native Telegram</h2>
                            <p className="text-slate-500 mb-10 leading-relaxed">
                                No new apps to install. Our intelligence stream sits right in your chat.
                            </p>
                            <button
                                onClick={nextStep}
                                className="w-full bg-[#229ED9] text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all"
                            >
                                Setup @FinFlowAIBot
                            </button>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-300 text-center">
                            <div className="relative mb-8">
                                <CheckCircle2 className="w-24 h-24 text-emerald-500 mx-auto" />
                                <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Ready for Launch</h2>
                            <p className="text-slate-500 mb-10 leading-relaxed">
                                Your personalized market stream is ready. Enter the command center.
                            </p>
                            <button
                                onClick={onComplete}
                                className="w-full bg-black text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-black/10 active:scale-95 translate-y-0 hover:-translate-y-1"
                            >
                                Enter Dashboard
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Simple Footer */}
            <footer className="fixed bottom-12 flex gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Term of Use</span>
                <span>Privacy Policy</span>
                <span>FinFlow AI © 2026</span>
            </footer>
        </div>
    )
}
