package com.example.cart.repository;

import com.example.cart.entity.CustomerInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CustomerInfoRepository extends JpaRepository<CustomerInfo, Long> {
    
    // 생성일 기준으로 정렬
    List<CustomerInfo> findAllByOrderByCreatedAtDesc();
    
    // 업체명으로 검색
    List<CustomerInfo> findByCompanyNameContainingIgnoreCase(String companyName);
}