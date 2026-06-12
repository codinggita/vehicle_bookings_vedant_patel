import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from './routeConfig';
import useAuth from '@hooks/useAuth';


const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children ? children : <Outlet />;
};

export default PublicRoute;
