package com.eventmanagement.server.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private String seatId;

    private String status;
    private Integer seatNumber;
    private String seatType;

    @ManyToOne
    @JoinColumn(name = "eventId", nullable = false)
    private Event event;

    @OneToOne(mappedBy = "seat")
    private Booking booking;
}
