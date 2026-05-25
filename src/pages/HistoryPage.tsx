import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  LuBookOpen,
  LuCircleCheck,
  LuUserPlus,
  LuTrash2,
  LuShieldAlert,
  LuShieldCheck,
  LuClipboardList,
  LuChevronLeft,
  LuChevronRight,
  LuLoader,
} from "react-icons/lu";
import { useAuthStore } from "@/stores/authStore";
import { useActivityLogs, type ActivityLog } from "@/features/activityLog/hooks/useActivityLogs";
import { cn } from "@/utils/cn";

export default function HistoryPage() {
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === "admin";

  const [page, setPage] = useState(1);
  const limit = 10;

  // React Query fetching (only enabled if user is admin)
  const { data: logsResponse, isLoading, isPlaceholderData } = useActivityLogs({
    page,
    limit,
  }) as any;

  const logs: ActivityLog[] = logsResponse?.data || [];
  const meta = logsResponse?.meta || { total: 0, page: 1, limit: 10 };
  const totalPages = Math.ceil(meta.total / meta.limit);

  // Friendly date helper
  const formatTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.round(diffMs / 60000);
      const diffHours = Math.round(diffMs / 3600000);
      const diffDays = Math.round(diffMs / 86400000);

      const timeText = date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago (${timeText})`;
      if (diffHours < 24) return `${diffHours}h ago (${timeText})`;
      if (diffDays === 1) return `Yesterday (${timeText})`;
      return `${date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })} (${timeText})`;
    } catch {
      return dateStr;
    }
  };

  // Color mapping based on action type
  const getActionConfig = (action: string) => {
    switch (action.toUpperCase()) {
      case "CREATE_USER":
        return {
          icon: <LuShieldCheck className="w-4 h-4 text-purple-600" />,
          iconBg: "bg-purple-50 border-purple-100",
          badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
        };
      case "CREATE_STUDENT":
        return {
          icon: <LuUserPlus className="w-4 h-4 text-emerald-600" />,
          iconBg: "bg-emerald-50 border-emerald-100",
          badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        };
      case "DELETE_STUDENT":
        return {
          icon: <LuTrash2 className="w-4 h-4 text-rose-600" />,
          iconBg: "bg-rose-50 border-rose-100",
          badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
        };
      case "CREATE_PROGRESS":
        return {
          icon: <LuBookOpen className="w-4 h-4 text-blue-600" />,
          iconBg: "bg-blue-50 border-blue-100",
          badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
        };
      case "CREATE_PROGRESS_BULK":
        return {
          icon: <LuClipboardList className="w-4 h-4 text-amber-600" />,
          iconBg: "bg-amber-50 border-amber-100",
          badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
        };
      default:
        return {
          icon: <LuClipboardList className="w-4 h-4 text-gray-600" />,
          iconBg: "bg-gray-50 border-gray-100",
          badgeColor: "bg-gray-50 text-gray-700 border-gray-200",
        };
    }
  };

  // 1. Mentor access restriction view
  if (!isAdmin) {
    return (
      <div className="space-y-lg animate-in fade-in-50 duration-200">
        <div className="flex items-center gap-xs text-[12px] text-muted">
          <Link to="/" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-on-surface font-medium">Activity Log</span>
        </div>

        <div className="max-w-md mx-auto mt-12 p-xl bg-surface-container-lowest rounded-2xl border border-border-card text-center shadow-xs">
          <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto mb-md">
            <LuShieldAlert className="w-7 h-7 text-amber-600" />
          </div>
          <h2 className="text-[17px] font-bold text-on-surface font-[Manrope]">
            Access Restricted
          </h2>
          <p className="text-[13px] text-muted mt-2 leading-relaxed">
            The global Activity Log / Audit Trail is restricted to Administrators only. If you require access, please contact your mosque administrator.
          </p>
          <div className="mt-lg">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-lg py-2.5 bg-primary text-on-primary text-[13px] font-semibold rounded-xl hover:bg-primary-focus transition-colors shadow-xs"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-lg animate-in fade-in-50 duration-200">
      {/* Breadcrumb */}
      <div className="flex items-center gap-xs text-[12px] text-muted">
        <Link to="/" className="hover:text-primary transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-on-surface font-medium">Activity Log</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md border-b border-border-card pb-md">
        <div>
          <h1 className="text-[22px] font-bold text-on-surface font-[Manrope] tracking-tight">
            System Activity Log
          </h1>
          <p className="text-[13px] text-muted mt-0.5">
            Real-time audit records of student registrations, class progress inputs, and mentor updates.
          </p>
        </div>

        {/* Counter Badge */}
        <span className="self-start sm:self-auto px-lg py-1 rounded-full text-[11px] font-extrabold bg-primary/10 text-primary border border-primary/20 tracking-wider">
          TOTAL LOGS: {meta.total}
        </span>
      </div>

      {isLoading ? (
        <div className="h-64 flex flex-col items-center justify-center bg-surface-container-lowest rounded-2xl border border-border-card">
          <LuLoader className="w-8 h-8 text-primary animate-spin mb-sm" />
          <p className="text-[13px] text-muted">Fetching audit history...</p>
        </div>
      ) : logs.length > 0 ? (
        <div className="space-y-md">
          {/* Timeline Feed Container */}
          <div className="bg-surface-container-lowest rounded-2xl border border-border-card shadow-xs overflow-hidden divide-y divide-border-card/50">
            {logs.map((log) => {
              const config = getActionConfig(log.action);
              return (
                <div
                  key={log.id}
                  className="flex items-start gap-md px-lg py-md hover:bg-surface-container-low/20 transition-all duration-150"
                >
                  {/* Event Icon with colored border */}
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 shadow-2xs",
                      config.iconBg
                    )}
                  >
                    {config.icon}
                  </div>

                  {/* Main Event Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-xs">
                      {/* Description */}
                      <p className="text-[13.5px] text-on-surface font-medium leading-relaxed">
                        {log.description}
                      </p>
                      {/* Timestamp */}
                      <span className="text-[11px] text-muted font-medium shrink-0 self-start sm:self-auto">
                        {formatTime(log.created_at)}
                      </span>
                    </div>

                    {/* Meta information tags */}
                    <div className="flex flex-wrap items-center gap-sm mt-md">
                      {/* Action Category Badge */}
                      <span
                        className={cn(
                          "px-2 py-0.25 rounded text-[9px] font-extrabold uppercase border",
                          config.badgeColor
                        )}
                      >
                        {log.action.replace("_", " ")}
                      </span>

                      {/* Actor Information */}
                      <span className="text-[11px] text-muted flex items-center gap-xs">
                        <span className="text-xs">👤</span> Actor:{" "}
                        <strong className="text-on-surface-variant font-semibold">
                          {log.user_name}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Premium Pagination controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-border-card/50 pt-md">
              <p className="text-[12.5px] text-muted">
                Showing page <strong className="text-on-surface">{page}</strong> of{" "}
                <strong className="text-on-surface">{totalPages}</strong> ({meta.total} records)
              </p>

              <div className="flex items-center gap-md">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-9 h-9 rounded-xl border border-border-card flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-3xs"
                  aria-label="Previous page"
                >
                  <LuChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || isPlaceholderData}
                  className="w-9 h-9 rounded-xl border border-border-card flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-3xs"
                  aria-label="Next page"
                >
                  <LuChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-2xl border border-border-card p-xl text-center shadow-xs">
          <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center mx-auto mb-md">
            <span className="text-2xl">📋</span>
          </div>
          <h5 className="text-[15px] font-bold text-on-surface">No Activity Logged Yet</h5>
          <p className="text-[13px] text-muted mt-1 max-w-sm mx-auto">
            Once mentors input student progress or admins registers users/students, records will dynamically appear here.
          </p>
        </div>
      )}
    </div>
  );
}
