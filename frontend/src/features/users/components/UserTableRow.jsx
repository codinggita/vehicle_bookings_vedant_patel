import React from 'react';

/**
 * UserTableRow Component
 * Displays a single row in the users management table with action triggers.
 * 
 * @param {Object} props
 * @param {Object} props.user - User data structure
 * @param {function} props.onEdit - Edit action callback
 * @param {function} props.onDelete - Delete action callback
 */
const UserTableRow = React.memo(({ user, onEdit, onDelete }) => {
  
  // Format creation dates nicely
  const formatDate = (dateStr) => {
    if (!dateStr) return '--';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Status mapping: backend isActive boolean maps to UI badges
  const renderStatusBadge = (isActive) => {
    if (isActive === true) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
        Inactive
      </span>
    );
  };

  // Role badges mapping
  const renderRoleBadge = (role) => {
    if (role === 'admin') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          Admin
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800/60 text-slate-400 border border-slate-700/60">
        User
      </span>
    );
  };

  const nameInitials = user.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  // Opacity fade for optimistic loading rows
  const rowStyle = user.isOptimistic 
    ? 'opacity-60 pointer-events-none select-none bg-slate-900/30' 
    : 'hover:bg-slate-900/30 transition-colors duration-150';

  return (
    <tr className={`border-b border-slate-800/80 ${rowStyle}`}>
      {/* 1. User ID */}
      <td className="px-6 py-4 text-xs font-medium text-slate-500 font-mono select-all">
        {user.isOptimistic ? 'Saving...' : user._id}
      </td>

      {/* 2. User Name with initials avatar */}
      <td className="px-6 py-4 text-sm font-semibold text-slate-200">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 text-indigo-400 flex items-center justify-center font-bold text-xs select-none">
            {nameInitials}
          </div>
          <span className="truncate max-w-[150px]">{user.name}</span>
        </div>
      </td>

      {/* 3. Email Address */}
      <td className="px-6 py-4 text-sm text-slate-400 truncate max-w-[200px] select-all">
        {user.email}
      </td>

      {/* 4. Role Badge */}
      <td className="px-6 py-4">
        {renderRoleBadge(user.role)}
      </td>

      {/* 5. Status Badge */}
      <td className="px-6 py-4">
        {renderStatusBadge(user.isActive)}
      </td>

      {/* 6. Created At Date */}
      <td className="px-6 py-4 text-sm text-slate-400 font-medium whitespace-nowrap">
        {formatDate(user.createdAt)}
      </td>

      {/* 7. Action Buttons */}
      <td className="px-6 py-4 text-right whitespace-nowrap">
        <div className="inline-flex gap-2.5">
          {/* Edit Trigger */}
          <button
            onClick={() => onEdit(user)}
            disabled={user.isOptimistic}
            className="p-1.5 rounded-lg border border-slate-800 hover:border-indigo-500/30 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/5 transition-all duration-200"
            title="Edit User"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          
          {/* Delete Trigger */}
          <button
            onClick={() => onDelete(user)}
            disabled={user.isOptimistic}
            className="p-1.5 rounded-lg border border-slate-800 hover:border-red-500/30 text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
            title="Delete User"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
});

export default UserTableRow;
