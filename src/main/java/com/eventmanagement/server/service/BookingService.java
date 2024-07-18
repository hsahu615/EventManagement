package com.eventmanagement.server.service;

import com.eventmanagement.server.entity.Booking;
import com.eventmanagement.server.entity.Event;
import com.eventmanagement.server.entity.Seat;
import com.eventmanagement.server.entity.User;
import com.eventmanagement.server.repo.BookingRepository;
import com.eventmanagement.server.repo.EventRepository;
import com.eventmanagement.server.repo.SeatRepository;
import com.eventmanagement.server.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.eventmanagement.server.models.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Transactional
    public String createBooking(BookingRequest bookingRequest) {
        Optional<Seat> optionalSeat = seatRepository.findByEventIdAndSeatNumber(bookingRequest.getEventId(), bookingRequest.getSeatNumber());
        Optional<Event> optionalEvent = eventRepository.findById(bookingRequest.getEventId());
        Optional<User> optionalUser = userRepository.findById(bookingRequest.getUserId());
        Seat seat = optionalSeat.orElseThrow(() -> new RuntimeException("Seat does not exit!"));
        Event event = optionalEvent.orElseThrow(() -> new RuntimeException("Event does not exit!"));
        User user = optionalUser.orElseThrow(() -> new RuntimeException("User does not exit!"));

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
        booking.setBookingDate(new Date());
        Booking savedBooking = bookingRepository.save(booking);
        if(savedBooking!=null) {
            seat.setStatus("booked");
            seat.setBooking(savedBooking);
            seatRepository.save(seat);
        }
        return "Booking save: " + savedBooking.getBookingId();
    }


    public List<Booking> showAllBookings(String userId) {
        Optional<List<Booking>> optionalBookings = bookingRepository.findAllByUserId(userId);
        List<Booking> bookings = optionalBookings.orElseThrow(() -> new RuntimeException("No bookings!"));
        return bookings;
    }
}
