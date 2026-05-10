import { LuChevronRight } from "react-icons/lu"
import { Link } from "react-router"

function StudentDetailBreadcrumb({ name }: { name: string }) {
    return (
        <div className="flex items-center gap-xs text-[12px] text-muted">
            <Link to="/" className="hover:text-primary transition-colors">Dashboard</Link>
            <LuChevronRight className="w-3 h-3" />
            <Link to="/students" className="hover:text-primary transition-colors">Students</Link>
            <LuChevronRight className="w-3 h-3" />
            <span className="text-primary font-medium">{name}</span>
        </div>
    )
}

export default StudentDetailBreadcrumb