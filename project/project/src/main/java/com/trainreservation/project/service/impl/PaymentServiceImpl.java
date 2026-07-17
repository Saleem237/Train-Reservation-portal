package com.trainreservation.project.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trainreservation.project.entity.Booking;
import com.trainreservation.project.entity.Payment;
import com.trainreservation.project.repository.BookingRepository;
import com.trainreservation.project.repository.PaymentRepository;
import com.trainreservation.project.service.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public Payment makePayment(Payment payment) {

        Booking booking = bookingRepository.findById(payment.getBookingId()).orElse(null);

        if (booking == null) {
            throw new RuntimeException("Booking not found.");
        }

        payment.setAmount(booking.getTotalFare());
        payment.setPaymentStatus("SUCCESS");
        payment.setTransactionId("TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

        return paymentRepository.save(payment);
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id).orElse(null);
    }
}