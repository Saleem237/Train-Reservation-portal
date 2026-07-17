package com.trainreservation.project.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trainreservation.project.entity.Booking;
import com.trainreservation.project.entity.Seat;
import com.trainreservation.project.entity.Train;
import com.trainreservation.project.entity.User;
import com.trainreservation.project.repository.BookingRepository;
import com.trainreservation.project.repository.SeatRepository;
import com.trainreservation.project.repository.TrainRepository;
import com.trainreservation.project.repository.UserRepository;
import com.trainreservation.project.service.BookingService;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TrainRepository trainRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Override
    public Booking bookTicket(Booking booking) {

        Train train = trainRepository.findById(booking.getTrain().getId())
                .orElseThrow(() -> new RuntimeException("Train not found"));

        User user = userRepository.findById(booking.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        int tickets = booking.getNumberOfTickets();

        if (train.getAvailableSeats() < tickets) {
            throw new RuntimeException("Only " + train.getAvailableSeats() + " seats available.");
        }

        booking.setPnrNumber(
                "PNR" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

        booking.setTrain(train);
        booking.setUser(user);

        if (booking.getBookingStatus() == null) {
            booking.setBookingStatus("BOOKED");
        }

        if (booking.getPaymentStatus() == null) {
            booking.setPaymentStatus("PAID");
        }

        List<Booking> bookedSeats = bookingRepository.findByTrainIdAndBookingStatus(train.getId(), "BOOKED");
        Set<Integer> occupied = new HashSet<>();

        for (Booking b : bookedSeats) {
            occupied.add(b.getSeatNumber());
        }

        int allocatedSeat = booking.getSeatNumber();
        if (allocatedSeat <= 0) {
            for (int i = 1; i <= train.getTotalSeats(); i++) {
                if (!occupied.contains(i)) {
                    allocatedSeat = i;
                    break;
                }
            }
        }

        if (allocatedSeat == -1 || allocatedSeat <= 0) {
            throw new RuntimeException("No seats available.");
        }

        if (occupied.contains(allocatedSeat)) {
            throw new RuntimeException("Selected seat is already booked.");
        }

        booking.setCoach(booking.getCoach() == null ? "A1" : booking.getCoach());
        booking.setSeatNumber(allocatedSeat);

        final int selectedSeat = allocatedSeat;
        Seat seat = seatRepository.findByTrainId(train.getId()).stream()
                .filter(s -> s.getCoach().equalsIgnoreCase(booking.getCoach()) && s.getSeatNumber() == selectedSeat)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Seat is not available for the selected coach."));

        if (seat.isBooked()) {
            throw new RuntimeException("Selected seat is already booked.");
        }

        seat.setBooked(true);
        seatRepository.save(seat);

        train.setAvailableSeats(train.getAvailableSeats() - tickets);
        trainRepository.save(train);

        booking.setTotalFare(train.getFare() * tickets);

        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getAllBookings() {

        return bookingRepository.findAll();

    }

    @Override
    public Booking getBookingById(Long id) {

        return bookingRepository.findById(id).orElse(null);

    }

    @Override
    public List<Booking> getBookingsByUser(Long userId) {

        return bookingRepository.findByUserId(userId);

    }

    @Override
    public void cancelBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if ("CANCELLED".equals(booking.getBookingStatus())) {

            return;

        }

        booking.setBookingStatus("CANCELLED");

        Train train = booking.getTrain();

        train.setAvailableSeats(
                train.getAvailableSeats()
                        + booking.getNumberOfTickets()
        );

        trainRepository.save(train);

        bookingRepository.save(booking);

    }

}