import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    type SortingState,
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
    const [searchParams, setSearchParams] = useSearchParams();

    // Derived state from URL Search Params
    const q = searchParams.get("q") || "";
    const status = searchParams.get("status") || "all";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || DEFAULT_PAGE_SIZE.toString(), 10);

    // Local state for the search input to allow smooth typing before debouncing to URL
    const [searchInput, setSearchInput] = useState(q);
    const [sorting, setSorting] = useState<SortingState>([]);

    // Sync local input with URL if URL changes (e.g. back button or clear filters)
    useEffect(() => {
        setSearchInput(q);
    }, [q]);

    // Debounce search input to URL Search Params
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchInput !== q) {
                setSearchParams((prev) => {
                    if (searchInput) prev.set("q", searchInput);
                    else prev.delete("q");
                    prev.set("page", "1"); // Reset to page 1 on new search
                    return prev;
                }, { replace: true });
            }
        }, 300);
        return () => clearTimeout(handler);
    }, [searchInput, q, setSearchParams]);

    const { data, isLoading, isFetching } = useStudents({
        page,
        limit,
        search: q || undefined,
        status: status !== "all" ? status.toLowerCase() : undefined,
    });

    const students: Student[] = useMemo(() => data?.data || [], [data]);
    const totalPages = data?.meta?.total_pages || 1;
    const totalRows = data?.meta?.total_data || 0;

    const table = useReactTable({
        data: students,
        columns: studentColumns,
        state: {
            sorting,
            pagination: {
                pageIndex: page - 1,
                pageSize: limit,
            }
        },
        onSortingChange: setSorting,
        onPaginationChange: (updater) => {
            setSearchParams(
                (prev) => {
                    const currentPage = parseInt(prev.get("page") || "1", 10);
                    const currentLimit = parseInt(prev.get("limit") || String(DEFAULT_PAGE_SIZE), 10);
                    const currentPagination = { pageIndex: currentPage - 1, pageSize: currentLimit };
                    const nextPagination = typeof updater === 'function' ? updater(currentPagination) : updater;

                    prev.set("page", String(nextPagination.pageIndex + 1));
                    prev.set("limit", String(nextPagination.pageSize));
                    return prev;
                },
                { replace: true }
            );
        },
        pageCount: totalPages,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const handleStatusFilter = (value: string) => {
        setSearchParams((prev) => {
            if (value === "all") prev.delete("status");
            else prev.set("status", value);
            prev.set("page", "1"); // Reset to page 1 on filter change
            return prev;
        }, { replace: true });
    };

    const handleGlobalFilterChange = (value: string) => {
        setSearchInput(value);
    };

    const hasActiveFilters = q !== "" || status !== "all";

    const clearAllFilters = () => {
        setSearchInput("");
        setSearchParams({}, { replace: true });
    };

    return (
        <div className="bg-surface-container-lowest rounded-xl border border-border-card overflow-hidden">
            {/* ── Toolbar ─────────────────────────────────────────────── */}
            <StudentTableToolbar
                globalFilter={searchInput}
                onGlobalFilterChange={handleGlobalFilterChange}
                statusFilter={status}
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