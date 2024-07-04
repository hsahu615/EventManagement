package com.eventmanagement.server.service;

import com.eventmanagement.server.entity.Event;
import com.eventmanagement.server.entity.Seat;
import com.eventmanagement.server.repo.EventRepository;
import com.eventmanagement.server.repo.SeatRepository;
import com.eventmanagement.server.utility.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public String createEvent(Event event) {
        Event eventDTO = new Event();
        eventDTO.setEventDate(event.getEventDate());
        eventDTO.setEventName(event.getEventName());
        eventDTO.setLocation(event.getLocation());
        eventDTO.setDescription(event.getDescription());
        Event savedEvent = eventRepository.save(eventDTO);

        List<Seat> seats = Util.creteSeats(savedEvent);
        seatRepository.saveAll(seats);

        eventDTO.setSeats(seats);

        return eventRepository.save(eventDTO).getEventId();
    }
}
