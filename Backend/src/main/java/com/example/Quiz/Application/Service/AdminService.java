package com.example.Quiz.Application.Service;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import com.example.Quiz.Application.Entity.*;
import com.example.Quiz.Application.Repository.*;

@Service
public class AdminService {

    @Autowired TopicRepo tRepo;
    @Autowired QuestionRepo qRepo;
    @Autowired UserRepo uRepo;
    @Autowired ScoreRepo sRepo;
    
    public ResponseEntity<String> addTopic(Topic topic) {

        if (topic.getName() == null || topic.getName().trim().isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Topic name is required");
        }

        tRepo.save(topic);
        return ResponseEntity.ok("Topic added successfully");
    }
    
    public ResponseEntity<String> deleteTopic(int id) {

        if (!tRepo.existsById(id)) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Topic not found");
        }

        tRepo.deleteById(id);
        return ResponseEntity.ok("Topic deleted successfully");
    }

    public ResponseEntity<List<Topic>> getAllTopics() {
        return ResponseEntity.ok(tRepo.findAll());
    }

    public ResponseEntity<List<Question>> getQuestionsByTopic(int topicId) {
        return ResponseEntity.ok(qRepo.findByTopicId(topicId));
    }

    public ResponseEntity<String> addQuestion(int id, Question q) {
    	Topic t = tRepo.findById(id).orElseThrow();
    	q.setTopic(t);
    	qRepo.save(q);
        return ResponseEntity.ok("Question Added");
    }

    public ResponseEntity<String> updateQuestion(Question q, int qId) {
        Optional<Question> ex = qRepo.findById(qId);
        if (ex.isPresent()) {
            Question e = ex.get();
            e.setQuestion(q.getQuestion());
            e.setOptionA(q.getOptionA());
            e.setOptionB(q.getOptionB());
            e.setOptionC(q.getOptionC());
            e.setOptionD(q.getOptionD());
            e.setCorrectAnswer(q.getCorrectAnswer());
            qRepo.save(e);
            return ResponseEntity.ok("Question Updated");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not Found");
    }

    public ResponseEntity<String> deleteQuestion(int qId) {
        qRepo.deleteById(qId);
        return ResponseEntity.ok("Question Deleted");
    }
    
    public ResponseEntity<List<Score>> getScoresByTopic(int topicId) {
        return ResponseEntity.ok(
            sRepo.findByTopicIdOrderByScoreDesc(topicId)
        );
    }
    
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = uRepo.findByRoleOrderByIdAsc(Role.USER);
        return ResponseEntity.ok(users);
    }



}
