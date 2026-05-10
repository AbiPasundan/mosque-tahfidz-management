import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { cn } from '@/utils/cn';
import { StudentStatusBadge } from '@/features/students/components/StudentStatusBadge';
import { TableSkeleton } from '@/components/ui/LoadingSkeleton';
import { LuPlus, LuFilter, LuDownload, LuEllipsisVertical, LuChevronLeft, LuChevronRight, LuArrowRight } from 'react-icons/lu';
import { Link } from 'react-router';
import type { Student } from '@/constants/mockData';
import { mockStudents } from '@/constants/mockData';
import { DataTable } from '@/components/ui/Table';
import Breadcrumb from '@/features/students/components/StudentBreadcrumb';
import StudentHeader from '@/features/students/components/StudentHeader';
import StudentDashboard from '@/features/students/components/StudentTable';
import { useStudents } from '@/features/students/hooks/useStudents';
import StudentBottomCard from '@/features/students/components/StudentBottomCard';

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
  const { data, isLoading, isError } = useStudents();
  const students = data?.data || [];


  // Filter
  let filtered = students;
  if (globalFilter) {
    filtered = filtered.filter(
      (s: any) =>
        s.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
        s.nis.includes(globalFilter) ||
        s.class.toLowerCase().includes(globalFilter.toLowerCase())
    );
  }
  if (statusFilter !== 'all') {
    filtered = filtered.filter((s: any) => s.status.toLowerCase() === statusFilter);
  }

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const activeToday = students.filter((s: any) => s.status === 'Active').length;

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="space-y-lg">
      {/* Breadcrumb */}
      <Breadcrumb />
      {/* Page Header */}
      <StudentHeader />
      {/* Filter Bar + Stats */}
      <StudentDashboard />
      {/* Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-border-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-200">
            <thead>
              <tr className="border-b border-border-card bg-surface-container-low/50">
                {['Name', 'Age', 'Learning Level', 'Fluency', 'Status', 'Last Progress', ''].map((h) => (
                  <th key={h} className="text-left px-lg py-md text-[11px] font-semibold uppercase tracking-wider text-muted first:pl-lg last:pr-lg" >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((student: any, i: any) => {
                const colorClass = avatarColors[i % avatarColors.length];
                return (
                  <tr key={student.id} className="border-b border-border-card last:border-0 hover:bg-surface-container-low/30 transition-colors" >
                    {/* Name + Avatar */}
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-sm">
                        <div
                          className={cn(
                            'w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0',
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
                          {/* <p className="text-[11px] text-muted">ID: #{student.nis}</p> */}
                        </div>
                      </div>
                    </td>
                    {/* Age */}
                    <td className="px-lg py-md text-[13px] text-on-surface-variant">{student.age}</td>
                    {/* Learning Level */}
                    <td className="px-lg py-md">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary">
                        {student.learning_level}
                      </span>
                    </td>
                    {/* Fluency */}
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-sm">
                        <span className="text-[11px] text-muted">{student.fluency}</span>
                      </div>
                    </td>
                    {/* Status */}
                    <td className="px-lg py-md">
                      <StudentStatusBadge status={student.status} />
                    </td>
                    {/* Last Progress */}
                    <td className="px-lg py-md text-[13px] text-on-surface-variant">
                      {new Date(student.join_date).toLocaleDateString('en-US', {
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
      <StudentBottomCard />
    </div>
  );
}
