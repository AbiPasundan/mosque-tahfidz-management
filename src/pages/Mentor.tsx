import { Link } from 'react-router';
import { LuChevronRight } from 'react-icons/lu';
import { MentorHeader } from '@/features/mentor/components/MentorHeader';
import { MentorTable } from '@/features/mentor/components/MentorTable';

export default function MentorPage() {
  return (
    <div className="space-y-lg">
      <div className="flex items-center gap-xs text-[12px] text-muted">
        <Link to="/" className="hover:text-primary transition-colors">Dashboard</Link>
        <LuChevronRight className="w-3 h-3" />
        <span className="text-primary font-medium">Mentors</span>
      </div>

      <MentorHeader />
      <MentorTable />
    </div>
  );
}
