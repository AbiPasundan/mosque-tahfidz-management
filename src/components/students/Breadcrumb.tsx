import { Link } from "react-router"

function Breadcrumb() {
    return (
        <div className="flex items-center gap-xs text-[12px] text-muted">
            <Link to="/" className="hover:text-primary transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-on-surface font-medium">Students</span>
        </div>
    )
}

export default Breadcrumb