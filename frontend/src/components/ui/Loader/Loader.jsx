import React from 'react';

/**
 * Reusable Loader/Spinner Component
 * 
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Spinner size
 * @param {string} [props.message] - Optional text to show below the spinner
 */
export default function Loader({
  size = 'md',
  message
}) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-slate-500">
      <div 
        className={`animate-spin rounded-full border-t-indigo-600 border-r-indigo-600 border-b-slate-200 border-l-slate-200 ${sizeClasses[size] || sizeClasses.md}`} 
        role="status"
        aria-label="loading"
      />
      {message && (
        <p className="mt-3.5 text-sm font-semibold text-slate-500 select-none">
          {message}
        </p>
      )}
    </div>
  );
}
