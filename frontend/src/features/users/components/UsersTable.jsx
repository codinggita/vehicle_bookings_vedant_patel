import UserTableHeader from './UserTableHeader';
import UserTableRow from './UserTableRow';
import { TableSkeleton } from '@components/skeletons';
import EmptyState from '@components/ui/EmptyState/EmptyState';
import ErrorState from '@components/ui/ErrorState/ErrorState';

/**
 * UsersTable Component
 * Coordinates table headers, rows mapping, loading status, and empty warnings.
 * 
 * @param {Object} props
 * @param {Array} props.users - List of paginated/filtered user records
 * @param {boolean} props.loading - Loading state flag
 * @param {string} props.error - Current error status
 * @param {function} props.onEdit - Edit trigger callback
 * @param {function} props.onDelete - Delete trigger callback
 * @param {function} [props.onRetry] - Retry callback for error state
 */
const UsersTable = ({ users, loading, error, onEdit, onDelete, onRetry }) => {

  return (
    <div className="w-full bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
      
      {/* Scrollable container */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full border-collapse">
          {/* Table Headers */}
          <UserTableHeader />

          {/* Conditional rendering of lists, loaders, or errors */}
          {loading && users.length === 0 ? (
            <TableSkeleton rows={5} cols={7} />
          ) : error && users.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={7} className="px-6 py-12">
                  <ErrorState
                    title="Failed to Load Users"
                    message={error}
                    onRetry={onRetry}
                    retryLabel="Try Again"
                  />
                </td>
              </tr>
            </tbody>
          ) : users.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={7} className="px-6 py-12">
                  <EmptyState 
                    title="No Users Found" 
                    message="There are no users registered matching the selected filters or search terms." 
                  />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {users.map((user) => (
                <UserTableRow
                  key={user._id}
                  user={user}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          )}
        </table>
      </div>

    </div>
  );
};

export default UsersTable;
