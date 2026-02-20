import React, { useState } from 'react'
import { cn } from '../lib/utils'
import { Rocket, Shield, CheckCircle2, ChevronRight, Zap } from 'lucide-react'

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
        <div className="min-h-screen bg-[#E3E9F0] text-slate-900 flex flex-col items-center justify-center p-10 overflow-hidden relative">
            {/* Abstract Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

            {/* Main Container */}
            <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center page-transition relative z-10">

                {/* Left Side: Branding & Info */}
                <div className="lg:col-span-7 space-y-10">
                    <div className="flex items-center gap-3 text-xl font-black text-black tracking-tighter italic">
                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white rotate-2 shadow-lg">
                            <Zap size={20} />
                        </div>
                        finflow.ai
                    </div>

                    <h1 className="text-6xl lg:text-[84px] font-black tracking-tight text-slate-950 leading-[0.85]">
                        Institutional <br />
                        <span className="text-blue-600 italic">intelligence</span> <br />
                        for everyone.
                    </h1>

                    <p className="text-xl text-slate-500 leading-relaxed max-w-md font-medium">
                        Autonomous market monitoring. AI-powered FICC analysis. Direct to your Telegram, 24/7.
                    </p>

                    <div className="flex gap-4 items-center pt-4">
                        {steps.map(s => (
                            <div key={s.id} className={cn(
                                "h-1.5 transition-all duration-700 rounded-full",
                                currentStep === s.id ? "w-16 bg-blue-600" : "w-6 bg-slate-300"
                            )} />
                        ))}
                    </div>
                </div>

                {/* Right Side: Interactive Card */}
                <div className="lg:col-span-5 premium-card bg-white p-12 shadow-huge relative overflow-hidden flex flex-col items-center text-center border border-white/80">
                    {currentStep === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500 w-full">
                            <div className="w-24 h-24 bg-blue-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-blue-100">
                                <Rocket className="text-blue-600 w-10 h-10" />
                            </div>
                            <h2 className="text-3xl font-black mb-4 tracking-tight">Welcome to Alpha</h2>
                            <p className="text-lg text-slate-500 mb-10 leading-relaxed font-medium">
                                FinFlow agents monitor global markets while you sleep. Set triggers, get results.
                            </p>
                            <button
                                onClick={nextStep}
                                className="w-full bg-black text-white font-black text-base py-6 rounded-2xl flex items-center justify-center gap-3 group transition-all hover:bg-slate-900 active:scale-95"
                            >
                                Continue <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500 w-full">
                            <div className="w-24 h-24 bg-sky-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-sky-100">
                                <Shield className="text-sky-600 w-10 h-10" />
                            </div>
                            <h2 className="text-3xl font-black mb-4 tracking-tight">Native Telegram</h2>
                            <p className="text-lg text-slate-500 mb-10 leading-relaxed font-medium">
                                No new apps to install. Our intelligence stream sits right in your chat.
                            </p>
                            <button
                                onClick={nextStep}
                                className="w-full bg-[#229ED9] text-white font-black text-base py-6 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all"
                            >
                                Setup @FinFlowAIBot
                            </button>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500 text-center w-full">
                            <div className="relative mb-8">
                                <CheckCircle2 className="w-24 h-24 text-emerald-500 mx-auto" />
                                <div className="absolute inset-0 bg-emerald-500/10 blur-2xl rounded-full" />
                            </div>
                            <h2 className="text-3xl font-black mb-4 tracking-tight">Ready for Launch</h2>
                            <p className="text-lg text-slate-500 mb-10 leading-relaxed font-medium">
                                Your personalized market stream is ready. Enter the command center.
                            </p>
                            <button
                                onClick={onComplete}
                                className="w-full bg-black text-white font-black text-base py-6 rounded-2xl transition-all hover:shadow-xl active:scale-95"
                            >
                                Enter Dashboard
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Simple Footer */}
            <footer className="fixed bottom-10 flex gap-10 text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em]">
                <span className="hover:text-black cursor-pointer transition-colors">Terms of Use</span>
                <span className="hover:text-black cursor-pointer transition-colors">Privacy Policy</span>
                <span>FinFlow AI © 2026</span>
            </footer>
        </div>
    )
}
