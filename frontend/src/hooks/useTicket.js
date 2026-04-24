import { useState, useCallback } from 'react';
import { ticketApi } from '../api/ticketApi';

export const useTicket = () => {
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const executeAction = async (actionFn, ...args) => {
        setLoading(true);
        setError(null);
        try {
            const updatedTicket = await actionFn(...args);
            setTicket(updatedTicket);
            return updatedTicket;
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Error al ejecutar acción');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const crear = useCallback((data) => executeAction(ticketApi.createTicket, data), []);
    const cargar = useCallback((id) => executeAction(ticketApi.getTicket, id), []);
    const asignar = useCallback((id, tecnico) => executeAction(ticketApi.assignTicket, id, tecnico), []);
    const diagnosticar = useCallback((id) => executeAction(ticketApi.startDiagnosis, id), []);
    const escalar = useCallback((id, motivo) => executeAction(ticketApi.escalateTicket, id, motivo), []);
    const resolver = useCallback((id, solucion) => executeAction(ticketApi.resolveTicket, id, solucion), []);
    const cerrar = useCallback((id) => executeAction(ticketApi.closeTicket, id), []);
    const reabrir = useCallback((id, motivo) => executeAction(ticketApi.reopenTicket, id, motivo), []);
    const cancelar = useCallback((id, motivo) => executeAction(ticketApi.cancelTicket, id, motivo), []);

    return {
        ticket,
        loading,
        error,
        actions: { crear, cargar, asignar, diagnosticar, escalar, resolver, cerrar, reabrir, cancelar }
    };
};
