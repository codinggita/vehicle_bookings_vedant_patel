import useAuth from '@hooks/useAuth';

/**
 * Admin Dashboard Page displaying system telemetry and settings overview.
 */
export default function AdminPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Admin Control Center
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Welcome back, {user?.name || 'Administrator'}. Monitor platform activity and manage system parameters.
        </p>
      </div>

      {/* Grid of Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">Total Users</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white">1,248</h3>
            <p className="text-xs text-slate-400 mt-1">+12% growth since last month</p>
          </div>
        </div>

        {/* Active Bookings Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-semibold text-violet-400 uppercase tracking-wider">Global Bookings</span>
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white">342</h3>
            <p className="text-xs text-slate-400 mt-1">45 bookings pending review</p>
          </div>
        </div>

        {/* System Health Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">System Status</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white">99.98%</h3>
            <p className="text-xs text-slate-400 mt-1">All systems operational</p>
          </div>
        </div>
      </div>
    </div>
  );
}
