import React, { useMemo, useCallback } from 'react';
import AnalyticsCard from './AnalyticsCard';

/**
 * AnalyticsGrid Component
 * Coordinates and renders the 4 analytics cards in a responsive grid layout.
 * 
 * @param {Object} props
 * @param {number} props.totalUsers - Total registered users
 * @param {number} props.totalRecords - Total database records
 * @param {number} props.totalBookings - Total active booking counts
 * @param {number} props.revenue - Total aggregated fare revenue
 * @param {boolean} [props.loading=false] - Triggers loading state across all cards
 */
const AnalyticsGrid = React.memo(({ totalUsers, totalRecords, totalBookings, revenue, loading = false }) => {
  
  // Format numbers nicely (e.g. 18289 -> 18,289)
  const formatNumber = useCallback((num) => {
    if (num === null || num === undefined) return '--';
    return Number(num).toLocaleString();
  }, []);

  // Format currency values (e.g. 675000 -> $675,000)
  const formatCurrency = useCallback((num) => {
    if (num === null || num === undefined) return '--';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(num);
  }, []);

  // Svg Icons definitions for the cards - memoized to prevent recreation on every render
  const icons = useMemo(() => ({
    users: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    records: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    bookings: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    revenue: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
      </svg>
    ),
  }), []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* 1. Total Users */}
      <AnalyticsCard
        title="Total Users"
        value={formatNumber(totalUsers)}
        icon={icons.users}
        loading={loading}
      />

      {/* 2. Total Records */}
      <AnalyticsCard
        title="Total Records"
        value={formatNumber(totalRecords)}
        icon={icons.records}
        loading={loading}
      />

      {/* 3. Total Bookings */}
      <AnalyticsCard
        title="Total Bookings"
        value={formatNumber(totalBookings)}
        icon={icons.bookings}
        loading={loading}
      />

      {/* 4. Revenue */}
      <AnalyticsCard
        title="Revenue"
        value={formatCurrency(revenue)}
        icon={icons.revenue}
        loading={loading}
      />

    </div>
  );
});

export default AnalyticsGrid;
