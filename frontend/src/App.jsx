import React, { useState } from 'react';
import { TicketProvider, useTicketContext } from './context/TicketContext';
import TicketCard from './components/ticket/TicketCard';
import StateFlow from './components/ticket/StateFlow';
import CodeViewer from './components/ticket/CodeViewer';

// Code snippets to display
const codeSnippets = {
    Ticket: `public class Ticket {
    private String id;
    private TicketState state;
    private int escalationLevel;
    // ... other fields
    
    public void assign(String technician) {
        // Delegates the action to the current state without using a single IF
        state.assign(this, technician);
    }
    
    public void cancel(String reason) {
        state.cancel(this, reason);
    }
    // ... other delegated methods
}`,
    OpenState: `public class OpenState implements TicketState {
    public void assign(Ticket ticket, String technician) {
        ticket.setAssignedTechnician(technician);
        ticket.setState(new AssignedState());
    }

    public void resolve(Ticket ticket, String solution) {
        throw new IllegalStateException("Cannot be resolved without diagnosis");
    }
    
    public void cancel(Ticket ticket, String reason) {
        ticket.setSolution("Cancelled: " + reason);
        ticket.setState(new CancelledState());
    }
}`,
    ResolvedState: `public class ResolvedState implements TicketState {
    public void reopen(Ticket ticket, String reason) {
        ticket.setReopenCount(ticket.getReopenCount() + 1);
        
        // Auto-escalation logic on multiple reopens
        if (ticket.getReopenCount() >= 2) {
            ticket.setEscalationLevel(ticket.getEscalationLevel() + 1);
            ticket.setState(new EscalatedState());
        } else {
            ticket.setState(new ReopenedState());
        }
    }
}`,
    TicketController: `@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    // REST Controllers clean of conditional logic
    @PostMapping("/{id}/assign")
    public ResponseEntity<TicketDTO> assignTicket(@PathVariable String id, @RequestBody Map<String, String> p) {
        return ResponseEntity.ok(ticketService.assignTicket(id, p.get("technician")));
    }
}`
};

const Dashboard = () => {
    const { ticket } = useTicketContext();
    const [activeTab, setActiveTab] = useState('Ticket');

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Helpdesk State Pattern Demo</h1>
                <p>Simulación de UI vs Código Backend en tiempo real</p>
            </header>

            <main className="main-content">
                <div className="panel left-panel">
                    <div className="panel-header">
                        <h2>UI Cliente / Técnico</h2>
                    </div>
                    <div className="panel-content">
                        {ticket && <StateFlow currentState={ticket.state} />}
                        <TicketCard />
                    </div>
                </div>

                <div className="panel right-panel">
                    <div className="panel-header">
                        <h2>Código Backend (Java)</h2>
                        <div className="tabs">
                            {Object.keys(codeSnippets).map(tab => (
                                <button 
                                    key={tab} 
                                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}.java
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="panel-content code-panel">
                        <CodeViewer 
                            code={codeSnippets[activeTab]} 
                            title={`${activeTab}.java`} 
                        />
                        
                        <div className="context-explanation">
                            <h3>¿Por qué este código?</h3>
                            <p>
                                {activeTab === 'Ticket' && "El 'Contexto' en el Patrón State. Observa cómo no hay condicionales (if/else o switch). Toda la lógica se delega al objeto de estado actual."}
                                {activeTab === 'OpenState' && "Un 'Estado Concreto'. Implementa solo lo que tiene sentido para un ticket abierto (como la nueva funcionalidad de Cancelar). Intenta llamar a métodos inválidos y lanzará excepción."}
                                {activeTab === 'ResolvedState' && "Aquí vemos lógica de negocio rica: si el ticket se reabre múltiples veces, el estado Resuelto decide transicionar directamente a Escalado, saltándose el flujo normal."}
                                {activeTab === 'TicketController' && "La capa REST queda extremadamente limpia. El controlador simplemente pasa la petición al dominio, sin preocuparse de validar si el ticket puede o no realizar la acción."}
                            </p>
                        </div>
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
