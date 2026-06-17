import UserTableHeader from './UserTableHeader';
import UserTableRow from './UserTableRow';
import EmptyState from '@components/ui/EmptyState/EmptyState';

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
 */
const UsersTable = ({ users, loading, error, onEdit, onDelete }) => {
  
  // Render loading skeleton rows to maintain visual height
  const renderLoadingSkeleton = () => {
    return (
      <tbody>
        {[...Array(5)].map((_, idx) => (
          <tr key={idx} className="border-b border-slate-850 animate-pulse">
            <td className="px-6 py-5.5"><div className="h-3 w-16 bg-slate-800 rounded" /></td>
            <td className="px-6 py-5.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800" />
                <div className="h-3.5 w-24 bg-slate-800 rounded" />
              </div>
            </td>
            <td className="px-6 py-5.5"><div className="h-3.5 w-40 bg-slate-800 rounded" /></td>
            <td className="px-6 py-5.5"><div className="h-5 w-16 bg-slate-800 rounded-full" /></td>
            <td className="px-6 py-5.5"><div className="h-5 w-14 bg-slate-800 rounded-full" /></td>
            <td className="px-6 py-5.5"><div className="h-3 w-20 bg-slate-800 rounded" /></td>
            <td className="px-6 py-5.5 text-right"><div className="inline-flex gap-2"><div className="w-7 h-7 bg-slate-800 rounded-lg" /><div className="w-7 h-7 bg-slate-800 rounded-lg" /></div></td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="w-full bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
      
      {/* Scrollable container */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full border-collapse">
          {/* Table Headers */}
          <UserTableHeader />

          {/* Conditional rendering of lists, loaders, or errors */}
          {loading && users.length === 0 ? (
            renderLoadingSkeleton()
          ) : error && users.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-red-400 font-semibold text-sm">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{error}</span>
                  </div>
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
