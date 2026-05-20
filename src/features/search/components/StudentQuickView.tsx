import { Link } from 'react-router';
import { LuX } from 'react-icons/lu';
import { getInitials } from '@/features/students/utils/studentTableHelpers';
import type { StudentQuickViewProps } from '../type/search';

export function StudentQuickView({ student, onClose }: StudentQuickViewProps) {
  return (
    <div className="hidden xl:block w-[320px] flex-shrink-0 bg-surface-container-lowest rounded-xl border border-border-card p-lg self-start sticky top-20 space-y-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-on-surface font-[Manrope]">Student Quick View</h3>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-container">
          <LuX className="w-4 h-4 text-muted" />
        </button>
      </div>

      {/* Profile */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-[20px] font-bold mx-auto">
          {getInitials(student.name)}
        </div>
        <h4 className="text-[16px] font-bold text-on-surface mt-sm font-[Manrope]">{student.name}</h4>
        <p className="text-[12px] text-muted">Level: {student.learning_level}</p>
        <p className="text-[11px] text-emerald-600 font-semibold mt-[2px] uppercase">● {student.status}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-md">
        <div className="text-center">
          <p className="text-[10px] font-semibold text-muted uppercase tracking-wider">Fluency</p>
          <p className="text-[16px] font-bold text-primary font-[Manrope] mt-[2px]">{student.fluency || 'N/A'}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-semibold text-muted uppercase tracking-wider">Join Date</p>
          <p className="text-[16px] font-bold text-on-surface font-[Manrope] mt-[2px]">
            {new Date(student.join_date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-sm">
        <a
          href={`tel:${student.contact}`}
          className="flex-1 py-[8px] rounded-lg border border-border-card text-[13px] font-medium text-on-surface hover:bg-surface-container transition-colors text-center"
        >
          Contact
        </a>
        <Link
          to={`/students/${student.id}`}
          className="flex-1 py-[8px] rounded-lg bg-primary text-on-primary text-[13px] font-semibold text-center hover:bg-primary-container transition-colors"
        >
          Full Profile
        </Link>
      </div>
    </div>
  );
}
