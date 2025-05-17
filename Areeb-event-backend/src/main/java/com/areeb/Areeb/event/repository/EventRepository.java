package com.areeb.Areeb.event.repository;

import com.areeb.Areeb.event.entity.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Integer> {
    Optional<Event> findEventById(Integer id);
    Optional<List<Event>> findEventsByCategoryId(Integer categoryId);

    @Modifying(clearAutomatically = true)
    @Query(value = "DELETE FROM events WHERE id = :id", nativeQuery = true)
    void deleteEventById(@Param("id") int id);


}
