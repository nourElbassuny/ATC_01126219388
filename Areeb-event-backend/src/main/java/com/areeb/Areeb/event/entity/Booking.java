package com.areeb.Areeb.event.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonIgnoreProperties("bookings")
    private User user;

    @Column(name = "num_tickets", nullable = false)
    private int numberOfTickets;

    @Column(name = "totalPrice" , nullable = false)
    private int totalPrice;

    @Column(name = "booking_time")
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date data;

    @ManyToOne
    @JoinColumn(name="event_id")
    @JsonIgnoreProperties("bookings")
    private Event event;
}
