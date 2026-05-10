import type { Table } from "@tanstack/react-table";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { cn } from "@/utils/cn";
import { PAGE_SIZE_OPTIONS } from "../constants/studentTable";
import { getPaginationRange } from "../utils/studentTableHelpers";

interface StudentTablePaginationProps<T> {
    table: Table<T>;
}

export function StudentTablePagination<T>({ table }: StudentTablePaginationProps<T>) {
    const { pageIndex, pageSize } = table.getState().pagination;
    const totalRows = table.getFilteredRowModel().rows.length;
    const totalPages = table.getPageCount();

    if (totalRows === 0) return null;

    return (
        <div className="flex items-center justify-between px-lg py-md border-t border-border-card">
            <div className="flex items-center gap-md">
                <p className="text-[12px] text-muted">
                    Showing {pageIndex * pageSize + 1}–
                    {Math.min((pageIndex + 1) * pageSize, totalRows)} of{" "}
                    {totalRows.toLocaleString()} students
                </p>

                {/* Page size selector */}
                <select
                    value={pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                        table.setPageIndex(0);
                    }}
                    className="px-2 py-1 rounded-lg border border-border-card bg-surface-container-low/50 text-[12px] text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                >
                    {PAGE_SIZE_OPTIONS.map((size) => (
                        <option key={size} value={size}>
                            {size} / page
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-center gap-xs">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="p-1.5 rounded-lg border border-border-card hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Previous page"
                >
                    <LuChevronLeft className="w-4 h-4" />
                </button>

                {getPaginationRange(pageIndex + 1, totalPages).map((page, idx) =>
                    page === "..." ? (
                        <span
                            key={`ellipsis-${idx}`}
                            className="text-[12px] text-muted px-xs"
                        >
                            …
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => table.setPageIndex((page as number) - 1)}
                            className={cn(
                                "w-8 h-8 rounded-lg text-[12px] font-medium transition-colors",
                                page === pageIndex + 1
                                    ? "bg-primary text-on-primary"
                                    : "border border-border-card hover:bg-surface-container text-on-surface-variant"
                            )}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="p-1.5 rounded-lg border border-border-card hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Next page"
                >
                    <LuChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
