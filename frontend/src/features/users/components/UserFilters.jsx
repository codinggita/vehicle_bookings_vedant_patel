import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters } from '../store/userSlice';

/**
 * UserFilters Component
 * Dropdown selectors for role and status filtering, with a dynamic clear button.
 */
const UserFilters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.users);

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ [key]: value }));
  };

  const handleClear = () => {
    dispatch(clearFilters());
  };

  // Check if any filter is active
  const hasActiveFilters = filters.search || filters.role || filters.status;

  return (
    <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
      
      {/* 1. Role Selector */}
      <div className="relative w-full sm:w-40">
        <select
          value={filters.role}
          onChange={(e) => handleFilterChange('role', e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-900 border border-slate-800 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 appearance-none cursor-pointer transition-all duration-200"
          aria-label="Filter by role"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>

      {/* 2. Status Selector */}
      <div className="relative w-full sm:w-40">
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-900 border border-slate-800 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 appearance-none cursor-pointer transition-all duration-200"
          aria-label="Filter by account status"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="blocked">Blocked</option>
        </select>
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>

      {/* 3. Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={handleClear}
          className="px-4 py-2.5 text-sm font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-slate-800 hover:border-slate-700 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3 3L22 4" />
          </svg>
          Reset Filters
        </button>
      )}

    </div>
  );
};

export default UserFilters;
