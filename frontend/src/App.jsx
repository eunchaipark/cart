import { useState, useEffect } from 'react';
import './App.css';

// API 기본 URL
const API_BASE_URL = 'http://localhost:8080/api';

// 로그인 페이지 컴포넌트
const LoginPage = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🛒 Cart 관리자 로그인</h1>
          <p>관리자 계정으로 로그인하세요</p>
        </div>

        <div className="login-form">
          <div className="form-group">
            <label htmlFor="username">아이디 *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="admin"
              className={errors.username ? 'error' : ''}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호 *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="1234"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>
        </div>

        <div className="login-info">
          <p>기본 계정: admin / 1234</p>
        </div>
      </div>
    </div>
  );
};

// 랜딩 페이지 컴포넌트
const LandingPage = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    companyName: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <div className="landing-container">
      <div className="landing-card">
        <div className="landing-header">
          <h1>🛒 Cart 프로젝트</h1>
          <p>간단한 정보만 입력해주세요</p>
        </div>

        <div className="landing-form">
          <div className="form-group">
            <label htmlFor="name">이름 *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="홍길동"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">전화번호 *</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="010-1234-5678"
              maxLength="13"
              className={errors.phoneNumber ? 'error' : ''}
            />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="companyName">업체명 *</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="(주)Cart"
              className={errors.companyName ? 'error' : ''}
            />
            {errors.companyName && <span className="error-message">{errors.companyName}</span>}
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? '등록 중...' : '상담 신청하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

// 성공 페이지 컴포넌트
const SuccessPage = ({ onBackToHome }) => {
  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h1>신청이 완료되었습니다!</h1>
        <p>
          소중한 정보를 보내주셔서 감사합니다.<br />
          빠른 시일 내에 연락드리겠습니다.
        </p>
        <button onClick={onBackToHome} className="back-btn">
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

// 관리자 페이지 컴포넌트
const AdminPage = ({ onLogout, adminInfo }) => {
  const [customers, setCustomers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers`, {
        credentials: 'include'
      });
      const data = await response.json();
      setCustomers(data.customers);
      setTotalCount(data.totalCount);
    } catch {
      alert('고객 정보 조회에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCsv = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/download/csv`, {
        credentials: 'include'
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'cart_customers.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      alert('CSV 다운로드에 실패했습니다.');
    }
  };

  const handleViewDetail = (customer) => {
    setSelectedCustomer(customer);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (selectedCustomer) {
    return (
      <div className="admin-container">
        <div className="admin-header">
          <h1>고객 정보 상세보기</h1>
          <div className="header-buttons">
            <span className="admin-name">{adminInfo.name}님</span>
            <button onClick={onLogout} className="logout-btn">로그아웃</button>
          </div>
        </div>
        
        <div className="detail-container">
          <button 
            onClick={() => setSelectedCustomer(null)} 
            className="back-btn-small"
          >
            ← 목록으로 돌아가기
          </button>
          
          <div className="detail-card">
            <div className="detail-header">
              <h2>
                고객 정보 
                <span className="id-badge">#{selectedCustomer.id}</span>
              </h2>
            </div>
            
            <div className="detail-content">
              <div className="info-row">
                <span className="info-label">이름:</span>
                <span className="info-value">{selectedCustomer.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">전화번호:</span>
                <span className="info-value">{selectedCustomer.phoneNumber}</span>
              </div>
              <div className="info-row">
                <span className="info-label">업체명:</span>
                <span className="info-value">{selectedCustomer.companyName}</span>
              </div>
              <div className="info-row">
                <span className="info-label">신청일시:</span>
                <span className="info-value">{formatDateTime(selectedCustomer.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>🛒 Cart 프로젝트 관리자</h1>
        <div className="header-buttons">
          <span className="admin-name">{adminInfo.name}님</span>
          <button onClick={onLogout} className="logout-btn">로그아웃</button>
        </div>
      </div>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>{totalCount}</h3>
          <p>총 신청 건수</p>
        </div>
        <button onClick={handleDownloadCsv} className="download-btn">
          📥 CSV 다운로드
        </button>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h2>고객 신청 목록</h2>
        </div>
        
        {loading ? (
          <div className="loading">로딩 중...</div>
        ) : customers.length === 0 ? (
          <div className="no-data">등록된 고객 정보가 없습니다.</div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>이름</th>
                  <th>전화번호</th>
                  <th>업체명</th>
                  <th>신청일시</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={customer.id}>
                    <td>{index + 1}</td>
                    <td>{customer.name}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>{customer.companyName}</td>
                    <td>{formatDateTime(customer.createdAt)}</td>
                    <td>
                      <button 
                        onClick={() => handleViewDetail(customer)}
                        className="detail-btn"
                      >
                        상세보기
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// 메인 App 컴포넌트
const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/check`, {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.isLoggedIn) {
        setAdminInfo(data.admin);
        setCurrentPage('admin');
      }
    } catch {
      // 인증 체크 실패 시 로그인 페이지로
    }
  };

  const handleLoginSuccess = (admin) => {
    setAdminInfo(admin);
    setCurrentPage('admin');
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      setAdminInfo(null);
      setCurrentPage('landing');
    } catch {
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  const handleSuccess = () => {
    setCurrentPage('success');
  };

  const handleBackToHome = () => {
    setCurrentPage('landing');
  };

  const handleGoToLogin = () => {
    setCurrentPage('login');
  };

  return (
    <div className="App">
      {currentPage === 'landing' && (
        <>
          <div className="admin-link">
            <button onClick={handleGoToLogin} className="admin-btn">
              관리자 로그인
            </button>
          </div>
          <LandingPage onSuccess={handleSuccess} />
        </>
      )}
      {currentPage === 'success' && (
        <SuccessPage onBackToHome={handleBackToHome} />
      )}
      {currentPage === 'login' && (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
      {currentPage === 'admin' && adminInfo && (
        <AdminPage onLogout={handleLogout} adminInfo={adminInfo} />
      )}
    </div>
  );
};

export default App;