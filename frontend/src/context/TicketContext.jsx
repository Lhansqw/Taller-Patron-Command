import React, { createContext, useContext } from 'react';
import { useTicket } from '../hooks/useTicket';

const TicketContext = createContext(null);

export const TicketProvider = ({ children }) => {
    const ticketState = useTicket();
    
    return (
        <TicketContext.Provider value={ticketState}>
            {children}
        </TicketContext.Provider>
    );
};

export const useTicketContext = () => useContext(TicketContext);
