import { useParams, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { StudentStatusBadge } from '@/features/students/components/StudentStatusBadge';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { LuUser, LuCalendar, LuPlus, LuTrophy, LuCalendarDays, LuMessageSquare, LuChevronRight } from 'react-icons/lu';
import { mockStudents, mockProgressRecords } from '@/constants/mockData';
import { useState } from 'react';
import { cn } from '@/utils/cn';

const tabs = ['Overview', 'Progress', 'History', 'Murojaah', 'Notes'];

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('Overview');

  const { data: student, isLoading } = useQuery({
    queryKey: ['student', id],
    queryFn: () => Promise.resolve(mockStudents.find((s) => s.id === id)),
    enabled: !!id,
  });

  const { data: progress = [] } = useQuery({
    queryKey: ['progress', id],
    queryFn: () => Promise.resolve(mockProgressRecords.filter((p) => p.studentId === id)),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSkeleton />;
  if (!student) return <div className="text-body-md text-muted">Student not found</div>;

  const initials = student.name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();

  return (
    <div className="space-y-lg">
      {/* Breadcrumb */}
      <div className="flex items-center gap-xs text-[12px] text-muted flex-wrap">
        <Link to="/" className="hover:text-primary transition-colors">Dashboard</Link>
        <LuChevronRight className="w-3 h-3" />
        <Link to="/students" className="hover:text-primary transition-colors">Students</Link>
        <LuChevronRight className="w-3 h-3" />
        <span className="text-on-surface font-medium">{student.name}</span>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-lg">
        {/* Left: Profile Sidebar */}
        <div className="space-y-lg">
          {/* Profile Card */}
          <div className="bg-surface-container-lowest rounded-xl border border-border-card overflow-hidden">
            {/* Purple header */}
            <div className="h-28 bg-linear-to-br from-primary to-primary-container relative">
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 rounded-full bg-primary-container border-4 border-surface-container-lowest flex items-center justify-center text-on-primary text-[24px] font-bold">
                  {initials}
                </div>
              </div>
            </div>

            <div className="pt-14 pb-lg px-lg text-center">
              <h2 className="text-[18px] font-bold text-on-surface font-[Manrope]">{student.name}</h2>
              <p className="text-[12px] text-muted mt-0.5">Student ID: #{student.nis}</p>

              <div className="flex items-center justify-center gap-sm mt-md">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                  {student.class}
                </span>
                <StudentStatusBadge status={student.status} />
              </div>
            </div>

            {/* Info rows */}
            <div className="px-lg pb-lg space-y-md border-t border-border-card pt-md mx-lg">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-muted">Age</span>
                <span className="text-[13px] font-medium text-on-surface">{student.age} Years Old</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-muted">Join Date</span>
                <span className="text-[13px] font-medium text-on-surface">
                  {new Date(student.enrollmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-muted">Contact</span>
                <a href={`tel:${student.phone}`} className="text-[13px] font-medium text-primary hover:underline">
                  {student.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
            <h3 className="text-[15px] font-semibold text-on-surface font-[Manrope] flex items-center gap-sm mb-md">
              <span className="text-lg">📊</span> Quick Stats
            </h3>
            <div className="grid grid-cols-2 gap-md">
              <div>
                <p className="text-[11px] text-muted">Attendance</p>
                <p className="text-[20px] font-bold text-on-surface font-[Manrope]">96.4%</p>
              </div>
              <div>
                <p className="text-[11px] text-muted">Avg Score</p>
                <p className="text-[20px] font-bold text-on-surface font-[Manrope]">88/100</p>
              </div>
              <div>
                <p className="text-[11px] text-muted">Last Update</p>
                <p className="text-[16px] font-bold text-on-surface font-[Manrope]">2h ago</p>
              </div>
              <div>
                <p className="text-[11px] text-muted">Status</p>
                <p className="text-[14px] font-medium text-emerald-600 flex items-center gap-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Excellent
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Content area */}
        <div className="space-y-lg">
          {/* Tabs */}
          <div className="border-b border-border-card">
            <div className="flex gap-lg overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'pb-md text-[14px] font-medium whitespace-nowrap transition-colors relative',
                    activeTab === tab
                      ? 'text-primary'
                      : 'text-muted hover:text-on-surface-variant'
                  )}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content — Overview */}
          {activeTab === 'Overview' && (
            <div className="space-y-lg">
              {/* Hafalan Summary header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[17px] font-semibold text-on-surface font-[Manrope]">Hafalan Summary</h3>
                  <p className="text-[13px] text-muted mt-0.5">Current memorization tracking and milestones</p>
                </div>
                <button className="flex items-center gap-sm px-md py-1.75 rounded-lg bg-primary text-on-primary text-[13px] font-medium hover:bg-primary-container transition-colors">
                  <LuPlus className="w-4 h-4" />
                  Add Entry
                </button>
              </div>

              {/* Juz Progress + Current Surah cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-[15px] font-semibold text-on-surface">Juz Progress</h4>
                      <p className="text-[12px] text-muted mt-0.5">Currently {student.memorization}</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <LuCalendar className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div className="mt-md">
                    <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${student.completionRate}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-sm">
                      <span className="text-[11px] text-muted">{student.memorization} - Al-Ma'idah to An-Naba</span>
                      <span className="text-[11px] font-semibold text-primary">{student.completionRate}% Complete</span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-[11px] font-semibold text-muted uppercase tracking-wider">Current Surah</h4>
                      <p className="text-[18px] font-bold text-on-surface font-[Manrope] mt-xs">Surah Al-Qalam</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-700">
                      ONGOING
                    </span>
                  </div>
                  <p className="text-[13px] text-muted mt-sm">Verses 1-40 completed of 52 total verses.</p>
                  <div className="flex items-center gap-xs mt-md">
                    {[1, 2, 3].map((n) => (
                      <span
                        key={n}
                        className="w-7 h-7 rounded-full border border-border-card flex items-center justify-center text-[11px] font-medium text-on-surface-variant"
                      >
                        {n}
                      </span>
                    ))}
                    <span className="text-[11px] font-semibold text-primary ml-xs">+37</span>
                  </div>
                </div>
              </div>

              {/* Learning History Timeline */}
              <div>
                <h3 className="text-[17px] font-semibold text-on-surface font-[Manrope] flex items-center gap-sm mb-lg">
                  <span className="text-lg">🕐</span> Learning History
                </h3>
                <div className="space-y-lg relative">
                  {/* Timeline line */}
                  <div className="absolute left-2.75 top-3 bottom-3 w-0.5 bg-border-card" />

                  {progress.length > 0 ? (
                    progress.map((record, i) => (
                      <div key={record.id} className="flex items-start gap-md relative">
                        <div
                          className={cn(
                            'w-6 h-6 rounded-full border-2 shrink-0 z-10',
                            i === 0
                              ? 'bg-primary border-primary'
                              : 'bg-surface-container-lowest border-border-card'
                          )}
                        />
                        <div className="flex-1 bg-surface-container-lowest rounded-xl border border-border-card p-md -mt-0.5">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-[14px] font-semibold text-on-surface">
                                {record.surah} (Verses {record.verses})
                              </p>
                              <p className="text-[12px] text-muted mt-0.5">{record.notes}</p>
                            </div>
                            <span className="text-[11px] text-muted shrink-0">{record.date}</span>
                          </div>
                          <div className="flex items-center gap-sm mt-sm">
                            <span className="flex items-center gap-xs px-2 py-0.5 rounded-full text-[10px] font-medium bg-surface-container text-on-surface-variant">
                              <LuUser className="w-3 h-3" />
                              {student.mentor}
                            </span>
                            <span className={cn(
                              'px-2 py-0.5 rounded-full text-[10px] font-semibold',
                              record.grade === 'Excellent' ? 'bg-emerald-50 text-emerald-700' :
                                record.grade === 'Good' ? 'bg-blue-50 text-blue-700' :
                                  'bg-amber-50 text-amber-700'
                            )}>
                              ✓ {record.grade}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-[13px] text-muted ml-10">No progress records yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab !== 'Overview' && (
            <div className="bg-surface-container-lowest rounded-xl border border-border-card p-xl text-center">
              <p className="text-[14px] text-muted">{activeTab} content will appear here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Achievement Bar */}
      <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-lg">
          <div className="flex items-center gap-md">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
              <LuTrophy className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <p className="text-[11px] text-muted">Achievements</p>
              <p className="text-[15px] font-bold text-on-surface">12 Badges Earned</p>
            </div>
          </div>
          <div className="flex items-center gap-md">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <LuCalendarDays className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-[11px] text-muted">Attendance Streak</p>
              <p className="text-[15px] font-bold text-on-surface">18 Days Active</p>
            </div>
          </div>
          <div className="flex items-center gap-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <LuMessageSquare className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-[11px] text-muted">Teacher Notes</p>
              <p className="text-[15px] font-bold text-on-surface">4 New Updates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
