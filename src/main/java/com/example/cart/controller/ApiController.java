package com.example.cart.controller;

import com.example.cart.dto.CustomerInfoDto;
import com.example.cart.entity.CustomerInfo;
import com.example.cart.service.CustomerInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ApiController {
    
    private final CustomerInfoService customerInfoService;
    
    // 고객 정보 저장 API
    @PostMapping("/customers")
    public ResponseEntity<?> createCustomer(@Valid @RequestBody CustomerInfoDto dto, BindingResult bindingResult) {
        
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error -> 
                errors.put(error.getField(), error.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(Map.of("errors", errors));
        }
        
        try {
            CustomerInfo savedCustomer = customerInfoService.saveCustomerInfo(dto);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "고객 정보가 성공적으로 등록되었습니다!",
                "data", savedCustomer
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "등록 중 오류가 발생했습니다."
            ));
        }
    }
    
    // 모든 고객 정보 조회 API
    @GetMapping("/customers")
    public ResponseEntity<Map<String, Object>> getAllCustomers() {
        List<CustomerInfo> customers = customerInfoService.getAllCustomerInfo();
        long totalCount = customerInfoService.getCustomerCount();
        
        return ResponseEntity.ok(Map.of(
            "customers", customers,
            "totalCount", totalCount
        ));
    }
    
    // 고객 정보 상세 조회 API
    @GetMapping("/customers/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable Long id) {
        Optional<CustomerInfo> customer = customerInfoService.getCustomerInfoById(id);
        
        if (customer.isPresent()) {
            return ResponseEntity.ok(customer.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // CSV 다운로드 API
    @GetMapping("/customers/download/csv")
    public ResponseEntity<byte[]> downloadCsv() {
        List<CustomerInfo> customerInfoList = customerInfoService.getAllCustomerInfo();
        
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PrintWriter writer = new PrintWriter(baos, true, java.nio.charset.StandardCharsets.UTF_8);
            
            // BOM 추가 (Excel에서 한글 깨짐 방지)
            baos.write(0xEF);
            baos.write(0xBB);
            baos.write(0xBF);
            
            // CSV 헤더
            writer.println("ID,이름,전화번호,업체명,등록일시");
            
            // 데이터 작성
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            for (CustomerInfo info : customerInfoList) {
                writer.printf("%d,%s,%s,%s,%s%n",
                    info.getId(),
                    info.getName(),
                    info.getPhoneNumber(),
                    info.getCompanyName(),
                    info.getCreatedAt().format(formatter)
                );
            }
            
            writer.flush();
            byte[] csvData = baos.toByteArray();
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "cart_customers.csv");
            headers.setContentLength(csvData.length);
            
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(csvData);
                    
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}