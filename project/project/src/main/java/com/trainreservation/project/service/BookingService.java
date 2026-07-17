package com.trainreservation.project.service;

import java.util.List;

import com.trainreservation.project.entity.Booking;

public interface BookingService {

    Booking bookTicket(Booking booking);

    List<Booking> getAllBookings();

    Booking getBookingById(Long id);

    List<Booking> getBookingsByUser(Long userId);

    void cancelBooking(Long id);

}