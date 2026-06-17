import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './routeConfig';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import RoleBasedRoute from './RoleBasedRoute';
import DashboardLayout from '@layouts/DashboardLayout';
import UsersPage from '@features/users/pages/UsersPage';
import DatasetsPage from '@features/datasets/pages/DatasetsPage';
import ProfilePage from '@features/profile/pages/ProfilePage';
import SettingsPage from '@features/settings/pages/SettingsPage';
import AnalyticsDashboard from '@features/analytics/pages/AnalyticsDashboard';

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

      {/* Protected routes (requires authentication & wrapped in DashboardLayout) */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />

        {/* Bookings Dataset Route */}
        <Route
          path="/bookings"
          element={
            <RoleBasedRoute allowedRoles={['admin', 'user']}>
              <DatasetsPage />
            </RoleBasedRoute>
          }
        />

        {/* User Management Route (Restricted to Admins) */}
        <Route
          path="/users"
          element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <UsersPage />
            </RoleBasedRoute>
          }
        />

        {/* Role-based protected routes */}
        <Route
          path={ROUTES.ADMIN}
          element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <AnalyticsDashboard />
            </RoleBasedRoute>
          }
        />
        <Route
          path={ROUTES.USER}
          element={
            <RoleBasedRoute allowedRoles={['user', 'admin']}>
              <AnalyticsDashboard />
            </RoleBasedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;


