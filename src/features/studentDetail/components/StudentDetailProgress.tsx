import { cn } from '@/utils/cn';
import { LuCalendar } from 'react-icons/lu';
import type { ProgressRecord } from '../types/studentDetail';
import { useProgress } from '@/features/progressTracking/hooks/useProgress';
import type { Student } from '@/features/students/types/student';

function StudentDetailProgress({ student }: { student: Student }) {
    const { data: progressResponse } = useProgress({ student_id: student.id });
    const progress = progressResponse?.data || [];

    return (
        <div className="space-y-lg animate-in fade-in-50 duration-200">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md pb-md border-b border-border-card">
                <div>
                    <h3 className="text-[17px] font-semibold text-on-surface font-[Manrope]">
                        Detailed Progress History
                    </h3>
                    <p className="text-[13px] text-muted mt-0.5">
                        Total of {progress.length} records logged for this student.
                    </p>
                </div>
            </div>

            {/* Table Container */}
            {progress.length > 0 ? (
                <div className="bg-surface-container-lowest rounded-xl border border-border-card overflow-hidden shadow-xs">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface-container-low/30 border-b border-border-card">
                                    <th className="px-lg py-md text-[11px] font-bold uppercase tracking-wider text-muted font-[Manrope]">
                                        Date
                                    </th>
                                    <th className="px-lg py-md text-[11px] font-bold uppercase tracking-wider text-muted font-[Manrope]">
                                        Surah & Ayat
                                    </th>
                                    <th className="px-lg py-md text-[11px] font-bold uppercase tracking-wider text-muted font-[Manrope]">
                                        Status
                                    </th>
                                    <th className="px-lg py-md text-[11px] font-bold uppercase tracking-wider text-muted font-[Manrope]">
                                        Mentor
                                    </th>
                                    <th className="px-lg py-md text-[11px] font-bold uppercase tracking-wider text-muted font-[Manrope]">
                                        Notes
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-card">
                                {progress.map((record: ProgressRecord) => {
                                    const formattedDate = new Date(record.progress_date).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    });

                                    return (
                                        <tr
                                            key={record.id}
                                            className="hover:bg-surface-container-low/30 transition-colors duration-150"
                                        >
                                            {/* Date */}
                                            <td className="px-lg py-md whitespace-nowrap">
                                                <div className="flex items-center gap-xs">
                                                    <LuCalendar className="w-3.5 h-3.5 text-muted" />
                                                    <span className="text-[13px] font-medium text-on-surface">
                                                        {formattedDate}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Surah & Ayat */}
                                            <td className="px-lg py-md">
                                                <div className="flex flex-col">
                                                    <span className="text-[13px] font-semibold text-on-surface">
                                                        {record.surah}
                                                    </span>
                                                    <span className="text-[11px] text-muted font-medium mt-0.5">
                                                        Ayat {record.ayat_start} - {record.ayat_end}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="px-lg py-md whitespace-nowrap">
                                                <span className={cn(
                                                    "inline-flex items-center gap-xs px-2.5 py-1 rounded-full text-[11px] font-bold border",
                                                    record.status.toUpperCase() === 'LANCAR'
                                                        ? 'bg-emerald-50/70 text-emerald-800 border-emerald-200'
                                                        : record.status.toUpperCase() === 'MENGULANG'
                                                            ? 'bg-amber-50/70 text-amber-800 border-amber-200'
                                                            : 'bg-blue-50/70 text-blue-800 border-blue-200'
                                                )}>
                                                    <span className={cn(
                                                        "w-1.5 h-1.5 rounded-full",
                                                        record.status.toUpperCase() === 'LANCAR'
                                                            ? 'bg-emerald-600'
                                                            : record.status.toUpperCase() === 'MENGULANG'
                                                                ? 'bg-amber-600'
                                                                : 'bg-blue-600'
                                                    )} />
                                                    {record.status}
                                                </span>
                                            </td>

                                            {/* Mentor */}
                                            <td className="px-lg py-md whitespace-nowrap">
                                                <div className="flex items-center gap-sm">
                                                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[11px] font-bold shrink-0">
                                                        {(record.mentor_name || 'U').substring(0, 2).toUpperCase()}
                                                    </div>
                                                    <span className="text-[13px] font-medium text-on-surface-variant">
                                                        {record.mentor_name || 'Ustadz'}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Notes */}
                                            <td className="px-lg py-md">
                                                <p className="text-[13px] text-on-surface-variant leading-relaxed max-w-[280px] break-words">
                                                    {record.notes || '-'}
                                                </p>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-surface-container-lowest rounded-xl border border-border-card p-xl text-center shadow-xs">
                    <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mx-auto mb-md">
                        <span className="text-xl">📭</span>
                    </div>
                    <h4 className="text-[15px] font-bold text-on-surface">No Progress Recorded Yet</h4>
                    <p className="text-[13px] text-muted mt-1 max-w-[280px] mx-auto">
                        Once the mentor logs memorization progress for this student, the detailed logs will appear here.
                    </p>
                </div>
            )}
        </div>
    )
}

export default StudentDetailProgress