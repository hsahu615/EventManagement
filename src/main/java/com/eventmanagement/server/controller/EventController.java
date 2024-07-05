package com.eventmanagement.server.controller;

import com.eventmanagement.server.entity.Event;
import com.eventmanagement.server.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/event")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping("/")
    public ResponseEntity<List<Event>> getAllEvents() {
        return new ResponseEntity<>(eventService.getAllEvents(), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<String> createEvent(@RequestBody Event event) {
        return new ResponseEntity<>(eventService.createEvent(event), HttpStatus.OK);
    }

    @DeleteMapping("/")
    public ResponseEntity<String> deleteEvent(@RequestBody String eventId) {
        return new ResponseEntity<>(eventService.deleteEvent(eventId), HttpStatus.OK);
    }
}
