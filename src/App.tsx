import React, { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Dashboard from './screens/Dashboard'
import Onboarding from './screens/Onboarding'
import Auth from './screens/Auth'
import AssetDeepDive from './screens/AssetDeepDive'
import AgentBuilder from './screens/AgentBuilder'
import OpportunityDetail from './screens/OpportunityDetail'
import AlertHistory from './screens/AlertHistory'
import MainLayout from './components/MainLayout'

export default function App() {
    const [session, setSession] = useState<any>(null)
    const [profile, setProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [view, setView] = useState('dashboard')

    useEffect(() => {
        // Check for session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            if (session) fetchProfile(session.user.id)
            else setLoading(false)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            if (session) fetchProfile(session.user.id)
            else {
                setProfile(null)
                setLoading(false)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    const fetchProfile = async (userId: string) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()

        if (!data && !error) {
            // Handle profile creation/linking if needed
            const pendingTelegramId = localStorage.getItem('pending_telegram_id')
            if (pendingTelegramId) {
                const { data: newProfile } = await supabase
                    .from('profiles')
                    .insert([{ id: userId, telegram_id: pendingTelegramId }])
                    .select()
                    .single()
                setProfile(newProfile)
                localStorage.removeItem('pending_telegram_id')
            }
        } else {
            setProfile(data)
        }
        setLoading(false)
    }

    const handleCompleteOnboarding = () => {
        setView('dashboard')
    }

    if (loading) {
        return (
            <div className="h-screen w-screen bg-[#E3E9F0] flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 bg-black rounded-2xl animate-bounce flex items-center justify-center text-white rotate-6">
                        <span className="font-black text-2xl tracking-tighter italic">ff.</span>
                    </div>
                </div>
            </div>
        )
    }

    if (!session) {
        return <Auth />
    }

    // Default to onboarding if no profile or username
    const needsOnboarding = !profile || !profile.username

    const renderViewContent = () => {
        switch (view) {
            case 'dashboard':
                return <Dashboard
                    onOpenAsset={(id) => setView('deepdive')}
                    onOpenOpportunity={(id) => setView('opportunity')}
                    onOpenHistory={() => setView('history')}
                />
            case 'deepdive':
                return <AssetDeepDive onBack={() => setView('dashboard')} />
            case 'agentbuilder':
                return <AgentBuilder />
            case 'opportunity':
                return <OpportunityDetail onBack={() => setView('dashboard')} />
            case 'history':
                return <AlertHistory />
            default:
                return <Dashboard
                    onOpenAsset={(id) => setView('deepdive')}
                    onOpenOpportunity={(id) => setView('opportunity')}
                    onOpenHistory={() => setView('history')}
                />
        }
    }

    if (needsOnboarding && view !== 'dashboard' && view !== 'history') {
        // Optional: Force onboarding if profile is incomplete
        // return <Onboarding onComplete={handleCompleteOnboarding} />
    }

    return (
        <MainLayout activeView={view} onViewChange={setView}>
            {renderViewContent()}
        </MainLayout>
    )
}
