package com.eventmanagement.server.controller;
import com.eventmanagement.server.entity.Booking;
import com.eventmanagement.server.models.*;
import com.eventmanagement.server.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/{seatNumber}")
    public ResponseEntity<String> bookSeat(@RequestBody BookingRequest bookingRequest) {
        return new ResponseEntity<>(bookingService.createBooking(bookingRequest), HttpStatus.OK);
    }

    @GetMapping("/all/{userId}")
    public ResponseEntity<List<Booking>> getAllBookings(@PathVariable String userId) {
        return new ResponseEntity<>(bookingService.showAllBookings(userId), HttpStatus.OK);
    }
}
