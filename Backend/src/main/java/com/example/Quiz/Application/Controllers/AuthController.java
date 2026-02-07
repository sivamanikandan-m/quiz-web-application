package com.example.Quiz.Application.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Quiz.Application.Entity.User;
import com.example.Quiz.Application.Service.AuthService;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthService aService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        return aService.register(user);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        return aService.login(user);
    }

}
