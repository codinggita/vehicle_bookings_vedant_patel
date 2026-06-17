import React from 'react';
import { useSelector } from 'react-redux';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { useMemoizedData } from '@hooks/useMemoizedData';

/**
 * RealTimeStats Component
 * Renders a pie chart of booking statuses.
 */
const RealTimeStats = React.memo(({ stats = {} }) => {
  const theme = useSelector((state) => state.settings.theme);
  const isDark = theme === 'dark';

  const chartData = useMemoizedData(() => {
    return [
      { name: 'Completed', value: stats.completedBookings || 0, color: '#10b981' },
      { name: 'Cancelled', value: stats.cancelledBookings || 0, color: '#ef4444' },
      { name: 'Pending', value: stats.pendingBookings || 0, color: '#f59e0b' },
      { name: 'Confirmed', value: stats.confirmedBookings || 0, color: '#3b82f6' },
    ].filter((item) => item.value > 0);
  }, [stats], []);

  const tooltipBg = isDark ? '#0f172a' : '#ffffff';
  const tooltipBorder = isDark ? '#1e293b' : '#e2e8f0';

  if (chartData.length === 0) {
    return (
      <div className="h-72 flex items-center justify-center text-slate-400 text-xs font-semibold">
        No status data available.
      </div>
    );
  }

  return (
    <div className="h-72 w-full flex flex-col justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              borderColor: tooltipBorder,
              borderRadius: '12px',
              fontSize: '12px',
              color: isDark ? '#f1f5f9' : '#0f172a',
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{ fontSize: '11px', bottom: 10 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
});

export default RealTimeStats;
