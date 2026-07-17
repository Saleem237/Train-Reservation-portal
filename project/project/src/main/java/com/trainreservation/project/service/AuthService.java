package com.trainreservation.project.service;

import com.trainreservation.project.entity.User;

public interface AuthService {

    User register(User user);

    User login(String email, String password);

}