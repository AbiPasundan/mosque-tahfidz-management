import { LuMessageSquare } from "react-icons/lu"
import { RxActivityLog } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import type { StudentDetailBottomCardProps } from "../types/studentDetail";
import type { Student } from "@/features/students/types/student";

function StudentDetailBottomCardUtils({ icon: Icon, title, content }: StudentDetailBottomCardProps) {
    return (
        <div className="flex items-center gap-md">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-rose-600" />
            </div>
            <div className="min-w-0">
                <p className="text-[11px] text-muted">{title}</p>
                <p className="text-[14px] font-bold text-on-surface truncate">{content}</p>
            </div>
        </div>
    );
}

function StudentDetailBottomCard({ student }: { student: Student }) {
    return (
        <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-lg">
                <StudentDetailBottomCardUtils 
                    icon={RxActivityLog} 
                    title="Last Activity" 
                    content={student.last_progress ? new Date(student.last_progress).toLocaleDateString() : 'No activity'} 
                />
                <StudentDetailBottomCardUtils 
                    icon={FaUser} 
                    title="Mentor ID" 
                    content={student.mentor_id.slice(0, 8)} 
                />
                <StudentDetailBottomCardUtils 
                    icon={LuMessageSquare} 
                    title="Student Status" 
                    content={student.status} 
                />
            </div>
        </div>
    )
}

export default StudentDetailBottomCard