package com.example.Quiz.Application.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Quiz.Application.Entity.Score;

public interface ScoreRepo extends JpaRepository<Score, Integer> {
	
	List<Score> findByUserId(int userId);
	
	List<Score> findByTopicIdOrderByScoreDesc(int topicId);
	
}
