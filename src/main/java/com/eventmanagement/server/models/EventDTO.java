package com.eventmanagement.server.models;

import com.eventmanagement.server.entity.Booking;
import com.eventmanagement.server.entity.Seat;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class EventDTO {
    private String eventId;
    private String location;
    private String eventName;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date eventDate;
    private String description;
    private MultipartFile image;
    List<Seat> seats;
    List<Booking> bookings;
}
