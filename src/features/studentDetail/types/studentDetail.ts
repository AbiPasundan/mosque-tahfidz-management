import type { ElementType } from "react";

export interface StudentDetailBottomCardProps {
    icon: ElementType;
    title: string;
    content: string;
}

export interface ProgressRecord {
    id: string;
    student_id: string;
    mentor_id: string;
    surah: string;
    status: string;
    ayat_start: number;
    ayat_end: number;
    notes: string;
    progress_date: string;
    mentor_name?: string;
}