import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// 컴포넌트 임포트
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SuccessPage from './components/SuccessPage';
import AdminPage from './components/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';

const API_BASE_URL = 'http://localhost:8080/api';

const App = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);

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
      }
    } catch {
      // 인증 체크 실패 시 로그인 페이지로
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (admin) => {
    setAdminInfo(admin);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      setAdminInfo(null);
    } catch {
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  const handleSuccess = () => {
    // 성공 처리는 navigate로 처리됨
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner-modern"></div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={<LandingPage onSuccess={handleSuccess} />} 
          />
          <Route 
            path="/success" 
            element={<SuccessPage />} 
          />
          <Route 
            path="/login" 
            element={<LoginPage onLoginSuccess={handleLoginSuccess} />} 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminInfo={adminInfo}>
                <AdminPage onLogout={handleLogout} adminInfo={adminInfo} />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;