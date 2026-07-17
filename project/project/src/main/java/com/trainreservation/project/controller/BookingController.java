package com.trainreservation.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.trainreservation.project.entity.Booking;
import com.trainreservation.project.service.BookingService;

@RestController
@RequestMapping("/bookings")
@CrossOrigin("*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public Booking bookTicket(@RequestBody Booking booking) {

        return bookingService.bookTicket(booking);

    }

    @GetMapping
    public List<Booking> getAllBookings() {

        return bookingService.getAllBookings();

    }

    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {

        return bookingService.getBookingById(id);

    }

    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable Long userId) {

        return bookingService.getBookingsByUser(userId);

    }

    @PutMapping("/cancel/{id}")
    public String cancelBooking(@PathVariable Long id) {

        bookingService.cancelBooking(id);

        return "Booking Cancelled Successfully";

    }

}