import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * DatasetFilters Component
 * Allows filtering bookings by status, vehicle type, payment method, rating,
 * fare boundaries, distance boundaries, and booking date. Syncs directly to URL.
 */
const DatasetFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);

  // Read current filter values from query parameters
  const status = searchParams.get('status') || '';
  const vehicle = searchParams.get('vehicle') || '';
  const payment = searchParams.get('payment') || '';
  const minRating = searchParams.get('minRating') || '';
  const minFare = searchParams.get('minFare') || '';
  const maxFare = searchParams.get('maxFare') || '';
  const minDistance = searchParams.get('minDistance') || '';
  const maxDistance = searchParams.get('maxDistance') || '';
  const date = searchParams.get('date') || '';

  // Local state for ranges (to avoid requesting API on every keystroke)
  const [localMinFare, setLocalMinFare] = useState(minFare);
  const [localMaxFare, setLocalMaxFare] = useState(maxFare);
  const [localMinDist, setLocalMinDist] = useState(minDistance);
  const [localMaxDist, setLocalMaxDist] = useState(maxDistance);

  const updateParam = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }
    nextParams.set('page', '1'); // reset page on filter change
    setSearchParams(nextParams);
  };

  const handleApplyRanges = (e) => {
    e.preventDefault();
    const nextParams = new URLSearchParams(searchParams);
    
    if (localMinFare) nextParams.set('minFare', localMinFare);
    else nextParams.delete('minFare');

    if (localMaxFare) nextParams.set('maxFare', localMaxFare);
    else nextParams.delete('maxFare');

    if (localMinDist) nextParams.set('minDistance', localMinDist);
    else nextParams.delete('minDistance');

    if (localMaxDist) nextParams.set('maxDistance', localMaxDist);
    else nextParams.delete('maxDistance');

    nextParams.set('page', '1');
    setSearchParams(nextParams);
  };

  const handleClearFilters = () => {
    setLocalMinFare('');
    setLocalMaxFare('');
    setLocalMinDist('');
    setLocalMaxDist('');
    
    const nextParams = new URLSearchParams();
    // Keep search and sorting parameters if any, clear the rest
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy');
    const order = searchParams.get('order');
    
    if (search) nextParams.set('search', search);
    if (sortBy) nextParams.set('sortBy', sortBy);
    if (order) nextParams.set('order', order);
    nextParams.set('page', '1');
    setSearchParams(nextParams);
  };

  const hasActiveFilters = status || vehicle || payment || minRating || minFare || maxFare || minDistance || maxDistance || date;

  return (
    <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 shadow-sm backdrop-blur-md">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-xl bg-slate-800/60 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 text-slate-300 hover:text-slate-100 transition-all duration-200"
          >
            <svg className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            Filters
            {hasActiveFilters && (
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow shadow-indigo-500/50 inline-block ml-0.5" />
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold uppercase tracking-wider transition-colors duration-150"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {isExpanded && (
        <form onSubmit={handleApplyRanges} className="mt-4 pt-4 border-t border-slate-800/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Dropdown Filters */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status & Type</h4>
            
            {/* Status Selector */}
            <div className="space-y-1">
              <label htmlFor="filter-status" className="text-xs text-slate-400 font-medium">Booking Status</label>
              <select
                id="filter-status"
                value={status}
                onChange={(e) => updateParam('status', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-150"
              >
                <option value="">All Statuses</option>
                <option value="Success">Success / Completed</option>
                <option value="Canceled by Customer">Canceled by Customer</option>
                <option value="Canceled by Driver">Canceled by Driver</option>
                <option value="Driver Not Found">Driver Not Found</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Vehicle Type Selector */}
            <div className="space-y-1">
              <label htmlFor="filter-vehicle" className="text-xs text-slate-400 font-medium">Vehicle Type</label>
              <select
                id="filter-vehicle"
                value={vehicle}
                onChange={(e) => updateParam('vehicle', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-150"
              >
                <option value="">All Vehicles</option>
                <option value="Mini">Mini</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="hatchback">Hatchback</option>
                <option value="prime">Prime</option>
              </select>
            </div>
          </div>

          {/* Preferences & Ratings */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Payment & Ratings</h4>

            {/* Payment Method Selector */}
            <div className="space-y-1">
              <label htmlFor="filter-payment" className="text-xs text-slate-400 font-medium">Payment Method</label>
              <select
                id="filter-payment"
                value={payment}
                onChange={(e) => updateParam('payment', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-150"
              >
                <option value="">All Methods</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
              </select>
            </div>

            {/* Minimum Rating Selector */}
            <div className="space-y-1">
              <label htmlFor="filter-rating" className="text-xs text-slate-400 font-medium">Min Customer Rating</label>
              <select
                id="filter-rating"
                value={minRating}
                onChange={(e) => updateParam('minRating', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-150"
              >
                <option value="">Any Rating</option>
                <option value="5">5 Stars</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
                <option value="1">1+ Star</option>
              </select>
            </div>
          </div>

          {/* Range Inputs */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Metrics Boundaries</h4>

            {/* Fare boundary */}
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-medium">Fare Range ($)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={localMinFare}
                  onChange={(e) => setLocalMinFare(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm rounded-xl bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-150"
                />
                <span className="text-slate-600 text-xs">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={localMaxFare}
                  onChange={(e) => setLocalMaxFare(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm rounded-xl bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-150"
                />
              </div>
            </div>

            {/* Distance boundary */}
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-medium">Distance Range (miles)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={localMinDist}
                  onChange={(e) => setLocalMinDist(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm rounded-xl bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-150"
                />
                <span className="text-slate-600 text-xs">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={localMaxDist}
                  onChange={(e) => setLocalMaxDist(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm rounded-xl bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-150"
                />
              </div>
            </div>
          </div>

          {/* Date Picker & Range action */}
          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Schedule & Date</h4>
              {/* Date Input */}
              <div className="space-y-1">
                <label htmlFor="filter-date" className="text-xs text-slate-400 font-medium">Booking Date</label>
                <input
                  id="filter-date"
                  type="date"
                  value={date}
                  onChange={(e) => updateParam('date', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-150"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200"
            >
              Apply Ranges
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DatasetFilters;
