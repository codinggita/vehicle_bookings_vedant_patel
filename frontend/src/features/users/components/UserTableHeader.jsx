import { memo } from 'react';

/**
 * UserTableHeader Component
 * Renders header columns for the Users management table.
 */
const UserTableHeader = memo(() => {
  const headers = ['User ID', 'Name', 'Email', 'Role', 'Status', 'Created At', 'Actions'];

  return (
    <thead className="bg-slate-900 border-b border-slate-800">
      <tr>
        {headers.map((h, idx) => (
          <th
            key={idx}
            scope="col"
            className={`px-6 py-4.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider select-none ${
              h === 'Actions' ? 'text-right' : ''
            }`}
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>
  );
});

export default UserTableHeader;
