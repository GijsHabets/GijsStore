package com.example.controller;

import com.example.entity.Role;
import com.example.entity.User;
import com.example.repo.UserRepository;
import com.example.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/admincon")
public class AdminController {
    private final AdminService adminService;
    private final UserRepository userRepository;

    public AdminController(AdminService adminService, UserRepository userRepository) {
        this.adminService = adminService;
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Iterable<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PutMapping("/updateRole/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> updateUserRole(@PathVariable(value = "userId") Long userId) {
        return adminService.updateUserRole(userId);
    }

    @DeleteMapping("/removeRole/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> removeUserRole(@PathVariable(value = "userId") Long userId) {
        return adminService.removeUserRole(userId);
    }


}
