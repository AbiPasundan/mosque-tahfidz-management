import { useParams } from 'react-router';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import StudentDetailBreadcrumb from '@/features/studentDetail/components/StudentDetailBreadcrumb';
import StudentDetailBottomCard from '@/features/studentDetail/components/StudentDetailBottomCard';
import StudentDetailMain from '@/features/studentDetail/components/StudentDetailMain';
import { useStudent } from '@/features/students/hooks/useStudent';

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: response, isLoading } = useStudent(id);
  const student = response?.data;

  if (isLoading) return <LoadingSkeleton />;
  if (!student) return <div className="text-body-md text-muted">Student not found</div>;

  return (
    <div className="space-y-lg">
      <StudentDetailBreadcrumb name={student.name} />
      <StudentDetailMain student={student} />
      <StudentDetailBottomCard student={student} />
    </div>
  );
}
