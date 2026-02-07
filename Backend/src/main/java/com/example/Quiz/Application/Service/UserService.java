package com.example.Quiz.Application.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.Quiz.Application.Entity.Score;
import com.example.Quiz.Application.Repository.ScoreRepo;

@Service
public class UserService {

    @Autowired
    private ScoreRepo sRepo;

    public ResponseEntity<List<Score>> getUserScores(int userId) {

        List<Score> scores = sRepo.findByUserId(userId);

        return ResponseEntity.ok(scores);
    }
}
