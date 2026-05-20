import type { Student } from '@/features/students/types/student';

export interface SearchFiltersProps {
    categories: string[];
    categoryFilter: string;
    setCategoryFilter: (category: string) => void;
    statusFilters: string[];
    toggleStatus: (status: string) => void;
    onClear: () => void;
}

export interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

export interface StudentQuickViewProps {
    student: Student;
    onClose: () => void;
}

export interface StudentResultCardProps {
    student: Student;
    index: number;
    onClick: () => void;
}
