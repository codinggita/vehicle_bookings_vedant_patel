import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../routes/routeConfig';
import ProfileDropdown from '@components/navigation/ProfileDropdown';

/**
 * Navbar Component
 * Displays the page title dynamically, search bar, notification indicators,
 * and mobile drawer toggle controls.
 * 
 * @param {Object} props
 * @param {function} props.onMenuClick - Trigger to open/toggle sidebar on mobile
 */
const Navbar = ({ onMenuClick }) => {
  const location = useLocation();

  // Dynamic Page Title determination based on location
  const getPageTitle = (pathname) => {
    switch (pathname) {
      case ROUTES.ADMIN:
        return 'Admin Overview';
      case ROUTES.USER:
        return 'Dashboard Overview';
      case ROUTES.PROFILE:
        return 'My Profile';
      case ROUTES.SETTINGS:
        return 'System Settings';
      case '/bookings':
        return 'Booking Directory';
      case '/users':
        return 'User Management';
      default:
        return 'Overview';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between w-full h-16 px-4 md:px-6 bg-white/75 dark:bg-slate-950/65 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80">
      
      {/* Title & Mobile Hamburger area */}
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={onMenuClick}
          className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/60 rounded-xl lg:hidden focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
          aria-label="Toggle Navigation Sidebar"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Dynamic Title */}
        <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          {getPageTitle(location.pathname)}
        </h1>
      </div>

      {/* Search Bar (Placeholder) */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search booking ID, vehicle or customer..."
            disabled
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all duration-200 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Action Bar (Search trigger on mobile, Notifications, Profile dropdown) */}
      <div className="flex items-center gap-3">
        
        {/* Mobile Search Button trigger (visual placeholder only) */}
        <button
          disabled
          className="md:hidden p-2.5 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 rounded-xl cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Notifications Center (Placeholder) */}
        <div className="relative">
          <button
            disabled
            className="p-2.5 text-slate-400 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/5 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-500/10 rounded-xl transition-all duration-200 relative cursor-not-allowed group"
            aria-label="View notifications"
          >
            <svg className="w-5 h-5 transition-transform duration-200 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            
            {/* Unread dot indicator */}
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-slate-950 animate-pulse" />
          </button>
        </div>

        {/* Vertical Divider */}
        <span className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

        {/* Profile Dropdown Component */}
        <ProfileDropdown />

      </div>

    </header>
  );
};

export default Navbar;
