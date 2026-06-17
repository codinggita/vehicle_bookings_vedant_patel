/* eslint-disable react-hooks/use-memo */
import { useMemo } from 'react';

/**
 * useMemoizedData Hook
 * Wraps useMemo to safely compute derived data, applying transformations only when
 * dependencies change.
 * 
 * @param {Function} computeFn - Function to compute the data
 * @param {Array} dependencies - Array of dependencies for useMemo
 * @param {any} fallback - Fallback value if computeFn throws or returns null/undefined
 * @returns {any} Memoized computed data
 */
export const useMemoizedData = (computeFn, dependencies = [], fallback = null) => {
  return useMemo(() => {
    try {
      const result = computeFn();
      return result !== undefined && result !== null ? result : fallback;
    } catch (error) {
      console.error('Error computing memoized data:', error);
      return fallback;
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useMemoizedData;
