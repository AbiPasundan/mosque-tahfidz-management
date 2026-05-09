import { LuPlus } from "react-icons/lu"
import { Link } from "react-router"

function StudentHeader() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-md">
            <div>
                <h1 className="text-h1 text-on-surface font-[Manrope]">Student Directory</h1>
                <p className="text-body-md text-muted mt-xs">
                    Manage enrollments, monitor progress, and update learning levels for  {/* {students.length.toLocaleString()} */} students.
                </p>
            </div>
            <Link to="/students/new" className="flex items-center gap-sm px-lg py-2.25 rounded-lg bg-primary text-on-primary text-[13px] font-medium hover:bg-primary-container transition-colors shrink-0" >
                <LuPlus className="w-4 h-4" />
                Add Student
            </Link>
        </div>
    )
}

export default StudentHeader