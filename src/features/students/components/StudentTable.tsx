import { useMemo, useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
    type SortingState,
    type ColumnFiltersState,
} from "@tanstack/react-table";
import { cn } from "@/utils/cn";
import { useStudents } from "../hooks/useStudents";
import { TableSkeleton } from "@/components/ui/LoadingSkeleton";
import type { Student } from "../types/student";
import { DEFAULT_PAGE_SIZE } from "../constants/studentTable";
import { globalFilterFn } from "../utils/studentTableHelpers";
import { studentColumns } from "./StudentTableColumns";
import { StudentTableToolbar } from "./StudentTableToolbar";
import { StudentTablePagination } from "./StudentTablePagination";
import { StudentTableEmptyState } from "./StudentTableEmptyState";
import { SortIcon } from "./SortIcon";

function StudentTable() {
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const { data, isLoading } = useStudents();
    const students: Student[] = useMemo(() => data?.data || [], [data]);

    const table = useReactTable({
        data: students,
        columns: studentColumns,
        state: { globalFilter, sorting, columnFilters },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        globalFilterFn,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: { pageSize: DEFAULT_PAGE_SIZE },
        },
    });

    // Derive current status filter from column filters
    const statusFilterValue =
        (columnFilters.find((f) => f.id === "status")?.value as string) ?? "all";

    const handleStatusFilter = (value: string) => {
        if (value === "all") {
            setColumnFilters((prev) => prev.filter((f) => f.id !== "status"));
        } else {
            setColumnFilters((prev) => [
                ...prev.filter((f) => f.id !== "status"),
                { id: "status", value },
            ]);
        }
        table.setPageIndex(0);
    };

    const handleGlobalFilterChange = (value: string) => {
        setGlobalFilter(value);
        table.setPageIndex(0);
    };

    const hasActiveFilters = globalFilter !== "" || statusFilterValue !== "all";

    const clearAllFilters = () => {
        setGlobalFilter("");
        setColumnFilters([]);
    };

    if (isLoading) return <TableSkeleton />;

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
            <div className="overflow-x-auto">
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
            </div>

            {/* ── Pagination ──────────────────────────────────────────── */}
            <StudentTablePagination table={table} />
        </div>
    );
}

export default StudentTable;