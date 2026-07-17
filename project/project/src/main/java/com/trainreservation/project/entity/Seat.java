package com.trainreservation.project.entity;

import jakarta.persistence.*;

@Entity
@Table(name="seats")
public class Seat {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String coach;


    private int seatNumber;


    private boolean booked;


    @ManyToOne
    @JoinColumn(name="train_id")
    private Train train;



    public Seat(){}



    public Long getId() {
        return id;
    }


    public String getCoach() {
        return coach;
    }


    public void setCoach(String coach) {
        this.coach = coach;
    }


    public int getSeatNumber() {
        return seatNumber;
    }


    public void setSeatNumber(int seatNumber) {
        this.seatNumber = seatNumber;
    }


    public boolean isBooked() {
        return booked;
    }


    public void setBooked(boolean booked) {
        this.booked = booked;
    }


    public Train getTrain() {
        return train;
    }


    public void setTrain(Train train) {
        this.train = train;
    }

}