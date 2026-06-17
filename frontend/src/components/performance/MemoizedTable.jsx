import React from 'react';

/**
 * MemoizedTable Component
 * Higher-Order Component (HOC) wrapper that applies React.memo to table body components
 * to prevent unnecessary re-rendering of entire tables when only one row changes.
 * 
 * @param {React.ComponentType} Component - The table body component to memoize
 * @returns {React.ComponentType} Memoized version of the component
 */
export const MemoizedTable = (Component) => {
  return React.memo(Component, (prevProps, nextProps) => {
    // Simple fast array reference comparison for data and loading states
    return (
      prevProps.data === nextProps.data &&
      prevProps.loading === nextProps.loading
    );
  });
};

export default MemoizedTable;
