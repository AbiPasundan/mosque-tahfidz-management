import { LuChevronLeft, LuChevronRight, LuFilter, LuDownload } from 'react-icons/lu';
import { useState } from 'react';
import { DataTable } from '@/components/ui/Table';

export interface Student {
    id: string | number;
    name: string;
    nis: string;
    age: number;
    memorization: string;
    completionRate: number;
    status: string;
    lastActivity: string;
}

export interface FilterProps {
    levelFilter: string;
    setLevelFilter: (level: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
    setCurrentPage: (page: number) => void;
}

export interface PaginationProps {
    currentPage: number;
    setCurrentPage: (page: number | ((prev: number) => number)) => void;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

export interface TableProps {
    students: Student[];
}

interface StatCardProps {
    title: string;
    value: string | number;
    isPrimaryBorder?: boolean;
}

export const StatCard = ({ title, value, isPrimaryBorder }: StatCardProps) => (
    <div className={`bg-surface-container-lowest rounded-xl px-lg py-md min-w-32.5 ${isPrimaryBorder ? 'border-2 border-primary/20' : 'border border-border-card'}`}>
        <p className="text-[10px] font-bold uppercase tracking-wider text-primary">{title}</p>
        <p className="text-[24px] font-bold text-on-surface font-[Manrope] leading-tight mt-xs">{value}</p>
    </div>
);

export const FilterBar = ({ levelFilter, setLevelFilter, statusFilter, setStatusFilter, setCurrentPage }: FilterProps) => {
    return (
        <div className="flex-1 flex flex-wrap items-center gap-md bg-surface-container-lowest rounded-xl border border-border-card px-lg py-md">
            <div className="flex items-center gap-sm">
                <span className="text-[12px] font-semibold text-muted uppercase tracking-wider">Level:</span>
                <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="text-[13px] px-md py-1.5 rounded-lg border border-border-card bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    {/* ... options lainnya ... */}
                </select>
            </div>

            <div className="flex items-center gap-sm">
                <span className="text-[12px] font-semibold text-muted uppercase tracking-wider">Status:</span>
                <select
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                    className="text-[13px] px-md py-1.5 rounded-lg border border-border-card bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                >
                    <option value="all">All Status</option>
                    {/* ... options lainnya ... */}
                </select>
            </div>

            <div className="flex items-center gap-xs ml-auto">
                <button className="p-2 rounded-lg hover:bg-surface-container transition-colors" aria-label="Filters">
                    <LuFilter className="w-4 h-4 text-muted" />
                </button>
                <button className="p-2 rounded-lg hover:bg-surface-container transition-colors" aria-label="Download">
                    <LuDownload className="w-4 h-4 text-muted" />
                </button>
            </div>
        </div>
    );
};

// import { cn } from '...'; // Pastikan utility cn kamu ter-import

export const Pagination = ({ currentPage, setCurrentPage, pageSize, totalItems, totalPages }: PaginationProps) => {
    return (
        <div className="flex items-center justify-between px-lg py-md border-t border-border-card">
            <p className="text-[12px] text-muted">
                Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, totalItems)} of{' '}
                {totalItems.toLocaleString()} students
            </p>
            <div className="flex items-center gap-xs">
                <button
                    onClick={() => setCurrentPage((p: number) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg border border-border-card hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <LuChevronLeft className="w-4 h-4" />
                </button>

                {/* Render nomor halaman di sini (ambil dari kodemu sebelumnya) */}

                <button
                    onClick={() => setCurrentPage((p: number) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg border border-border-card hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <LuChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export const StudentTable = ({ students }: TableProps) => {
    return (
        <div className="overflow-x-auto">
            {/* <DataTable /> */}
            {/* <DataTable columns={historyColumns} data={recentHistory} /> */}
            <table className="w-full min-w-200">
                <thead>
                    {/* Header tabel... */}
                </thead>
                <tbody>
                    {students.map((student, i) => (
                        <tr key={student.id}>
                            {/* Isi tr sesuai kode aslimu */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};




export default function StudentDashboard() {
    const [levelFilter, setLevelFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    const activeToday = 45;
    const pageSize = 10;
    const filtered = [];
    const paginated: any = [];
    const totalPages = Math.ceil(filtered.length / pageSize);

    return (
        <div className="flex flex-col gap-md">
            <div className="flex flex-col lg:flex-row gap-md">
                <FilterBar levelFilter={levelFilter} setLevelFilter={setLevelFilter} statusFilter={statusFilter} setStatusFilter={setStatusFilter} setCurrentPage={setCurrentPage} />

                <div className="flex gap-md shrink-0">
                    <StatCard title="Active Today" value={activeToday} />
                    <StatCard title="New Students" value={12} isPrimaryBorder />
                </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl border border-border-card overflow-hidden">
                <StudentTable students={paginated} />

                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} totalItems={filtered.length} totalPages={totalPages} />
            </div>

        </div>
    );
}