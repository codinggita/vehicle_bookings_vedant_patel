import { useDispatch, useSelector } from 'react-redux';
import { setPage, setLimit } from '../store/userSlice';

/**
 * UserPagination Component
 * Coordinates pagination controls, entries stats, and items-per-page limit selector.
 */
const UserPagination = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages, limit, totalUsers } = useSelector((state) => state.users);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setPage(page));
    }
  };

  const handleLimitChange = (e) => {
    dispatch(setLimit(Number(e.target.value)));
  };

  // Calculate items ranges (e.g. "Showing 1 to 10 of 45 entries")
  const startEntry = totalUsers === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endEntry = Math.min(currentPage * limit, totalUsers);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4.5 bg-slate-900/40 border-t border-slate-800/80">
      
      {/* 1. Statistics Summary */}
      <div className="text-xs font-semibold text-slate-500 select-none">
        Showing <span className="text-slate-300">{startEntry}</span> to{' '}
        <span className="text-slate-300">{endEntry}</span> of{' '}
        <span className="text-slate-300">{totalUsers}</span> entries
      </div>

      {/* 2. Pagination Navigators & Limit Selector */}
      <div className="flex items-center flex-wrap gap-4">
        
        {/* Limit Selector */}
        <div className="flex items-center gap-2 select-none">
          <span className="text-xs font-semibold text-slate-500">Show</span>
          <div className="relative">
            <select
              value={limit}
              onChange={handleLimitChange}
              className="px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 appearance-none pr-7 cursor-pointer font-medium"
              aria-label="Items per page"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-500">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
          <span className="text-xs font-semibold text-slate-500">rows</span>
        </div>

        {/* Previous/Next Navigator */}
        <div className="flex items-center gap-1.5 select-none">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-800/80 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-200"
            aria-label="Previous Page"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page Index Label */}
          <span className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            Page {currentPage} of {totalPages}
          </span>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-800/80 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-200"
            aria-label="Next Page"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>

    </div>
  );
};

export default UserPagination;
