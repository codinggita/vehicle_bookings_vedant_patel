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
import DashboardLayout from '@layouts/DashboardLayout';

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
            <DashboardLayout>
              <ProfilePage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.SETTINGS}
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <SettingsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Role-based protected routes */}
      <Route
        path={ROUTES.ADMIN}
        element={
          <RoleBasedRoute allowedRoles={['admin']}>
            <DashboardLayout>
              <AdminPage />
            </DashboardLayout>
          </RoleBasedRoute>
        }
      />
      <Route
        path={ROUTES.USER}
        element={
          <RoleBasedRoute allowedRoles={['user', 'admin']}>
            <DashboardLayout>
              <UserPage />
            </DashboardLayout>
          </RoleBasedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;

