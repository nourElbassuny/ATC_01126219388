package com.areeb.Areeb.event.services;

import com.areeb.Areeb.event.entity.Category;
import com.areeb.Areeb.event.entity.Event;
import com.areeb.Areeb.event.repository.BookingRepository;
import com.areeb.Areeb.event.repository.CategoryRepository;
import com.areeb.Areeb.event.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private EventRepository eventRepository;
    private CategoryRepository categoryRepository;
    private BookingRepository bookingRepository;
    @Autowired
    public EventService(EventRepository eventRepository, CategoryRepository categoryRepository, BookingRepository bookingRepository) {
        this.eventRepository = eventRepository;
        this.categoryRepository = categoryRepository;
        this.bookingRepository = bookingRepository;
    }

    public List<Event> findAll() {
        return eventRepository.findAll();
    }
    public Page<Event> findAll(int page, int size) {
        Pageable pageable= PageRequest.of(page, size);
        return eventRepository.findAll(pageable);
    }

    public ResponseEntity<Event> findById(int id) {
        Optional<Event> event = eventRepository.findById(id);
        if (event.isPresent()) {
            return ResponseEntity.ok(event.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Event> save(Event event, MultipartFile imageFile) throws IOException {
        if (event.getCategory() != null && event.getCategory().getId() != 0&&imageFile != null && !imageFile.isEmpty()) {
            Category category = categoryRepository.findById(event.getCategory().getId()).get();
            event.setCategory(category);
            event.setPhoto(imageFile.getBytes());
            return ResponseEntity.ok(eventRepository.save(event));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Event> update(Event event) {
        return ResponseEntity.ok(eventRepository.save(event));
    }

    @Transactional
    public ResponseEntity<String> delete(int id) {
        Optional<Event> eventOptional = eventRepository.findById(id);
        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();


            if (event.getBookings() != null && !event.getBookings().isEmpty()) {
                bookingRepository.deleteBookingByEventId(event.getId());
            }

            eventRepository.deleteEventById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<List<Event>> findEventsByCategory(int categoryId) {
        Optional<List<Event>> events = eventRepository.findEventsByCategoryId(categoryId);
        if (events.isPresent()) {
            return ResponseEntity.ok(events.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
