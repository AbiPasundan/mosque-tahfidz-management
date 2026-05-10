import { LuSearch } from "react-icons/lu";

interface StudentTableEmptyStateProps {
    colSpan: number;
    hasActiveFilters: boolean;
    onClearFilters: () => void;
}

export function StudentTableEmptyState({
    colSpan,
    hasActiveFilters,
    onClearFilters,
}: StudentTableEmptyStateProps) {
    return (
        <tr>
            <td colSpan={colSpan} className="px-lg py-16 text-center">
                <div className="flex flex-col items-center gap-sm">
                    <LuSearch className="w-8 h-8 text-muted/40" />
                    <p className="text-[14px] font-medium text-on-surface-variant">
                        No students found
                    </p>
                    <p className="text-[12px] text-muted">
                        Try adjusting your search or filter criteria
                    </p>
                    {hasActiveFilters && (
                        <button
                            onClick={onClearFilters}
                            className="mt-sm px-4 py-2 rounded-lg text-[12px] font-medium text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
                        >
                            Clear all filters
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
}
