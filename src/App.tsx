import React, { useState } from 'react'
import Dashboard from './screens/Dashboard'
import Onboarding from './screens/Onboarding'
import AssetDeepDive from './screens/AssetDeepDive'
import AgentBuilder from './screens/AgentBuilder'
import OpportunityDetail from './screens/OpportunityDetail'
import AlertHistory from './screens/AlertHistory'
import MainLayout from './components/MainLayout'

export default function App() {
    const [view, setView] = useState('onboarding')

    const handleCompleteOnboarding = () => {
        setView('dashboard')
    }

    // Define content based on view
    const renderViewContent = () => {
        switch (view) {
            case 'dashboard':
                return <Dashboard
                    onOpenAsset={(id) => setView('deepdive')}
                    onOpenOpportunity={(id) => setView('opportunity')}
                    onOpenHistory={() => setView('history')}
                />
            case 'deepdive':
                return <AssetDeepDive />
            case 'agentbuilder':
                return <AgentBuilder />
            case 'opportunity':
                return <OpportunityDetail />
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

    if (view === 'onboarding') {
        return <Onboarding onComplete={handleCompleteOnboarding} />
    }

    return (
        <MainLayout activeView={view} onViewChange={setView}>
            {renderViewContent()}
        </MainLayout>
    )
}
