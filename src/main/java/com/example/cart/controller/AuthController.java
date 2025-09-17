package com.example.cart.controller;

import com.example.cart.dto.LoginRequest;
import com.example.cart.entity.Admin;
import com.example.cart.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequiredArgsConstructor
public class AuthController {
    
    private final AdminService adminService;
    
    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, 
                                 BindingResult bindingResult,
                                 HttpSession session) {
        
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error -> 
                errors.put(error.getField(), error.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(Map.of("errors", errors));
        }
        
        try {
            boolean isValid = adminService.validateAdmin(
                loginRequest.getUsername(), 
                loginRequest.getPassword()
            );
            
            if (isValid) {
                // 세션에 관리자 정보 저장
                Optional<Admin> admin = adminService.findByUsername(loginRequest.getUsername());
                if (admin.isPresent()) {
                    session.setAttribute("adminId", admin.get().getId());
                    session.setAttribute("adminUsername", admin.get().getUsername());
                    session.setAttribute("adminName", admin.get().getName());
                }
                
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "로그인 성공!",
                    "admin", Map.of(
                        "username", loginRequest.getUsername(),
                        "name", admin.get().getName()
                    )
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "아이디 또는 비밀번호가 잘못되었습니다."
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "로그인 중 오류가 발생했습니다."
            ));
        }
    }
    
    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "로그아웃되었습니다."
        ));
    }
    
    // 로그인 체크
    @GetMapping("/check")
    public ResponseEntity<?> checkAuth(HttpSession session) {
        Long adminId = (Long) session.getAttribute("adminId");
        String adminUsername = (String) session.getAttribute("adminUsername");
        String adminName = (String) session.getAttribute("adminName");
        
        if (adminId != null) {
            return ResponseEntity.ok(Map.of(
                "success", true,
                "isLoggedIn", true,
                "admin", Map.of(
                    "id", adminId,
                    "username", adminUsername,
                    "name", adminName
                )
            ));
        } else {
            return ResponseEntity.ok(Map.of(
                "success", true,
                "isLoggedIn", false
            ));
        }
    }
}