import React from 'react';

/**
 * MemoizedCard Component
 * Higher-Order Component (HOC) wrapper that applies React.memo with custom comparison
 * for standard card components.
 * 
 * @param {React.ComponentType} Component - The component to memoize
 * @param {Function} [areEqual] - Optional custom equality comparison function
 * @returns {React.ComponentType} Memoized version of the component
 */
export const MemoizedCard = (Component, areEqual) => {
  return React.memo(Component, areEqual || ((prevProps, nextProps) => {
    // Default custom comparison: only re-render if value, title, or loading state changes
    return (
      prevProps.value === nextProps.value &&
      prevProps.title === nextProps.title &&
      prevProps.loading === nextProps.loading
    );
  }));
};

export default MemoizedCard;
