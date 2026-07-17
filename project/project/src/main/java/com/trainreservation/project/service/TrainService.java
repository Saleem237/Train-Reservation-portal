package com.trainreservation.project.service;

import java.util.List;

import com.trainreservation.project.entity.Train;

public interface TrainService {

    Train addTrain(Train train);

    List<Train> getAllTrains();

    Train getTrainById(Long id);

    Train updateTrain(Long id, Train train);

    void deleteTrain(Long id);

    List<Train> searchTrain(String source, String destination);

}