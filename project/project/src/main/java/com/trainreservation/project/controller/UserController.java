package com.trainreservation.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.trainreservation.project.entity.User;
import com.trainreservation.project.repository.UserRepository;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {

        List<User> users = userRepository.findAll();

        // Hide passwords
        users.forEach(user -> user.setPassword(null));

        return users;
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {

        User user = userRepository.findById(id).orElse(null);

        if (user != null) {
            user.setPassword(null);
        }

        return user;
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {

        userRepository.deleteById(id);

        return "User Deleted Successfully";

    }

}