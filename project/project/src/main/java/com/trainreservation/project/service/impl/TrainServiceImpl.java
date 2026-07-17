package com.trainreservation.project.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trainreservation.project.entity.Train;
import com.trainreservation.project.repository.TrainRepository;
import com.trainreservation.project.service.TrainService;

@Service
public class TrainServiceImpl implements TrainService {

    @Autowired
    private TrainRepository trainRepository;

    @Override
    public Train addTrain(Train train) {
        return trainRepository.save(train);
    }

    @Override
    public List<Train> getAllTrains() {
        return trainRepository.findAll();
    }

    @Override
    public Train getTrainById(Long id) {
        return trainRepository.findById(id).orElse(null);
    }

    @Override
    public Train updateTrain(Long id, Train train) {

        Train existingTrain = trainRepository.findById(id).orElse(null);

        if (existingTrain != null) {

            existingTrain.setTrainNumber(train.getTrainNumber());
            existingTrain.setTrainName(train.getTrainName());
            existingTrain.setSource(train.getSource());
            existingTrain.setDestination(train.getDestination());
            existingTrain.setDepartureTime(train.getDepartureTime());
            existingTrain.setArrivalTime(train.getArrivalTime());
            existingTrain.setAvailableSeats(train.getAvailableSeats());
            existingTrain.setFare(train.getFare());

            return trainRepository.save(existingTrain);
        }

        return null;
    }

    @Override
    public void deleteTrain(Long id) {
        trainRepository.deleteById(id);
    }

    @Override
    public List<Train> searchTrain(String source, String destination) {
        return trainRepository.findBySourceAndDestination(source, destination);
    }
}