package com.areeb.Areeb.event.services;

import com.areeb.Areeb.event.entity.Booking;
import com.areeb.Areeb.event.entity.Event;
import com.areeb.Areeb.event.entity.User;
import com.areeb.Areeb.event.repository.BookingRepository;
import com.areeb.Areeb.event.repository.EventRepository;
import com.areeb.Areeb.event.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    private BookingRepository bookingRepository;
    private UserRepository userRepository;
    private EventRepository eventRepository;
    @Autowired
    public BookingService(BookingRepository bookingRepository, UserRepository userRepository, EventRepository eventRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    public List<Integer> getEventsIdByUserId(int userId) {
        return bookingRepository.findEventsByUserId(userId).get();
    }

    public ResponseEntity<Booking> save(Booking booking) {
        Optional<User> user = userRepository.findUserById(booking.getUser().getId());
        Optional<Event> event = eventRepository.findEventById(booking.getEvent().getId());

        if (user.isPresent()&&event.isPresent()) {
            booking.setUser(user.get());
            booking.setEvent(event.get());
            user.get().addBooking(booking);
            userRepository.save(user.get());
            return ResponseEntity.ok(bookingRepository.save(booking));
        }else {
            return ResponseEntity.badRequest().build();
        }

    }

    public List<Booking> findAll() {
        return bookingRepository.findAll();
    }

    @Transactional
    public ResponseEntity<Void> deleteByUserIdAndEventId(int userId,int eventId) {

        Optional<User> user = userRepository.findUserById(userId);
        Optional<Event> event = eventRepository.findEventById(eventId);

        if (user.isPresent()&&event.isPresent()) {
            bookingRepository.deleteByUserIdAndEventId(userId, eventId);
            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }
}
