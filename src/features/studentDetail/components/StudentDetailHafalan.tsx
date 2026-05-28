import { useState } from "react";
import { cn } from "@/utils/cn";
import {
  LuChevronDown,
  LuChevronUp,
  LuCalendar,
  LuUser,
  LuBookOpen,
  LuCircleCheck,
  LuTriangleAlert,
} from "react-icons/lu";
import type { Student } from "@/features/students/types/student";
import type { ProgressRecord } from "../types/studentDetail";

interface Segment {
  ayatStart: number;
  ayatEnd: number;
  status: string;
  notes: string;
  date: string;
  mentor: string;
}

interface HafalanSurah {
  surahName: string;
  segments: Segment[];
  overallStatus: "LANCAR" | "MENGULANG";
  lastUpdated: string;
}

function StudentDetailHafalan({
  student,
  progress,
}: {
  student: Student;
  progress: ProgressRecord[];
}) {
  const [expandedSurahs, setExpandedSurahs] = useState<Record<string, boolean>>({});

  const toggleExpand = (surahName: string) => {
    setExpandedSurahs((prev) => ({
      ...prev,
      [surahName]: !prev[surahName],
    }));
  };

  // Group progress logs by Surah
  const groupedSurahs = progress.reduce<Record<string, HafalanSurah>>((acc, record) => {
    const surah = record.surah;
    if (!acc[surah]) {
      acc[surah] = {
        surahName: surah,
        segments: [],
        overallStatus: "LANCAR",
        lastUpdated: record.progress_date,
      };
    }

    acc[surah].segments.push({
      ayatStart: record.ayat_start,
      ayatEnd: record.ayat_end,
      status: record.status,
      notes: record.notes,
      date: record.progress_date,
      mentor: record.mentor_name || "Ustadz",
    });

    if (new Date(record.progress_date) > new Date(acc[surah].lastUpdated)) {
      acc[surah].lastUpdated = record.progress_date;
    }

    return acc;
  }, {});

  // Sort segments and derive overall status
  const surahList = Object.values(groupedSurahs).map((surah) => {
    // Sort segments by verse start
    surah.segments.sort((a, b) => a.ayatStart - b.ayatStart);

    // If any segment has a status of MENGULANG, the overall status is MENGULANG
    const hasMengulang = surah.segments.some(
      (seg) => seg.status.toUpperCase() === "MENGULANG"
    );
    surah.overallStatus = hasMengulang ? "MENGULANG" : "LANCAR";

    return surah;
  });

  // Calculate statistics
  const totalSurahs = surahList.length;
  const totalSegments = progress.length;
  const fluentSegmentsCount = progress.filter(
    (r) => r.status.toUpperCase() === "LANCAR"
  ).length;
  const reviewSegmentsCount = progress.filter(
    (r) => r.status.toUpperCase() === "MENGULANG"
  ).length;

  const fluencyPercentage =
    totalSegments > 0 ? Math.round((fluentSegmentsCount / totalSegments) * 100) : 0;

  return (
    <div className="space-y-lg animate-in fade-in-50 duration-200">
      {/* Header */}
      <div className="pb-md border-b border-border-card">
        <h3 className="text-[17px] font-semibold text-on-surface font-[Manrope]">
          Student Memorization (Hafalan)
        </h3>
        <p className="text-[13px] text-muted mt-0.5">
          Calculated aggregation of student's memorized surahs and current fluency.
        </p>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
        {/* Surahs Started */}
        <div className="bg-surface-container-lowest rounded-xl border border-border-card p-md flex items-center gap-md">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <LuBookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-muted uppercase tracking-wider">
              Surahs Started
            </p>
            <p className="text-[20px] font-bold text-on-surface font-[Manrope] mt-0.5">
              {totalSurahs} {totalSurahs === 1 ? "Surah" : "Surahs"}
            </p>
          </div>
        </div>

        {/* Fluency Rate */}
        <div className="bg-surface-container-lowest rounded-xl border border-border-card p-md flex items-center gap-md">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <LuCircleCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-muted uppercase tracking-wider">
              Fluency Rate
            </p>
            <p className="text-[20px] font-bold text-on-surface font-[Manrope] mt-0.5">
              {fluencyPercentage}%
            </p>
          </div>
        </div>

        {/* Review Needed */}
        <div className="bg-surface-container-lowest rounded-xl border border-border-card p-md flex items-center gap-md">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <LuTriangleAlert className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-muted uppercase tracking-wider">
              Review Needed
            </p>
            <p className="text-[20px] font-bold text-on-surface font-[Manrope] mt-0.5">
              {reviewSegmentsCount} {reviewSegmentsCount === 1 ? "Segment" : "Segments"}
            </p>
          </div>
        </div>
      </div>

      {/* Surahs List */}
      <div className="space-y-md">
        <h4 className="text-[14px] font-bold text-on-surface font-[Manrope] uppercase tracking-wider text-muted/80">
          Memorized Surah List
        </h4>

        {surahList.length > 0 ? (
          <div className="space-y-md">
            {surahList.map((surah) => {
              const isExpanded = !!expandedSurahs[surah.surahName];
              const lastUpdatedDate = new Date(surah.lastUpdated).toLocaleDateString(
                "id-ID",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              );

              return (
                <div
                  key={surah.surahName}
                  className="bg-surface-container-lowest rounded-xl border border-border-card overflow-hidden shadow-xs hover:shadow-sm transition-all duration-150"
                >
                  <div
                    onClick={() => toggleExpand(surah.surahName)}
                    className="p-lg flex items-center justify-between cursor-pointer select-none hover:bg-surface-container-low/20 transition-colors"
                  >
                    <div className="flex items-center gap-md">
                      <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-[14px] font-bold text-on-surface">
                        📖
                      </div>
                      <div>
                        <h5 className="text-[15px] font-bold text-on-surface font-[Manrope]">
                          {surah.surahName}
                        </h5>
                        <p className="text-[11px] text-muted mt-0.5">
                          Last active: {lastUpdatedDate} • {surah.segments.length}{" "}
                          {surah.segments.length === 1 ? "segment" : "segments"} logged
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-md">
                      <span
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0",
                          surah.overallStatus === "LANCAR"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        )}
                      >
                        {surah.overallStatus}
                      </span>
                      {isExpanded ? (
                        <LuChevronUp className="w-5 h-5 text-muted" />
                      ) : (
                        <LuChevronDown className="w-5 h-5 text-muted" />
                      )}
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="px-lg pb-lg border-t border-border-card bg-surface-container-low/10 divide-y divide-border-card/50">
                      {surah.segments.map((seg, idx) => {
                        const segDate = new Date(seg.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        });

                        return (
                          <div
                            key={idx}
                            className="py-md first:pt-lg last:pb-0 flex flex-col sm:flex-row sm:items-start justify-between gap-sm animate-in slide-in-from-top-1 duration-150"
                          >
                            <div className="space-y-xs flex-1">
                              <div className="flex items-center gap-sm">
                                <span className="text-[13px] font-semibold text-on-surface">
                                  Ayat {seg.ayatStart} - {seg.ayatEnd}
                                </span>
                                <span
                                  className={cn(
                                    "px-2 py-0.25 rounded text-[9px] font-extrabold uppercase border",
                                    seg.status.toUpperCase() === "LANCAR"
                                      ? "bg-emerald-50/50 text-emerald-700 border-emerald-100"
                                      : seg.status.toUpperCase() === "MENGULANG"
                                        ? "bg-amber-50/50 text-amber-700 border-amber-100"
                                        : "bg-blue-50/50 text-blue-700 border-blue-100"
                                  )}
                                >
                                  {seg.status}
                                </span>
                              </div>
                              <p className="text-[13px] text-on-surface-variant italic">
                                "{seg.notes || "No notes provided."}"
                              </p>
                            </div>

                            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-xs text-[11px] text-muted shrink-0">
                              <span className="flex items-center gap-xs">
                                <LuUser className="w-3 h-3" /> {seg.mentor}
                              </span>
                              <span className="flex items-center gap-xs">
                                <LuCalendar className="w-3 h-3" /> {segDate}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-surface-container-lowest rounded-xl border border-border-card p-xl text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mx-auto mb-md">
              <span className="text-xl">📖</span>
            </div>
            <h5 className="text-[15px] font-bold text-on-surface">No Memorization Logged</h5>
            <p className="text-[13px] text-muted mt-1 max-w-[280px] mx-auto">
              Once progress entries are added, the student's memorized surah overview will compile here.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default StudentDetailHafalan;
