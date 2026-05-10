import { LuChevronRight } from "react-icons/lu"
import { Link } from "react-router"

function Breadcrumb() {
    return (
        <div className="flex items-center gap-xs text-[12px] text-muted">
            <Link to="/" className="hover:text-primary transition-colors">Dashboard</Link>
            <LuChevronRight className="w-3 h-3" />
            <span className="text-primary font-medium">Students</span>
        </div>
    )
}

export default Breadcrumb