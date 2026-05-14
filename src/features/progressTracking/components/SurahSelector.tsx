import { useState, useMemo, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { LuChevronDown } from 'react-icons/lu';
import type { SurahSelectorProps } from '../types/progress';

export function SurahSelector({ surahs, selectedSurah, onSelect, isLoading }: SurahSelectorProps) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredSurahs = useMemo(() => {
    return surahs.filter((s) =>
      s.namaLatin.toLowerCase().includes(search.toLowerCase()) ||
      s.nomor.toString().includes(search)
    );
  }, [surahs, search]);

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
      <label className="block text-[13px] font-medium text-on-surface mb-[6px]">Surah</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">📖</span>
        <input
          type="text"
          placeholder={isLoading ? 'Loading surahs...' : 'Type to search surah...'}
          value={selectedSurah ? selectedSurah.namaLatin : search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (selectedSurah) onSelect(null);
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
        <div className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto bg-surface-container-lowest border border-border-card rounded-xl shadow-lg">
          {filteredSurahs.length > 0 ? (
            filteredSurahs.map((s) => (
              <button
                key={s.nomor}
                type="button"
                onClick={() => {
                  onSelect(s);
                  setIsOpen(false);
                  setSearch(s.namaLatin);
                }}
                className="w-full px-md py-2.5 text-left text-[14px] hover:bg-surface-container transition-colors flex justify-between items-center"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-on-surface">{s.namaLatin}</span>
                  <span className="text-[11px] text-muted">{s.nomor}. {s.nama}</span>
                </div>
                <span className="text-[11px] font-semibold text-primary bg-primary/5 px-2 py-0.5 rounded-lg border border-primary/10">
                  {s.jumlahAyat} Ayat
                </span>
              </button>
            ))
          ) : (
            <div className="px-md py-4 text-center text-[13px] text-muted">
              No surah found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
