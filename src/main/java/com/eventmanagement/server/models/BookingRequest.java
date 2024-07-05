package com.eventmanagement.server.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingRequest {
    private String eventId;
    private String seatNumber;
    private String userId;
}
