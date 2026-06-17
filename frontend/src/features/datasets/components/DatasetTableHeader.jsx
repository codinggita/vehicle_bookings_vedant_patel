import { useCallback, memo } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * DatasetTableHeader Component
 * Renders the table head elements. Supports sorting by clicking sortable columns.
 */
const DatasetTableHeader = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read current sort criteria from URL
  const sortBy = searchParams.get('sortBy') || '';
  const order = searchParams.get('order') || '';

  const handleSort = useCallback((field) => {
    const nextParams = new URLSearchParams(searchParams);
    if (sortBy === field) {
      // Toggle order
      nextParams.set('order', order === 'asc' ? 'desc' : 'asc');
    } else {
      nextParams.set('sortBy', field);
      nextParams.set('order', 'desc'); // default to descending on first click
    }
    nextParams.set('page', '1');
    setSearchParams(nextParams);
  }, [searchParams, setSearchParams, sortBy, order]);

  // Render sort icon depending on active state
  const renderSortIcon = (field) => {
    if (sortBy !== field) {
      return (
        <svg className="w-3.5 h-3.5 ml-1.5 opacity-30 group-hover:opacity-60 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }

    if (order === 'asc') {
      return (
        <svg className="w-3.5 h-3.5 ml-1.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      );
    }

    return (
      <svg className="w-3.5 h-3.5 ml-1.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  const columns = [
    { label: 'Booking ID', sortField: null },
    { label: 'Customer Name', sortField: null },
    { label: 'Vehicle Type', sortField: null },
    { label: 'Booking Status', sortField: null },
    { label: 'Payment Method', sortField: null },
    { label: 'Fare ($)', sortField: 'fare' },
    { label: 'Distance (mi)', sortField: 'distance' },
    { label: 'Rating', sortField: 'customerRating' },
    { label: 'Booking Date', sortField: 'bookingDate' },
    { label: 'Actions', sortField: null },
  ];

  return (
    <thead className="bg-slate-900/60 text-slate-400 uppercase text-[10px] font-bold tracking-wider select-none border-b border-slate-800/80">
      <tr>
        {columns.map((col, idx) => (
          <th
            key={idx}
            className={`px-6 py-4.5 text-left font-semibold ${
              col.sortField ? 'cursor-pointer group hover:bg-slate-800/30 transition-colors' : ''
            }`}
            onClick={() => col.sortField && handleSort(col.sortField)}
          >
            <div className="flex items-center">
              <span>{col.label}</span>
              {col.sortField && renderSortIcon(col.sortField)}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
});

export default DatasetTableHeader;
