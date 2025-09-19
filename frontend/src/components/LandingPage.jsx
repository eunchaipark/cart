import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8080/api';

const LandingPage = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    companyName: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phoneNumber') {
      let formattedValue = value.replace(/[^\d]/g, '');
      if (formattedValue.length >= 3 && formattedValue.length <= 6) {
        formattedValue = formattedValue.slice(0, 3) + '-' + formattedValue.slice(3);
      } else if (formattedValue.length >= 7) {
        formattedValue = formattedValue.slice(0, 3) + '-' + formattedValue.slice(3, 7) + '-' + formattedValue.slice(7, 11);
      }
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
        navigate('/success');
      } else {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          alert(data.message || '등록 중 오류가 발생했습니다.');
        }
      }
    } catch {
      alert('서버 연결에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      minHeight: '100dvh',
      width: '100vw',
      maxWidth: '100%',
      backgroundColor: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      padding: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflowX: 'hidden'
    }}>
      {/* 상단 네비게이션 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 1.25rem',
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          color: '#1a202c'
        }}>
          Cart
        </div>
        <Link 
          to="/login" 
          style={{
            padding: '0.5rem 0.875rem',
            fontSize: '0.8rem',
            fontWeight: '500',
            color: '#4a5568',
            backgroundColor: '#f7fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            textDecoration: 'none',
            transition: 'all 0.2s ease'
          }}
        >
          관리자
        </Link>
      </div>

      {/* 상단 광고/소개 영역 */}
      <div style={{
        flex: 1,
        backgroundColor: 'white',
        padding: '2rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '40vh'
      }}>
        {/* 메인 타이틀 */}
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1a202c',
          margin: '0 0 0.75rem 0',
          lineHeight: 1.2
        }}>
          Cart 프로젝트 광고내용들
        </h1>
      </div>

      {/* 하단 입력 폼 영역 */}
      <div style={{
        backgroundColor: 'white',
        borderTop: '1px solid #e2e8f0',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
        padding: '2rem 1.25rem',
        paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))', // iOS 하단 안전영역
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)'
      }}>
        {/* 폼 헤더 */}
        <div style={{
          textAlign: 'center',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            width: '40px',
            height: '4px',
            backgroundColor: '#e2e8f0',
            borderRadius: '2px',
            margin: '0 auto 1rem auto'
          }} />
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1a202c',
            margin: '0 0 0.5rem 0'
          }}>
            상담 신청하기
          </h3>
          <p style={{
            fontSize: '0.9rem',
            color: '#64748b',
            margin: 0
          }}>
            간단한 정보만 입력해주세요
          </p>
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit}>
          {/* 이름 */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151'
            }}>
              이름 *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="홍길동"
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                fontSize: '16px',
                color: '#1a202c',
                border: errors.name ? '2px solid #ef4444' : '2px solid #e5e7eb',
                borderRadius: '12px',
                backgroundColor: '#fafafa',
                outline: 'none',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.borderColor = errors.name ? '#ef4444' : '#4f46e5';
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = '#fafafa';
                e.target.style.borderColor = errors.name ? '#ef4444' : '#e5e7eb';
              }}
            />
            {errors.name && (
              <p style={{
                color: '#ef4444',
                fontSize: '0.75rem',
                marginTop: '0.25rem',
                margin: '0.25rem 0 0 0'
              }}>
                {errors.name}
              </p>
            )}
          </div>

          {/* 전화번호 */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151'
            }}>
              전화번호 *
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="010-1234-5678"
              maxLength="13"
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                fontSize: '16px',
                color: '#1a202c',
                border: errors.phoneNumber ? '2px solid #ef4444' : '2px solid #e5e7eb',
                borderRadius: '12px',
                backgroundColor: '#fafafa',
                outline: 'none',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.borderColor = errors.phoneNumber ? '#ef4444' : '#4f46e5';
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = '#fafafa';
                e.target.style.borderColor = errors.phoneNumber ? '#ef4444' : '#e5e7eb';
              }}
            />
            {errors.phoneNumber && (
              <p style={{
                color: '#ef4444',
                fontSize: '0.75rem',
                marginTop: '0.25rem',
                margin: '0.25rem 0 0 0'
              }}>
                {errors.phoneNumber}
              </p>
            )}
          </div>

          {/* 업체명 */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151'
            }}>
              업체명 *
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="(주)Cart"
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                fontSize: '16px',
                color: '#1a202c',
                border: errors.companyName ? '2px solid #ef4444' : '2px solid #e5e7eb',
                borderRadius: '12px',
                backgroundColor: '#fafafa',
                outline: 'none',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.borderColor = errors.companyName ? '#ef4444' : '#4f46e5';
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = '#fafafa';
                e.target.style.borderColor = errors.companyName ? '#ef4444' : '#e5e7eb';
              }}
            />
            {errors.companyName && (
              <p style={{
                color: '#ef4444',
                fontSize: '0.75rem',
                marginTop: '0.25rem',
                margin: '0.25rem 0 0 0'
              }}>
                {errors.companyName}
              </p>
            )}
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: '600',
              color: 'white',
              backgroundColor: isSubmitting ? '#9ca3af' : '#4f46e5',
              border: 'none',
              borderRadius: '12px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none',
              WebkitTapHighlightColor: 'transparent',
              boxShadow: isSubmitting ? 'none' : '0 4px 12px rgba(79, 70, 229, 0.3)'
            }}
            onTouchStart={(e) => {
              if (!isSubmitting) {
                e.target.style.transform = 'translateY(1px)';
                e.target.style.boxShadow = '0 2px 8px rgba(79, 70, 229, 0.3)';
              }
            }}
            onTouchEnd={(e) => {
              if (!isSubmitting) {
                setTimeout(() => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.3)';
                }, 100);
              }
            }}
          >
            {isSubmitting ? '신청 중...' : '상담 신청하기'}
          </button>
        </form>

        {/* 하단 안내 */}
        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem'
        }}>
          <p style={{
            fontSize: '0.8rem',
            color: '#9ca3af',
            margin: 0
          }}>
            빠른 시일 내에 연락드리겠습니다
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;