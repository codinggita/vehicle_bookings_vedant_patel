import React from 'react';
import { FixedSizeList as List } from 'react-window';
import useVirtualization from '@hooks/useVirtualization';

/**
 * VirtualizedList Component
 * Efficiently renders large datasets by only rendering the visible items within the DOM window.
 * Built on top of react-window with overscan support for smoother scrolling.
 * 
 * @param {Object} props
 * @param {Array} props.items - Data array
 * @param {number} props.rowHeight - Fixed height of each row
 * @param {number} [props.maxHeight=600] - Max height of the scroll container
 * @param {number} [props.overscanCount=5] - Number of extra rows to render above/below visible area
 * @param {Function} props.renderRow - Render prop: ({ index, style, data }) => JSX
 */
const VirtualizedList = React.memo(({ items = [], rowHeight = 64, maxHeight = 600, overscanCount = 5, renderRow }) => {
  const { containerRef, containerHeight, isVirtualized } = useVirtualization(items, rowHeight, maxHeight);

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-slate-400 text-sm font-semibold border border-slate-800 rounded-xl bg-slate-900/50">
        No records found.
      </div>
    );
  }

  if (!isVirtualized) {
    return (
      <div className="w-full flex flex-col">
        {items.map((item, index) => renderRow({ index, style: { height: rowHeight }, data: items }))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50">
      <List
        height={containerHeight}
        itemCount={items.length}
        itemSize={rowHeight}
        width="100%"
        itemData={items}
        overscanCount={overscanCount}
        className="scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
      >
        {renderRow}
      </List>
    </div>
  );
});

export default VirtualizedList;
