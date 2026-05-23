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
import { Link } from 'react-router';
import DashboardHeader from '@/features/dashboard/components/DashboardHeader';
import LineBarAreaComposedChart from '@/features/dashboard/components/DashboardChart';
import { historyColumns } from '@/features/dashboard/components/DashboardTable';
import { DataTable } from '@/components/ui/Table';
import { useDashboardCard } from '@/features/dashboard/hooks/useDashboardCard';


const recentHistory = [
  {
    initials: 'YA',
    initialsColor: 'bg-emerald-100 text-emerald-700',
    name: 'Yusuf Al-Habsyi',
    lesson: 'Surah Al-Mulk (Ayat 1-30)',
    status: 'EXCELLENT',
    statusColor: 'bg-emerald-50 text-emerald-700',
    date: 'Today, 08:30 AM',
    mentor: 'Ustadz Idris',
    progress: 90,
  },
  {
    initials: 'FZ',
    initialsColor: 'bg-rose-100 text-rose-700',
    name: 'Fatima Zahra',
    lesson: 'Surah An-Naba',
    status: 'NEED REVIEW',
    statusColor: 'bg-amber-50 text-amber-700',
    date: 'Today, 09:15 AM',
    mentor: 'Ustadzah Sarah',
    progress: 55,
  },
  {
    initials: 'AM',
    initialsColor: 'bg-violet-100 text-violet-700',
    name: 'Abdullah Mansur',
    lesson: 'Juz Amma Revision',
    status: 'PASSED',
    statusColor: 'bg-emerald-50 text-emerald-700',
    date: 'Yesterday, 04:45 PM',
    mentor: 'Ustadz Idris',
    progress: 85,
  },
  {
    initials: 'SK',
    initialsColor: 'bg-pink-100 text-pink-700',
    name: 'Siti Khadijah',
    lesson: 'Iqra Level 4',
    status: 'CONTINUE',
    statusColor: 'bg-blue-50 text-blue-700',
    date: 'Yesterday, 02:20 PM',
    mentor: 'Ustadzah Mariam',
    progress: 40,
  },
];

export default function DashboardPage() {
  const { data, isLoading } = useDashboardCard();
  console.log(data?.data);


  const quickActionsData: QuickActionItem[] = [
    {
      icon: <LuUserPlus className="w-5 h-5" />,
      label: 'Register New Student',
      onClick: () => console.log('Navigating to register...')
    },
    {
      icon: <LuClipboardList className="w-5 h-5" />,
      label: 'Input Progress Today',
      onClick: () => console.log('Open input modal...')
    },
    {
      icon: <LuCalendar className="w-5 h-5" />,
      label: 'Schedule Evaluation',
      onClick: () => console.log('Open calendar...')
    },
  ];

  const liveUpdatesData: LiveUpdateItem[] = [
    {
      icon: <LuClipboardList className="w-5 h-5" />,
      iconBg: 'bg-primary/10 text-primary',
      title: 'Yusuf A. completed Juz 29',
      subtitle: '2 mins ago • Tahfidz Class',
    },
    {
      icon: <LuCircleCheck className="w-5 h-5" />,
      iconBg: 'bg-success/20 text-success',
      title: '30 Attendance marked',
      subtitle: '15 mins ago • Morning Session',
    },
    {
      icon: <LuPencil className="w-5 h-5" />,
      iconBg: 'bg-warning/20 text-warning',
      title: 'Profile updated: Fatima Z.',
      subtitle: '1 hour ago • Admin Action',
    },
  ];
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="space-y-lg">
      <DashboardHeader />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
        <DashboardCard label="TOTAL STUDENTS" value={data?.data?.total_students} subtitle="" icon={<LuUsers className="w-5 h-5 text-primary" />} />

        <DashboardCard label="ACTIVE TODAY" value={data?.data?.active_today} icon={<LuCircleCheck className="w-5 h-5 text-primary" />} />

        <DashboardCard label="WEEKLY PROGRESS" value={data?.data?.weekly_progress_percentage} subtitle="" icon={<LuStar className="w-5 h-5 text-primary" />} >
          {/* <TrendIndicator change="On target for Quran khatam" trend="up" label="" /> */}
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-border-card p-lg">
          <div className="flex items-center justify-between mb-lg">
            <h3 className="text-[18px] font-semibold text-on-surface font-[Manrope]">
              Weekly Student Activity
            </h3>
            <div className="flex rounded-lg border border-border-card overflow-hidden">
              <button className="px-md py-xs text-[12px] font-medium bg-surface-container text-on-surface">
                Weekly
              </button>
              <button className="px-md py-xs text-[12px] font-medium text-muted hover:bg-surface-container-low transition-colors">
                Monthly
              </button>
            </div>
          </div>
          <LineBarAreaComposedChart />
        </div>

        <div className="space-y-lg">
          <QuickActionsCard actions={quickActionsData} />
          <LiveUpdatesCard updates={liveUpdatesData} />
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-border-card overflow-hidden">
        <div className="flex items-center justify-between px-lg py-md border-b border-border-card">
          <h3 className="text-[18px] font-semibold text-on-surface font-[Manrope]">
            Recent Learning History
          </h3>
          <Link to="/history" className="text-[13px] font-medium text-primary hover:underline" >
            View All History
          </Link>
        </div>

        <div className="overflow-x-auto">
          <DataTable columns={historyColumns} data={recentHistory} />
        </div>

        <div className="text-center py-md border-t border-border-card">
          <button className="text-[13px] text-muted hover:text-on-surface transition-colors">
            Show more records
          </button>
        </div>
      </div>

      {/* <div className="fixed bottom-24 md:bottom-8 right-6 z-30">
        <button className="w-14 h-14 rounded-full bg-primary text-on-primary shadow-lg hover:shadow-xl hover:bg-primary-container transition-all flex items-center justify-center">
          <LuPlus className="w-6 h-6" />
        </button>
      </div> */}
    </div>
  );
}

