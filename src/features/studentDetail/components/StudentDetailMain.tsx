import type { Student } from "@/features/students/types/student"
import StudentDetailMainLeft from "./StudentDetailMainLeft"
import StudentDetailMainRight from "./StudentDetailMainRight"

function StudentDetailMain({ student }: { student: Student }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-lg">
            {/* Left: Profile Sidebar */}
            <StudentDetailMainLeft student={student} />

            {/* Right: Content area */}
            <StudentDetailMainRight student={student} />
        </div>
    )
}

export default StudentDetailMain
