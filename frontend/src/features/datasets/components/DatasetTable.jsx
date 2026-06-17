import DatasetTableHeader from './DatasetTableHeader';
import DatasetRow from './DatasetRow';

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
const DatasetTable = ({ datasets, loading, error, onRetry, onEdit, onDelete }) => {
  
  // Render loading skeleton rows
  const renderSkeletons = () => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <tr key={idx} className="border-b border-slate-800/50 animate-pulse">
        {Array.from({ length: 10 }).map((_, colIdx) => (
          <td key={colIdx} className="px-6 py-5.5">
            <div className="h-4 bg-slate-800 rounded-md w-full max-w-[100px]" />
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          
          <DatasetTableHeader />

          <tbody className="divide-y divide-slate-800/30">
            {loading ? (
              renderSkeletons()
            ) : error ? (
              <tr>
                <td colSpan={10} className="px-6 py-12 text-center select-none">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-slate-200 font-bold">Failed to Load Datasets</h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">{error}</p>
                    </div>
                    <button
                      onClick={onRetry}
                      className="mt-2 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </td>
              </tr>
            ) : datasets.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-6 py-16 text-center select-none">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-800/80 text-slate-500 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-slate-300 font-bold">No Datasets Found</h4>
                      <p className="text-xs text-slate-500 mt-1">Try resetting filters or adjusting search keyword terms.</p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              datasets.map((dataset) => (
                <DatasetRow
                  key={dataset._id}
                  dataset={dataset}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default DatasetTable;
