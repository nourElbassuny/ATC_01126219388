package com.areeb.Areeb.event.controller;

import com.areeb.Areeb.event.dto.PaginatedEvent;
import com.areeb.Areeb.event.entity.Event;
import com.areeb.Areeb.event.services.EventService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController

@RequestMapping
public class EventController {
    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("auth/allEvent")
    public List<Event> getAllEvents() {
        return eventService.findAll();
    }
    @GetMapping("auth/event")
    public PaginatedEvent<Event> getAllEvents(
            @RequestParam(defaultValue = "0")int page,
            @RequestParam(defaultValue = "3")int size,
            HttpServletRequest request
    ) {
        Page<Event>events= eventService.findAll(page,size);
        String baseUrl=request.getRequestURL().toString();
        String nextUrl=events.hasNext()?String.format("%s?page=%d&size=%d",baseUrl,page+1,size):null;
        String previousUrl=events.hasPrevious()?String.format("%s?page=%d&size=%d",baseUrl,page-1,size):null;
        var paginatedResponse=new PaginatedEvent<Event>(
                events.getContent(),
                events.getNumber(),
                events.getTotalPages(),
                events.getTotalElements(),
                events.hasNext(),
                events.hasPrevious(),
                nextUrl,
                previousUrl
        );
        return paginatedResponse;
    }

    @GetMapping("auth/event/byCategory/{categoryId}")
    public ResponseEntity<List<Event>> getEventsByCategory(@PathVariable("categoryId") int categoryId) {
        return eventService.findEventsByCategory(categoryId);
    }

    @GetMapping("auth/event/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable int id) {
        return eventService.findById(id);
    }

    @PostMapping("auth/event/add")
    public ResponseEntity<?> addEvent(@RequestPart("event")  Event event, @RequestPart("photo")MultipartFile photo) {
        try {
            return ResponseEntity.ok(eventService.save(event, photo));
        }catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save student or image");
        }
    }

    @PutMapping("auth/event/update")
    public ResponseEntity<?> updateEvent(@RequestPart("event")  Event event, @RequestPart("photo")MultipartFile photo) {
        try {
            return ResponseEntity.ok(eventService.save(event, photo));
        }catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save student or image");
        }
    }

    @DeleteMapping("auth/event/delete/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable int id) {
        return eventService.delete(id);
    }
}
