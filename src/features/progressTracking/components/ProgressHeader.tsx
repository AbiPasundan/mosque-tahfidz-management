import { LuSave } from 'react-icons/lu';

interface ProgressHeaderProps {
  onSubmit: () => void;
  isPending: boolean;
  queueLength: number;
  isOnline?: boolean;
}

export function ProgressHeader({ onSubmit, isPending, queueLength, isOnline = true }: ProgressHeaderProps) {
  const isDisabled = isPending || queueLength === 0 || !isOnline;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-md">
      <div>
        <h1 className="text-h1 text-on-surface font-[Manrope]">Input Study Progress</h1>
        <p className="text-body-md text-muted mt-xs">
          Record student recitation and memorization achievements.
        </p>
      </div>
      <div className="flex items-center gap-sm flex-shrink-0">
        <button className="flex items-center gap-sm px-lg py-[9px] rounded-lg border border-border-card text-[13px] font-medium text-on-surface hover:bg-surface-container transition-colors">
          Import CSV
        </button>
        <button
          onClick={onSubmit}
          disabled={isDisabled}
          className="flex items-center gap-sm px-lg py-[9px] rounded-lg bg-primary text-on-primary text-[13px] font-medium hover:bg-primary-container transition-colors disabled:opacity-50"
        >
          <LuSave className="w-4 h-4" />
          {!isOnline ? '🔴 Offline' : isPending ? 'Submitting...' : 'Submit Entries'}
        </button>
      </div>
    </div>
  );
}
