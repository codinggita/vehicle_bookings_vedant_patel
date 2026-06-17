import Skeleton from '@mui/material/Skeleton';

/**
 * FormSkeleton Component
 * MUI skeleton placeholder simulating a multi-field form layout.
 *
 * @param {Object} props
 * @param {number} [props.fields=4] - Number of form field placeholders to render
 */
const FormSkeleton = ({ fields = 4 }) => {
  return (
    <div className="space-y-6 animate-pulse select-none">
      {/* Form header skeleton */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-4">
        <Skeleton variant="text" width="35%" height={28} />
        <Skeleton variant="text" width="55%" height={16} sx={{ mt: 1 }} />
      </div>

      {/* Form fields grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {Array.from({ length: fields }).map((_, idx) => (
          <div key={idx} className="space-y-2">
            <Skeleton variant="text" width="40%" height={14} />
            <Skeleton variant="rounded" width="100%" height={42} />
          </div>
        ))}
      </div>

      {/* Textarea field */}
      <div className="space-y-2">
        <Skeleton variant="text" width="25%" height={14} />
        <Skeleton variant="rounded" width="100%" height={88} />
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800/80">
        <Skeleton variant="rounded" width={90} height={38} />
        <Skeleton variant="rounded" width={120} height={38} />
      </div>
    </div>
  );
};

export default FormSkeleton;
