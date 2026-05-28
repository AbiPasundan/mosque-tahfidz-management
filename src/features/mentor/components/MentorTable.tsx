import { useState } from "react";
import { useMentors } from "../hooks/useMentors";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { DataTable } from "@/components/ui/Table";
import type { ColumnDef } from "@tanstack/react-table";
import type { Mentor } from "../types/mentor";
import { LuTrash2 } from "react-icons/lu";
import { Link } from "react-router";
import { useMe } from "@/features/auth/hooks/useMe";
import { useDeleteUser } from "@/features/auth/hooks/useDeleteUser";
import { toast } from "sonner";
import Modal from "@/components/shared/modal";

export function MentorTable() {
  const { data: mentors = [], isLoading } = useMentors();
  const { data: meResponse } = useMe();
  const currentUser = meResponse?.data;
  const isAdmin = currentUser?.role === "admin";

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const deleteMutation = useDeleteUser();

  const handleDelete = async () => {
    if (!selectedMentor) return;
    try {
      await deleteMutation.mutateAsync(selectedMentor.id);
      toast.success("Mentor deleted successfully");
      setIsDeleteDialogOpen(false);
      setSelectedMentor(null);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete mentor");
    }
  };

  const columns: ColumnDef<Mentor>[] = [
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
            <Link
              to={`/mentor/${row.original.id}`}
              className="text-[13px] font-semibold text-on-surface hover:text-primary hover:underline transition-colors"
            >
              {row.original.name}
            </Link>
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
      cell: ({ row }) => {
        const isSelf = currentUser?.id === row.original.id;
        if (!isAdmin || isSelf) return null;

        return (
          <div className="flex gap-xs justify-end">
            <button
              onClick={() => {
                setSelectedMentor(row.original);
                setIsDeleteDialogOpen(true);
              }}
              className="p-1.5 rounded-lg hover:bg-error-container/50 transition-colors"
              aria-label="Delete mentor"
            >
              <LuTrash2 className="w-4 h-4 text-error" />
            </button>
          </div>
        );
      },
    },
  ];

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-border-card overflow-hidden">
      <DataTable columns={columns} data={mentors} />

      <Modal
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Delete Mentor"
        variant="danger"
        confirmLabel="Delete"
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
        size="2xl"
      >
        <p>
          Are you sure you want to delete <strong>{selectedMentor?.name}</strong>? This action cannot be undone and will remove all their data.
        </p>
      </Modal>
    </div>
  );
}
