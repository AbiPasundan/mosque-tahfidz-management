import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { useStudents } from '@/features/students/hooks/useStudents';
import { useUsers } from '@/features/auth/hooks/useUsers';
import { useProgress } from '@/features/progressTracking/hooks/useProgress';
import { useMe } from '@/features/auth/hooks/useMe';
import { useActivityLogs } from '@/features/activityLog/hooks/useActivityLogs';
import type { Student } from '@/features/students/types/student';

// Sub-components
import {
  SearchInput,
  StudentResultCard,
  UserResultCard,
  ActivityList,
  SearchFilters,
  StudentQuickView
} from '@/features/search/components';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilters, setStatusFilters] = useState<string[]>(['active']);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const { data: userData } = useMe();
  const currentRole = userData?.data?.role;
  const isAdmin = currentRole === 'admin';

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Sync URL
  useEffect(() => {
    if (debouncedQuery) {
      searchParams.set('q', debouncedQuery);
    } else {
      searchParams.delete('q');
    }
    setSearchParams(searchParams);
  }, [debouncedQuery]);

  // Queries
  const { data: studentResponse, isLoading: loadingStudents } = useStudents({
    search: debouncedQuery || undefined,
    status: statusFilters.length === 1 ? statusFilters[0] : undefined,
    limit: 6
  });

  // Only admins can search for other users (mentors/admins)
  const { data: userResponse, isLoading: loadingUsers } = useUsers({
    search: debouncedQuery || undefined,
    role: categoryFilter === 'mentors' ? 'mentor' : (categoryFilter === 'admins' ? 'admin' : undefined),
    limit: 4
  }, {
    enabled: isAdmin && (categoryFilter === 'all' || categoryFilter === 'mentors' || categoryFilter === 'admins')
  });

  const { data: progressResponse, isLoading: loadingProgress } = useProgress({
    limit: 5
  });

  const { data: activityResponse, isLoading: loadingActivities } = useActivityLogs({
    limit: 5
  }, {
    enabled: isAdmin
  }) as any;

  const students = studentResponse?.data || [];
  const users = isAdmin ? (userResponse?.data || []) : [];
  const activities = isAdmin ? (activityResponse?.data || []) : (progressResponse?.data || []);

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  const toggleStatus = (status: string) => {
    setStatusFilters((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const clearFilters = () => {
    setQuery('');
    setCategoryFilter('all');
    setStatusFilters(['active']);
  };

  const isLoading = loadingStudents || (isAdmin && loadingUsers);

  // Define categories based on role
  const categories = isAdmin
    ? ['All', 'Students', 'Mentors', 'Admins']
    : ['All', 'Students'];

  return (
    <div className="flex gap-lg min-h-[calc(100vh-120px)]">
      {/* Left: Search Results */}
      <div className="flex-1 min-w-0 space-y-lg">
        {/* Big search input */}
        <SearchInput
          value={query}
          onChange={handleSearch}
          placeholder={isAdmin ? "Search students, mentors, admins..." : "Search students..."}
        />

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="space-y-lg">
            {/* Students section */}
            {(categoryFilter === 'all' || categoryFilter === 'students') && (
              <div>
                <div className="flex items-center justify-between mb-md">
                  <h2 className="text-[17px] font-semibold text-on-surface font-[Manrope] flex items-center gap-sm">
                    Students
                    <span className="text-[12px] font-normal text-muted">{students.length} matches</span>
                  </h2>
                  <Link to="/students" className="text-[13px] font-medium text-primary hover:underline">
                    View All Students
                  </Link>
                </div>

                {students.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    {students.map((student: Student, i: number) => (
                      <StudentResultCard
                        key={student.id}
                        student={student}
                        index={i}
                        onClick={() => setSelectedStudent(student)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-surface-container-lowest rounded-xl border border-border-card p-xl text-center">
                    <p className="text-[14px] text-muted">No students matching your search.</p>
                  </div>
                )}
              </div>
            )}

            {/* Users section (Only for Admins) */}
            {isAdmin && (categoryFilter === 'all' || categoryFilter === 'mentors' || categoryFilter === 'admins') && (
              <div>
                <h2 className="text-[17px] font-semibold text-on-surface font-[Manrope] flex items-center gap-sm mb-md">
                  Staff & Mentors
                  <span className="text-[12px] font-normal text-muted">{users.length} match</span>
                </h2>
                {users.length > 0 ? (
                  <div className="space-y-md">
                    {users.map((user: any) => (
                      <UserResultCard key={user.id} user={user} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg text-center">
                    <p className="text-[14px] text-muted">No staff matching your search.</p>
                  </div>
                )}
              </div>
            )}

            {/* Recent Activity section */}
            <div>
              <h2 className="text-[17px] font-semibold text-on-surface font-[Manrope] flex items-center gap-sm mb-md">
                Recent Activity
                <span className="text-[12px] font-normal text-muted">{activities.length} entries</span>
              </h2>
              <ActivityList activities={activities} isActivityLog={isAdmin} />
            </div>
          </div>
        )}
      </div>

      {/* Right: Filters sidebar */}
      <div className="hidden lg:block w-[280px] flex-shrink-0 space-y-lg">
        <SearchFilters
          categories={categories}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilters={statusFilters}
          toggleStatus={toggleStatus}
          onClear={clearFilters}
        />
      </div>

      {/* Detail Drawer */}
      {selectedStudent && (
        <StudentQuickView
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}
