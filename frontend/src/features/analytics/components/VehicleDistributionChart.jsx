
import { useSelector } from 'react-redux';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

const COLORS = ['#6366f1', '#a78bfa', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

/**
 * VehicleDistributionChart Component
 * Bar chart representing vehicle type booking distribution.
 */
const VehicleDistributionChart = ({ data = [] }) => {
  const theme = useSelector((state) => state.settings.theme);
  const isDark = theme === 'dark';

  const formattedData = data.map((item) => ({
    name: item.vehicleType || 'Unknown',
    Bookings: item.totalBookings || 0,
  }));

  const gridColor = isDark ? '#1e293b' : '#e2e8f0';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const tooltipBg = isDark ? '#0f172a' : '#ffffff';
  const tooltipBorder = isDark ? '#1e293b' : '#e2e8f0';

  if (formattedData.length === 0) {
    return (
      <div className="h-72 flex items-center justify-center text-slate-400 text-xs font-semibold">
        No vehicle stats available.
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
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
          <Bar dataKey="Bookings" radius={[6, 6, 0, 0]}>
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VehicleDistributionChart;
