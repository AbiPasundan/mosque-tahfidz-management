import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-xl text-center',
        className
      )}
    >
      {icon && <div className="mb-lg text-on-surface-variant opacity-50">{icon}</div>}
      <h3 className="text-h3 text-on-surface mb-sm">{title}</h3>
      {description && (
        <p className="text-body-md text-on-surface-variant mb-lg max-w-md">{description}</p>
      )}
      {action}
    </div>
  );
}
