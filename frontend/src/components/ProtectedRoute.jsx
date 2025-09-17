import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminInfo }) => {
  return adminInfo ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;