package com.eventmanagement.server.repo;

import com.eventmanagement.server.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, String> {
    @Query("SELECT b FROM Booking b WHERE b.user.userId = :userId")
    Optional<List<Booking>> findAllByUserId(@Param("userId") String userId);
}
