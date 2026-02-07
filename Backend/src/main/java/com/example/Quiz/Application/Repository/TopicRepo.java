package com.example.Quiz.Application.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Quiz.Application.Entity.Topic;

public interface TopicRepo extends JpaRepository<Topic, Integer> {
	
}

