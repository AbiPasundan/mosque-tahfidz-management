import { LuSearch, LuX } from "react-icons/lu";
import { cn } from "@/utils/cn";
import { STATUS_OPTIONS } from "../constants/studentTable";

interface StudentTableToolbarProps {
    globalFilter: string;
    onGlobalFilterChange: (value: string) => void;
    statusFilter: string;
    onStatusFilterChange: (value: string) => void;
    hasActiveFilters: boolean;
    onClearAllFilters: () => void;
}

export function StudentTableToolbar({
    globalFilter,
    onGlobalFilterChange,
    statusFilter,
    onStatusFilterChange,
    hasActiveFilters,
    onClearAllFilters,
}: StudentTableToolbarProps) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-md px-lg py-md border-b border-border-card">
            {/* Search */}
            <div className="relative w-full sm:w-72">
                <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                    type="text"
                    value={globalFilter}
                    onChange={(e) => onGlobalFilterChange(e.target.value)}
                    placeholder="Search by name, NIS, class, level…"
                    className="w-full pl-9 pr-9 py-2 rounded-lg border border-border-card bg-surface-container-low/50 text-[13px] text-on-surface placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                {globalFilter && (
                    <button
                        onClick={() => onGlobalFilterChange("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-surface-container transition-colors"
                        aria-label="Clear search"
                    >
                        <LuX className="w-3.5 h-3.5 text-muted" />
                    </button>
                )}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-sm flex-wrap">
                {/* Status Filter */}
                <div className="flex items-center gap-xs">
                    {["all", ...STATUS_OPTIONS].map((status) => (
                        <button
                            key={status}
                            onClick={() => onStatusFilterChange(status)}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all",
                                statusFilter === status
                                    ? "bg-primary text-on-primary shadow-sm"
                                    : "bg-surface-container-low/50 text-on-surface-variant hover:bg-surface-container border border-border-card"
                            )}
                        >
                            {status === "all" ? "All" : status}
                        </button>
                    ))}
                </div>

                {/* Clear filters */}
                {hasActiveFilters && (
                    <button
                        onClick={onClearAllFilters}
                        className="flex items-center gap-xs px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                    >
                        <LuX className="w-3 h-3" />
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
}
