
import { useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSinglePreference } from '../store/settingsSlice';

/**
 * PreferenceSection Component
 * Renders switches/toggles for custom application, notifications, and dashboard preferences.
 */
const PreferenceSection = memo(() => {
  const dispatch = useDispatch();
  const preferences = useSelector((state) => state.settings.preferences);

  const handleToggle = useCallback((key) => {
    dispatch(setSinglePreference({ key, value: !preferences[key] }));
  }, [dispatch, preferences]);

  const preferenceItems = [
    {
      key: 'notifications',
      title: 'Push Notifications',
      description: 'Receive real-time desktop toast alerts for important events.',
    },
    {
      key: 'emailAlerts',
      title: 'Email Digests',
      description: 'Weekly summaries of ride bookings and platform performance analytics.',
    },
    {
      key: 'compactMode',
      title: 'Compact Dashboard Layout',
      description: 'Condense spaces and margins across tables and grid cards.',
    },
    {
      key: 'autoRefresh',
      title: 'Analytics Auto-Refresh',
      description: 'Fetch new statistics from servers automatically every 30 seconds.',
    },
  ];

  return (
    <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
      {preferenceItems.map((item) => (
        <div key={item.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
          <div className="flex-1 pr-4">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {item.title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {item.description}
            </p>
          </div>
          
          {/* Custom Switch Component */}
          <button
            onClick={() => handleToggle(item.key)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
              preferences[item.key] ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                preferences[item.key] ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );
});

export default PreferenceSection;
