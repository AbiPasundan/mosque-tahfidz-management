import { cn } from '@/utils/cn';
import { getInitials } from '@/features/students/utils/studentTableHelpers';

interface UserResultCardProps {
  user: any;
}

export function UserResultCard({ user }: UserResultCardProps) {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg flex items-center justify-between">
      <div className="flex items-center gap-sm">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold",
          user.role === 'admin' ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"
        )}>
          {getInitials(user.name)}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[14px] font-semibold text-on-surface">{user.name}</p>
            <span className={cn(
              "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase",
              user.role === 'admin' ? "bg-amber-50 text-amber-600 border border-amber-200" : "bg-slate-50 text-slate-500 border border-slate-200"
            )}>
              {user.role}
            </span>
          </div>
          <p className="text-[12px] text-muted">{user.email}</p>
        </div>
      </div>
      <button className="px-md py-[6px] rounded-lg border border-border-card text-[13px] font-medium text-on-surface hover:bg-surface-container transition-colors">
        Details
      </button>
    </div>
  );
}
