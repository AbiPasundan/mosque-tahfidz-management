import { useState } from 'react';
import { Link } from 'react-router';
import { cn } from '@/utils/cn';
import { LuPlus, LuUpload, LuSave, LuChevronRight, LuCircleCheck, LuRepeat, LuSparkles, LuClock, LuLightbulb, } from 'react-icons/lu';
import ProgressBreadcrumb from '@/features/progressTracking/components/ProgressBreadcrumb';
import ProgressBottomCards from '@/features/progressTracking/components/ProgressBottomCards';

/* ─── Queue entries ─── */
const queueEntries = [
  { name: 'Fatima Zahra', surah: 'An-Nisa: 12-15', status: 'LANCAR', statusColor: 'bg-primary/10 text-primary', dotColor: 'bg-primary' },
  { name: 'Zaid Ibrahim', surah: 'Al-Baqarah: 1-5', status: 'ZIYADAH', statusColor: 'bg-amber-50 text-amber-700', dotColor: 'bg-amber-500' },
  { name: 'Abdullah Ali', surah: 'Al-Mulk: 20-30', status: 'LANCAR', statusColor: 'bg-primary/10 text-primary', dotColor: 'bg-primary' },
];

export default function ProgressPage() {
  const [selectedStatus, setSelectedStatus] = useState('lancar');
  const [ayatStart, setAyatStart] = useState('1');
  const [ayatEnd, setAyatEnd] = useState('5');

  return (
    <div className="space-y-lg">
      <ProgressBreadcrumb />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-md">
        <div>
          <h1 className="text-h1 text-on-surface font-[Manrope]">Input Progress Hafalan</h1>
          <p className="text-body-md text-muted mt-xs">
            Record student recitation and memorization achievements.
          </p>
        </div>
        <div className="flex items-center gap-sm flex-shrink-0">
          <button className="flex items-center gap-sm px-lg py-[9px] rounded-lg border border-border-card text-[13px] font-medium text-on-surface hover:bg-surface-container transition-colors">
            Import CSV
          </button>
          <button className="flex items-center gap-sm px-lg py-[9px] rounded-lg bg-primary text-on-primary text-[13px] font-medium hover:bg-primary-container transition-colors">
            <LuSave className="w-4 h-4" />
            Submit Entries
          </button>
        </div>
      </div>

      {/* Main grid: Form + Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-lg">
        {/* Entry Form */}
        <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg space-y-lg">
          <h2 className="text-[17px] font-semibold text-on-surface font-[Manrope] flex items-center gap-sm">
            <span className="text-lg">📝</span> Entry Form
          </h2>

          {/* Select Student */}
          <div>
            <label className="block text-[13px] font-medium text-on-surface mb-[6px]">Select Student</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">👤</span>
              <select className="w-full pl-10 pr-md py-[10px] rounded-xl border border-border-card bg-surface-container-lowest text-[14px] text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none">
                <option>Search or select a student...</option>
                <option>Ahmad Fauzi</option>
                <option>Siti Aisyah</option>
                <option>Umar bin Khattab</option>
              </select>
            </div>
          </div>

          {/* Surah + Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div>
              <label className="block text-[13px] font-medium text-on-surface mb-[6px]">Surah</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">📖</span>
                <select className="w-full pl-10 pr-md py-[10px] rounded-xl border border-border-card bg-surface-container-lowest text-[14px] text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none">
                  <option>Al-Baqarah</option>
                  <option>Ali Imran</option>
                  <option>An-Nisa</option>
                  <option>Al-Ma'idah</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-on-surface mb-[6px]">Status</label>
              <div className="grid grid-cols-3 gap-sm">
                {[
                  { key: 'lancar', label: 'Lancur', icon: <LuCircleCheck className="w-5 h-5" /> },
                  { key: 'mengulang', label: 'Mengulang', icon: <LuRepeat className="w-5 h-5" /> },
                  { key: 'ziyadah', label: 'Ziyadah', icon: <LuSparkles className="w-5 h-5" /> },
                ].map((status) => (
                  <button
                    key={status.key}
                    onClick={() => setSelectedStatus(status.key)}
                    className={cn(
                      'flex flex-col items-center gap-[4px] py-[10px] px-sm rounded-xl border text-[12px] font-medium transition-all',
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

          {/* Ayat range */}
          <div className="grid grid-cols-2 gap-lg">
            <div>
              <label className="block text-[13px] font-medium text-on-surface mb-[6px]">Ayat Start</label>
              <input
                type="number"
                value={ayatStart}
                onChange={(e) => setAyatStart(e.target.value)}
                className="w-full px-md py-[10px] rounded-xl border border-border-card bg-surface-container-lowest text-[14px] text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-on-surface mb-[6px]">Ayat End</label>
              <input
                type="number"
                value={ayatEnd}
                onChange={(e) => setAyatEnd(e.target.value)}
                className="w-full px-md py-[10px] rounded-xl border border-border-card bg-surface-container-lowest text-[14px] text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Teacher Notes */}
          <div>
            <label className="block text-[13px] font-medium text-on-surface mb-[6px]">Teacher Notes (Optional)</label>
            <textarea
              rows={3}
              placeholder="Excellent pronunciation, watch for Tajweed in verse 4..."
              className="w-full px-md py-[10px] rounded-xl border border-border-card bg-surface-container-lowest text-[14px] text-on-surface placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          {/* Submit button */}
          <div className="flex justify-end">
            <button className="flex items-center gap-sm px-xl py-[10px] rounded-xl bg-primary text-on-primary text-[14px] font-semibold hover:bg-primary-container transition-colors shadow-md">
              <LuPlus className="w-4 h-4" />
              Add to Session Queue
            </button>
          </div>
        </div>

        {/* Queue Panel */}
        <div className="space-y-lg">
          <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
            <div className="flex items-center justify-between mb-lg">
              <h3 className="text-[16px] font-semibold text-on-surface font-[Manrope] flex items-center gap-sm">
                📋 Queue
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary">
                {queueEntries.length} Entries
              </span>
            </div>

            <div className="space-y-md">
              {queueEntries.map((entry, i) => (
                <div key={i} className="flex items-start gap-sm">
                  <div className={cn('w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0', entry.dotColor)} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-[14px] font-semibold text-on-surface">{entry.name}</p>
                      <span className={cn('px-2 py-0.5 rounded text-[9px] font-bold uppercase', entry.statusColor)}>
                        {entry.status}
                      </span>
                    </div>
                    <p className="text-[12px] text-muted mt-[2px]">{entry.surah}</p>
                    {i === 0 && (
                      <p className="text-[11px] text-muted italic mt-[2px]">"Focus on Ghunnah clarity."</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border-card mt-lg pt-md">
              <div className="flex items-center justify-between mb-md">
                <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">Estimated Summary</span>
                <span className="text-[14px] font-bold text-on-surface">12 Total Ayat</span>
              </div>
              <button className="w-full flex items-center justify-center gap-sm py-[10px] rounded-xl bg-primary text-on-primary text-[14px] font-semibold hover:bg-primary-container transition-colors">
                <LuUpload className="w-4 h-4" />
                Finish Session
              </button>
            </div>
          </div>

          {/* FAB */}
          <div className="fixed bottom-24 md:bottom-8 right-6 z-30">
            <button className="w-14 h-14 rounded-full bg-primary text-on-primary shadow-lg hover:shadow-xl hover:bg-primary-container transition-all flex items-center justify-center">
              <LuPlus className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom info cards */}
      <ProgressBottomCards />
    </div>
  );
}
