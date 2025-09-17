import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:8080/api';

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
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        width: '100%'
      }}>
        {/* 네비게이션 바 */}
        <nav style={{
          backgroundColor: '#000000',
          color: 'white',
          padding: '1rem 0',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          width: '100%'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '100%',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'white'
            }}>
              고객 정보 상세보기
            </span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.875rem'
              }}>
                {adminInfo.name}님
              </span>
              <button 
                onClick={onLogout}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  color: 'white',
                  backgroundColor: 'transparent',
                  border: '2px solid white',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                로그아웃
              </button>
            </div>
          </div>
        </nav>

        {/* 메인 컨텐츠 */}
        <div style={{
          padding: '2rem',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <button 
            onClick={() => setSelectedCustomer(null)} 
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '2rem'
            }}
          >
            ← 목록으로 돌아가기
          </button>
          
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            <div style={{
              background: '#000000',
              color: 'white',
              padding: '1.5rem',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              고객 정보 #{selectedCustomer.id}
            </div>
            <div style={{ padding: '2rem' }}>
              <div style={{
                display: 'grid',
                gap: '1.5rem'
              }}>
                <div>
                  <strong style={{
                    color: '#6c757d',
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    이름
                  </strong>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    color: '#212529'
                  }}>
                    {selectedCustomer.name}
                  </div>
                </div>
                
                <div>
                  <strong style={{
                    color: '#6c757d',
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    전화번호
                  </strong>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    color: '#212529'
                  }}>
                    {selectedCustomer.phoneNumber}
                  </div>
                </div>
                
                <div>
                  <strong style={{
                    color: '#6c757d',
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    업체명
                  </strong>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    color: '#212529'
                  }}>
                    {selectedCustomer.companyName}
                  </div>
                </div>
                
                <div>
                  <strong style={{
                    color: '#6c757d',
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    신청일시
                  </strong>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    color: '#212529'
                  }}>
                    {formatDateTime(selectedCustomer.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      width: '100%'
    }}>
      {/* 네비게이션 바 - 전체 화면 너비 */}
      <nav style={{
        backgroundColor: '#000000',
        color: 'white',
        padding: '1rem 0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '100%',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <span style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'white'
          }}>
            Cart 프로젝트 관리자
          </span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <span style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.875rem'
            }}>
              {adminInfo.name}님
            </span>
            <button 
              onClick={onLogout}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                color: 'white',
                backgroundColor: 'transparent',
                border: '2px solid white',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              로그아웃
            </button>
          </div>
        </div>
      </nav>

      {/* 메인 컨텐츠 - 전체 화면 사용 */}
      <div style={{
        padding: '2rem',
        width: '100%'
      }}>
        {/* 통계 및 다운로드 섹션 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
          width: '100%'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e9ecef'
          }}>
            <div style={{
              fontSize: '3rem',
              fontWeight: '700',
              color: '#000000',
              lineHeight: '1',
              marginBottom: '0.5rem'
            }}>
              {totalCount}
            </div>
            <div style={{
              color: '#6c757d',
              fontSize: '1rem',
              fontWeight: '500'
            }}>
              총 신청 건수
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <button 
              onClick={handleDownloadCsv}
              style={{
                padding: '0.875rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                color: '#000000',
                backgroundColor: 'white',
                border: '2px solid #000000',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              CSV 다운로드
            </button>
          </div>
        </div>

        {/* 테이블 섹션 - 전체 너비 사용 */}
        <div style={{
          width: '100%',
          background: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            background: '#000000',
            color: 'white',
            padding: '1.5rem',
            fontSize: '1.1rem',
            fontWeight: '600'
          }}>
            고객 신청 목록
          </div>
          
          {loading ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid #e9ecef',
                borderTop: '3px solid #000000',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
            </div>
          ) : customers.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: '#6c757d'
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '1rem',
                opacity: '0.5'
              }}>
                📋
              </div>
              <div>등록된 고객 정보가 없습니다.</div>
            </div>
          ) : (
            <div style={{ overflowX: 'auto', width: '100%' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#212529',
                      fontSize: '0.875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '1px solid #e9ecef',
                      width: '8%'
                    }}>
                      번호
                    </th>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#212529',
                      fontSize: '0.875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '1px solid #e9ecef',
                      width: '20%'
                    }}>
                      이름
                    </th>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#212529',
                      fontSize: '0.875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '1px solid #e9ecef',
                      width: '25%'
                    }}>
                      전화번호
                    </th>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#212529',
                      fontSize: '0.875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '1px solid #e9ecef',
                      width: '25%'
                    }}>
                      업체명
                    </th>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#212529',
                      fontSize: '0.875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '1px solid #e9ecef',
                      width: '17%'
                    }}>
                      신청일시
                    </th>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#212529',
                      fontSize: '0.875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '1px solid #e9ecef',
                      width: '5%'
                    }}>
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => (
                    <tr 
                      key={customer.id}
                      style={{
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.parentNode.style.backgroundColor = '#f8f9fa';
                      }}
                      onMouseLeave={(e) => {
                        e.target.parentNode.style.backgroundColor = 'white';
                      }}
                    >
                      <td style={{
                        padding: '1rem',
                        borderBottom: '1px solid #e9ecef',
                        color: '#212529'
                      }}>
                        {index + 1}
                      </td>
                      <td style={{
                        padding: '1rem',
                        borderBottom: '1px solid #e9ecef',
                        color: '#212529'
                      }}>
                        {customer.name}
                      </td>
                      <td style={{
                        padding: '1rem',
                        borderBottom: '1px solid #e9ecef',
                        color: '#212529'
                      }}>
                        {customer.phoneNumber}
                      </td>
                      <td style={{
                        padding: '1rem',
                        borderBottom: '1px solid #e9ecef',
                        color: '#212529'
                      }}>
                        {customer.companyName}
                      </td>
                      <td style={{
                        padding: '1rem',
                        borderBottom: '1px solid #e9ecef',
                        color: '#212529'
                      }}>
                        {formatDateTime(customer.createdAt)}
                      </td>
                      <td style={{
                        padding: '1rem',
                        borderBottom: '1px solid #e9ecef',
                        textAlign: 'center'
                      }}>
                        <button 
                          onClick={() => handleViewDetail(customer)}
                          style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            backgroundColor: '#000000',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
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

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default AdminPage;