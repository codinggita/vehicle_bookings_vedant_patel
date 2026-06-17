/**
 * NoSearchResults Component
 * Visual feedback when search queries or filter combinations yield zero matches.
 *
 * @param {Object} props
 * @param {string} [props.query] - The search term the user entered
 * @param {function} [props.onClear] - Callback to clear filters/search
 */
export default function NoSearchResults({
  query,
  onClear
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/30">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 dark:text-amber-400 mb-4">
        <svg
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
        No Results Found
      </h3>
      <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 max-w-sm">
        {query
          ? `No matches for "${query}". Try adjusting your search or filters.`
          : 'No results match the current filters. Try resetting them.'}
      </p>
      {onClear && (
        <button
          onClick={onClear}
          className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
