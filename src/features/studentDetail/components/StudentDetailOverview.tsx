import { cn } from '@/utils/cn';
import { LuPlus, LuCalendar, LuUser } from 'react-icons/lu';
import { useProgress } from '@/features/progressTracking/hooks/useProgress';
import type { Student } from '@/features/students/types/student';
import type { ProgressRecord } from '../types/studentDetail';

function StudentDetailOverview({ student }: { student: Student }) {
    const { data: progressResponse } = useProgress({ student_id: student.id });
    const progress = progressResponse?.data || [];
    return (
        <div className="space-y-lg">
            {/* Hafalan Summary header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-[17px] font-semibold text-on-surface font-[Manrope]">Hafalan Summary</h3>
                    <p className="text-[13px] text-muted mt-0.5">Current memorization tracking and milestones</p>
                </div>
                {/* <button className="flex items-center gap-sm px-md py-1.75 rounded-lg bg-primary text-on-primary text-[13px] font-medium hover:bg-primary-container transition-colors">
                    <LuPlus className="w-4 h-4" />
                    Add Entry
                </button> */}
            </div>

            {/* Juz Progress + Current Surah cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
                    <div className="flex items-start justify-between">
                        <div>
                            <h4 className="text-[15px] font-semibold text-on-surface">Juz Progress</h4>
                            <p className="text-[12px] text-muted mt-0.5">Level: {student.learning_level}</p>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <LuCalendar className="w-4 h-4 text-primary" />
                        </div>
                    </div>
                    <div className="mt-md">
                        <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full transition-all"
                                style={{ width: `100%` }} // We don't have percentage yet in DB
                            />
                        </div>
                        <div className="flex items-center justify-between mt-sm">
                            <span className="text-[11px] text-muted">{student.learning_level} - Ongoing</span>
                            <span className="text-[11px] font-semibold text-primary">Active</span>
                        </div>
                    </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
                    <div className="flex items-start justify-between">
                        <div>
                            <h4 className="text-[11px] font-semibold text-muted uppercase tracking-wider">Fluency</h4>
                            <p className="text-[18px] font-bold text-on-surface font-[Manrope] mt-xs">{student.fluency || 'Not set'}</p>
                        </div>
                        <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                            student.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        )}>
                            {student.status.toUpperCase()}
                        </span>
                    </div>
                    <p className="text-[13px] text-muted mt-sm">
                        Recent progress recorded on {student.last_progress ? new Date(student.last_progress).toLocaleDateString() : 'N/A'}
                    </p>
                </div>
            </div>

            {/* Learning History Timeline */}
            <div>
                <h3 className="text-[17px] font-semibold text-on-surface font-[Manrope] flex items-center gap-sm mb-lg">
                    <span className="text-lg">🕐</span> Learning History
                </h3>
                <div className="space-y-lg relative">
                    {/* Timeline line */}
                    <div className="absolute left-2.75 top-3 bottom-3 w-0.5 bg-border-card" />

                    {progress.length > 0 ? (
                        progress.map((record: ProgressRecord, i: number) => (
                            <div key={record.mentor_name} className="flex items-start gap-md relative">
                                <div
                                    className={cn(
                                        'w-6 h-6 rounded-full border-2 shrink-0 z-10',
                                        i === 0
                                            ? 'bg-primary border-primary'
                                            : 'bg-surface-container-lowest border-border-card'
                                    )}
                                />
                                <div className="flex-1 bg-surface-container-lowest rounded-xl border border-border-card p-md -mt-0.5">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-[14px] font-semibold text-on-surface">
                                                {record.surah} (Ayat {record.ayat_start}-{record.ayat_end})
                                            </p>
                                            <p className="text-[12px] text-muted mt-0.5">{record.notes}</p>
                                        </div>
                                        <span className="text-[11px] text-muted shrink-0">{new Date(record.progress_date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-sm mt-sm">
                                        <span className="flex items-center gap-xs px-2 py-0.5 rounded-full text-[10px] font-medium bg-surface-container text-on-surface-variant">
                                            <LuUser className="w-3 h-3" />
                                            {record.mentor_name || 'Ustadz'}
                                        </span>
                                        <span className={cn(
                                            'px-2 py-0.5 rounded-full text-[10px] font-semibold',
                                            record.status === 'LANCAR' ? 'bg-emerald-50 text-emerald-700' :
                                                record.status === 'MENGULANG' ? 'bg-amber-50 text-amber-700' :
                                                    'bg-blue-50 text-blue-700'
                                        )}>
                                            ✓ {record.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-[13px] text-muted ml-10">No progress records yet.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default StudentDetailOverview