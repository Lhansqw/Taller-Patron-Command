package com.helpdesk.ticket.state;

import com.helpdesk.ticket.model.Ticket;

public class AssignedState implements TicketState {
    @Override
    public String getStateName() {
        return "Asignado";
    }

    @Override
    public void assign(Ticket ticket, String technician) {
        ticket.setAssignedTechnician(technician);
    }

    @Override
    public void startDiagnosis(Ticket ticket) {
        ticket.setState(new InDiagnosisState());
    }

    @Override
    public void escalate(Ticket ticket, String reason) {
        ticket.setEscalationLevel(ticket.getEscalationLevel() + 1);
        ticket.setState(new EscalatedState());
    }

    @Override
    public void resolve(Ticket ticket, String solution) {
        throw new IllegalStateException("Must start diagnosis before resolving.");
    }

    @Override
    public void close(Ticket ticket) {
        throw new IllegalStateException("Cannot close an active ticket without resolving or cancelling it.");
    }

    @Override
    public void reopen(Ticket ticket, String reason) {
        throw new IllegalStateException("Ticket is already active.");
    }

    @Override
    public void cancel(Ticket ticket, String reason) {
        ticket.setSolution("Cancelled: " + reason);
        ticket.setState(new CancelledState());
    }
}
