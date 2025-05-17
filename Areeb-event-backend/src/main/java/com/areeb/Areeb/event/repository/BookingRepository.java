package com.areeb.Areeb.event.repository;

import com.areeb.Areeb.event.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Integer> {


    @Query("select b.event.id from Booking b where b.user.id = :userId")
    Optional<List<Integer>> findEventsByUserId(Integer userId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Bookings WHERE event_id = :eventId", nativeQuery = true)
    void deleteBookingByEventId(@Param("eventId") int eventId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Bookings WHERE user_id = :userId AND event_id = :eventId", nativeQuery = true)
    void deleteByUserIdAndEventId(@Param("userId") int userId, @Param("eventId") int eventId);
}
