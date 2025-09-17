package com.example.cart.service;

import com.example.cart.entity.Admin;
import com.example.cart.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminService {
    
    private final AdminRepository adminRepository;
    
    // 로그인 체크
    @Transactional(readOnly = true)
    public boolean validateAdmin(String username, String password) {
        Optional<Admin> admin = adminRepository.findByUsername(username);
        
        if (admin.isPresent()) {
            return admin.get().getPassword().equals(password);
        }
        
        return false;
    }
    
    // 관리자 정보 조회
    @Transactional(readOnly = true)
    public Optional<Admin> findByUsername(String username) {
        return adminRepository.findByUsername(username);
    }
    
    // 기본 관리자 계정 생성 (초기 데이터)
    @Transactional
    public void createDefaultAdmin() {
        if (adminRepository.count() == 0) {
            Admin defaultAdmin = Admin.builder()
                    .username("admin")
                    .password("1234")
                    .name("기본관리자")
                    .build();
            
            adminRepository.save(defaultAdmin);
        }
    }
}