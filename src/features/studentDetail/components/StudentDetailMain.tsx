import StudentDetailMainLeft from "./StudentDetailMainLeft"
import StudentDetailMainRight from "./StudentDetailMainRight"

function StudentDetailMain() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-lg">
            {/* Left: Profile Sidebar */}
            <StudentDetailMainLeft />

            {/* Right: Content area */}
            <StudentDetailMainRight />
        </div>
    )
}

export default StudentDetailMain
