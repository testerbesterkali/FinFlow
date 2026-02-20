import React, { useState } from 'react'
import { cn } from '../lib/utils'
import { Rocket, Shield, Zap, Bot, CheckCircle2 } from 'lucide-react'

const steps = [
    { id: 1, title: 'Welcome' },
    { id: 2, title: 'Telegram' },
    { id: 3, title: 'Finished' }
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
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 pb-24">
            {/* Progress Bar */}
            <div className="flex gap-2 mb-12">
                {steps.map(step => (
                    <div
                        key={step.id}
                        className={cn(
                            "h-1 w-12 rounded-full transition-all duration-300",
                            currentStep >= step.id ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" : "bg-slate-800"
                        )}
                    />
                ))}
            </div>

            <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                {currentStep === 1 && (
                    <div className="text-center">
                        <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
                            <Rocket className="text-blue-400 w-10 h-10" />
                        </div>
                        <h1 className="text-4xl font-bold mb-4">FinFlow AI</h1>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            Institutional-grade market intelligence delivered directly to your Telegram.
                        </p>
                        <button
                            onClick={nextStep}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20"
                        >
                            Get Started Free
                        </button>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="text-center">
                        <div className="w-20 h-20 bg-sky-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-sky-500/20">
                            <Shield className="text-sky-400 w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Connect Telegram</h2>
                        <div className="bg-slate-900/50 p-6 rounded-2xl mb-8 border border-white/5">
                            <button
                                onClick={nextStep}
                                className="w-full bg-[#229ED9] hover:bg-[#28b3f7] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3"
                            >
                                Link to @FinFlowAIBot
                            </button>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="text-center">
                        <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold mb-2">Ready to Go!</h2>
                        <button
                            onClick={onComplete}
                            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                )}
            </div>

            {/* Footer Disclaimer */}
            <footer className="fixed bottom-0 left-0 right-0 p-6 bg-slate-950/80 backdrop-blur-md border-t border-white/5">
                <p className="max-w-2xl mx-auto text-[10px] text-slate-600 text-center leading-tight">
                    ⚖️ FinFlow AI provides financial information for educational purposes only.
                </p>
            </footer>
        </div>
    )
}
