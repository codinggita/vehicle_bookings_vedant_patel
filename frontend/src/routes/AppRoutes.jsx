import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './routeConfig';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AdminPage from '../pages/AdminPage';
import UserPage from '../pages/UserPage';
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.ADMIN} element={<AdminPage />} />
      <Route path={ROUTES.USER} element={<UserPage />} />
      <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
      <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
    </Routes>
  );
};

export default AppRoutes;
