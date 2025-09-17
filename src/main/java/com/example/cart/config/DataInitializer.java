package com.example.cart.config;

import com.example.cart.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final AdminService adminService;
    
    @Override
    public void run(String... args) throws Exception {
        // 기본 관리자 계정 생성 (admin / 1234)
        adminService.createDefaultAdmin();
        System.out.println("=================================");
        System.out.println("기본 관리자 계정이 생성되었습니다:");
        System.out.println("아이디: admin");
        System.out.println("비밀번호: 1234");
        System.out.println("=================================");
    }
}