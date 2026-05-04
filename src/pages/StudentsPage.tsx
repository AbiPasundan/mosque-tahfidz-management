import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { cn } from '@/utils/cn';
import { StudentStatusBadge } from '@/components/shared/StudentStatusBadge';
import { TableSkeleton } from '@/components/shared/LoadingSkeleton';
import { LuPlus, LuFilter, LuDownload, LuEllipsisVertical, LuChevronLeft, LuChevronRight, LuArrowRight } from 'react-icons/lu';
import { Link } from 'react-router';
import type { Student } from '@/constants/mockData';
import { mockStudents } from '@/constants/mockData';

/* ─── Avatar initials helper ─── */
function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

const avatarColors = [
  'bg-emerald-100 text-emerald-700',
  'bg-rose-100 text-rose-700',
  'bg-violet-100 text-violet-700',
  'bg-amber-100 text-amber-700',
  'bg-blue-100 text-blue-700',
  'bg-pink-100 text-pink-700',
  'bg-teal-100 text-teal-700',
  'bg-indigo-100 text-indigo-700',
];

export default function StudentsPage() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: students = [], isLoading } = useQuery<Student[]>({
    queryKey: ['students'],
    queryFn: () => Promise.resolve(mockStudents),
  });

  // Filter
  let filtered = students;
  if (globalFilter) {
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
        s.nis.includes(globalFilter) ||
        s.class.toLowerCase().includes(globalFilter.toLowerCase())
    );
  }
  if (statusFilter !== 'all') {
    filtered = filtered.filter((s) => s.status.toLowerCase() === statusFilter);
  }

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const activeToday = students.filter((s) => s.status === 'Active').length;

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="space-y-lg">
      {/* Breadcrumb */}
      <div className="flex items-center gap-xs text-[12px] text-muted">
        <Link to="/" className="hover:text-primary transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-on-surface font-medium">Students</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-md">
        <div>
          <h1 className="text-h1 text-on-surface font-[Manrope]">Student Directory</h1>
          <p className="text-body-md text-muted mt-xs">
            Manage enrollments, monitor progress, and update learning levels for {students.length.toLocaleString()} students.
          </p>
        </div>
        <Link
          to="/students/new"
          className="flex items-center gap-sm px-lg py-[9px] rounded-lg bg-primary text-on-primary text-[13px] font-medium hover:bg-primary-container transition-colors flex-shrink-0"
        >
          <LuPlus className="w-4 h-4" />
          Add Student
        </Link>
      </div>

      {/* Filter Bar + Stats */}
      <div className="flex flex-col lg:flex-row gap-md">
        {/* Filters */}
        <div className="flex-1 flex flex-wrap items-center gap-md bg-surface-container-lowest rounded-xl border border-border-card px-lg py-md">
          <div className="flex items-center gap-sm">
            <span className="text-[12px] font-semibold text-muted uppercase tracking-wider">Level:</span>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="text-[13px] px-md py-[6px] rounded-lg border border-border-card bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="flex items-center gap-sm">
            <span className="text-[12px] font-semibold text-muted uppercase tracking-wider">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="text-[13px] px-md py-[6px] rounded-lg border border-border-card bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
              <option value="graduated">Graduated</option>
            </select>
          </div>
          <div className="flex items-center gap-xs ml-auto">
            <button className="p-2 rounded-lg hover:bg-surface-container transition-colors" aria-label="Filters">
              <LuFilter className="w-4 h-4 text-muted" />
            </button>
            <button className="p-2 rounded-lg hover:bg-surface-container transition-colors" aria-label="Download">
              <LuDownload className="w-4 h-4 text-muted" />
            </button>
          </div>
        </div>

        {/* Mini stat cards */}
        <div className="flex gap-md flex-shrink-0">
          <div className="bg-surface-container-lowest rounded-xl border border-border-card px-lg py-md min-w-[130px]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary">Active Today</p>
            <p className="text-[24px] font-bold text-on-surface font-[Manrope] leading-tight mt-xs">{activeToday}</p>
          </div>
          <div className="bg-surface-container-lowest rounded-xl border-2 border-primary/20 px-lg py-md min-w-[130px]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary">New Students</p>
            <p className="text-[24px] font-bold text-on-surface font-[Manrope] leading-tight mt-xs">12</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-border-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-border-card bg-surface-container-low/50">
                {['Name', 'Age', 'Learning Level', 'Fluency', 'Status', 'Last Progress', ''].map((h) => (
                  <th
                    key={h}
                    className="text-left px-lg py-md text-[11px] font-semibold uppercase tracking-wider text-muted first:pl-lg last:pr-lg"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((student, i) => {
                const colorClass = avatarColors[i % avatarColors.length];
                return (
                  <tr
                    key={student.id}
                    className="border-b border-border-card last:border-0 hover:bg-surface-container-low/30 transition-colors"
                  >
                    {/* Name + Avatar */}
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-sm">
                        <div
                          className={cn(
                            'w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0',
                            colorClass
                          )}
                        >
                          {getInitials(student.name)}
                        </div>
                        <div>
                          <Link
                            to={`/students/${student.id}`}
                            className="text-[13px] font-semibold text-on-surface hover:text-primary transition-colors"
                          >
                            {student.name}
                          </Link>
                          <p className="text-[11px] text-muted">ID: #{student.nis}</p>
                        </div>
                      </div>
                    </td>
                    {/* Age */}
                    <td className="px-lg py-md text-[13px] text-on-surface-variant">{student.age}</td>
                    {/* Learning Level */}
                    <td className="px-lg py-md">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary">
                        {student.memorization.replace('Juz ', 'Juz ')}
                      </span>
                    </td>
                    {/* Fluency */}
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-sm">
                        <div className="w-16 h-[5px] bg-surface-container rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${student.completionRate}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-muted">{student.completionRate}% Fluency</span>
                      </div>
                    </td>
                    {/* Status */}
                    <td className="px-lg py-md">
                      <StudentStatusBadge status={student.status} />
                    </td>
                    {/* Last Progress */}
                    <td className="px-lg py-md text-[13px] text-on-surface-variant">
                      {new Date(student.lastActivity).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    {/* Actions */}
                    <td className="px-lg py-md">
                      <button className="p-1.5 rounded-lg hover:bg-surface-container transition-colors" aria-label="More actions">
                        <LuEllipsisVertical className="w-4 h-4 text-muted" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-lg py-md border-t border-border-card">
          <p className="text-[12px] text-muted">
            Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, filtered.length)} of{' '}
            {filtered.length.toLocaleString()} students
          </p>
          <div className="flex items-center gap-xs">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-border-card hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <LuChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  'w-8 h-8 rounded-lg text-[12px] font-medium transition-colors',
                  page === currentPage
                    ? 'bg-primary text-on-primary'
                    : 'border border-border-card hover:bg-surface-container text-on-surface-variant'
                )}
              >
                {page}
              </button>
            ))}
            {totalPages > 4 && <span className="text-[12px] text-muted px-xs">...</span>}
            {totalPages > 3 && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={cn(
                  'w-8 h-8 rounded-lg text-[12px] font-medium transition-colors',
                  totalPages === currentPage
                    ? 'bg-primary text-on-primary'
                    : 'border border-border-card hover:bg-surface-container text-on-surface-variant'
                )}
              >
                {totalPages}
              </button>
            )}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-border-card hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <LuChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
        <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mb-md">
            <LuFilter className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-[16px] font-semibold text-on-surface font-[Manrope]">Review Needed</h3>
          <p className="text-[13px] text-muted mt-xs">14 students haven't updated their progress in over 7 days.</p>
          <button className="flex items-center gap-xs mt-md text-[13px] font-medium text-on-surface hover:text-primary transition-colors">
            View List <LuArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-md">
            <span className="text-lg">✨</span>
          </div>
          <h3 className="text-[16px] font-semibold text-on-surface font-[Manrope]">Upcoming Exams</h3>
          <p className="text-[13px] text-muted mt-xs">Intermediate Level evaluations scheduled for Monday, Oct 23.</p>
          <button className="flex items-center gap-xs mt-md text-[13px] font-medium text-on-surface hover:text-primary transition-colors">
            See Schedule <LuArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-gradient-to-br from-primary to-primary-container rounded-xl p-lg text-on-primary">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-md">
            <LuDownload className="w-5 h-5" />
          </div>
          <h3 className="text-[16px] font-semibold font-[Manrope]">Export Reports</h3>
          <p className="text-[13px] text-on-primary/70 mt-xs">Generate monthly fluency and attendance reports for the board.</p>
          <button className="flex items-center gap-sm mt-md px-md py-[7px] rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-[13px] font-medium">
            Download PDF <LuDownload className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
