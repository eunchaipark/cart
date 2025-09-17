package com.example.cart.repository;

import com.example.cart.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    
    // 아이디로 관리자 찾기
    Optional<Admin> findByUsername(String username);
    
    // 아이디 중복 체크
    boolean existsByUsername(String username);
}