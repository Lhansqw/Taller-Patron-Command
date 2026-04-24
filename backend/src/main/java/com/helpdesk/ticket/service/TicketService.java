package com.helpdesk.ticket.service;

import com.helpdesk.ticket.dto.TicketDTO;
import com.helpdesk.ticket.model.Ticket;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class TicketService {

    private final Map<String, Ticket> repository = new ConcurrentHashMap<>();

    public TicketDTO createTicket(String title, String description, String client) {
        String id = UUID.randomUUID().toString().substring(0, 8);
        Ticket ticket = new Ticket(id, title, description, client);
        repository.put(id, ticket);
        return toDTO(ticket);
    }

    public List<TicketDTO> listTickets() {
        return repository.values().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public TicketDTO getTicket(String id) {
        Ticket ticket = repository.get(id);
        if (ticket == null) throw new IllegalArgumentException("Ticket not found");
        return toDTO(ticket);
    }

    public TicketDTO assignTicket(String id, String technician) {
        Ticket ticket = repository.get(id);
        ticket.assign(technician);
        return toDTO(ticket);
    }

    public TicketDTO startDiagnosis(String id) {
        Ticket ticket = repository.get(id);
        ticket.startDiagnosis();
        return toDTO(ticket);
    }

    public TicketDTO escalateTicket(String id, String reason) {
        Ticket ticket = repository.get(id);
        ticket.escalate(reason);
        return toDTO(ticket);
    }

    public TicketDTO resolveTicket(String id, String solution) {
        Ticket ticket = repository.get(id);
        ticket.resolve(solution);
        return toDTO(ticket);
    }

    public TicketDTO closeTicket(String id) {
        Ticket ticket = repository.get(id);
        ticket.close();
        return toDTO(ticket);
    }

    public TicketDTO reopenTicket(String id, String reason) {
        Ticket ticket = repository.get(id);
        ticket.reopen(reason);
        return toDTO(ticket);
    }

    public TicketDTO cancelTicket(String id, String reason) {
        Ticket ticket = repository.get(id);
        ticket.cancel(reason);
        return toDTO(ticket);
    }

    private TicketDTO toDTO(Ticket ticket) {
        TicketDTO dto = new TicketDTO();
        dto.setId(ticket.getId());
        dto.setTitle(ticket.getTitle());
        dto.setDescription(ticket.getDescription());
        dto.setClient(ticket.getClient());
        dto.setAssignedTechnician(ticket.getAssignedTechnician());
        dto.setState(ticket.getState().getStateName());
        dto.setEscalationLevel(ticket.getEscalationLevel());
        dto.setReopenCount(ticket.getReopenCount());
        dto.setCreationDate(ticket.getCreationDate());
        dto.setSlaDueDate(ticket.getSlaDueDate());
        dto.setSolution(ticket.getSolution());
        return dto;
    }
}
