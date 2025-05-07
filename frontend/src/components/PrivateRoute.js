import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user is trying to access the wrong dashboard
  const isProviderRoute = location.pathname.startsWith('/provider') || location.pathname.startsWith('/job-provider');
  const isCSCRoute = location.pathname.startsWith('/csc');
  const isUserRoute = location.pathname.startsWith('/user');
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  const isProviderUser = user.role === 'jobProvider';
  const isCSCUser = user.role === 'csc';
  const isRegularUser = user.role === 'user';
  const isAdminUser = user.role === 'admin';

  // Redirect to appropriate dashboard based on role
  if (isProviderRoute && !isProviderUser) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isCSCRoute && !isCSCUser) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isUserRoute && !isRegularUser) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isAdminRoute && !isAdminUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute; 