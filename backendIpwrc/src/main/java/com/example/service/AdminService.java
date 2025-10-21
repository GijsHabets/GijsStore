package com.example.service;

import com.example.entity.Role;
import com.example.entity.User;
import com.example.repo.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AdminService {
    private final UserRepository userRepository;

    public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseEntity<User> updateUserRole(Long userId, Role role) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Set<Role> roles = user.getRoles();
        roles.add(role);
        user.setRoles(roles);
        return ResponseEntity.ok(user);
    }

    public ResponseEntity<User> removeUserRole(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Set<Role> roles = user.getRoles();
        roles.remove(Role.valueOf("ROLE_ADMIN"));
        user.setRoles(roles);
        return ResponseEntity.ok(user);
    }
}
