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
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      position: 'relative'
    }}>
      {/* 관리자 로그인 버튼 - 오른쪽 상단 고정 */}
      <div style={{
        position: 'absolute',
        top: '2rem',
        right: '2rem'
      }}>
        <Link 
          to="/login" 
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#000000',
            backgroundColor: 'white',
            border: '2px solid #000000',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          관리자 로그인
        </Link>
      </div>

      {/* 메인 카드 */}
      <div style={{
        maxWidth: '500px',
        width: '100%',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{
              fontSize: '2rem', 
              fontWeight: '700', 
              marginBottom: '0.5rem', 
              color: '#000000'
            }}>
              Cart 프로젝트
            </h1>
            <p style={{ color: '#6c757d', fontSize: '1rem' }}>간단한 정보만 입력해주세요</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#212529',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                이름 *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                name="name"
                placeholder="홍길동"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  fontSize: '1rem',
                  border: errors.name ? '2px solid #dc3545' : '2px solid #e9ecef',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  transition: 'border-color 0.2s ease'
                }}
              />
              {errors.name && <div style={{color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem'}}>{errors.name}</div>}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#212529',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                전화번호 *
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                name="phoneNumber"
                placeholder="010-1234-5678"
                maxLength="13"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  fontSize: '1rem',
                  border: errors.phoneNumber ? '2px solid #dc3545' : '2px solid #e9ecef',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  transition: 'border-color 0.2s ease'
                }}
              />
              {errors.phoneNumber && <div style={{color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem'}}>{errors.phoneNumber}</div>}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#212529',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                업체명 *
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={handleInputChange}
                name="companyName"
                placeholder="(주)Cart"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  fontSize: '1rem',
                  border: errors.companyName ? '2px solid #dc3545' : '2px solid #e9ecef',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  transition: 'border-color 0.2s ease'
                }}
              />
              {errors.companyName && <div style={{color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem'}}>{errors.companyName}</div>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                backgroundColor: isSubmitting ? '#666666' : '#000000',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {isSubmitting ? '등록 중...' : '상담 신청하기'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;