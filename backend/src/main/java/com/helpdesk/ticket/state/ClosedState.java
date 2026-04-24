package com.helpdesk.ticket.state;

import com.helpdesk.ticket.model.Ticket;

public class ClosedState implements TicketState {
    @Override
    public String getStateName() {
        return "Cerrado";
    }

    @Override
    public void assign(Ticket ticket, String technician) {
        throw new IllegalStateException("Ticket is closed.");
    }

    @Override
    public void startDiagnosis(Ticket ticket) {
        throw new IllegalStateException("Ticket is closed.");
    }

    @Override
    public void escalate(Ticket ticket, String reason) {
        throw new IllegalStateException("Ticket is closed.");
    }

    @Override
    public void resolve(Ticket ticket, String solution) {
        throw new IllegalStateException("Ticket is closed.");
    }

    @Override
    public void close(Ticket ticket) {
        throw new IllegalStateException("Ticket is already closed.");
    }

    @Override
    public void reopen(Ticket ticket, String reason) {
        ticket.setReopenCount(ticket.getReopenCount() + 1);
        ticket.setState(new ReopenedState());
    }

    @Override
    public void cancel(Ticket ticket, String reason) {
        throw new IllegalStateException("Ticket is already closed.");
    }
}
