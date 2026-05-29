import { BiBookBookmark } from "react-icons/bi"; 
import { useState } from 'react';
import { cn } from '@/utils/cn';
import { LuPlus, LuCircleCheck, LuRepeat, LuSparkles } from 'react-icons/lu';
import { StudentSelector } from './StudentSelector';
import { SurahSelector } from './SurahSelector';
import type { Student } from '@/features/students/types/student';
import type { Surah, QueueEntry } from '../types/progress';
import { toast } from 'sonner';

interface ProgressEntryFormProps {
  students: Student[];
  surahs: Surah[];
  currentUserId?: string;
  loadingStudents?: boolean;
  loadingSurahs?: boolean;
  onAdd: (entry: QueueEntry) => void;
}

export function ProgressEntryForm({
  students,
  surahs,
  currentUserId,
  loadingStudents,
  loadingSurahs,
  onAdd
}: ProgressEntryFormProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('TAHSIN');
  const [ayatStart, setAyatStart] = useState(0);
  const [ayatEnd, setAyatEnd] = useState(1);
  const [notes, setNotes] = useState('');

  const handleAdd = () => {
    if (!selectedStudent || !selectedSurah) {
      toast.error('Please select both student and surah');
      return;
    }

    if (ayatEnd < ayatStart) {
      toast.error('Ayat End cannot be less than Ayat Start');
      return;
    }

    if (ayatEnd > selectedSurah.jumlahAyat) {
      toast.error(`Surah ${selectedSurah.namaLatin} only has ${selectedSurah.jumlahAyat} ayahs`);
      return;
    }

    onAdd({
      student_id: selectedStudent.id,
      studentName: selectedStudent.name,
      surah: selectedSurah.namaLatin,
      ayat_start: ayatStart,
      ayat_end: ayatEnd,
      status: selectedStatus,
      notes: notes,
    });

    // Reset local form state
    setSelectedStudent(null);
    setSelectedSurah(null);
    setNotes('');
    setAyatStart(1);
    setAyatEnd(1);
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg space-y-lg">
      <h2 className="text-[17px] font-semibold text-on-surface font-[Manrope] flex items-center gap-sm">
        <span className="text-lg">📝</span> Entry Form
      </h2>

      <StudentSelector
        students={students}
        selectedStudent={selectedStudent}
        onSelect={setSelectedStudent}
        currentUserId={currentUserId}
        isLoading={loadingStudents}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        <SurahSelector
          surahs={surahs || []}
          selectedSurah={selectedSurah}
          onSelect={setSelectedSurah}
          isLoading={loadingSurahs}
        />

        <div>
          <label className="block text-[13px] font-medium text-on-surface mb-1.5">Status</label>
          <div className="grid grid-cols-3 gap-sm">
            {[
              { key: 'TAHSIN', label: 'Tahsin', icon: <LuCircleCheck className="w-5 h-5" /> },
              { key: 'MENGULANG', label: 'Mengulang', icon: <LuRepeat className="w-5 h-5" /> },
              { key: 'TAHFIDZ', label: 'Tahfidz', icon: <BiBookBookmark className="w-5 h-5" /> },
            ].map((status) => (
              <button
                key={status.key}
                type="button"
                onClick={() => setSelectedStatus(status.key)}
                className={cn(
                  'flex flex-col items-center gap-[4px] py-2.5 px-sm rounded-xl border text-[12px] font-medium transition-all',
                  selectedStatus === status.key
                    ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary/20'
                    : 'border-border-card text-on-surface-variant hover:bg-surface-container'
                )}
              >
                {status.icon}
                {status.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-lg">
        <div>
          <label className="block text-[13px] font-medium text-on-surface mb-1.5">Ayat Start</label>
          <input
            type="number"
            min={0}
            max={selectedSurah?.jumlahAyat || 286}
            value={ayatStart}
            onChange={(e) => setAyatStart(parseInt(e.target.value) || 1)}
            className="w-full px-md py-2.5 rounded-xl border border-border-card bg-surface-container-lowest text-[14px] text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-on-surface mb-1.5">
            Ayat End {selectedSurah && <span className="text-primary font-normal">(Max: {selectedSurah.jumlahAyat})</span>}
          </label>
          <input
            type="number"
            min={1}
            max={selectedSurah?.jumlahAyat || 286}
            value={ayatEnd}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 1;
              if (selectedSurah && val > selectedSurah.jumlahAyat) {
                setAyatEnd(selectedSurah.jumlahAyat);
              } else {
                setAyatEnd(val);
              }
            }}
            className={cn(
              "w-full px-md py-2.5 rounded-xl border border-border-card bg-surface-container-lowest text-[14px] text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
              selectedSurah && ayatEnd > selectedSurah.jumlahAyat && "border-error focus:ring-error"
            )}
          />
        </div>
      </div>

      <div>
        <label className="block text-[13px] font-medium text-on-surface mb-1.5">Mentor Notes (Optional)</label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Excellent pronunciation, watch for Tajweed in verse 4..."
          className="w-full px-md py-2.5 rounded-xl border border-border-card bg-surface-container-lowest text-[14px] text-on-surface placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleAdd}
          className="flex items-center gap-sm px-xl py-2.5 rounded-xl bg-primary text-on-primary text-[14px] font-semibold hover:bg-primary-container transition-colors shadow-md"
        >
          <LuPlus className="w-4 h-4" />
          Add to Session Queue
        </button>
      </div>
    </div>
  );
}
