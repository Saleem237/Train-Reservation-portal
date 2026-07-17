package com.trainreservation.project.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trainreservation.project.dto.DashboardDTO;
import com.trainreservation.project.entity.Booking;
import com.trainreservation.project.entity.Train;
import com.trainreservation.project.service.DashboardService;
import com.trainreservation.project.repository.BookingRepository;
import com.trainreservation.project.repository.TrainRepository;
import com.trainreservation.project.repository.UserRepository;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TrainRepository trainRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public DashboardDTO getDashboardData() {

        DashboardDTO dto = new DashboardDTO();

        // Total Users
        dto.setTotalUsers(userRepository.count());

        // Total Trains
        dto.setTotalTrains(trainRepository.count());

        // Total Bookings
        dto.setTotalBookings(bookingRepository.count());

        // Cancelled Bookings
        long cancelled = bookingRepository.findAll()
                .stream()
                .filter(b -> "CANCELLED".equalsIgnoreCase(b.getBookingStatus()))
                .count();

        dto.setCancelledBookings(cancelled);

        // Total Revenue
        double revenue = bookingRepository.findAll()
                .stream()
                .filter(b -> "BOOKED".equalsIgnoreCase(b.getBookingStatus()))
                .mapToDouble(Booking::getTotalFare)
                .sum();

        dto.setTotalRevenue(revenue);

        // Available Seats
        List<Train> trains = trainRepository.findAll();

        long availableSeats = trains.stream()
                .mapToLong(Train::getAvailableSeats)
                .sum();

        dto.setAvailableSeats(availableSeats);

        return dto;
    }

}