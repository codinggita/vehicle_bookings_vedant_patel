import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { logout } from '@features/auth/authSlice';
import { ROUTES } from '@routes';

/**
 * Custom hook to handle secure client-side user logout.
 * Clears Redux authentication state, removes tokens and user details from localStorage,
 * provides visual feedback via toast, and redirects back to the login page.
 */
export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // Securely clear storage credentials
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      // Catch exceptions for constrained/blocked environments or corrupted storage
      console.error('Error clearing localStorage during logout:', error);
    }

    // Reset Redux state by dispatching the logout action
    dispatch(logout());

    // Show visual confirmation toast
    toast.success('Successfully logged out.');

    // Redirect to login and clear navigation history stack for safety
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return handleLogout;
};

export default useLogout;
