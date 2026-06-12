import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from './routeConfig';
import useAuth from '@hooks/useAuth';


const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children ? children : <Outlet />;
};

export default RoleBasedRoute;
