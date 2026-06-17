import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import useLogout from '@hooks/useLogout';
import { ROUTES } from '@routes';

export default function Navbar() {
  const { user } = useAuth();
  const logout = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';
  const roleLabel = user?.role === 'admin' ? 'Admin' : 'User';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md text-slate-100 px-6 py-4 flex items-center justify-between">
      {/* Page / Brand Context Title */}
      <div className="flex items-center space-x-3">
        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent">
          VehicleSphere
        </span>
        <span className="text-slate-600">|</span>
        <span className="text-xs text-slate-400 font-medium tracking-wide uppercase">
          Dashboard
        </span>
      </div>

      {/* User Actions & Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all duration-200 focus:outline-none"
        >
          {/* Avatar */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center font-semibold text-white shadow-md shadow-indigo-500/20">
            {userInitial}
          </div>
          {/* Info Details (hidden on small devices) */}
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-slate-200">{user?.name || 'Guest User'}</p>
            <p className="text-[10px] text-slate-400 leading-none mt-0.5">{user?.email || ''}</p>
          </div>
          {/* Dropdown Chevron */}
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Popover */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 z-50">
            {/* Header info */}
            <div className="px-5 py-4 border-b border-slate-800/60 bg-slate-950/40">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-white text-lg">
                  {userInitial}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">{user?.name || 'Guest User'}</h4>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {roleLabel}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 break-all">{user?.email}</p>
            </div>

            {/* Navigation links */}
            <div className="p-2 space-y-1">
              <Link
                to={ROUTES.PROFILE}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 w-full px-4 py-2.5 rounded-xl text-sm text-slate-300 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              >
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>My Profile</span>
              </Link>
              <Link
                to={ROUTES.SETTINGS}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 w-full px-4 py-2.5 rounded-xl text-sm text-slate-300 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              >
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Account Settings</span>
              </Link>
            </div>

            {/* Logout button */}
            <div className="p-2 border-t border-slate-800/60 bg-slate-950/20">
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="flex items-center space-x-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors focus:outline-none"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
