import useAuth from '@hooks/useAuth';

/**
 * User Dashboard Page showing personalized user overview and booking statuses.
 */
export default function UserPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-slate-400 text-sm mt-1">Here is a quick overview of your vehicle bookings and account.</p>
      </div>

      {/* Grid of Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Active Bookings Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">Active Bookings</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white">0</h3>
            <p className="text-xs text-slate-400 mt-1">No bookings scheduled this week</p>
          </div>
        </div>

        {/* Saved Vehicles Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-semibold text-violet-400 uppercase tracking-wider">Saved Vehicles</span>
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white">4</h3>
            <p className="text-xs text-slate-400 mt-1">Ready for quick reservation</p>
          </div>
        </div>

        {/* Account Status Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">Account Status</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white">Verified</h3>
            <p className="text-xs text-slate-400 mt-1">Full access to booking services</p>
          </div>
        </div>
      </div>
    </div>
  );
}
