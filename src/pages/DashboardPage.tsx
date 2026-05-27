import { DashboardCard } from '@/features/dashboard/components/DashboardCard';
import { QuickActionsCard, type QuickActionItem } from '@/features/dashboard/components/QuickActionsCard';
import { LiveUpdatesCard, type LiveUpdateItem } from '@/features/dashboard/components/LiveUpdatesCard';
import {
  LuUsers,
  LuCircleCheck,
  LuStar,
  LuUserPlus,
  LuClipboardList,
  LuCalendar,
  LuPencil,
} from 'react-icons/lu';
import { Link, useNavigate } from 'react-router';
import DashboardHeader from '@/features/dashboard/components/DashboardHeader';
import DashboardChart from '@/features/dashboard/components/DashboardChart';
import { historyColumns } from '@/features/dashboard/components/DashboardTable';
import { DataTable } from '@/components/ui/Table';
import { useDashboardCard } from '@/features/dashboard/hooks/useDashboardCard';
import { useActivityLogs } from '@/features/activityLog/hooks/useActivityLogs';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';

export default function DashboardPage() {
  const { data, isLoading } = useDashboardCard();
  const { data: logsResponse } = useActivityLogs({ page: 1, limit: 3 });
  const navigate = useNavigate();

  const dashboard = data?.data;

  const quickActionsData: QuickActionItem[] = [
    {
      icon: <LuUserPlus className="w-5 h-5" />,
      label: 'Register New Student',
      onClick: () => navigate('/students'),
    },
    {
      icon: <LuClipboardList className="w-5 h-5" />,
      label: 'Input Progress Today',
      onClick: () => navigate('/progress'),
    },
    {
      icon: <LuCalendar className="w-5 h-5" />,
      label: 'View History',
      onClick: () => navigate('/history'),
    },
  ];

  // Build live updates from real activity logs
  const liveUpdatesData: LiveUpdateItem[] = ((logsResponse as any)?.data || []).slice(0, 3).map((log: any) => {
    const iconMap: Record<string, { icon: React.ReactNode; bg: string }> = {
      CREATE_PROGRESS: { icon: <LuClipboardList className="w-5 h-5" />, bg: 'bg-primary/10 text-primary' },
      UPDATE_STUDENT: { icon: <LuPencil className="w-5 h-5" />, bg: 'bg-warning/20 text-warning' },
      CREATE_STUDENT: { icon: <LuUserPlus className="w-5 h-5" />, bg: 'bg-success/20 text-success' },
      CREATE_USER: { icon: <LuUsers className="w-5 h-5" />, bg: 'bg-violet-100 text-violet-700' },
    };
    const { icon, bg } = iconMap[log.action] || { icon: <LuCircleCheck className="w-5 h-5" />, bg: 'bg-surface-container text-muted' };

    return {
      icon,
      iconBg: bg,
      title: log.description || log.action,
      subtitle: `${new Date(log.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • ${log.user_name}`,
    };
  });

  if (isLoading) {
    return (
      <div className="space-y-lg">
        <DashboardHeader />
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-lg">
      <DashboardHeader />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
        <DashboardCard
          label="TOTAL STUDENTS"
          value={dashboard?.total_students ?? 0}
          subtitle=""
          icon={<LuUsers className="w-5 h-5 text-primary" />}
        />
        <DashboardCard
          label="ACTIVITY TODAY"
          value={dashboard?.active_today ?? 0}
          icon={<LuCircleCheck className="w-5 h-5 text-primary" />}
        />
        <DashboardCard
          label="WEEKLY PROGRESS"
          value={dashboard?.weekly_progress_percentage !== undefined
            ? `${Number(dashboard.weekly_progress_percentage).toFixed(1)}%`
            : '0%'
          }
          subtitle=""
          icon={<LuStar className="w-5 h-5 text-primary" />}
        />
      </div>

      {/* Chart + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-border-card p-lg">
          <div className="flex items-center justify-between mb-lg">
            <h3 className="text-[18px] font-semibold text-on-surface font-[Manrope]">
              Weekly Student Activity
            </h3>
            <span className="px-md py-xs text-[12px] font-medium bg-surface-container text-on-surface rounded-lg">
              Last 7 Days
            </span>
          </div>
          <DashboardChart data={dashboard?.weekly_activity || []} />
        </div>

        <div className="space-y-lg">
          <QuickActionsCard actions={quickActionsData} />
          <LiveUpdatesCard updates={liveUpdatesData} />
        </div>
      </div>

      {/* Recent Progress Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-border-card overflow-hidden">
        <div className="flex items-center justify-between px-lg py-md border-b border-border-card">
          <h3 className="text-[18px] font-semibold text-on-surface font-[Manrope]">
            Recent Learning History
          </h3>
          <Link to="/history" className="text-[13px] font-medium text-primary hover:underline">
            View All History
          </Link>
        </div>

        <div className="overflow-x-auto">
          <DataTable columns={historyColumns} data={dashboard?.recent_progress || []} />
        </div>
      </div>
    </div>
  );
}
