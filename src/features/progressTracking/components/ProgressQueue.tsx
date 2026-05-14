import { cn } from '@/utils/cn';
import { LuTrash2, LuUpload } from 'react-icons/lu';
import type { QueueEntry } from '../types/progress';

interface ProgressQueueProps {
  queue: QueueEntry[];
  onRemove: (index: number) => void;
  onSubmit: () => void;
  isPending: boolean;
}

export function ProgressQueue({ queue, onRemove, onSubmit, isPending }: ProgressQueueProps) {
  const totalAyat = queue.reduce((acc, curr) => acc + (curr.ayat_end - curr.ayat_start + 1), 0);

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
      <div className="flex items-center justify-between mb-lg">
        <h3 className="text-[16px] font-semibold text-on-surface font-[Manrope] flex items-center gap-sm">
          📋 Queue
        </h3>
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary">
          {queue.length} Entries
        </span>
      </div>

      <div className="space-y-md max-h-[400px] overflow-y-auto pr-1">
        {queue.length > 0 ? queue.map((entry, i) => (
          <div key={i} className="flex items-start gap-sm p-sm rounded-lg hover:bg-surface-container-low transition-colors group">
            <div className={cn(
              'w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0',
              entry.status === 'LANCAR' ? 'bg-primary' : 
              entry.status === 'ZIYADAH' ? 'bg-amber-500' : 'bg-rose-500'
            )} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-[14px] font-semibold text-on-surface truncate">{entry.studentName}</p>
                <button onClick={() => onRemove(i)} className="opacity-0 group-hover:opacity-100 transition-opacity text-error hover:text-error/80">
                  <LuTrash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-[2px]">
                <p className="text-[12px] text-muted">{entry.surah}: {entry.ayat_start}-{entry.ayat_end}</p>
                <span className={cn(
                  'px-1.5 py-0.5 rounded text-[8px] font-bold uppercase',
                  entry.status === 'LANCAR' ? 'bg-primary/10 text-primary' : 
                  entry.status === 'ZIYADAH' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                )}>
                  {entry.status}
                </span>
              </div>
              {entry.notes && (
                <p className="text-[11px] text-muted italic mt-[2px] line-clamp-1">"{entry.notes}"</p>
              )}
            </div>
          </div>
        )) : (
          <div className="py-8 text-center">
            <p className="text-[13px] text-muted">No students in queue</p>
          </div>
        )}
      </div>

      <div className="border-t border-border-card mt-lg pt-md">
        <div className="flex items-center justify-between mb-md">
          <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">Estimated Summary</span>
          <span className="text-[14px] font-bold text-on-surface">{totalAyat} Total Ayat</span>
        </div>
        <button 
          onClick={onSubmit}
          disabled={isPending || queue.length === 0}
          className="w-full flex items-center justify-center gap-sm py-[10px] rounded-xl bg-primary text-on-primary text-[14px] font-semibold hover:bg-primary-container transition-colors disabled:opacity-50 shadow-md"
        >
          <LuUpload className="w-4 h-4" />
          {isPending ? 'Submitting...' : 'Finish Session'}
        </button>
      </div>
    </div>
  );
}
