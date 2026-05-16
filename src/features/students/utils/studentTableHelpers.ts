import type { FilterFn } from "@tanstack/react-table";
import type { Student } from "../types/student";

export function getInitials(name: string): string {
    return name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase();
}

export const globalFilterFn: FilterFn<Student> = (row, _columnId, filterValue) => {
    const search = (filterValue as string).toLowerCase();
    const name = (row.getValue("name") as string).toLowerCase();
    const level = (row.getValue("learning_level") as string).toLowerCase();

    return (
        name.includes(search) ||
        level.includes(search)
    );
};

/**
 * Generates a smart pagination range with ellipsis for large page counts.
 *
 * @example
 * getPaginationRange(5, 20) // [1, "...", 4, 5, 6, "...", 20]
 * getPaginationRange(1, 3)  // [1, 2, 3]
 */
export function getPaginationRange(
    currentPage: number,
    totalPages: number
): (number | "...")[] {
    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [1];

    if (currentPage > 3) {
        pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (currentPage < totalPages - 2) {
        pages.push("...");
    }

    pages.push(totalPages);

    return pages;
}
