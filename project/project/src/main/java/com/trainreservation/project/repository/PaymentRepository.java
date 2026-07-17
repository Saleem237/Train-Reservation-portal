package com.trainreservation.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.trainreservation.project.entity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

}