package com.helpdesk.ticket.state;

import com.helpdesk.ticket.model.Ticket;

public class InDiagnosisState implements TicketState {
    @Override
    public String getStateName() {
        return "En Diagnóstico";
    }

    @Override
    public void assign(Ticket ticket, String technician) {
        ticket.setAssignedTechnician(technician);
    }

    @Override
    public void startDiagnosis(Ticket ticket) {
        throw new IllegalStateException("Ticket is already in diagnosis.");
    }

    @Override
    public void escalate(Ticket ticket, String reason) {
        ticket.setEscalationLevel(ticket.getEscalationLevel() + 1);
        ticket.setState(new EscalatedState());
    }

    @Override
    public void resolve(Ticket ticket, String solution) {
        ticket.setSolution(solution);
        ticket.setState(new ResolvedState());
    }

    @Override
    public void close(Ticket ticket) {
        throw new IllegalStateException("Ticket must be resolved before closing.");
    }

    @Override
    public void reopen(Ticket ticket, String reason) {
        throw new IllegalStateException("Ticket is already active.");
    }

    @Override
    public void cancel(Ticket ticket, String reason) {
        throw new IllegalStateException("Cannot cancel a ticket that is already in diagnosis. Resolve or escalate it.");
    }
}
