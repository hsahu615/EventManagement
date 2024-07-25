package com.eventmanagement.server.service;

import com.eventmanagement.server.entity.Event;
import com.eventmanagement.server.entity.Seat;
import com.eventmanagement.server.models.EventDTO;
import com.eventmanagement.server.repo.EventRepository;
import com.eventmanagement.server.repo.SeatRepository;
import com.eventmanagement.server.utility.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private SeatRepository seatRepository;

    public List<Event> getAllEvents() {
        List<Event> getAllEvents = eventRepository.findAll();
        return getAllEvents;
    }

    @Transactional
    public String createEvent(EventDTO event) throws IOException {
        Optional<Event> optionalEvent = eventRepository.findByEventName(event.getEventName());
        if(!optionalEvent.isEmpty()) {
            return "Event already present!";
        }
        Event eventDTO = new Event();
        eventDTO.setEventDate(event.getEventDate());
        eventDTO.setEventName(event.getEventName());
        eventDTO.setLocation(event.getLocation());
        eventDTO.setDescription(event.getDescription());
        eventDTO.setImage(event.getImage().getBytes());
        Event savedEvent = eventRepository.save(eventDTO);

        List<Seat> seats = Util.creteSeats(savedEvent);
        seatRepository.saveAll(seats);

        eventDTO.setSeats(seats);

        return eventRepository.save(eventDTO).getEventId();
    }

    @Transactional
    public String deleteEvent(String eventId) {
        Optional<Event> event = eventRepository.findById(eventId);
        if(event.isEmpty()) {
            return "Event does not exist!";
        }
        eventRepository.deleteById(eventId);
        return "Event Deleted";
    }
}
