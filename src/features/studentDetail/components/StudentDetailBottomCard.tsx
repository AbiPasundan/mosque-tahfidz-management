import { LuMessageSquare } from "react-icons/lu"
import { RxActivityLog } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import type { StudentDetailBottomCardProps } from "../types/studentDetail";


function StudentDetailBottomCardUtils({ icon: Icon, title, content }: StudentDetailBottomCardProps) {
    return (
        <div className="flex items-center gap-md">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                {/* Panggil komponen Icon dan berikan class Tailwind langsung di sini */}
                <Icon className="w-5 h-5 text-rose-600" />
            </div>
            <div>
                <p className="text-[11px] text-muted">Last Activity {title}</p>
                <p className="text-[15px] font-bold text-on-surface">{content} 2026-05-03</p>
            </div>
        </div>
    );
}

function StudentDetailBottomCard() {
    return (
        <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-lg">
                <StudentDetailBottomCardUtils icon={RxActivityLog} title="Last Activity" content="2026-05-03" />
                <StudentDetailBottomCardUtils icon={FaUser} title="Mentor" content="Ustadz Farid" />
                <StudentDetailBottomCardUtils icon={LuMessageSquare} title="Teacher Notes" content="4 New Updates" />
            </div>
        </div>
    )
}

export default StudentDetailBottomCard