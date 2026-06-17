import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@features/auth/authSlice';
import { ROUTES } from '../../routes/routeConfig';

/**
 * Sidebar Component
 * Provides navigation links, branding, and active state styles.
 * Supports sliding drawer on mobile screens.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the sidebar is open on mobile
 * @param {function} props.onClose - Callback to close the sidebar on mobile
 */
const Sidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Dynamic Dashboard route based on role
  const dashboardRoute = user?.role === 'admin' ? ROUTES.ADMIN : ROUTES.USER;

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
    if (onClose) onClose();
  };

  // Sidebar Menu Configuration
  const menuGroups = [
    {
      title: 'Main Menu',
      items: [
        {
          name: 'Dashboard',
          path: dashboardRoute,
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
            </svg>
          ),
        },
        {
          name: 'Bookings',
          path: '/bookings',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          name: 'Users',
          path: '/users',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ),
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          name: 'Profile',
          path: ROUTES.PROFILE,
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ),
        },
        {
          name: 'Settings',
          path: ROUTES.SETTINGS,
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Overlay Background (backdrop blur) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-slate-900 border-r border-slate-800 text-slate-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Branding/Logo Section */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800/80">
          <div className="flex items-center justify-center p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-inner">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent tracking-tight">
              VehicleSphere
            </h2>
            <span className="text-[10px] text-indigo-400 font-semibold tracking-widest uppercase">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Navigation Groups */}
        <nav className="flex-1 px-4 py-6 space-y-7 overflow-y-auto custom-scrollbar">
          {menuGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-2">
              <span className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                {group.title}
              </span>
              <div className="space-y-1">
                {group.items.map((item, itemIdx) => (
                  <NavLink
                    key={itemIdx}
                    to={item.path}
                    onClick={() => {
                      if (onClose) onClose();
                    }}
                    className={({ isActive }) =>
                      `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500/10 to-violet-600/10 border border-indigo-500/20 text-indigo-400 shadow-md shadow-indigo-500/5'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`transition-colors duration-200 ${isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-300'}`}>
                          {item.icon}
                        </span>
                        <span>{item.name}</span>
                        {/* Glow indicator on left */}
                        {isActive && (
                          <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-indigo-500 rounded-r" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User Card & Action Area */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/20 transition-all duration-150">
            {/* Avatar placeholder */}
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-bold text-sm border border-indigo-400/20">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            
            {/* User Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-200 truncate">
                {user?.name || 'Administrator'}
              </p>
              <p className="text-xs text-indigo-400 font-medium capitalize">
                {user?.role || 'Guest'}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 hover:border-red-500/30 hover:bg-red-500/5 text-slate-400 hover:text-red-400 text-xs font-semibold tracking-wide uppercase transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
