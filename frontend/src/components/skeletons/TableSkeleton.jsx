import Skeleton from '@mui/material/Skeleton';

/**
 * TableSkeleton Component
 * Standard skeleton loader rendering rows and columns for custom tables.
 * 
 * @param {Object} props
 * @param {number} [props.rows=5] - Number of vertical rows to draw
 * @param {number} [props.cols=5] - Number of horizontal cell columns to draw
 */
const TableSkeleton = ({ rows = 5, cols = 5 }) => {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, rIdx) => (
        <tr key={rIdx} className="border-b border-slate-200 dark:border-slate-800/50">
          {Array.from({ length: cols }).map((_, cIdx) => (
            <td key={cIdx} className="px-6 py-5.5">
              <Skeleton variant="text" width="80%" height={16} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableSkeleton;
