import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

interface DashboardCardProps {
  label: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function DashboardCard({ label, value, subtitle, icon, className, children }: DashboardCardProps) {
  return (
    <div
      className={cn(
        'bg-surface-container-lowest rounded-xl border border-border-card p-lg',
        'hover:shadow-card transition-all duration-200',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</p>
          <p className="text-[28px] font-bold text-on-surface mt-xs leading-tight font-[Manrope] tracking-tight">
            {value}
          </p>
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
      </div>
      {subtitle && (
        <p className="text-[12px] text-muted mt-sm">{subtitle}</p>
      )}
      {children && <div className="mt-sm">{children}</div>}
    </div>
  );
}
