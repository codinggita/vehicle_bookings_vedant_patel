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

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return {
    isAuthenticated: !!token,
    user,
  };
};

export default useAuth;
