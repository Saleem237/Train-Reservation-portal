package com.trainreservation.project.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.trainreservation.project.entity.Seat;
import com.trainreservation.project.service.SeatService;


@RestController
@RequestMapping("/seats")
@CrossOrigin("*")
public class SeatController {


    @Autowired
    private SeatService seatService;



    // All seats of a train
    @GetMapping("/{trainId}")
    public List<Seat> getSeats(
            @PathVariable Long trainId) {

        return seatService.getAvailableSeats(trainId);

    }



    // Seats by coach
    @GetMapping("/{trainId}/{coach}")
    public List<Seat> getSeatsByCoach(
            @PathVariable Long trainId,
            @PathVariable String coach) {


        return seatService.getSeatsByCoach(trainId, coach);

    }





    @PostMapping("/create/{trainId}")
    public String create(
            @PathVariable Long trainId) {


        seatService.createSeats(trainId);

        return "Seats Created";

    }


}