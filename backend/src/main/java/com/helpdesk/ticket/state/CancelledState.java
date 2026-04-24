package com.helpdesk.ticket.state;

import com.helpdesk.ticket.model.Ticket;

public class CancelledState implements TicketState {
    @Override
    public String getStateName() {
        return "Cancelado"; // UI text in Spanish
    }

    @Override
    public void assign(Ticket ticket, String technician) {
        throw new IllegalStateException("Cannot assign a cancelled ticket.");
    }

    @Override
    public void startDiagnosis(Ticket ticket) {
        throw new IllegalStateException("Cannot diagnose a cancelled ticket.");
    }

    @Override
    public void escalate(Ticket ticket, String reason) {
        throw new IllegalStateException("Cannot escalate a cancelled ticket.");
    }

    @Override
    public void resolve(Ticket ticket, String solution) {
        throw new IllegalStateException("Cannot resolve a cancelled ticket.");
    }

    @Override
    public void close(Ticket ticket) {
        throw new IllegalStateException("Ticket is already cancelled.");
    }

    @Override
    public void reopen(Ticket ticket, String reason) {
        throw new IllegalStateException("A cancelled ticket cannot be reopened.");
    }

    @Override
    public void cancel(Ticket ticket, String reason) {
        throw new IllegalStateException("Ticket is already cancelled.");
    }
}
