
import { useDispatch, useSelector } from 'react-redux';
import { setThemeState } from '../store/settingsSlice';
import notificationService from '@components/notifications/notificationService';

/**
 * ThemeSettings Component
 * Provides options to toggle between light mode and dark mode, or detect system preferences.
 */
const ThemeSettings = () => {
  const dispatch = useDispatch();
  const activeTheme = useSelector((state) => state.settings.theme);

  const handleThemeChange = (mode) => {
    let targetMode = mode;
    
    if (mode === 'system') {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      targetMode = prefersDark ? 'dark' : 'light';
      notificationService.showSuccess('Synced theme with system settings!');
    } else {
      notificationService.showSuccess(`Theme switched to ${mode === 'dark' ? 'Dark' : 'Light'} Mode!`);
    }

    dispatch(setThemeState(targetMode));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* Light Mode Button */}
      <button
        onClick={() => handleThemeChange('light')}
        className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 ${
          activeTheme === 'light'
            ? 'border-indigo-500 bg-indigo-50/20 text-indigo-600 dark:text-indigo-400 dark:border-indigo-500/50'
            : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:hover:border-slate-700 dark:hover:text-slate-300'
        }`}
      >
        <svg className="w-6 h-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
        <span className="text-xs font-semibold">Light Mode</span>
      </button>

      {/* Dark Mode Button */}
      <button
        onClick={() => handleThemeChange('dark')}
        className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 ${
          activeTheme === 'dark'
            ? 'border-indigo-500 bg-indigo-50/20 text-indigo-600 dark:text-indigo-400 dark:border-indigo-500/50'
            : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:hover:border-slate-700 dark:hover:text-slate-300'
        }`}
      >
        <svg className="w-6 h-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
        <span className="text-xs font-semibold">Dark Mode</span>
      </button>

      {/* System Preference Button */}
      <button
        onClick={() => handleThemeChange('system')}
        className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:hover:border-slate-700 dark:hover:text-slate-300 transition-all duration-200"
      >
        <svg className="w-6 h-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span className="text-xs font-semibold">System Sync</span>
      </button>
    </div>
  );
};

export default ThemeSettings;
