
import { useSelector } from 'react-redux';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

/**
 * RevenueChart Component
 * Renders a horizontal bar chart summarizing the highest fare bookings.
 */
const RevenueChart = ({ data = [] }) => {
  const theme = useSelector((state) => state.settings.theme);
  const isDark = theme === 'dark';

  // Format and take top 5 highest fares
  const formattedData = [...data]
    .slice(0, 5)
    .map((item) => ({
      name: item.customerName || item.bookingId || 'Anonymous',
      Fare: item.fare || 0,
      vehicle: item.vehicleType ? item.vehicleType.toUpperCase() : 'N/A',
    }));

  const gridColor = isDark ? '#1e293b' : '#e2e8f0';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const tooltipBg = isDark ? '#0f172a' : '#ffffff';
  const tooltipBorder = isDark ? '#1e293b' : '#e2e8f0';

  if (formattedData.length === 0) {
    return (
      <div className="h-72 flex items-center justify-center text-slate-400 text-xs font-semibold">
        No revenue data found.
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          layout="vertical"
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
          <XAxis
            type="number"
            stroke={textColor}
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => `$${val}`}
          />
          <YAxis
            dataKey="name"
            type="category"
            stroke={textColor}
            fontSize={11}
            tickLine={false}
            axisLine={false}
            width={75}
          />
          <Tooltip
            formatter={(value) => [`$${value}`, 'Fare']}
            contentStyle={{
              backgroundColor: tooltipBg,
              borderColor: tooltipBorder,
              borderRadius: '12px',
              fontSize: '12px',
              color: isDark ? '#f1f5f9' : '#0f172a',
            }}
          />
          <Bar dataKey="Fare" fill="#10b981" radius={[0, 6, 6, 0]} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
