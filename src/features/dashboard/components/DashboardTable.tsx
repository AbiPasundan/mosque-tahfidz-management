import type { ColumnDef } from '@tanstack/react-table';
import { cn } from '@/utils/cn';
import { StudentAvatar } from '@/features/students/components/StudentAvatar';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router';

export type RecentProgressRow = {
  student_id: string;
  student_name: string;
  profile_img: string;
  surah: string;
  ayat_start: number;
  ayat_end: number;
  status: string;
  mentor_name: string;
  progress_date: string;
};

const statusColors: Record<string, string> = {
  EXCELLENT: 'bg-emerald-50 text-emerald-700',
  PASSED: 'bg-emerald-50 text-emerald-700',
  CONTINUE: 'bg-blue-50 text-blue-700',
  'NEED REVIEW': 'bg-amber-50 text-amber-700',
  MEMORIZED: 'bg-violet-50 text-violet-700',
};

export const historyColumns: ColumnDef<RecentProgressRow>[] = [
  {
    accessorKey: 'student_name',
    header: 'Student',
    cell: ({ row }) => {
      const { student_id, student_name, profile_img } = row.original;
      return (
        <div className="flex items-center gap-sm px-sm">
          <StudentAvatar
            name={student_name}
            profileImg={profile_img}
            size="xs"
            fallbackColorClass="bg-primary/10 text-primary"
          />
          <Link
            to={`/students/${student_id}`}
            className="text-[13px] font-medium text-on-surface hover:text-primary transition-colors"
          >
            {student_name}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'surah',
    header: 'Lesson / Surah',
    cell: ({ row }) => {
      const { surah, ayat_start, ayat_end } = row.original;
      return (
        <span className="text-[13px] text-on-surface-variant">
          {surah} (Ayat {ayat_start}-{ayat_end})
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const colorClass = statusColors[status.toUpperCase()] || 'bg-surface-container text-muted';
      return (
        <span
          className={cn(
            'inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide',
            colorClass
          )}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: 'progress_date',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.original.progress_date;
      return (
        <span className="text-[13px] text-on-surface-variant">
          {date ? formatDistanceToNow(new Date(date), { addSuffix: true }) : '—'}
        </span>
      );
    },
  },
  {
    accessorKey: 'mentor_name',
    header: 'Mentor',
    cell: ({ row }) => (
      <span className="text-[13px] text-on-surface-variant">
        {row.original.mentor_name}
      </span>
    ),
  },
];
