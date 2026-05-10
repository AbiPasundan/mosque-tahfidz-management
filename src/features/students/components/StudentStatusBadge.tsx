import { cn } from '@/utils/cn';

type Status = 'Active' | 'Pending' | 'Inactive' | 'Graduated';

interface StudentStatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<Status, string> = {
  Active: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  Pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  Inactive: 'bg-slate-100 text-slate-600 ring-slate-500/20',
  Graduated: 'bg-blue-50 text-blue-700 ring-blue-600/20',
};

function normalizeStatus(raw: string): Status {
  const capitalized = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
  return (capitalized in statusStyles ? capitalized : 'Inactive') as Status;
}

export function StudentStatusBadge({ status, className }: StudentStatusBadgeProps) {
  const normalized = normalizeStatus(status);

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ring-1 ring-inset',
        statusStyles[normalized],
        className
      )}
    >
      {normalized}
    </span>
  );
}
