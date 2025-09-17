package com.example.cart.service;

import com.example.cart.dto.CustomerInfoDto;
import com.example.cart.entity.CustomerInfo;
import com.example.cart.repository.CustomerInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerInfoService {
    
    private final CustomerInfoRepository customerInfoRepository;
    
    // 고객 정보 저장
    public CustomerInfo saveCustomerInfo(CustomerInfoDto dto) {
        CustomerInfo customerInfo = CustomerInfo.builder()
                .name(dto.getName())
                .phoneNumber(dto.getPhoneNumber())
                .companyName(dto.getCompanyName())
                .build();
        
        return customerInfoRepository.save(customerInfo);
    }
    
    // 모든 고객 정보 조회
    @Transactional(readOnly = true)
    public List<CustomerInfo> getAllCustomerInfo() {
        return customerInfoRepository.findAllByOrderByCreatedAtDesc();
    }
    
    // ID로 고객 정보 조회
    @Transactional(readOnly = true)
    public Optional<CustomerInfo> getCustomerInfoById(Long id) {
        return customerInfoRepository.findById(id);
    }
    
    // 업체명으로 검색
    @Transactional(readOnly = true)
    public List<CustomerInfo> searchByCompanyName(String companyName) {
        return customerInfoRepository.findByCompanyNameContainingIgnoreCase(companyName);
    }
    
    // 총 개수 조회
    @Transactional(readOnly = true)
    public long getCustomerCount() {
        return customerInfoRepository.count();
    }
}