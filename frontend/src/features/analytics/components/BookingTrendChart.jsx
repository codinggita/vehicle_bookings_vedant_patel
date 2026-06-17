import React from 'react';
import { useSelector } from 'react-redux';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useMemoizedData } from '@hooks/useMemoizedData';

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * BookingTrendChart Component
 * Plots a line chart showing monthly ride trend statistics.
 */
const BookingTrendChart = React.memo(({ data = [] }) => {
  const theme = useSelector((state) => state.settings.theme);
  const isDark = theme === 'dark';

  const formattedData = useMemoizedData(() => {
    return [...data]
      .sort((a, b) => a.month - b.month)
      .map((item) => ({
        name: MONTH_NAMES[item.month - 1] || `Month ${item.month}`,
        Rides: item.totalBookings,
      }));
  }, [data], []);

  const gridColor = isDark ? '#1e293b' : '#e2e8f0';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const tooltipBg = isDark ? '#0f172a' : '#ffffff';
  const tooltipBorder = isDark ? '#1e293b' : '#e2e8f0';

  if (formattedData.length === 0) {
    return (
      <div className="h-72 flex items-center justify-center text-slate-400 text-xs font-semibold">
        No trend records found.
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="name"
            stroke={textColor}
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={textColor}
            fontSize={11}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              borderColor: tooltipBorder,
              borderRadius: '12px',
              fontSize: '12px',
              color: isDark ? '#f1f5f9' : '#0f172a',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
          <Line
            type="monotone"
            dataKey="Rides"
            stroke="#6366f1"
            strokeWidth={3}
            activeDot={{ r: 6 }}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

export default BookingTrendChart;
