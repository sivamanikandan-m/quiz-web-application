package com.example.Quiz.Application.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Quiz.Application.Entity.Question;
import com.example.Quiz.Application.Entity.Score;
import com.example.Quiz.Application.Entity.Topic;
import com.example.Quiz.Application.Entity.User;
import com.example.Quiz.Application.Service.AdminService;

@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired AdminService aService;
    
    @PostMapping("/add-topic")
    public ResponseEntity<String> addTopic(@RequestBody Topic topic) {
        return aService.addTopic(topic);
    }
    
    @DeleteMapping("/topic/{id}")
    public ResponseEntity<String> deleteTopic(@PathVariable int id) {
        return aService.deleteTopic(id);
    }

    @GetMapping("/topics")
    public ResponseEntity<?> topics() {
        return aService.getAllTopics();
    }

    @GetMapping("/questions/{id}")
    public ResponseEntity<?> questions(@PathVariable int id) {
        return aService.getQuestionsByTopic(id);
    }

    @PostMapping("/add-question/{id}")
    public ResponseEntity<String> add(@PathVariable int id, @RequestBody Question q) {
        return aService.addQuestion(id, q);
    }

    @PutMapping("/update-question/{id}")
    public ResponseEntity<String> update(@RequestBody Question q, @PathVariable int id) {
        return aService.updateQuestion(q, id);
    }

    @DeleteMapping("/delete-question/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        return aService.deleteQuestion(id);
    }
    
    @GetMapping("/scores/topic/{topicId}")
    public ResponseEntity<List<Score>> getScoresByTopic(@PathVariable int topicId) {
        return aService.getScoresByTopic(topicId);
    }
    
    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return aService.getUsers();
    }

    
    
}
