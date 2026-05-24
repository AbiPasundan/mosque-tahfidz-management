import { LuPlus } from "react-icons/lu";
import { Link } from "react-router-dom";

export function MentorHeader() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-md">
            <div>
                <h1 className="text-h1 text-on-surface font-[Manrope]">Mentor Directory</h1>
                <p className="text-body-md text-muted mt-xs">
                    Manage tahfidz mentors, update their details, and review their assigned students.
                </p>
            </div>
            <Link
                to="/mentor/add"
                className="flex items-center gap-sm px-lg py-2.25 rounded-lg bg-primary text-on-primary text-[13px] font-medium hover:bg-primary-container transition-colors shrink-0"
            >
                <LuPlus className="w-4 h-4" />
                Add Mentor
            </Link>
        </div>
    );
}
