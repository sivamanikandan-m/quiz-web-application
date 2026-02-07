package com.example.Quiz.Application.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.Quiz.Application.Entity.Role;
import com.example.Quiz.Application.Entity.User;
import com.example.Quiz.Application.Repository.UserRepo;

@Service
public class AuthService {

    @Autowired
    UserRepo uRepo;

    public ResponseEntity<String> register(User user) {
        if (user.getUsername() != null && user.getPassword() != null) {
            user.setRole(Role.USER);
            uRepo.save(user);
            return ResponseEntity.status(HttpStatus.OK).body("User Registered");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid data");
    }
    
    public ResponseEntity<User> login(User user) {
        Optional<User> u = uRepo.findByUsername(user.getUsername());
        if (u.isPresent()) {
        	if(u.get().getPassword().equals(user.getPassword())){
        		return ResponseEntity.status(HttpStatus.ACCEPTED).body(u.get());
        }
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }
}
