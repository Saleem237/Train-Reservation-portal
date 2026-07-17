package com.trainreservation.project.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trainreservation.project.entity.Seat;


public interface SeatRepository extends JpaRepository<Seat, Long> {


    // Get all seats of a train
    List<Seat> findByTrainId(Long trainId);



    // Get seats of a particular coach
    List<Seat> findByTrainIdAndCoach(
            Long trainId,
            String coach
    );


}