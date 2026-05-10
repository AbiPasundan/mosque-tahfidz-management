import { LuChevronRight } from "react-icons/lu"
import { Link } from "react-router"

function ProgressBreadcrumb() {
    return (
        <div className="flex items-center gap-xs text-[12px] text-muted">
            <Link to="/" className="hover:text-primary transition-colors">Dashboard</Link>
            <LuChevronRight className="w-3 h-3" />
            <span className="text-primary font-medium">New Entry</span>
        </div>
    )
}

export default ProgressBreadcrumb