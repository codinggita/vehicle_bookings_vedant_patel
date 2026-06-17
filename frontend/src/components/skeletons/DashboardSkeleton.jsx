import Skeleton from '@mui/material/Skeleton';
import CardSkeleton from './CardSkeleton';

/**
 * DashboardSkeleton Component
 * Full-page loading skeleton for the dashboard view, including metric cards and chart placeholders.
 */
const DashboardSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse select-none">
      
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <Skeleton variant="text" width={280} height={36} />
          <Skeleton variant="text" width={340} height={18} />
        </div>
        <Skeleton variant="rounded" width={130} height={42} />
      </div>

      {/* Metric cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <CardSkeleton key={idx} />
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm"
          >
            <Skeleton variant="text" width="40%" height={24} sx={{ mb: 3 }} />
            <Skeleton variant="rounded" width="100%" height={200} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
