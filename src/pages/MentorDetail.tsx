import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { useMentorDetail } from '@/features/mentorDetail/hooks/useMentorDetail';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { StudentAvatar } from '@/features/students/components/StudentAvatar';
import {
  LuChevronRight,
  LuMail,
  LuUser,
  LuTrendingUp,
  LuCalendar,
  LuArrowLeft,
  LuPhone,
  LuBookOpen,
  LuTrash2,
} from 'react-icons/lu';
import { formatDistanceToNow } from 'date-fns';
import { useMe } from '@/features/auth/hooks/useMe';
import { useDeleteUser } from '@/features/auth/hooks/useDeleteUser';
import { useOfflineGuard } from '@/hooks/useOfflineGuard';
import { toast } from 'sonner';
import Modal from '@/components/shared/modal';

export default function MentorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: response, isLoading, isError } = useMentorDetail(id);
  const mentor = response?.data;

  const { data: meResponse } = useMe();
  const currentUser = meResponse?.data;
  const isAdmin = currentUser?.role === "admin";
  const isSelf = currentUser?.id === mentor?.id;

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const deleteMutation = useDeleteUser();
  const { isOnline } = useOfflineGuard();

  const handleDelete = async () => {
    if (!mentor) return;
    try {
      await deleteMutation.mutateAsync(mentor.id);
      toast.success("Mentor deleted successfully");
      setIsDeleteDialogOpen(false);
      navigate("/mentor");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete mentor");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-lg">
        <div className="h-6 bg-surface-container-low rounded-lg w-48 animate-pulse" />
        <LoadingSkeleton />
      </div>
    );
  }

  if (isError || !mentor) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-md text-center">
        <div className="text-error text-5xl">⚠️</div>
        <h2 className="text-h2 font-bold text-on-surface">Mentor Not Found</h2>
        <p className="text-body-md text-muted max-w-sm">
          The mentor profile you are looking for does not exist or has been deleted.
        </p>
        <Link
          to="/mentor"
          className="mt-sm px-lg py-2.5 rounded-xl bg-primary text-on-primary text-[14px] font-semibold flex items-center gap-sm hover:bg-primary-focus transition-colors shadow-md"
        >
          <LuArrowLeft className="w-4 h-4" /> Back to Mentors List
        </Link>
      </div>
    );
  }

  const getInitials = (name: string) => {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
  };

  const mentorInitials = getInitials(mentor.name);

  // Statistics
  const totalStudents = mentor.students?.length || 0;
  const activeStudents = mentor.students?.filter(s => s.status?.toUpperCase() === 'ACTIVE').length || 0;

  return (
    <div className="space-y-lg animate-in fade-in-50 duration-200">
      {/* Breadcrumb & Back Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md">
        <div className="flex items-center gap-xs text-[12px] text-muted">
          <Link to="/" className="hover:text-primary transition-colors">Dashboard</Link>
          <LuChevronRight className="w-3 h-3" />
          <Link to="/mentor" className="hover:text-primary transition-colors">Mentors</Link>
          <LuChevronRight className="w-3 h-3" />
          <span className="text-primary font-medium">{mentor.name}</span>
        </div>

        <div className="flex items-center gap-sm">
          {isAdmin && !isSelf && (
            <button
              onClick={() => {
                if (!isOnline) {
                  toast.warning('Kamu sedang offline. Tindakan ini memerlukan koneksi internet.');
                  return;
                }
                setIsDeleteDialogOpen(true);
              }}
              disabled={!isOnline}
              className="px-md py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 text-[13px] font-semibold rounded-xl transition-all flex items-center gap-xs border border-rose-100 shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LuTrash2 className="w-4 h-4" />
              Delete Mentor
            </button>
          )}
          <Link
            to="/mentor"
            className="inline-flex items-center gap-xs text-[13px] font-semibold text-primary hover:underline self-start sm:self-auto"
          >
            <LuArrowLeft className="w-4 h-4" /> Back to List
          </Link>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-lg">
        {/* Left: Profile Sidebar Card */}
        <div className="space-y-lg">
          {/* Main profile card */}
          <div className="bg-surface-container-lowest rounded-2xl border border-border-card overflow-hidden shadow-sm">
            {/* Header backdrop gradient */}
            <div className="h-32 bg-linear-to-br from-primary to-primary-container relative">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="w-24 h-24 rounded-full bg-primary-container border-4 border-surface-container-lowest flex items-center justify-center text-on-primary text-[28px] font-bold shadow-md">
                  {mentorInitials}
                </div>
              </div>
            </div>

            {/* Profile info */}
            <div className="pt-16 pb-lg px-lg text-center">
              <h2 className="text-[20px] font-bold text-on-surface font-[Manrope] leading-tight tracking-tight">
                {mentor.name}
              </h2>
              <div className="flex items-center justify-center gap-xs mt-xs text-[13px] text-muted">
                <LuMail className="w-3.5 h-3.5" />
                <span>{mentor.email}</span>
              </div>

              <div className="flex justify-center mt-md">
                <span className="inline-flex items-center gap-xs px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                  {mentor.role === "admin" ? "Administrator" : mentor.role}
                </span>
              </div>
            </div>

            {/* Mentor info details */}
            <div className="px-lg pb-lg space-y-md border-t border-border-card pt-lg mx-lg">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-muted flex items-center gap-xs">
                  <LuUser className="w-4 h-4" /> Role Type
                </span>
                <span className="font-semibold text-on-surface capitalize">
                  {mentor.role}
                </span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-muted flex items-center gap-xs">
                  <LuCalendar className="w-4 h-4" /> Assigned Students
                </span>
                <span className="font-bold text-primary">
                  {totalStudents}
                </span>
              </div>
            </div>
          </div>

          {/* Quick stats / summary card */}
          <div className="bg-surface-container-lowest rounded-2xl border border-border-card p-lg shadow-sm">
            <h3 className="text-[15px] font-bold text-on-surface font-[Manrope] flex items-center gap-xs mb-lg border-b border-border-card pb-sm">
              <LuTrendingUp className="w-4 h-4 text-primary" /> Performance Summary
            </h3>
            <div className="space-y-md">
              <div>
                <div className="flex justify-between text-[12px] mb-xs">
                  <span className="text-muted">Active Students</span>
                  <span className="font-bold text-on-surface">{activeStudents} / {totalStudents}</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${totalStudents > 0 ? (activeStudents / totalStudents) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-sm pt-sm">
                <div className="p-sm bg-surface-container-low rounded-xl text-center">
                  <p className="text-[10px] text-muted uppercase font-bold tracking-wider">Active</p>
                  <p className="text-[20px] font-extrabold text-success font-[Manrope]">{activeStudents}</p>
                </div>
                <div className="p-sm bg-surface-container-low rounded-xl text-center">
                  <p className="text-[10px] text-muted uppercase font-bold tracking-wider">Inactive</p>
                  <p className="text-[20px] font-extrabold text-muted font-[Manrope]">{totalStudents - activeStudents}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Assigned Students List */}
        <div className="space-y-lg">
          <div className="bg-surface-container-lowest rounded-2xl border border-border-card p-lg shadow-sm">
            <div className="flex items-center justify-between mb-lg border-b border-border-card pb-md">
              <div>
                <h3 className="text-[18px] font-bold text-on-surface font-[Manrope]">
                  Assigned Students
                </h3>
                <p className="text-[13px] text-muted mt-0.5">
                  List of students currently guided by this mentor.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-primary/8 text-primary font-bold text-[13px]">
                {totalStudents} Students
              </span>
            </div>

            {totalStudents === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-center gap-md">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-3xl">
                  👥
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-on-surface">No Students Assigned</h4>
                  <p className="text-body-md text-muted mt-xs">
                    This mentor does not have any active students assigned under their guidance yet.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                {mentor.students.map((student) => {
                  const studentInitials = getInitials(student.name);
                  const isStudentActive = student.status?.toUpperCase() === 'ACTIVE';

                  return (
                    <div
                      key={student.id}
                      className="group relative bg-surface-container-lowest hover:bg-surface-container-low rounded-xl border border-border-card p-md transition-all duration-200 hover:shadow-md flex flex-col justify-between gap-md"
                    >
                      <div className="flex items-start gap-md">
                        {/* Avatar */}
                        <StudentAvatar
                          name={student.name}
                          profileImg={student.profile_img}
                          size="md"
                          fallbackColorClass="bg-primary/10 text-primary"
                          className="group-hover:scale-105 transition-transform duration-200"
                        />

                        {/* Name and Level */}
                        <div className="min-w-0">
                          <Link
                            to={`/students/${student.id}`}
                            className="font-bold text-[15px] text-on-surface hover:text-primary transition-colors block truncate hover:underline"
                          >
                            {student.name}
                          </Link>
                          <div className="flex items-center gap-xs mt-1">
                            <span className="inline-flex items-center gap-xs px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/8 text-primary">
                              <LuBookOpen className="w-3 h-3" /> {student.learning_level}
                            </span>
                            <span
                              className={`inline-block w-2 h-2 rounded-full ${isStudentActive ? 'bg-success' : 'bg-muted'
                                }`}
                            />
                            <span className="text-[11px] text-muted capitalize">
                              {student.status?.toLowerCase()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Detail row */}
                      <div className="grid grid-cols-2 gap-xs pt-xs border-t border-border-card text-[12px] text-muted">
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-wider">Age</p>
                          <p className="font-semibold text-on-surface-variant mt-0.5">{student.age} Years</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-wider">Last Progress</p>
                          <p className="font-semibold text-on-surface-variant mt-0.5 truncate">
                            {student.last_progress
                              ? formatDistanceToNow(new Date(student.last_progress), { addSuffix: true })
                              : 'Never'}
                          </p>
                        </div>
                      </div>

                      {/* Quick Contact & Details Row */}
                      <div className="flex items-center justify-between pt-sm">
                        <span className="text-[11px] text-muted">
                          Fluency: <span className="font-semibold text-emerald-600">{student.fluency || 'N/A'}</span>
                        </span>
                        {student.contact && (
                          <a
                            href={`tel:${student.contact}`}
                            className="p-1.5 rounded-lg bg-surface-container hover:bg-primary/10 hover:text-primary transition-colors text-muted flex items-center justify-center"
                            title="Call student"
                          >
                            <LuPhone className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Delete Mentor"
        variant="danger"
        confirmLabel="Delete"
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      >
        <p>
          Are you sure you want to delete <strong>{mentor?.name}</strong>? This action cannot be undone and will remove all their data.
        </p>
      </Modal>
    </div>
  );
}
