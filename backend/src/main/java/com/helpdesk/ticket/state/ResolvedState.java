package com.helpdesk.ticket.state;

import com.helpdesk.ticket.model.Ticket;

public class ResolvedState implements TicketState {
    @Override
    public String getStateName() {
        return "Resuelto";
    }

    @Override
    public void assign(Ticket ticket, String technician) {
        throw new IllegalStateException("Ticket is already resolved.");
    }

    @Override
    public void startDiagnosis(Ticket ticket) {
        throw new IllegalStateException("Ticket is already resolved.");
    }

    @Override
    public void escalate(Ticket ticket, String reason) {
        throw new IllegalStateException("Ticket is already resolved.");
    }

    @Override
    public void resolve(Ticket ticket, String solution) {
        throw new IllegalStateException("Ticket is already resolved.");
    }

    @Override
    public void close(Ticket ticket) {
        ticket.setState(new ClosedState());
    }

    @Override
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

    @Override
    public void cancel(Ticket ticket, String reason) {
        throw new IllegalStateException("Cannot cancel a resolved ticket.");
    }
}
