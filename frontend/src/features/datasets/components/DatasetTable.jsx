import { memo } from 'react';
import DatasetTableHeader from './DatasetTableHeader';
import DatasetRow from './DatasetRow';
import { TableSkeleton } from '@components/skeletons';
import EmptyState from '@components/ui/EmptyState/EmptyState';
import ErrorState from '@components/ui/ErrorState/ErrorState';

/**
 * DatasetTable Component
 * Wraps table views, loading state skeletons, error indicators, and row maps.
 * 
 * @param {Object} props
 * @param {Array} props.datasets - Bookings dataset list to show
 * @param {boolean} props.loading - Fetching indicator
 * @param {string|null} props.error - Current fetch errors
 * @param {function} props.onRetry - Retry fetch trigger
 * @param {function} props.onEdit - Row edit callback
 * @param {function} props.onDelete - Row delete callback
 */
const DatasetTable = memo(({ datasets, loading, error, onRetry, onEdit, onDelete }) => {

  return (
    <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          
          <DatasetTableHeader />

          {loading ? (
            <TableSkeleton rows={5} cols={10} />
          ) : error ? (
            <tbody>
              <tr>
                <td colSpan={10} className="px-6 py-12">
                  <ErrorState
                    title="Failed to Load Datasets"
                    message={error}
                    onRetry={onRetry}
                    retryLabel="Try Again"
                  />
                </td>
              </tr>
            </tbody>
          ) : datasets.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={10} className="px-6 py-16">
                  <EmptyState
                    title="No Datasets Found"
                    message="Try resetting filters or adjusting search keyword terms."
                  />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="divide-y divide-slate-800/30">
              {datasets.map((dataset) => (
                <DatasetRow
                  key={dataset._id}
                  dataset={dataset}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          )}

        </table>
      </div>
    </div>
  );
});

export default DatasetTable;
