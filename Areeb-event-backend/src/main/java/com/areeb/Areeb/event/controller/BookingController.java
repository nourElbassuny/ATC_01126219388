package com.areeb.Areeb.event.controller;

import com.areeb.Areeb.event.entity.Booking;
import com.areeb.Areeb.event.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping
public class BookingController {
    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }
    @PostMapping("auth/booking")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        return bookingService.save(booking);
    }
    @GetMapping("admin/booking")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.findAll());
    }
    @GetMapping("auth/booked/{userId}")
    public List<Integer> getEventIdsByUser(@PathVariable int userId) {
        return bookingService.getEventsIdByUserId(userId);
    }

    @DeleteMapping("/auth/bookings")
    public ResponseEntity<Void> deleteBooking(
            @RequestParam int userId,
            @RequestParam int eventId) {
        return bookingService.deleteByUserIdAndEventId(userId, eventId);
    }
}
