import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalyticsData } from '../store/analyticsThunks';

/**
 * useRealtimeAnalytics Hook
 * Coordinates background metrics updates at a standard 30-second refresh interval.
 * Respects user preferences to suspend background updates dynamically.
 */
export const useRealtimeAnalytics = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.analytics);
  
  // Retrieve settings preference for autoRefresh capability
  const autoRefreshEnabled = useSelector(
    (state) => state.settings?.preferences?.autoRefresh !== false
  );

  const loadStatsData = useCallback((options = {}) => {
    dispatch(fetchAnalyticsData(options));
  }, [dispatch]);

  useEffect(() => {
    // Initial fetch trigger
    loadStatsData();

    if (!autoRefreshEnabled) return;

    // Start background refresh scheduler
    const timer = setInterval(() => {
      loadStatsData({ silent: true });
    }, 30000); // 30 seconds

    return () => {
      clearInterval(timer);
    };
  }, [loadStatsData, autoRefreshEnabled]);

  const manualTrigger = () => {
    loadStatsData();
  };

  return {
    ...state,
    refresh: manualTrigger,
  };
};

export default useRealtimeAnalytics;
