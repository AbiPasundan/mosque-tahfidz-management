import { useMemo, useState, useEffect } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    type SortingState,
    type PaginationState,
} from "@tanstack/react-table";
import { cn } from "@/utils/cn";
import { useStudents } from "../hooks/useStudents";
import { TableSkeleton } from "@/components/ui/LoadingSkeleton";
import type { Student } from "../types/student";
import { DEFAULT_PAGE_SIZE } from "../constants/studentTable";
import { studentColumns } from "./StudentTableColumns";
import { StudentTableToolbar } from "./StudentTableToolbar";
import { StudentTablePagination } from "./StudentTablePagination";
import { StudentTableEmptyState } from "./StudentTableEmptyState";
import { SortIcon } from "./SortIcon";

function StudentTable() {
    const [globalFilter, setGlobalFilter] = useState("");
    const [debouncedFilter, setDebouncedFilter] = useState("");
    const [statusFilterValue, setStatusFilterValue] = useState("all");
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: DEFAULT_PAGE_SIZE,
    });

    // Debounce search filter
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilter(globalFilter);
            setPagination(prev => ({ ...prev, pageIndex: 0 }));
        }, 300);
        return () => clearTimeout(handler);
    }, [globalFilter]);

    const { data, isLoading, isFetching } = useStudents({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: debouncedFilter || undefined,
        status: statusFilterValue !== "all" ? statusFilterValue.toLowerCase() : undefined,
    });

    const students: Student[] = useMemo(() => data?.data || [], [data]);
    const totalPages = data?.meta?.total_pages || 1;
    const totalRows = data?.meta?.total_data || 0;

    const table = useReactTable({
        data: students,
        columns: studentColumns,
        state: {
            sorting,
            pagination
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        pageCount: totalPages,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const handleStatusFilter = (value: string) => {
        setStatusFilterValue(value);
        setPagination(prev => ({ ...prev, pageIndex: 0 }));
    };

    const handleGlobalFilterChange = (value: string) => {
        setGlobalFilter(value);
    };

    const hasActiveFilters = globalFilter !== "" || statusFilterValue !== "all";

    const clearAllFilters = () => {
        setGlobalFilter("");
        setDebouncedFilter("");
        setStatusFilterValue("all");
        setPagination(prev => ({ ...prev, pageIndex: 0 }));
    };

    return (
        <div className="bg-surface-container-lowest rounded-xl border border-border-card overflow-hidden">
            {/* ── Toolbar ─────────────────────────────────────────────── */}
            <StudentTableToolbar
                globalFilter={globalFilter}
                onGlobalFilterChange={handleGlobalFilterChange}
                statusFilter={statusFilterValue}
                onStatusFilterChange={handleStatusFilter}
                hasActiveFilters={hasActiveFilters}
                onClearAllFilters={clearAllFilters}
            />

            {/* ── Table ───────────────────────────────────────────────── */}
            <div className="overflow-x-auto relative">
                {/* Overlay loading indicator for smoother feel during re-fetch */}
                {isFetching && students.length > 0 && (
                    <div className="absolute inset-0 bg-white/40 z-10 flex items-center justify-center backdrop-blur-[1px]" />
                )}

                {isLoading && !students.length ? (
                    <div className="p-lg">
                        <TableSkeleton />
                    </div>
                ) : (
                    <table className="w-full min-w-200">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr
                                    key={headerGroup.id}
                                    className="border-b border-border-card bg-surface-container-low/50"
                                >
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className={cn(
                                                "text-left px-lg py-md text-[11px] font-semibold uppercase tracking-wider text-muted first:pl-lg last:pr-lg",
                                                header.column.getCanSort() &&
                                                "cursor-pointer select-none hover:text-on-surface transition-colors"
                                            )}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            <div className="flex items-center gap-xs">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                {header.column.getCanSort() && (
                                                    <SortIcon direction={header.column.getIsSorted()} />
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.length === 0 ? (
                                <StudentTableEmptyState
                                    colSpan={studentColumns.length}
                                    hasActiveFilters={hasActiveFilters}
                                    onClearFilters={clearAllFilters}
                                />
                            ) : (
                                table.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        className="border-b border-border-card last:border-0 hover:bg-surface-container-low/30 transition-colors"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-lg py-md">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* ── Pagination ──────────────────────────────────────────── */}
            <StudentTablePagination table={table} totalRows={totalRows} />
        </div>
    );
}

export default StudentTable;