package com.trainreservation.project.service;

import java.util.List;

import com.trainreservation.project.entity.Payment;

public interface PaymentService {

    Payment makePayment(Payment payment);

    List<Payment> getAllPayments();

    Payment getPaymentById(Long id);

}