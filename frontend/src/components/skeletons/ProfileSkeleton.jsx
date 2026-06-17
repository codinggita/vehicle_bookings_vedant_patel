import Skeleton from '@mui/material/Skeleton';

/**
 * ProfileSkeleton Component
 * Replicates avatar cards, field descriptions, and input sections on profile loads.
 */
const ProfileSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse select-none">
      
      {/* Column 1: Avatar Card Skeleton */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-sm h-64">
        <Skeleton variant="circular" width={96} height={96} />
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="45%" height={16} />
      </div>

      {/* Column 2: Information Details Panel Skeleton */}
      <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="border-b border-slate-200 dark:border-slate-800/80 pb-4 flex justify-between items-center">
          <Skeleton variant="text" width="30%" height={24} />
          <Skeleton variant="rounded" width={80} height={32} />
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton variant="text" width="40%" height={14} />
              <Skeleton variant="rounded" width="100%" height={40} />
            </div>
            <div className="space-y-2">
              <Skeleton variant="text" width="40%" height={14} />
              <Skeleton variant="rounded" width="100%" height={40} />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton variant="text" width="20%" height={14} />
            <Skeleton variant="rounded" width="100%" height={80} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfileSkeleton;
