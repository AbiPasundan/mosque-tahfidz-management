import { cn } from '@/utils/cn';
import { LuTrendingUp, LuTrendingDown, LuMinus } from 'react-icons/lu';

interface TrendIndicatorProps {
  change: string;
  trend: 'up' | 'down' | 'neutral';
  label?: string;
}

export function TrendIndicator({ change, trend, label = 'from last month' }: TrendIndicatorProps) {
  const styles = {
    up: 'text-emerald-600',
    down: 'text-error',
    neutral: 'text-muted',
  };

  const Icon = trend === 'up' ? LuTrendingUp : trend === 'down' ? LuTrendingDown : LuMinus;

  return (
    <div className={cn('flex items-center gap-xs text-[12px]', styles[trend])}>
      <Icon className="w-3.5 h-3.5" />
      <span className="font-medium">{change}</span>
      <span className="text-muted">{label}</span>
    </div>
  );
}
