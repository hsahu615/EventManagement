package com.eventmanagement.server.repo;

import com.eventmanagement.server.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, String> {
}
