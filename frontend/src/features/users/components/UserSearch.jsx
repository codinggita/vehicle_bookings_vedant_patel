import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../store/userSlice';
import { useDebounce } from '@hooks/useDebounce';

/**
 * UserSearch Component
 * Text input with debouncing to search users by name or email.
 */
const UserSearch = React.memo(() => {
  const dispatch = useDispatch();
  const searchFilter = useSelector((state) => state.users.filters.search);
  const [searchTerm, setSearchTerm] = useState(searchFilter);

  // Use the custom debounce hook
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Effect to dispatch the filter change when debounced term changes
  useEffect(() => {
    if (debouncedSearchTerm !== searchFilter) {
      dispatch(setFilters({ search: debouncedSearchTerm }));
    }
  }, [debouncedSearchTerm, dispatch, searchFilter]);

  const handleClear = useCallback(() => {
    setSearchTerm('');
    dispatch(setFilters({ search: '' }));
  }, [dispatch]);

  return (
    <div className="relative w-full sm:max-w-xs">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
        <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
      
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search name or email..."
        className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl bg-slate-900 border border-slate-800 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-200"
      />

      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-300 transition-colors"
          aria-label="Clear search text"
        >
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
});

export default UserSearch;
