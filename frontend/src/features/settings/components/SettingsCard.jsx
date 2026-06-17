

import { memo } from 'react';

/**
 * SettingsCard Component
 * Wraps settings controls in an aesthetically pleasing container with custom dark/light theme support.
 */
const SettingsCard = memo(({ title, description, children, icon }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex items-start gap-4 mb-6">
        {icon && (
          <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20 shadow-inner flex-shrink-0">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
            {title}
          </h3>
          {description && (
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 font-medium">
              {description}
            </p>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
});

export default SettingsCard;
