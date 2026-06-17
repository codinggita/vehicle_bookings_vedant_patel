import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersList } from '../store/userThunks';
import UsersTable from '../components/UsersTable';
import UserSearch from '../components/UserSearch';
import UserFilters from '../components/UserFilters';
import UserPagination from '../components/UserPagination';
import CreateUserModal from '../components/CreateUserModal';
import EditUserModal from '../components/EditUserModal';
import DeleteUserDialog from '../components/DeleteUserDialog';

/**
 * UsersPage Component
 * Primary container orchestrating search, listing, filter subsets, pagination,
 * and overlay modals for User CRUD transactions.
 */
const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, loading, error, filters } = useSelector((state) => state.users);

  // Modal display toggles
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = useCallback(() => {
    dispatch(fetchUsersList());
  }, [dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-6.5 animate-fade-in pb-10">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            User Accounts
          </h2>
          <p className="text-slate-400 text-sm mt-1.5 font-medium">
            Manage system administrators, standard user accounts, roles, and status configurations.
          </p>
        </div>

        {/* Add User trigger */}
        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white text-sm font-semibold shadow-lg shadow-indigo-500/15 transition-all duration-200 transform active:scale-98 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        >
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add New User
        </button>
      </div>

      {/* 2. Search & Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl">
        <UserSearch key={filters.search} />
        <UserFilters />
      </div>

      {/* 3. Users Listing Table */}
      <UsersTable
        users={users}
        loading={loading}
        error={error}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* 4. Pagination System */}
      <UserPagination />

      {/* 5. CRUD Modals Overlays */}
      <CreateUserModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      <EditUserModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={selectedUser}
      />

      <DeleteUserDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        user={selectedUser}
      />

    </div>
  );
};

export default UsersPage;
