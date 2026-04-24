import React from 'react';
import { TicketProvider, useTicketContext } from './context/TicketContext';
import TicketCard from './components/ticket/TicketCard';
import StateFlow from './components/ticket/StateFlow';

const Dashboard = () => {
    const { ticket } = useTicketContext();

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Helpdesk System</h1>
                <p>Simulación de UI en tiempo real</p>
            </header>

            <main className="main-content" style={{ justifyContent: 'center', backgroundColor: '#0f172a' }}>
                <div className="panel" style={{ maxWidth: '800px', borderRight: 'none', margin: '0 auto', backgroundColor: 'transparent' }}>
                    <div className="panel-header" style={{ borderRadius: '12px 12px 0 0', marginTop: '2rem' }}>
                        <h2>UI Cliente / Técnico</h2>
                    </div>
                    <div className="panel-content" style={{ backgroundColor: '#0b1120', borderRadius: '0 0 12px 12px', border: '1px solid #475569', borderTop: 'none' }}>
                        {ticket && <StateFlow currentState={ticket.state} />}
                        <TicketCard />
                    </div>
                </div>
            </main>
        </div>
    );
};

const App = () => {
    return (
        <TicketProvider>
            <Dashboard />
        </TicketProvider>
    );
};

export default App;
