import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, Link } from 'react-router';
import { LuSearch, LuUser, LuBookOpen, LuChevronRight, LuX, LuHistory, LuArrowRight } from 'react-icons/lu';
import { cn } from '@/utils/cn';
import { StudentStatusBadge } from '@/features/students/components/StudentStatusBadge';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { mockStudents } from '@/constants/mockData';
import type { Student } from '@/constants/mockData';

/* ─── Helper ─── */
function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

const avatarColors = [
  'bg-violet-100 text-violet-700',
  'bg-emerald-100 text-emerald-700',
  'bg-rose-100 text-rose-700',
  'bg-amber-100 text-amber-700',
  'bg-blue-100 text-blue-700',
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilters, setStatusFilters] = useState<string[]>(['active']);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const { data: results = [], isLoading } = useQuery<Student[]>({
    queryKey: ['search', query, roleFilter, statusFilters],
    queryFn: () => {
      let filtered = mockStudents;
      if (query) {
        filtered = filtered.filter(
          (s) =>
            s.name.toLowerCase().includes(query.toLowerCase()) ||
            s.nis.includes(query) ||
            s.class.toLowerCase().includes(query.toLowerCase())
        );
      }
      return Promise.resolve(filtered);
    },
  });

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value) {
      searchParams.set('q', value);
    } else {
      searchParams.delete('q');
    }
    setSearchParams(searchParams);
  };

  const toggleStatus = (status: string) => {
    setStatusFilters((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const studentResults = results.slice(0, 4);
  const recentSearches = ['Ahmad Zaky', 'Tahfidz Report', 'Juz 30 exam'];

  return (
    <div className="flex gap-lg min-h-[calc(100vh-120px)]">
      {/* Left: Search Results */}
      <div className="flex-1 min-w-0 space-y-lg">
        {/* Big search input */}
        <div className="relative">
          <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search students, IDs, or levels..."
            className="w-full pl-12 pr-lg py-[12px] rounded-xl border border-border-card bg-surface-container-lowest text-[15px] text-on-surface placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            aria-label="Search"
            autoFocus
          />
        </div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="space-y-lg">
            {/* Students section */}
            <div>
              <div className="flex items-center justify-between mb-md">
                <h2 className="text-[17px] font-semibold text-on-surface font-[Manrope] flex items-center gap-sm">
                  Students
                  <span className="text-[12px] font-normal text-muted">{studentResults.length} matches</span>
                </h2>
                <Link to="/students" className="text-[13px] font-medium text-primary hover:underline">
                  View All Students
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                {studentResults.map((student, i) => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className="bg-surface-container-lowest rounded-xl border border-border-card p-lg text-left hover:shadow-card transition-all"
                  >
                    <div className="flex items-center gap-sm mb-md">
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0',
                        avatarColors[i % avatarColors.length]
                      )}>
                        {getInitials(student.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-semibold text-on-surface">{student.name}</p>
                        <p className="text-[11px] text-muted">ID: #{student.nis}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-sm mb-md">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase text-primary bg-primary/10">
                        {student.memorization}
                      </span>
                      <StudentStatusBadge status={student.status} />
                    </div>
                    <Link
                      to={`/students/${student.id}`}
                      className="text-[13px] font-medium text-on-surface-variant hover:text-primary transition-colors flex items-center gap-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Profile <LuArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </button>
                ))}
              </div>
            </div>

            {/* Teachers section */}
            <div>
              <h2 className="text-[17px] font-semibold text-on-surface font-[Manrope] flex items-center gap-sm mb-md">
                Teachers
                <span className="text-[12px] font-normal text-muted">1 match</span>
              </h2>
              <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[12px] font-bold">
                    UM
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-on-surface">Ust. Mansur Ahmad</p>
                    <p className="text-[12px] text-muted">Tahfidz Lead • 12 Assigned Students</p>
                  </div>
                </div>
                <button className="px-md py-[6px] rounded-lg border border-border-card text-[13px] font-medium text-on-surface hover:bg-surface-container transition-colors">
                  Details
                </button>
              </div>
            </div>

            {/* Recent Activity section */}
            <div>
              <h2 className="text-[17px] font-semibold text-on-surface font-[Manrope] flex items-center gap-sm mb-md">
                Recent Activity
                <span className="text-[12px] font-normal text-muted">2 entries</span>
              </h2>
              <div className="bg-surface-container-lowest rounded-xl border border-border-card divide-y divide-border-card">
                {[
                  {
                    icon: <LuBookOpen className="w-4 h-4 text-primary" />,
                    text: <>Ahmad Zaky updated memorization to <span className="text-primary font-medium">An-Naba (Verse 1-20)</span></>,
                    meta: '2 HOURS AGO • BY UST. MANSUR',
                  },
                  {
                    icon: <LuHistory className="w-4 h-4 text-muted" />,
                    text: 'Generated Tahfidz Monthly Report for student Ahmad Fathoni',
                    meta: 'YESTERDAY • BY ADMIN',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-sm p-lg">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[13px] text-on-surface">{item.text}</p>
                      <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mt-[2px]">{item.meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right: Filters sidebar */}
      <div className="hidden lg:block w-[280px] flex-shrink-0 space-y-lg">
        {/* Recent Searches */}
        <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
          <h3 className="text-[14px] font-semibold text-on-surface flex items-center gap-sm mb-md">
            <LuHistory className="w-4 h-4 text-muted" />
            Recent Searches
          </h3>
          <div className="space-y-[2px]">
            {recentSearches.map((search) => (
              <button
                key={search}
                onClick={() => handleSearch(search)}
                className="flex items-center justify-between w-full px-sm py-[7px] rounded-lg text-[13px] text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                <span>{search}</span>
                <LuChevronRight className="w-3.5 h-3.5 text-muted" />
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
          <div className="flex items-center justify-between mb-md">
            <h3 className="text-[14px] font-semibold text-on-surface flex items-center gap-sm">
              ⚙ Filters
            </h3>
            <button className="text-[12px] font-medium text-primary hover:underline">Clear</button>
          </div>

          {/* Role */}
          <div className="mb-md">
            <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-sm">Role</p>
            <div className="flex gap-xs">
              {['All', 'Students', 'Teachers'].map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role.toLowerCase())}
                  className={cn(
                    'px-md py-[5px] rounded-full text-[11px] font-semibold transition-colors',
                    roleFilter === role.toLowerCase()
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  )}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Status checkboxes */}
          <div className="mb-md">
            <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-sm">Status</p>
            <div className="space-y-sm">
              {['Active', 'On Leave', 'Graduated'].map((status) => (
                <label key={status} className="flex items-center gap-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={statusFilters.includes(status.toLowerCase())}
                    onChange={() => toggleStatus(status.toLowerCase())}
                    className="w-4 h-4 rounded border-border-card text-primary focus:ring-primary/30"
                  />
                  <span className="text-[13px] text-on-surface-variant">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Learning Level dropdown */}
          <div className="mb-md">
            <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-sm">Learning Level</p>
            <select className="w-full px-md py-[6px] rounded-lg border border-border-card bg-surface-container-lowest text-[13px] text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30">
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          {/* Last Active */}
          <div>
            <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-sm">Last Active</p>
            <div className="flex gap-sm">
              <input
                type="text"
                placeholder="From"
                className="flex-1 px-md py-[6px] rounded-lg border border-border-card bg-surface-container-lowest text-[13px] placeholder:text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
              />
              <input
                type="text"
                placeholder="To"
                className="flex-1 px-md py-[6px] rounded-lg border border-border-card bg-surface-container-lowest text-[13px] placeholder:text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      {selectedStudent && (
        <div className="hidden xl:block w-[320px] flex-shrink-0 bg-surface-container-lowest rounded-xl border border-border-card p-lg self-start sticky top-20 space-y-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-semibold text-on-surface font-[Manrope]">Student Details</h3>
            <button onClick={() => setSelectedStudent(null)} className="p-1 rounded-lg hover:bg-surface-container">
              <LuX className="w-4 h-4 text-muted" />
            </button>
          </div>

          {/* Profile */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-[20px] font-bold mx-auto">
              {getInitials(selectedStudent.name)}
            </div>
            <h4 className="text-[16px] font-bold text-on-surface mt-sm font-[Manrope]">{selectedStudent.name}</h4>
            <p className="text-[12px] text-muted">Class: {selectedStudent.class}</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-[2px]">● CURRENT STATUS: {selectedStudent.status.toUpperCase()}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-md">
            <div className="text-center">
              <p className="text-[10px] font-semibold text-muted uppercase tracking-wider">Memorization</p>
              <p className="text-[18px] font-bold text-primary font-[Manrope] mt-[2px]">{selectedStudent.memorization}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold text-muted uppercase tracking-wider">Attendance</p>
              <p className="text-[18px] font-bold text-on-surface font-[Manrope] mt-[2px]">98.4%</p>
            </div>
          </div>

          {/* Recent Logs */}
          <div>
            <h4 className="text-[13px] font-semibold text-on-surface mb-sm">Recent Logs</h4>
            <div className="space-y-sm">
              {[
                { title: 'Surah Al-Mulk Completed', desc: 'Perfect recitation, minor tajweed fix on verse 12.', date: 'Oct 12, 2024' },
                { title: 'Level Up Assessment', desc: 'Passed Juz 29 final exam with Mumtaz (95/100).', date: 'Oct 05, 2024' },
              ].map((log, i) => (
                <div key={i} className="border-l-2 border-border-card pl-sm">
                  <p className="text-[13px] font-medium text-on-surface">{log.title}</p>
                  <p className="text-[11px] text-muted mt-[2px]">{log.desc}</p>
                  <p className="text-[10px] text-primary mt-[2px]">{log.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-sm">
            <button className="flex-1 py-[8px] rounded-lg border border-border-card text-[13px] font-medium text-on-surface hover:bg-surface-container transition-colors">
              Contact Parents
            </button>
            <Link
              to={`/students/${selectedStudent.id}`}
              className="flex-1 py-[8px] rounded-lg bg-primary text-on-primary text-[13px] font-semibold text-center hover:bg-primary-container transition-colors"
            >
              Full Profile
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
