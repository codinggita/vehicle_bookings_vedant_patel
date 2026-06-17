import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '@features/dashboard/dashboardThunks';
import AnalyticsGrid from '@components/dashboard/AnalyticsGrid';

/**
 * DashboardPage component
 * Primary view displaying key business metrics from Redux telemetry state.
 */
const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { totalUsers, totalRecords, totalBookings, revenue, loading, error } = useSelector(
    (state) => state.dashboard
  );

  const loadStats = useCallback(() => {
    if (user?.role) {
      dispatch(fetchDashboardStats(user.role));
    }
  }, [dispatch, user]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Dashboard Top Header area */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {user?.name || 'Administrator'}!
          </h2>
          <p className="text-slate-400 text-sm mt-1.5 font-medium">
            Here is your live analytics telemetry summary for today.
          </p>
        </div>

        {/* Refresh button action */}
        <button
          onClick={loadStats}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800/80 text-slate-300 hover:text-slate-100 text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-98 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        >
          <svg
            className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3 3L22 4"
            />
          </svg>
          Refresh Data
        </button>
      </div>

      {/* Error UI Card Block */}
      {error && (
        <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/20 text-red-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <svg className="w-5.5 h-5.5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="font-semibold text-sm">Failed to retrieve dashboard metrics</p>
              <p className="text-xs text-red-400/80 mt-0.5">{error}</p>
            </div>
          </div>
          <button
            onClick={loadStats}
            className="flex-shrink-0 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-bold transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Analytics Grid section */}
      <AnalyticsGrid
        totalUsers={totalUsers}
        totalRecords={totalRecords}
        totalBookings={totalBookings}
        revenue={revenue}
        loading={loading}
      />
    </div>
  );
};

export default DashboardPage;
