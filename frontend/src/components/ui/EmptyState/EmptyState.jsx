import React from 'react';

/**
 * Reusable EmptyState Component
 * 
 * @param {Object} props
 * @param {string} props.title - Main empty state title
 * @param {string} [props.message] - Secondary description/explanation
 */
export default function EmptyState({
  title,
  message
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-400 mb-4">
        <svg 
          className="w-6 h-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth="1.5"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v4.5A2.25 2.25 0 002.25 13.5z" 
          />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      {message && (
        <p className="mt-1.5 text-sm text-slate-500 max-w-sm">
          {message}
        </p>
      )}
    </div>
  );
}
