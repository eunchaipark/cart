import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div className="page-container">
      <div className="modern-card" style={{maxWidth: '500px', width: '100%'}}>
        <div className="card-body-modern text-center">
          <div className="success-icon-modern">
            <div className="success-checkmark">✓</div>
          </div>
          <h2 style={{fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--primary-color)'}}>
            신청이 완료되었습니다!
          </h2>
          <p className="text-muted mb-4">
            소중한 정보를 보내주셔서 감사합니다.<br />
            빠른 시일 내에 연락드리겠습니다.
          </p>
          <Link to="/" className="btn-primary-modern btn-modern">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;