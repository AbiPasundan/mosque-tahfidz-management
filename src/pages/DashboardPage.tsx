import { DashboardCard } from '@/components/shared/DashboardCard';
import { TrendIndicator } from '@/components/shared/TrendIndicator';
import {
  LuUsers,
  LuCircleCheck,
  LuStar,
  LuDownload,
  LuPlus,
  LuUserPlus,
  LuClipboardList,
  LuCalendar,
  LuPencil,
  LuChevronRight,
} from 'react-icons/lu';
import { Link } from 'react-router';

/* ─── Simple CSS bar chart ─── */
function BarChart() {
  const days = [
    { label: 'MON', value: 45 },
    { label: 'TUE', value: 62 },
    { label: 'WED', value: 78 },
    { label: 'THU', value: 85 },
    { label: 'FRI', value: 55 },
    { label: 'SAT', value: 35 },
    { label: 'SUN', value: 28 },
  ];
  const max = Math.max(...days.map((d) => d.value));

  return (
    <div className="flex items-end justify-between gap-md h-45 px-sm">
      {days.map((day) => (
        <div key={day.label} className="flex flex-col items-center gap-sm flex-1">
          <div className="w-full flex justify-center">
            <div className="w-10 rounded-md bg-primary/20 hover:bg-primary/40 transition-colors relative group" style={{ height: `${(day.value / max) * 150}px` }} >
              <div className="absolute bottom-0 left-0 right-0 rounded-md bg-primary transition-all" style={{ height: `${(day.value / max) * 100}%` }} />
            </div>
          </div>
          <span className="text-[11px] font-medium text-muted">{day.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Learning History Table ─── */
const recentHistory = [
  {
    initials: 'YA',
    initialsColor: 'bg-emerald-100 text-emerald-700',
    name: 'Yusuf Al-Habsyi',
    lesson: 'Surah Al-Mulk (Ayat 1-30)',
    status: 'EXCELLENT',
    statusColor: 'bg-emerald-50 text-emerald-700',
    date: 'Today, 08:30 AM',
    teacher: 'Ustadz Idris',
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
    teacher: 'Ustadzah Sarah',
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
    teacher: 'Ustadz Idris',
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
    teacher: 'Ustadzah Mariam',
    progress: 40,
  },
];

/* ─── Live Updates ─── */
const liveUpdates = [
  {
    icon: <LuClipboardList className="w-4 h-4" />,
    iconBg: 'bg-primary/10 text-primary',
    title: 'Yusuf A. completed Juz 29',
    subtitle: '2 mins ago • Tahfidz Class',
  },
  {
    icon: <LuCircleCheck className="w-4 h-4" />,
    iconBg: 'bg-emerald-100 text-emerald-600',
    title: '30 Attendance marked',
    subtitle: '15 mins ago • Morning Session',
  },
  {
    icon: <LuPencil className="w-4 h-4" />,
    iconBg: 'bg-amber-100 text-amber-600',
    title: 'Profile updated: Fatima Z.',
    subtitle: '1 hour ago • Admin Action',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-lg">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-md">
        <div>
          <h1 className="text-h1 text-on-surface font-[Manrope]">Dashboard Overview</h1>
          <p className="text-body-md text-muted mt-xs">
            Welcome back. Here is what's happening with your students today.
          </p>
        </div>
        <div className="flex items-center gap-sm shrink-0">
          <button className="flex items-center gap-sm px-lg py-2.25 rounded-lg border border-border-card text-[13px] font-medium text-on-surface hover:bg-surface-container transition-colors">
            <LuDownload className="w-4 h-4" />
            Export Report
          </button>
          <Link to="/students" className="flex items-center gap-sm px-lg py-2.25 rounded-lg bg-primary text-on-primary text-[13px] font-medium hover:bg-primary-container transition-colors" >
            <LuPlus className="w-4 h-4" />
            Add Student
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
        <DashboardCard label="TOTAL STUDENTS" value="1,248" subtitle="" icon={<LuUsers className="w-5 h-5 text-primary" />} >
          <TrendIndicator change="+12%" trend="up" label="from last month" />
        </DashboardCard>

        <DashboardCard label="ACTIVE TODAY" value="892" subtitle="⏱ Real-time attendance" icon={<LuCircleCheck className="w-5 h-5 text-primary" />} />

        <DashboardCard label="WEEKLY PROGRESS" value="76%" subtitle="" icon={<LuStar className="w-5 h-5 text-primary" />} >
          <TrendIndicator change="On target for Quran khatam" trend="up" label="" />
        </DashboardCard>
      </div>

      {/* Middle section: Chart + Quick Actions + Live Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Chart — spans 2 columns */}
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
          <BarChart />
        </div>

        {/* Right column: Quick Actions + Live Updates */}
        <div className="space-y-lg">
          {/* Quick Actions */}
          <div className="bg-linear-to-br from-primary to-primary-container rounded-xl p-lg text-on-primary">
            <h3 className="text-[17px] font-bold font-[Manrope]">Quick Actions</h3>
            <p className="text-[12px] text-on-primary/70 mt-xs">
              Manage your daily tasks efficiently with these quick shortcuts.
            </p>
            <div className="mt-md space-y-[8px]">
              {[
                { icon: <LuUserPlus className="w-4 h-4" />, label: 'Register New Student' },
                { icon: <LuClipboardList className="w-4 h-4" />, label: 'Input Progress Today' },
                { icon: <LuCalendar className="w-4 h-4" />, label: 'Schedule Evaluation' },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex items-center justify-between w-full px-md py-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-[13px] font-medium"
                >
                  <span className="flex items-center gap-sm">
                    {action.icon}
                    {action.label}
                  </span>
                  <LuChevronRight className="w-4 h-4 opacity-60" />
                </button>
              ))}
            </div>
          </div>

          {/* Live Updates */}
          <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
            <h3 className="text-[16px] font-semibold text-on-surface font-[Manrope] mb-md">
              Live Updates
            </h3>
            <div className="space-y-md">
              {liveUpdates.map((update, i) => (
                <div key={i} className="flex items-start gap-sm">
                  <div
                    className={`w-8 h-8 rounded-lg ${update.iconBg} flex items-center justify-center shrink-0`}
                  >
                    {update.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium text-on-surface leading-tight">
                      {update.title}
                    </p>
                    <p className="text-[11px] text-muted mt-0.5">{update.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Learning History */}
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
          <table className="w-full min-w-175">
            <thead>
              <tr className="border-b border-border-card">
                <th className="text-left px-lg py-md text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Student
                </th>
                <th className="text-left px-md py-md text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Lesson / Surah
                </th>
                <th className="text-left px-md py-md text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Status
                </th>
                <th className="text-left px-md py-md text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Date & Time
                </th>
                <th className="text-left px-md py-md text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Teacher
                </th>
                <th className="text-right px-lg py-md text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody>
              {recentHistory.map((row, i) => (
                <tr key={i} className="border-b border-border-card last:border-0 hover:bg-surface-container-low/50 transition-colors" >
                  <td className="px-lg py-md">
                    <div className="flex items-center gap-sm">
                      <div className={`w-8 h-8 rounded-full ${row.initialsColor} flex items-center justify-center text-[11px] font-bold shrink-0`} >
                        {row.initials}
                      </div>
                      <span className="text-[13px] font-medium text-on-surface">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-md py-md text-[13px] text-on-surface-variant">{row.lesson}</td>
                  <td className="px-md py-md">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${row.statusColor}`} >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-md py-md text-[13px] text-on-surface-variant">{row.date}</td>
                  <td className="px-md py-md text-[13px] text-on-surface-variant">{row.teacher}</td>
                  <td className="px-lg py-md">
                    <div className="flex items-center justify-end gap-sm">
                      <div className="w-20 h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${row.progress}%` }} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center py-md border-t border-border-card">
          <button className="text-[13px] text-muted hover:text-on-surface transition-colors">
            Show more records
          </button>
        </div>
      </div>

      {/* FAB */}
      <div className="fixed bottom-24 md:bottom-8 right-6 z-30">
        <button className="w-14 h-14 rounded-full bg-primary text-on-primary shadow-lg hover:shadow-xl hover:bg-primary-container transition-all flex items-center justify-center">
          <LuPlus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
