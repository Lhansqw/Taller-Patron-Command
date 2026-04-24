package com.helpdesk.ticket.state;

import com.helpdesk.ticket.model.Ticket;

public class EscalatedState implements TicketState {
    @Override
    public String getStateName() {
        return "Escalado";
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
    }

    @Override
    public void resolve(Ticket ticket, String solution) {
        throw new IllegalStateException("An escalated ticket must be in diagnosis before being resolved.");
    }

    @Override
    public void close(Ticket ticket) {
        throw new IllegalStateException("Ticket cannot be closed without resolution.");
    }

    @Override
    public void reopen(Ticket ticket, String reason) {
        throw new IllegalStateException("Ticket is already active and escalated.");
    }

    @Override
    public void cancel(Ticket ticket, String reason) {
        throw new IllegalStateException("Cannot cancel an escalated ticket.");
    }
}
