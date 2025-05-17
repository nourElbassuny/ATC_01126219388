package com.areeb.Areeb.event.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    private String title;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;


    private String location;

    private int price;

    @Column(name = "date_time")
    private Date date;




    @Lob
    private byte[] photo;

    @OneToMany(mappedBy = "event" , cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("event")
    private List<Booking> bookings;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties("events")
    private Category category;

    public void addBooking(Booking booking) {
        if (booking == null) {
            bookings = new ArrayList<>();
        }
        bookings.add(booking);
    }

}
