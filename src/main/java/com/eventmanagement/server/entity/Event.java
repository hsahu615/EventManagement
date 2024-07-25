package com.eventmanagement.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Event {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "event_id")
    private String eventId;

    private String location;
    private String eventName;
    @Temporal(TemporalType.TIMESTAMP)
    private Date eventDate;
    @Lob
    private String description;
    @Lob
    @Column(name = "data", columnDefinition = "MEDIUMBLOB")
    private byte[] image;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    List<Seat> seats;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "event")
    List<Booking> bookings;
}
