import Breadcrumb from '@/features/students/components/StudentBreadcrumb';
import StudentHeader from '@/features/students/components/StudentHeader';
import StudentBottomCard from '@/features/students/components/StudentBottomCard';
import StudentTable from '@/features/students/components/StudentTable';

export default function StudentsPage() {
  return (
    <div className="space-y-lg">
      {/* Breadcrumb */}
      <Breadcrumb />
      {/* Page Header */}
      <StudentHeader />
      {/* Table */}
      <StudentTable />
      {/* Bottom Action Cards */}
      <StudentBottomCard />
    </div>
  );
}
