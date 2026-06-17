import { useRef } from 'react';

/**
 * useVirtualization Hook
 * Computes optimal height and virtualization container sizes for large lists.
 * 
 * @param {Array} items - List of items to be rendered
 * @param {number} itemHeight - Height of a single row/item in pixels
 * @param {number} maxHeight - Maximum height of the container
 * @returns {Object} { containerRef, containerHeight, isVirtualized }
 */
export const useVirtualization = (items = [], itemHeight = 64, maxHeight = 600) => {
  const containerRef = useRef(null);

  const totalHeight = items.length * itemHeight;
  
  // Decide whether virtualization is actually needed based on total height
  const isVirtualized = totalHeight > maxHeight;

  // If we have less items, auto-shrink container to fit items perfectly
  const containerHeight = isVirtualized ? maxHeight : (totalHeight || itemHeight);

  return { containerRef, containerHeight, isVirtualized, totalHeight };
};

export default useVirtualization;
