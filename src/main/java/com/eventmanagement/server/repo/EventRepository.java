package com.eventmanagement.server.repo;

import com.eventmanagement.server.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, String> {
    Optional<Event> findByEventName(String eventName);
    void deleteById(String id);
    Optional<Event> findById(String id);
}
