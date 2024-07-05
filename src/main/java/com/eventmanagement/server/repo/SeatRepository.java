package com.eventmanagement.server.repo;

import com.eventmanagement.server.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SeatRepository extends JpaRepository<Seat, String> {
    @Query("SELECT s FROM Seat s WHERE s.event.eventId = :eventId AND s.seatNumber = :seatNumber")
    Optional<Seat> findByEventIdAndSeatNumber(@Param("eventId") String eventId, @Param("seatNumber") String seatNumber);
}
