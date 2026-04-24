package com.helpdesk.ticket.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TicketDTO {
    private String id;
    private String title;
    private String description;
    private String client;
    private String assignedTechnician;
    private String state;
    private int escalationLevel;
    private int reopenCount;
    private LocalDateTime creationDate;
    private LocalDateTime slaDueDate;
    private String solution;
}
