package com.helpdesk.ticket.state;

import com.helpdesk.ticket.model.Ticket;

public interface TicketState {
    String getStateName();
    void assign(Ticket ticket, String technician);
    void startDiagnosis(Ticket ticket);
    void escalate(Ticket ticket, String reason);
    void resolve(Ticket ticket, String solution);
    void close(Ticket ticket);
    void reopen(Ticket ticket, String reason);
    void cancel(Ticket ticket, String reason); // New feature!
}
