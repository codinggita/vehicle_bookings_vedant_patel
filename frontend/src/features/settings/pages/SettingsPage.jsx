
import SettingsCard from '../components/SettingsCard';
import ThemeSettings from '../components/ThemeSettings';
import PreferenceSection from '../components/PreferenceSection';

/**
 * SettingsPage Container Component
 * Primary Settings screen showing all customization cards.
 */
const SettingsPage = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Settings Top Header Area */}
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          System Settings
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 font-medium">
          Manage system layout, visual theme states, and email alert distributions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Theme Settings Card */}
        <SettingsCard
          title="Theme Customization"
          description="Switch between light and dark modes, or sync configuration with local operating system parameters."
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          }
        >
          <ThemeSettings />
        </SettingsCard>

        {/* Preferences Settings Card */}
        <SettingsCard
          title="Dashboard Preferences"
          description="Adjust dashboard layouts, auto-refresh intervals, and manage real-time alert notifications."
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          }
        >
          <PreferenceSection />
        </SettingsCard>
      </div>
    </div>
  );
};

export default SettingsPage;
