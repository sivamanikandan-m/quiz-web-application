package com.example.Quiz.Application.Repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Quiz.Application.Entity.*;

public interface UserRepo extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

    List<User> findByRoleOrderByIdAsc(Role role);

}
