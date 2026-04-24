import React, { useState } from 'react';
import { useTicketContext } from '../../context/TicketContext';
import { getStateColor } from '../../utils/stateColors';
import SlaBar from './SlaBar';

const TicketCard = () => {
    const { ticket, actions, loading, error } = useTicketContext();
    const [tecnicoInput, setTecnicoInput] = useState('');
    const [solucionInput, setSolucionInput] = useState('');

    if (!ticket) {
        return (
            <div className="ticket-card empty">
                <h2>No hay ticket seleccionado</h2>
                <button 
                    className="btn primary" 
                    onClick={() => actions.crear({ title: 'Problema de Red', description: 'No hay internet en el piso 3', client: 'Empresa XYZ' })}
                    disabled={loading}
                >
                    {loading ? 'Creando...' : 'Simular Creación de Ticket'}
                </button>
            </div>
        );
    }

    const estadoColor = getStateColor(ticket.state);

    return (
        <div className="ticket-card">
            <div className="ticket-header">
                <div className="ticket-title-group">
                    <span className="ticket-id">#{ticket.id}</span>
                    <h2 className="ticket-title">{ticket.title}</h2>
                </div>
                <div 
                    className="ticket-badge" 
                    style={{ backgroundColor: `${estadoColor}20`, color: estadoColor, borderColor: estadoColor }}
                >
                    {ticket.state}
                </div>
            </div>

            <SlaBar 
                fechaCreacion={ticket.creationDate} 
                fechaVencimiento={ticket.slaDueDate} 
                estado={ticket.state}
            />

            <div className="ticket-details">
                <div className="detail-row">
                    <span className="detail-label">Cliente:</span>
                    <span className="detail-value">{ticket.client}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Descripción:</span>
                    <span className="detail-value">{ticket.description}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Técnico Asignado:</span>
                    <span className="detail-value">{ticket.assignedTechnician || 'Sin asignar'}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Nivel de Escalado:</span>
                    <span className="detail-value">Nivel {ticket.escalationLevel}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Reaperturas:</span>
                    <span className="detail-value">{ticket.reopenCount}</span>
                </div>
                {ticket.solution && (
                    <div className="detail-row solution">
                        <span className="detail-label">Solución / Motivo:</span>
                        <span className="detail-value">{ticket.solution}</span>
                    </div>
                )}
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="ticket-actions">
                {ticket.state === 'Abierto' && (
                    <div className="action-group">
                        <input 
                            type="text" 
                            placeholder="Nombre del técnico" 
                            value={tecnicoInput} 
                            onChange={(e) => setTecnicoInput(e.target.value)} 
                        />
                        <button className="btn primary" onClick={() => actions.asignar(ticket.id, tecnicoInput)} disabled={loading || !tecnicoInput}>
                            Asignar Técnico
                        </button>
                        <button className="btn danger outline" onClick={() => {
                            const motivo = prompt("Motivo de cancelación:");
                            if (motivo) actions.cancelar(ticket.id, motivo);
                        }} disabled={loading}>
                            Cancelar Ticket
                        </button>
                    </div>
                )}

                {(ticket.state === 'Asignado' || ticket.state === 'Escalado') && (
                    <div className="btn-row">
                        <button className="btn warning" onClick={() => actions.diagnosticar(ticket.id)} disabled={loading}>
                            Empezar Diagnóstico
                        </button>
                        {ticket.state === 'Asignado' && (
                            <button className="btn danger outline" onClick={() => {
                                const motivo = prompt("Motivo de cancelación:");
                                if (motivo) actions.cancelar(ticket.id, motivo);
                            }} disabled={loading}>
                                Cancelar Ticket
                            </button>
                        )}
                    </div>
                )}

                {ticket.state === 'En Diagnóstico' && (
                    <div className="action-group full-width">
                        <input 
                            type="text" 
                            placeholder="Describa la solución" 
                            value={solucionInput} 
                            onChange={(e) => setSolucionInput(e.target.value)} 
                        />
                        <div className="btn-row">
                            <button className="btn success" onClick={() => actions.resolver(ticket.id, solucionInput)} disabled={loading || !solucionInput}>
                                Resolver Ticket
                            </button>
                            <button className="btn danger" onClick={() => {
                                const motivo = prompt("Motivo del escalado:");
                                if (motivo) actions.escalar(ticket.id, motivo);
                            }} disabled={loading}>
                                Escalar
                            </button>
                        </div>
                    </div>
                )}

                {ticket.state === 'Resuelto' && (
                    <div className="btn-row">
                        <button className="btn secondary" onClick={() => actions.cerrar(ticket.id)} disabled={loading}>
                            Cerrar Definitivamente
                        </button>
                        <button className="btn danger outline" onClick={() => {
                            const motivo = prompt("Motivo de la reapertura:");
                            if (motivo) actions.reabrir(ticket.id, motivo);
                        }} disabled={loading}>
                            Reabrir Ticket
                        </button>
                    </div>
                )}
                
                {ticket.state === 'Cancelado' && (
                    <div className="error-message" style={{textAlign: 'center', borderColor: '#475569', color: '#94a3b8'}}>
                        Este ticket ha sido cancelado y ya no permite acciones.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketCard;
