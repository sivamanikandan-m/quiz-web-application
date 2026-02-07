package com.example.Quiz.Application.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Quiz.Application.Entity.Question;


public interface QuestionRepo extends JpaRepository<Question, Integer> {
    List<Question> findByTopicId(int id);
}
