import { StudentStatusBadge } from '@/features/students/components/StudentStatusBadge';
import type { Student } from '@/features/students/types/student';
import { formatDistanceToNow } from 'date-fns';

function StudentDetailMainLeft({ student }: { student: Student }) {
    const initials = student.name.split(' ').slice(0, 2).map((n: string) => n[0]).join('').toUpperCase();

    return (
        <div className="space-y-lg">
            {/* Profile Card */}
            <div className="bg-surface-container-lowest rounded-xl border border-border-card overflow-hidden">
                {/* Purple header */}
                <div className="h-28 bg-linear-to-br from-primary to-primary-container relative">
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                        <div className="w-20 h-20 rounded-full bg-primary-container border-4 border-surface-container-lowest flex items-center justify-center text-on-primary text-[24px] font-bold">
                            {initials}
                        </div>
                    </div>
                </div>

                <div className="pt-14 pb-lg px-lg text-center">
                    <h2 className="text-[18px] font-bold text-on-surface font-[Manrope]">{student.name}</h2>
                    <p className="text-[12px] text-muted mt-0.5">Student ID: #{student.id.slice(0, 8)}</p>

                    <div className="flex items-center justify-center gap-sm mt-md">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                            {student.learning_level}
                        </span>
                        <StudentStatusBadge status={student.status} />
                    </div>
                </div>

                {/* Info rows */}
                <div className="px-lg pb-lg space-y-md border-t border-border-card pt-md mx-lg">
                    <div className="flex items-center justify-between">
                        <span className="text-[13px] text-muted">Age</span>
                        <span className="text-[13px] font-medium text-on-surface">{student.age} Years Old</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[13px] text-muted">Join Date</span>
                        <span className="text-[13px] font-medium text-on-surface">
                            {new Date(student.join_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[13px] text-muted">Contact</span>
                        <a href={`tel:${student.contact}`} className="text-[13px] font-medium text-primary hover:underline">
                            {student.contact}
                        </a>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
                <h3 className="text-[15px] font-semibold text-on-surface font-[Manrope] flex items-center gap-sm mb-md">
                    <span className="text-lg">📊</span> Quick Stats
                </h3>
                <div className="grid grid-cols-2 gap-md">
                    <div>
                        <p className="text-[11px] text-muted">Last Update</p>
                        <p className="text-[15px] font-bold text-on-surface font-[Manrope]">
                            {student.last_progress ? formatDistanceToNow(new Date(student.last_progress), { addSuffix: true }) : 'Never'}
                        </p>
                    </div>
                    <div>
                        <p className="text-[11px] text-muted">Fluency</p>
                        <p className="text-[14px] font-medium text-emerald-600 flex items-center gap-xs">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            {student.fluency || 'Not assessed'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentDetailMainLeft
