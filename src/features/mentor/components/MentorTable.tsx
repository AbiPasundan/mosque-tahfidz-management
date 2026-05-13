import { useMentors } from "../hooks/useMentors";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { DataTable } from "@/components/ui/Table";
import type { ColumnDef } from "@tanstack/react-table";
import type { Mentor } from "../types/mentor";
import { LuPencil, LuTrash2 } from "react-icons/lu";

const mentorColumns: ColumnDef<Mentor>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const initials = row.original.name.substring(0, 2).toUpperCase();
      return (
        <div className="flex items-center gap-sm">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[12px] font-bold shrink-0">
            {initials}
          </div>
          <span className="text-[13px] font-semibold text-on-surface">
            {row.original.name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => (
      <span className="text-[13px] text-on-surface-variant">
        {info.getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: (info) => (
      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 uppercase">
        {info.getValue() as string}
      </span>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <div className="flex gap-xs justify-end">
        <button className="p-1.5 rounded-lg hover:bg-surface-container transition-colors" aria-label="Edit mentor">
          <LuPencil className="w-4 h-4 text-muted" />
        </button>
        <button className="p-1.5 rounded-lg hover:bg-error-container/50 transition-colors" aria-label="Delete mentor">
          <LuTrash2 className="w-4 h-4 text-error" />
        </button>
      </div>
    ),
  },
];

export function MentorTable() {
  const { data: mentors = [], isLoading } = useMentors();

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-border-card overflow-hidden">
      <DataTable columns={mentorColumns} data={mentors} />
    </div>
  );
}
