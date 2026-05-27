import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface WeeklyActivity {
  day: string;
  date: string;
  count: number;
}

interface DashboardChartProps {
  data: WeeklyActivity[];
}

export default function DashboardChart({ data }: DashboardChartProps) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }
    return data.map((item) => ({
      day: item.day,
      count: item.count,
    }));
  }, [data]);

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted text-[14px]">
        No activity data available
      </div>
    );
  }

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, bottom: 10, left: -10 }}
        >
          <CartesianGrid
            stroke="var(--color-border-card)"
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            stroke="var(--color-muted)"
            tick={{ fill: 'var(--color-muted)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            dy={8}
          />
          <YAxis
            stroke="var(--color-muted)"
            tick={{ fill: 'var(--color-muted)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            cursor={{ fill: 'var(--color-surface-container)', opacity: 0.5 }}
            contentStyle={{
              backgroundColor: 'var(--color-surface-container-lowest)',
              border: '1px solid var(--color-border-card)',
              borderRadius: '12px',
              fontSize: '13px',
              color: 'var(--color-on-surface)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
            labelStyle={{ fontWeight: 700, marginBottom: 4 }}
          />
          <Bar
            dataKey="count"
            name="Progress Entries"
            fill="var(--color-primary)"
            radius={[6, 6, 0, 0]}
            barSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}