import React, { useState } from 'react'
import Onboarding from './screens/Onboarding'
import Dashboard from './screens/Dashboard'
import AssetDeepDive from './screens/AssetDeepDive'
import AgentBuilder from './screens/AgentBuilder'
import OpportunityDetail from './screens/OpportunityDetail'
import AlertHistory from './screens/AlertHistory'

function App() {
    const [view, setView] = useState('onboarding') // onboarding | dashboard | deepdive | agentbuilder | radar | history
    const [selectedAsset, setSelectedAsset] = useState('AAPL')

    return (
        <div className="min-h-screen bg-slate-950">
            {view === 'onboarding' && (
                <Onboarding onComplete={() => setView('dashboard')} />
            )}

            {view === 'dashboard' && (
                <Dashboard
                    onSelectAsset={(symbol: string) => {
                        setSelectedAsset(symbol)
                        setView('deepdive')
                    }}
                    onOpenAgents={() => setView('agentbuilder')}
                    onOpenRadar={() => setView('radar')}
                    onOpenHistory={() => setView('history')}
                />
            )}

            {view === 'deepdive' && (
                <AssetDeepDive
                    symbol={selectedAsset}
                    onBack={() => setView('dashboard')}
                />
            )}

            {view === 'agentbuilder' && (
                <AgentBuilder onBack={() => setView('dashboard')} />
            )}

            {view === 'radar' && (
                <OpportunityDetail onBack={() => setView('dashboard')} />
            )}

            {view === 'history' && (
                <AlertHistory onBack={() => setView('dashboard')} />
            )}
        </div>
    )
}

export default App
