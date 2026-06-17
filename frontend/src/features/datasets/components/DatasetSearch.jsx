import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * DatasetSearch Component
 * Debounced search input that synchronizes search term with URL search params.
 */
const DatasetSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchVal = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(searchVal);

  // Debounce user keystrokes before updating URL search parameters
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim() !== searchVal.trim()) {
        const nextParams = new URLSearchParams(searchParams);
        if (searchTerm.trim()) {
          nextParams.set('search', searchTerm.trim());
        } else {
          nextParams.delete('search');
        }
        nextParams.set('page', '1'); // Reset to page 1 on search
        setSearchParams(nextParams);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, searchParams, setSearchParams, searchVal]);

  const handleClear = () => {
    setSearchTerm('');
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('search');
    nextParams.set('page', '1');
    setSearchParams(nextParams);
  };

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
        placeholder="Search ID, customer, vehicle..."
        className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl bg-slate-900 border border-slate-800 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-200"
      />

      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-300 transition-colors"
          aria-label="Clear search input"
        >
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default DatasetSearch;
