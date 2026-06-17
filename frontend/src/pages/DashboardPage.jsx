import { useEffect, useCallback } from 'react';
import Seo from '@components/seo/Seo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '@features/dashboard/dashboardThunks';
import AnalyticsGrid from '@components/dashboard/AnalyticsGrid';
import ErrorState from '@components/ui/ErrorState/ErrorState';

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
    <>
      <Seo />
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
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800/80 text-slate-300 hover:text-slate-100 text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
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

      {/* Error UI — Reusable ErrorState */}
      {error && (
        <ErrorState
          title="Failed to retrieve dashboard metrics"
          message={error}
          onRetry={loadStats}
          retryLabel="Try Again"
        />
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
    </>
  );
};

export default DashboardPage;
