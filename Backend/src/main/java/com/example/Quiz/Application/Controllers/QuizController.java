package com.example.Quiz.Application.Controllers;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Quiz.Application.Entity.Score;
import com.example.Quiz.Application.Service.QuizService;

@CrossOrigin
@RestController
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    QuizService qService;

    @GetMapping("/{topicId}")
    public ResponseEntity<?> getQuestions(@PathVariable int topicId) {
        return qService.getQuestions(topicId);
    }

    
    @PostMapping("/submit/{topicId}/{userId}")
    public ResponseEntity<Score> submitQuiz(
            @PathVariable int topicId,
            @PathVariable int userId,
            @RequestBody Map<Integer, String> answers) {

        Score score = qService.submitQuiz(topicId, userId, answers);
        return ResponseEntity.ok(score);
    }
}