import Skeleton from '@mui/material/Skeleton';

/**
 * CardSkeleton Component
 * Material UI skeleton loader simulating key metric card layout elements.
 */
const CardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 flex items-center justify-between shadow-sm">
      <div className="flex-1 space-y-3 pr-4">
        <Skeleton variant="text" width="40%" height={16} />
        <Skeleton variant="rounded" width="70%" height={32} />
      </div>
      <Skeleton variant="rounded" width={48} height={48} className="rounded-xl" />
    </div>
  );
};

export default CardSkeleton;
