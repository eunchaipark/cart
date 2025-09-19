import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8080/api';

const LoginPage = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        onLoginSuccess(data.admin);
        navigate('/admin');
      } else {
        alert(data.message || '로그인에 실패했습니다.');
      }
    } catch {
      alert('서버 연결에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: 1000,
      overflow: 'auto'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        animation: 'slideIn 0.3s ease-out'
      }}>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{
              fontSize: '1.5rem', 
              fontWeight: '700', 
              marginBottom: '0.5rem', 
              color: '#000000'
            }}>
              관리자 로그인
            </h2>
            <p style={{ 
              color: '#6c757d',
              fontSize: '0.9rem'
            }}>
              관리자 계정으로 로그인하세요
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#212529',
                fontSize: '0.875rem'
              }}>
                아이디 *
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                name="username"
                placeholder="관리자 아이디를 입력하세요"
                autoComplete="username"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '16px', // iOS 줌 방지
                  border: errors.username ? '2px solid #dc3545' : '2px solid #e9ecef',
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  transition: 'border-color 0.2s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  if (!errors.username) {
                    e.target.style.borderColor = '#000000';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.username) {
                    e.target.style.borderColor = '#e9ecef';
                  }
                }}
              />
              {errors.username && (
                <div style={{
                  color: '#dc3545', 
                  fontSize: '0.75rem', 
                  marginTop: '0.25rem'
                }}>
                  {errors.username}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#212529',
                fontSize: '0.875rem'
              }}>
                비밀번호 *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                name="password"
                placeholder="관리자 비밀번호를 입력하세요"
                autoComplete="current-password"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '16px', // iOS 줌 방지
                  border: errors.password ? '2px solid #dc3545' : '2px solid #e9ecef',
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  transition: 'border-color 0.2s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  if (!errors.password) {
                    e.target.style.borderColor = '#000000';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.password) {
                    e.target.style.borderColor = '#e9ecef';
                  }
                }}
              />
              {errors.password && (
                <div style={{
                  color: '#dc3545', 
                  fontSize: '0.75rem', 
                  marginTop: '0.25rem'
                }}>
                  {errors.password}
                </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '1.25rem 2rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                backgroundColor: isSubmitting ? '#666666' : '#000000',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                marginBottom: '1rem',
                transition: 'all 0.2s ease',
                outline: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
              onTouchStart={(e) => {
                if (!isSubmitting) {
                  e.target.style.backgroundColor = '#333333';
                }
              }}
              onTouchEnd={(e) => {
                if (!isSubmitting) {
                  setTimeout(() => {
                    e.target.style.backgroundColor = '#000000';
                  }, 150);
                }
              }}
            >
              {isSubmitting ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div style={{ textAlign: 'center' }}>
            <Link 
              to="/" 
              style={{
                display: 'inline-block',
                width: '100%',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: '500',
                color: '#000000',
                border: '2px solid #000000',
                borderRadius: '12px',
                textDecoration: 'none',
                backgroundColor: 'transparent',
                transition: 'all 0.2s ease',
                WebkitTapHighlightColor: 'transparent'
              }}
              onTouchStart={(e) => {
                e.target.style.backgroundColor = '#000000';
                e.target.style.color = 'white';
              }}
              onTouchEnd={(e) => {
                setTimeout(() => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#000000';
                }, 150);
              }}
            >
              메인으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;