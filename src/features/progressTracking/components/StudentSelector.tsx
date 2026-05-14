import { useState, useMemo, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { LuChevronDown } from 'react-icons/lu';
import type { Student } from '@/features/students/types/student';

interface StudentSelectorProps {
  students: Student[];
  selectedStudent: Student | null;
  onSelect: (student: Student | null) => void;
  currentUserId?: string;
  isLoading?: boolean;
}

export function StudentSelector({
  students,
  selectedStudent,
  onSelect,
  currentUserId,
  isLoading
}: StudentSelectorProps) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const sortedStudents = useMemo(() => {
    return [...students].sort((a, b) => {
      const aIsMine = a.mentor_id === currentUserId;
      const bIsMine = b.mentor_id === currentUserId;
      if (aIsMine && !bIsMine) return -1;
      if (!aIsMine && bIsMine) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [students, currentUserId]);

  const filteredStudents = useMemo(() => {
    return sortedStudents.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [sortedStudents, search]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-[13px] font-medium text-on-surface mb-[6px]">Select Student</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">👤</span>
        <input
          type="text"
          placeholder={isLoading ? 'Loading students...' : 'Type to search student...'}
          value={selectedStudent ? selectedStudent.name : search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (selectedStudent) onSelect(null);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-10 py-[10px] rounded-xl border border-border-card bg-surface-container-lowest text-[14px] text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        >
          <LuChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
        </button>
      </div>

      {isOpen && !isLoading && (
        <div className="absolute z-50 w-full mt-1 max-h-64 overflow-y-auto bg-surface-container-lowest border border-border-card rounded-xl shadow-lg">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((s) => {
              const isMine = s.mentor_id === currentUserId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    onSelect(s);
                    setIsOpen(false);
                    setSearch(s.name);
                  }}
                  className="w-full px-md py-2.5 text-left text-[14px] hover:bg-surface-container transition-colors flex justify-between items-center"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-on-surface">{s.name}</span>
                    <span className="text-[11px] text-muted">{s.learning_level}</span>
                  </div>
                  {isMine && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                      My Student
                    </span>
                  )}
                </button>
              );
            })
          ) : (
            <div className="px-md py-4 text-center text-[13px] text-muted">
              No students found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
