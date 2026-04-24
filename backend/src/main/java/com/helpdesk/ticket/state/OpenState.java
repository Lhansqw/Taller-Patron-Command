package com.helpdesk.ticket.state;

import com.helpdesk.ticket.model.Ticket;

public class OpenState implements TicketState {
    @Override
    public String getStateName() {
        return "Abierto"; // UI in Spanish
    }

    @Override
    public void assign(Ticket ticket, String technician) {
        ticket.setAssignedTechnician(technician);
        ticket.setState(new AssignedState());
    }

    @Override
    public void startDiagnosis(Ticket ticket) {
        throw new IllegalStateException("Ticket must be assigned before starting diagnosis.");
    }

    @Override
    public void escalate(Ticket ticket, String reason) {
        ticket.setEscalationLevel(ticket.getEscalationLevel() + 1);
        ticket.setState(new EscalatedState());
    }

    @Override
    public void resolve(Ticket ticket, String solution) {
        throw new IllegalStateException("An open ticket cannot be resolved directly.");
    }

    @Override
    public void close(Ticket ticket) {
        ticket.setState(new ClosedState());
    }

    @Override
    public void reopen(Ticket ticket, String reason) {
        throw new IllegalStateException("Ticket is already open.");
    }

    @Override
    public void cancel(Ticket ticket, String reason) {
        ticket.setSolution("Cancelled: " + reason);
        ticket.setState(new CancelledState());
    }
}
