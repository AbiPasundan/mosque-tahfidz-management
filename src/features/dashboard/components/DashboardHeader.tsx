import { LuDownload, LuPlus } from "react-icons/lu"
import { Link } from "react-router"

function DashboardHeader() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-md">
            <div>
                <h1 className="text-h1 text-on-surface font-[Manrope]">Dashboard Overview</h1>
                <p className="text-body-md text-muted mt-xs">
                    Welcome back. Here is what's happening with your students today.
                </p>
            </div>
            <div className="flex flex-wrap items-center gap-sm w-full sm:w-auto">
                <button className="flex-1 sm:flex-none flex justify-center items-center gap-sm px-lg py-2.25 rounded-lg border border-border-card text-[13px] font-medium text-on-surface hover:bg-surface-container transition-colors">
                    <LuDownload className="w-4 h-4" />
                    Export Report
                </button>
                <Link to="/students/add" className="flex-1 sm:flex-none flex justify-center items-center gap-sm px-lg py-2.25 rounded-lg bg-primary text-on-primary text-[13px] font-medium hover:bg-primary-container transition-colors" >
                    <LuPlus className="w-4 h-4" />
                    Add Student
                </Link>
            </div>
        </div>
    )
}

export default DashboardHeader