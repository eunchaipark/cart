import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      textAlign: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        animation: 'fadeInUp 0.6s ease-out'
      }}>
        <div style={{ padding: '2rem 1.5rem' }}>
          {/* 성공 아이콘 */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            backgroundColor: '#28a745',
            borderRadius: '50%',
            marginBottom: '1.5rem',
            animation: 'checkmark 0.6s ease-in-out 0.3s both'
          }}>
            <div style={{
              fontSize: '2rem',
              color: 'white',
              fontWeight: 'bold'
            }}>
              ✓
            </div>
          </div>

          <h2 style={{
            fontSize: '1.5rem', 
            fontWeight: '700', 
            marginBottom: '1rem', 
            color: '#000000',
            lineHeight: 1.3
          }}>
            신청이 완료되었습니다!
          </h2>
          
          <p style={{
            color: '#6c757d',
            fontSize: '0.9rem',
            lineHeight: 1.5,
            marginBottom: '2rem'
          }}>
            소중한 정보를 보내주셔서 감사합니다.<br />
            빠른 시일 내에 연락드리겠습니다.
          </p>

          <Link 
            to="/" 
            style={{
              display: 'inline-block',
              width: '100%',
              padding: '1.25rem 2rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              color: 'white',
              backgroundColor: '#000000',
              border: 'none',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              WebkitTapHighlightColor: 'transparent'
            }}
            onTouchStart={(e) => {
              e.target.style.backgroundColor = '#333333';
              e.target.style.transform = 'translateY(1px)';
            }}
            onTouchEnd={(e) => {
              setTimeout(() => {
                e.target.style.backgroundColor = '#000000';
                e.target.style.transform = 'translateY(0)';
              }, 150);
            }}
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>

      {/* 추가 정보 섹션 */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        maxWidth: '400px',
        color: '#6c757d',
        fontSize: '0.875rem',
        lineHeight: 1.5
      }}>
        <p>
          궁금한 점이 있으시면<br />
          언제든지 문의해 주세요
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes checkmark {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0.75rem;
          }
        }

        /* 매우 작은 화면 대응 */
        @media (max-width: 320px) {
          h2 {
            font-size: 1.25rem !important;
          }
          
          .success-icon {
            width: 60px !important;
            height: 60px !important;
            font-size: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessPage;