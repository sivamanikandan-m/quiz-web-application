package com.example.Quiz.Application.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Quiz.Application.Entity.Score;
import com.example.Quiz.Application.Service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService uService;

    @GetMapping("/scores/{userId}")
    public ResponseEntity<List<Score>> getUserScores(@PathVariable int userId) {
        return uService.getUserScores(userId);
    }
}
