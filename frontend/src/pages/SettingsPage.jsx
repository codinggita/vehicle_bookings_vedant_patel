import { useState } from 'react';
import useLogout from '@hooks/useLogout';

/**
 * Settings Page displaying application preferences and authentication controls.
 */
export default function SettingsPage() {
  const logout = useLogout();
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Account Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Configure your workspace preferences and security</p>
      </div>

      {/* Settings Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Visual Settings Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <h3 className="text-lg font-bold text-slate-200">Visual Preferences</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-slate-200">Color Theme</p>
                <p className="text-xs text-slate-400">Toggle dark and light color layouts</p>
              </div>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="dark">Dark Theme</option>
                <option value="light">Light Theme</option>
              </select>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-slate-200">Notifications</p>
                <p className="text-xs text-slate-400">Receive system alerts and booking updates</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifications ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    notifications ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security & Danger Zone Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-red-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-lg font-bold">Danger Zone</h3>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Terminate Active Session</h4>
              <p className="text-xs text-slate-400 mt-1">
                Log out from the vehicle booking dashboard. This action will securely end your session and clear cached credentials.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <button
              onClick={logout}
              className="w-full py-2.5 px-4 rounded-xl bg-red-950/40 hover:bg-red-900/40 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/30 font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign Out Account</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
