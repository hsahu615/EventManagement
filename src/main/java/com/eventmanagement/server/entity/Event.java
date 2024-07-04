package com.eventmanagement.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private String eventId;

    private String location;
    private String eventName;
    @Temporal(TemporalType.TIMESTAMP)
    private Date eventDate;
    @Lob
    private String description;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    List<Seat> seats;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "event")
    List<Booking> bookings;
}
