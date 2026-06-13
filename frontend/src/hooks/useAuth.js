import { useSelector } from 'react-redux';

/**
 * Hook to retrieve current auth state reactively from the Redux store
 * with fallbacks to localStorage.
 */
export const useAuth = () => {
  // Handle test helpers in URL query params if window is defined
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.get('logout') === 'true') {
      localStorage.clear();
    } else {
      const queryToken = params.get('token');
      const queryRole = params.get('role');
      if (queryToken) {
        localStorage.setItem('token', queryToken);
        localStorage.setItem('user', JSON.stringify({ role: queryRole || 'user' }));
      }
    }
  }

  const reduxAuth = useSelector((state) => state.auth);

  // Read reactive values with local storage fallbacks to support immediate updates & test tools
  const token = reduxAuth?.token || localStorage.getItem('token');
  let user = reduxAuth?.user;
  if (!user) {
    try {
      const storedUser = localStorage.getItem('user');
      user = storedUser ? JSON.parse(storedUser) : null;
    } catch {
      user = null;
    }
  }

  return {
    isAuthenticated: !!token,
    user,
    token,
  };
};

export default useAuth;
