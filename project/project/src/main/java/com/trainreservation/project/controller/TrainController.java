package com.trainreservation.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.trainreservation.project.entity.Train;
import com.trainreservation.project.service.TrainService;

@RestController
@RequestMapping("/trains")
@CrossOrigin("*")
public class TrainController {

    @Autowired
    private TrainService trainService;

    @PostMapping
    public Train addTrain(@RequestBody Train train) {
        return trainService.addTrain(train);
    }

    @GetMapping
    public List<Train> getAllTrains() {
        return trainService.getAllTrains();
    }

    @GetMapping("/{id}")
    public Train getTrainById(@PathVariable Long id) {
        return trainService.getTrainById(id);
    }

    @PutMapping("/{id}")
    public Train updateTrain(@PathVariable Long id, @RequestBody Train train) {
        return trainService.updateTrain(id, train);
    }

    @DeleteMapping("/{id}")
    public String deleteTrain(@PathVariable Long id) {
        trainService.deleteTrain(id);
        return "Train Deleted Successfully";
    }

    @GetMapping("/search")
    public List<Train> searchTrain(@RequestParam String source,
                                   @RequestParam String destination) {
        return trainService.searchTrain(source, destination);
    }
}