import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@features/auth/authSlice';
import { ROUTES } from '../../routes/routeConfig';

/**
 * ProfileDropdown Component
 * Displays user info and provides access to Profile, Settings, and Logout flows.
 * Includes outside click detection and keyboard accessibility.
 */
const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Close dropdown when user clicks outside the component boundaries
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard events (Escape to close dropdown)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setIsOpen(false);
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  // Safe fallback display names and initials
  const userName = user?.name || 'User';
  const userEmail = user?.email || 'user@vehiclesphere.com';
  const userRole = user?.role || 'guest';
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* Dropdown Trigger Button */}
      <button
        onClick={toggleDropdown}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
      >
        {/* User initials inside a glowing gradient badge */}
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-bold text-sm border border-indigo-400/20 shadow-md shadow-indigo-500/10">
          {initials}
        </div>

        {/* User Name & Chevron indicator */}
        <span className="hidden sm:block text-sm font-semibold text-slate-200">
          {userName}
        </span>
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-slate-200' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu Container */}
      {isOpen && (
        <div
          role="menu"
          aria-label="User menu options"
          className="absolute right-0 mt-2.5 w-60 origin-top-right rounded-xl bg-slate-900 border border-slate-800 shadow-2xl divide-y divide-slate-800 focus:outline-none z-50 animate-fade-in"
        >
          {/* Section 1: User details headers */}
          <div className="px-4.5 py-3.5 select-none">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold text-slate-200 truncate">
                {userName}
              </p>
              {/* Role Badge */}
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {userRole}
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate mt-0.5">
              {userEmail}
            </p>
          </div>

          {/* Section 2: Actions & Pages navigation */}
          <div className="py-1.5">
            <button
              onClick={() => handleNavigate(ROUTES.PROFILE)}
              role="menuitem"
              className="flex w-full items-center gap-3 px-4.5 py-2.5 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors duration-150 text-left"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              My Profile
            </button>
            <button
              onClick={() => handleNavigate(ROUTES.SETTINGS)}
              role="menuitem"
              className="flex w-full items-center gap-3 px-4.5 py-2.5 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors duration-150 text-left"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </button>
          </div>

          {/* Section 3: Logout */}
          <div className="py-1.5">
            <button
              onClick={handleLogout}
              role="menuitem"
              className="flex w-full items-center gap-3 px-4.5 py-2.5 text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-colors duration-150 text-left"
            >
              <svg className="w-4.5 h-4.5 text-slate-400 group-hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
