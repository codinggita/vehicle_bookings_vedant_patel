import { memo } from 'react';
import DashboardPage from './DashboardPage';

/**
 * UserPage component
 * Displays the core dashboard page for standard user roles.
 */
const UserPage = memo(() => {
  return <DashboardPage />;
});

export default UserPage;
