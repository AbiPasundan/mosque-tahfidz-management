import { Link } from 'react-router';
import { LuArrowRight } from 'react-icons/lu';
import { StudentStatusBadge } from '@/features/students/components/StudentStatusBadge';
import { StudentAvatar } from '@/features/students/components/StudentAvatar';
import type { StudentResultCardProps } from '../type/search';

const avatarColors = [
  'bg-violet-100 text-violet-700',
  'bg-emerald-100 text-emerald-700',
  'bg-rose-100 text-rose-700',
  'bg-amber-100 text-amber-700',
  'bg-blue-100 text-blue-700',
];

export function StudentResultCard({ student, index, onClick }: StudentResultCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-surface-container-lowest rounded-xl border border-border-card p-lg text-left hover:shadow-card transition-all"
    >
      <div className="flex items-center gap-sm mb-md">
        <StudentAvatar
          name={student.name}
          profileImg={student.profile_img}
          size="md"
          fallbackColorClass={avatarColors[index % avatarColors.length]}
        />
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold text-on-surface truncate">{student.name}</p>
          <p className="text-[11px] text-muted truncate">Level: {student.learning_level}</p>
        </div>
      </div>
      <div className="flex items-center gap-sm mb-md">
        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase text-primary bg-primary/10">
          {student.fluency || 'Active'}
        </span>
        <StudentStatusBadge status={student.status} />
      </div>
      <Link
        to={`/students/${student.id}`}
        className="text-[13px] font-medium text-on-surface-variant hover:text-primary transition-colors flex items-center gap-xs"
        onClick={(e) => e.stopPropagation()}
      >
        View Profile <LuArrowRight className="w-3.5 h-3.5" />
      </Link>
    </button>
  );
}
