package com.helpdesk.ticket.state;

import com.helpdesk.ticket.model.Ticket;

public class ReopenedState implements TicketState {
    @Override
    public String getStateName() {
        return "Reabierto";
    }

    @Override
    public void assign(Ticket ticket, String technician) {
        ticket.setAssignedTechnician(technician);
        ticket.setState(new AssignedState());
    }

    @Override
    public void startDiagnosis(Ticket ticket) {
        throw new IllegalStateException("Ticket must be reassigned before starting diagnosis.");
    }

    @Override
    public void escalate(Ticket ticket, String reason) {
        ticket.setEscalationLevel(ticket.getEscalationLevel() + 1);
        ticket.setState(new EscalatedState());
    }

    @Override
    public void resolve(Ticket ticket, String solution) {
        throw new IllegalStateException("Must start diagnosis of the reopening before resolving.");
    }

    @Override
    public void close(Ticket ticket) {
        throw new IllegalStateException("Cannot close a reopened ticket without resolving it.");
    }

    @Override
    public void reopen(Ticket ticket, String reason) {
        throw new IllegalStateException("Ticket is already reopened.");
    }

    @Override
    public void cancel(Ticket ticket, String reason) {
        throw new IllegalStateException("Cannot cancel a reopened ticket.");
    }
}
