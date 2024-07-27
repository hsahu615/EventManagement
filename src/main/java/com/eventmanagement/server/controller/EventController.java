package com.eventmanagement.server.controller;

import com.eventmanagement.server.entity.Event;
import com.eventmanagement.server.models.EventDTO;
import com.eventmanagement.server.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/event")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping("/all")
    public ResponseEntity<List<Event>> getAllEvents() {
        return new ResponseEntity<>(eventService.getAllEvents(), HttpStatus.OK);
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<Event> getEvent(@PathVariable String eventId) throws Exception{
        return new ResponseEntity<>(eventService.getEvent(eventId), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<String> createEvent(@ModelAttribute EventDTO event) throws IOException {
        return new ResponseEntity<>(eventService.createEvent(event), HttpStatus.OK);
    }

    @DeleteMapping("/")
    public ResponseEntity<String> deleteEvent(@RequestBody String eventId) {
        return new ResponseEntity<>(eventService.deleteEvent(eventId), HttpStatus.OK);
    }
}
