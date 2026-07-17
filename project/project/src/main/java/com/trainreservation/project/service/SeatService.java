package com.trainreservation.project.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trainreservation.project.entity.Seat;
import com.trainreservation.project.entity.Train;
import com.trainreservation.project.repository.SeatRepository;
import com.trainreservation.project.repository.TrainRepository;



@Service
public class SeatService {



    @Autowired
    private SeatRepository seatRepository;



    @Autowired
    private TrainRepository trainRepository;





    // Get all seats for train
    public List<Seat> getAvailableSeats(Long trainId){

        return seatRepository.findByTrainId(trainId);

    }





    // Get seats by coach
    public List<Seat> getSeatsByCoach(
            Long trainId,
            String coach){

        return seatRepository.findByTrainIdAndCoach(
                trainId,
                coach
        );

    }





    // Create seats
    public void createSeats(Long trainId){


        Train train =
        trainRepository.findById(trainId)
        .orElseThrow(
                () -> new RuntimeException("Train not found")
        );



        String[] coaches = {
                "A1",
                "A2",
                "B1",
                "B2",
                "S1"
        };



        int seatsPerCoach = 30;



        for(String coach : coaches){


            for(int i=1;i<=seatsPerCoach;i++){


                Seat seat = new Seat();


                seat.setCoach(coach);


                seat.setSeatNumber(i);


                seat.setBooked(false);


                seat.setTrain(train);


                seatRepository.save(seat);


            }

        }


    }


}