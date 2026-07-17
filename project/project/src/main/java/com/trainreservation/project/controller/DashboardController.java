package com.trainreservation.project.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.trainreservation.project.repository.BookingRepository;
import com.trainreservation.project.repository.TrainRepository;
import com.trainreservation.project.repository.UserRepository;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin("*")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TrainRepository trainRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping
    public Map<String, Object> dashboardStats() {

        Map<String, Object> stats = new HashMap<>();

        stats.put("users", userRepository.count());

        stats.put("trains", trainRepository.count());

        stats.put("bookings", bookingRepository.count());

        return stats;
    }
}