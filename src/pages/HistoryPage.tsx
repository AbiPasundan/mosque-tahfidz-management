import { useQuery } from '@tanstack/react-query';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';
import { LuBookOpen, LuCircleCheck, LuUserPlus } from 'react-icons/lu';
import { mockProgressRecords } from '@/constants/mockData';
import { Link } from 'react-router';

export default function HistoryPage() {
  const { data: records = [], isLoading } = useQuery({
    queryKey: ['history'],
    queryFn: () => Promise.resolve(mockProgressRecords.slice(0, 20)),
  });

  if (isLoading) return <LoadingSkeleton />;

  const activities = [
    ...records.map((r) => ({
      id: r.id,
      action: `Progress recorded: Juz ${r.juz} - ${r.surah}`,
      date: r.date,
      icon: <LuBookOpen className="w-4 h-4 text-primary" />,
      iconBg: 'bg-primary/10',
    })),
    { id: 'enroll', action: 'New student enrolled: Ahmad Fauzi', date: '2024-01-10', icon: <LuUserPlus className="w-4 h-4 text-emerald-600" />, iconBg: 'bg-emerald-100' },
    { id: 'complete', action: 'Student graduated: Fatimah Zahra', date: '2024-01-08', icon: <LuCircleCheck className="w-4 h-4 text-blue-600" />, iconBg: 'bg-blue-100' },
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-lg">
      {/* Breadcrumb */}
      <div className="flex items-center gap-xs text-[12px] text-muted">
        <Link to="/" className="hover:text-primary transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-on-surface font-medium">Activity Log</span>
      </div>

      <div>
        <h1 className="text-h1 text-on-surface font-[Manrope]">Activity Log</h1>
        <p className="text-body-md text-muted mt-xs">
          Track all activities and changes across the system.
        </p>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-border-card overflow-hidden">
        <div className="divide-y divide-border-card">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-md px-lg py-md hover:bg-surface-container-low/30 transition-colors"
            >
              <div className={`w-8 h-8 rounded-lg ${activity.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                {activity.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-on-surface">{activity.action}</p>
                <p className="text-[11px] text-muted mt-[2px]">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
