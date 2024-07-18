package com.eventmanagement.server.models;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingRequest {
    private String eventId;
    private String seatNumber;
    private String userId;
}
