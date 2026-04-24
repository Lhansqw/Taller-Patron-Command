package com.helpdesk.ticket.model;

import com.helpdesk.ticket.state.TicketState;
import com.helpdesk.ticket.state.OpenState;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class Ticket {
    private String id;
    private String title;
    private String description;
    private String client;
    private String assignedTechnician;
    private TicketState state;
    private int escalationLevel;
    private int reopenCount;
    private LocalDateTime creationDate;
    private LocalDateTime slaDueDate;
    private String solution;

    public Ticket(String id, String title, String description, String client) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.client = client;
        this.state = new OpenState();
        this.escalationLevel = 1;
        this.reopenCount = 0;
        this.creationDate = LocalDateTime.now();
        this.slaDueDate = LocalDateTime.now().plusMinutes(2);
    }

    public void assign(String technician) {
        state.assign(this, technician);
    }

    public void startDiagnosis() {
        state.startDiagnosis(this);
    }

    public void escalate(String reason) {
        state.escalate(this, reason);
    }

    public void resolve(String solution) {
        state.resolve(this, solution);
    }

    public void close() {
        state.close(this);
    }

    public void reopen(String reason) {
        state.reopen(this, reason);
    }

    public void cancel(String reason) {
        state.cancel(this, reason);
    }
}
