
import useRealtimeAnalytics from '../hooks/useRealtimeAnalytics';
import AnalyticsCard from '../components/AnalyticsCard';
import BookingTrendChart from '../components/BookingTrendChart';
import VehicleDistributionChart from '../components/VehicleDistributionChart';
import RealTimeStats from '../components/RealTimeStats';
import RevenueChart from '../components/RevenueChart';
import ErrorState from '@components/ui/ErrorState/ErrorState';

/**
 * AnalyticsDashboard Component
 * Primary container combining charts and aggregated statistics with automatic background updates.
 */
const AnalyticsDashboard = () => {
  const {
    dashboardStats,
    bookingStats,
    monthlyRides,
    topVehicles,
    revenueStats,
    loading,
    error,
    lastUpdated,
    refresh,
  } = useRealtimeAnalytics();

  const formattedLastUpdated = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString()
    : 'Never';

  // Format currency
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  // Compile estimates
  const estRevenue = (dashboardStats.completedBookings || 0) * 45;

  return (
    <div className="space-y-8 animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* Dashboard Top Header Area */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            Analytics Overview
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 font-medium flex items-center gap-2">
            <span>Live telemetry diagnostics.</span>
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 inline-block animate-pulse" />
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              Synced: {formattedLastUpdated}
            </span>
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={refresh}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-98 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
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

      {/* Error Boundary Banner */}
      {error && (
        <ErrorState
          title="Synchronisation Interrupted"
          message={error}
          onRetry={refresh}
          retryLabel="Try Syncing Again"
        />
      )}

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard
          title={dashboardStats.totalUsers !== null ? 'Total Platform Users' : 'Total System Bookings'}
          value={dashboardStats.totalUsers !== null ? dashboardStats.totalUsers : dashboardStats.totalBookings}
          loading={loading && !lastUpdated}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
        <AnalyticsCard
          title="Total Rides"
          value={dashboardStats.totalBookings || 0}
          loading={loading && !lastUpdated}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        <AnalyticsCard
          title="Completed Rides"
          value={dashboardStats.completedBookings || 0}
          loading={loading && !lastUpdated}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <AnalyticsCard
          title="Estimated Revenue"
          value={formatCurrency(estRevenue)}
          loading={loading && !lastUpdated}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Charts Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Line Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-6">
            Monthly Ride Trends
          </h3>
          <BookingTrendChart data={monthlyRides} />
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-6">
            Vehicle Booking Distribution
          </h3>
          <VehicleDistributionChart data={topVehicles} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-6">
            Ride Status Ratios
          </h3>
          <RealTimeStats stats={bookingStats} />
        </div>

        {/* Horizontal Bar Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-6">
            Highest Fare Booking Records
          </h3>
          <RevenueChart data={revenueStats} />
        </div>

      </div>

    </div>
  );
};

export default AnalyticsDashboard;
