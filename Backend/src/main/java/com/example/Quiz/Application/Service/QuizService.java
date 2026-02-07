package com.example.Quiz.Application.Service;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import com.example.Quiz.Application.Entity.Question;
import com.example.Quiz.Application.Entity.Score;
import com.example.Quiz.Application.Entity.Topic;
import com.example.Quiz.Application.Entity.User;
import com.example.Quiz.Application.Repository.QuestionRepo;
import com.example.Quiz.Application.Repository.ScoreRepo;
import com.example.Quiz.Application.Repository.TopicRepo;
import com.example.Quiz.Application.Repository.UserRepo;

@Service
public class QuizService {

    @Autowired
    QuestionRepo qRepo;

    @Autowired
    TopicRepo tRepo;

    @Autowired
    ScoreRepo sRepo;
    
    @Autowired
    UserRepo uRepo;

    public ResponseEntity<List<Question>> getQuestions(int topicId) {
        List<Question> list = qRepo.findByTopicId(topicId);
        if (list.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        return ResponseEntity.ok(list);
    }

    
    public Score submitQuiz(int topicId, int userId, Map<Integer, String> answers) {

        List<Question> questions = qRepo.findByTopicId(topicId);
        int score = 0;

        for (Question q : questions) {
            if (answers.containsKey(q.getId()) &&
                answers.get(q.getId()).equals(q.getCorrectAnswer())) {
                score++;
            }
        }

        Topic topic = tRepo.findById(topicId).get();
        User user = uRepo.findById(userId).get();
        
        Score s = new Score();
        s.setUserId(userId);
        s.setTopicId(topicId);
        s.setUsername(user.getUsername());
        s.setTopicName(topic.getName());
        s.setScore(score);
        s.setTotalQuestions(questions.size());

        return sRepo.save(s);
    }
}
