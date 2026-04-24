package com.helpdesk.ticket.controller;

import com.helpdesk.ticket.dto.TicketDTO;
import com.helpdesk.ticket.service.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public ResponseEntity<TicketDTO> createTicket(@RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(ticketService.createTicket(
                payload.get("title"),
                payload.get("description"),
                payload.get("client")
        ));
    }

    @GetMapping
    public ResponseEntity<List<TicketDTO>> listTickets() {
        return ResponseEntity.ok(ticketService.listTickets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketDTO> getTicket(@PathVariable String id) {
        return ResponseEntity.ok(ticketService.getTicket(id));
    }

    @PostMapping("/{id}/assign")
    public ResponseEntity<TicketDTO> assignTicket(@PathVariable String id, @RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(ticketService.assignTicket(id, payload.get("technician")));
    }

    @PostMapping("/{id}/start-diagnosis")
    public ResponseEntity<TicketDTO> startDiagnosis(@PathVariable String id) {
        return ResponseEntity.ok(ticketService.startDiagnosis(id));
    }

    @PostMapping("/{id}/escalate")
    public ResponseEntity<TicketDTO> escalateTicket(@PathVariable String id, @RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(ticketService.escalateTicket(id, payload.get("reason")));
    }

    @PostMapping("/{id}/resolve")
    public ResponseEntity<TicketDTO> resolveTicket(@PathVariable String id, @RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(ticketService.resolveTicket(id, payload.get("solution")));
    }

    @PostMapping("/{id}/close")
    public ResponseEntity<TicketDTO> closeTicket(@PathVariable String id) {
        return ResponseEntity.ok(ticketService.closeTicket(id));
    }

    @PostMapping("/{id}/reopen")
    public ResponseEntity<TicketDTO> reopenTicket(@PathVariable String id, @RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(ticketService.reopenTicket(id, payload.get("reason")));
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<TicketDTO> cancelTicket(@PathVariable String id, @RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(ticketService.cancelTicket(id, payload.get("reason")));
    }
}
