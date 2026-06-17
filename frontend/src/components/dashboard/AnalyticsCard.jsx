import React from 'react';

/**
 * AnalyticsCard Component
 * Displays a single key business metric with an icon and loading state support.
 * 
 * @param {Object} props
 * @param {string} props.title - The label for the metric
 * @param {string|number} props.value - The metric value (e.g. "$12,450" or "18,289")
 * @param {React.ReactNode} props.icon - Icon element representing the card's purpose
 * @param {boolean} [props.loading=false] - Triggers skeleton pulse loading state
 */
const AnalyticsCard = React.memo(({ title, value, icon, loading = false }) => {
  return (
    <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between shadow-xl transition-all duration-300 hover:border-indigo-500/30 hover:shadow-indigo-500/5 hover:-translate-y-0.5 group">
      
      {/* Metric details or Skeleton Loader */}
      <div className="flex-1 min-w-0 pr-4">
        {loading ? (
          <div className="animate-pulse space-y-3">
            {/* Title Skeleton */}
            <div className="h-3 w-24 bg-slate-800 rounded" />
            {/* Value Skeleton */}
            <div className="h-7 w-32 bg-slate-800 rounded" />
          </div>
        ) : (
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block truncate">
              {title}
            </span>
            <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-1.5 block truncate group-hover:text-indigo-200 transition-colors duration-200">
              {value}
            </span>
          </div>
        )}
      </div>

      {/* Icon Holder */}
      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-slate-950/60 border border-slate-800/80 text-indigo-400 group-hover:text-indigo-300 group-hover:bg-indigo-500/5 group-hover:border-indigo-500/20 shadow-inner transition-all duration-300">
        {icon}
      </div>

    </div>
  );
});

export default AnalyticsCard;
