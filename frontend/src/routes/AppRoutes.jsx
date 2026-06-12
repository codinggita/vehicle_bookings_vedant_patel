import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './routeConfig';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AdminPage from '../pages/AdminPage';
import UserPage from '../pages/UserPage';
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import RoleBasedRoute from './RoleBasedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public/Unprotected routes */}
      <Route path={ROUTES.HOME} element={<HomePage />} />

      {/* Guest/Auth routes (only for unauthenticated users) */}
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      {/* Protected routes (requires authentication) */}
      <Route
        path={ROUTES.PROFILE}
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.SETTINGS}
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      {/* Role-based protected routes */}
      <Route
        path={ROUTES.ADMIN}
        element={
          <RoleBasedRoute allowedRoles={['admin']}>
            <AdminPage />
          </RoleBasedRoute>
        }
      />
      <Route
        path={ROUTES.USER}
        element={
          <RoleBasedRoute allowedRoles={['user', 'admin']}>
            <UserPage />
          </RoleBasedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;

