import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { LuEllipsisVertical } from "react-icons/lu";
import { Link } from "react-router";
import { cn } from "@/utils/cn";
import { StudentStatusBadge } from "@/features/students/components/StudentStatusBadge";
import type { Student } from "../types/student";
import { AVATAR_COLORS } from "../constants/studentTable";
import { getInitials } from "../utils/studentTableHelpers";

const columnHelper = createColumnHelper<Student>();

export const studentColumns: ColumnDef<Student, any>[] = [
    columnHelper.accessor("name", {
        header: "Name",
        enableSorting: true,
        cell: ({ row }) => {
            const student = row.original;
            const colorClass = AVATAR_COLORS[row.index % AVATAR_COLORS.length];

            return (
                <div className="flex items-center gap-sm">
                    <div
                        className={cn(
                            "w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0",
                            colorClass
                        )}
                    >
                        {getInitials(student.name)}
                    </div>
                    <div>
                        <Link
                            to={`/students/${student.id}`}
                            className="text-[13px] font-semibold text-on-surface hover:text-primary transition-colors"
                        >
                            {student.name}
                        </Link>
                    </div>
                </div>
            );
        },
    }),
    columnHelper.accessor("age", {
        header: "Age",
        enableSorting: true,
        cell: (info) => (
            <span className="text-[13px] text-on-surface-variant">
                {info.getValue()}
            </span>
        ),
    }),
    columnHelper.accessor("learning_level", {
        header: "Learning Level",
        enableSorting: true,
        cell: (info) => (
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary">
                {info.getValue()}
            </span>
        ),
    }),
    columnHelper.accessor("fluency", {
        header: "Fluency",
        enableSorting: true,
        cell: (info) => (
            <div className="flex items-center gap-sm">
                <span className="text-[11px] text-muted">{info.getValue()}</span>
            </div>
        ),
    }),
    columnHelper.accessor("status", {
        header: "Status",
        enableSorting: true,
        filterFn: (row, columnId, filterValue) => {
            const cellValue = (row.getValue(columnId) as string).toLowerCase();
            return cellValue === (filterValue as string).toLowerCase();
        },
        cell: (info) => <StudentStatusBadge status={info.getValue()} />,
    }),
    columnHelper.accessor("join_date", {
        header: "Last Progress",
        enableSorting: true,
        cell: (info) => (
            <span className="text-[13px] text-on-surface-variant">
                {new Date(info.getValue()).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })}
            </span>
        ),
        sortingFn: (rowA, rowB) => {
            const a = new Date(rowA.getValue("join_date") as string).getTime();
            const b = new Date(rowB.getValue("join_date") as string).getTime();
            return a - b;
        },
    }),
    columnHelper.display({
        id: "actions",
        header: "",
        cell: () => (
            <button
                className="p-1.5 rounded-lg hover:bg-surface-container transition-colors"
                aria-label="More actions"
            >
                <LuEllipsisVertical className="w-4 h-4 text-muted" />
            </button>
        ),
    }),
];
