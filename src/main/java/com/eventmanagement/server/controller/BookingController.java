package com.eventmanagement.server.controller;

import com.eventmanagement.server.entity.Booking;
import com.eventmanagement.server.entity.Event;
import com.eventmanagement.server.entity.Seat;
import com.eventmanagement.server.entity.User;
import com.eventmanagement.server.models.BookingRequest;
import com.eventmanagement.server.repo.BookingRepository;
import com.eventmanagement.server.repo.EventRepository;
import com.eventmanagement.server.repo.SeatRepository;
import com.eventmanagement.server.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping("/{seatNumber}")
    public String bookSeat(@RequestBody BookingRequest bookingRequest) {
        Optional<Seat> optionalSeat = seatRepository.findByEventIdAndSeatNumber(bookingRequest.getEventId(), bookingRequest.getSeatNumber());
        Optional<Event> optionalEvent = eventRepository.findById(bookingRequest.getEventId());
        Optional<User> optionalUser = userRepository.findById(bookingRequest.getUserId());
        Seat seat = optionalSeat.get();
        Event event = optionalEvent.get();
        User user = optionalUser.orElseThrow(() -> new RuntimeException("Error"));

        if(optionalSeat.isEmpty() || optionalEvent.isEmpty() || optionalUser.isEmpty()) {
            return "Details does not exist!";
        }

        if(!seat.getStatus().equals("available")) {
            return "Seat is already booked!";
        }

        Booking booking = new Booking();
        booking.setSeat(seat);
        booking.setUser(user);
        booking.setEvent(event);
        Booking savedBooking = bookingRepository.save(booking);
        if(savedBooking!=null) {
            seat.setStatus("booked");
            seat.setBooking(savedBooking);
            seatRepository.save(seat);
        }
        return "Booking save: " + savedBooking.getBookingId();
    }
}
