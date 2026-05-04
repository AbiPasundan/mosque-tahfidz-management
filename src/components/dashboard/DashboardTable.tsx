import type { ColumnDef } from '@tanstack/react-table';
import { cn } from '@/utils/cn';

export type HistoryItem = {
    initials: string;
    initialsColor: string;
    name: string;
    lesson: string;
    status: string;
    statusColor: string;
    date: string;
    teacher: string;
    progress: number;
};

export const historyColumns: ColumnDef<HistoryItem>[] = [
    {
        accessorKey: 'name',
        header: 'Student',
        cell: ({ row }) => {
            const { initials, initialsColor, name } = row.original;
            return (
                <div className="flex items-center gap-sm px-sm">
                    <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0', initialsColor)} >
                        {initials}
                    </div>
                    <span className="text-[13px] font-medium text-on-surface">{name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'lesson',
        header: 'Lesson / Surah',
        cell: ({ row }) => (
            <span className="text-[13px] text-on-surface-variant">
                {row.getValue('lesson')}
            </span>
        ),
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const { status, statusColor } = row.original;
            return (
                <span
                    className={cn(
                        'inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide',
                        statusColor
                    )}
                >
                    {status}
                </span>
            );
        },
    },
    {
        accessorKey: 'date',
        header: 'Date & Time',
        cell: ({ row }) => (
            <span className="text-[13px] text-on-surface-variant">
                {row.getValue('date')}
            </span>
        ),
    },
    {
        accessorKey: 'teacher',
        header: 'Teacher',
        cell: ({ row }) => (
            <span className="text-[13px] text-on-surface-variant">
                {row.getValue('teacher')}
            </span>
        ),
    },
    {
        accessorKey: 'progress',
        header: () => <div className="text-right">Progress</div>,
        cell: ({ row }) => {
            const progress = row.getValue('progress') as number;
            return (
                <div className="flex items-center justify-end w-full">
                    <div className="w-20 h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <progress className="progress progress-primary w-20" value={progress} max="100" />
                    </div>
                </div>
            );
        },
    },
];