import React from 'react';

/**
 * Reusable Dynamic Table Component
 * 
 * @param {Object} props
 * @param {Array<Object>} props.columns - Configuration for table columns
 * @param {string|React.ReactNode} props.columns[].header - Column header title
 * @param {string|Function} props.columns[].accessor - Property path or callback to fetch row value
 * @param {Function} [props.columns[].render] - Callback to render custom JSX `(value, row) => ReactNode`
 * @param {string} [props.columns[].className] - Additional classes for column cells
 * @param {Array<Object>} props.data - Row data source
 * @param {boolean} [props.loading=false] - Show loading state skeleton
 */
export default function Table({
  columns,
  data = [],
  loading = false
}) {
  const getCellValue = (row, accessor) => {
    if (typeof accessor === 'function') {
      return accessor(row);
    }
    return row[accessor];
  };

  return (
    <div className="w-full overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider select-none"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-100">
          {loading ? (
            // Render beautiful loading skeletons
            Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr key={rowIndex} className="animate-pulse">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-12 text-center text-sm text-slate-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr 
                key={row.id || rowIndex} 
                className="hover:bg-slate-50/50 transition-colors duration-150"
              >
                {columns.map((col, colIndex) => {
                  const val = getCellValue(row, col.accessor);
                  const renderedVal = col.render ? col.render(val, row) : val;
                  return (
                    <td
                      key={colIndex}
                      className={`px-6 py-4 whitespace-nowrap text-sm text-slate-600 ${col.className || ''}`}
                    >
                      {renderedVal ?? '-'}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
