import useAuth from '@hooks/useAuth';
import useLogout from '@hooks/useLogout';

/**
 * User Profile page displaying personal account parameters and active session controls.
 */
export default function ProfilePage() {
  const { user } = useAuth();
  const logout = useLogout();

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';
  const roleLabel = user?.role === 'admin' ? 'Administrator' : 'Standard User';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">My Profile</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your personal settings and profile information</p>
      </div>

      {/* Profile Info Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card Left */}
        <div className="lg:col-span-1 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-white text-3xl shadow-lg shadow-indigo-500/10">
            {userInitial}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">{user?.name || 'Guest User'}</h2>
            <p className="text-xs text-indigo-400 font-semibold mt-1 uppercase tracking-wider">{roleLabel}</p>
          </div>
          
          <div className="w-full pt-4 border-t border-slate-800/80">
            <button
              onClick={logout}
              className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium text-sm transition-all duration-200 shadow-md shadow-red-500/10 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Profile Details Right */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <h3 className="text-lg font-bold text-slate-200">Account Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Full Name</span>
              <p className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800/80 text-slate-200 text-sm font-medium">
                {user?.name || 'Not Available'}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Email Address</span>
              <p className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800/80 text-slate-200 text-sm font-medium break-all">
                {user?.email || 'Not Available'}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Role</span>
              <p className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800/80 text-slate-200 text-sm font-medium">
                {user?.role || 'user'}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Session Status</span>
              <div className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800/80 text-emerald-400 text-sm font-medium flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active & Authenticated</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
