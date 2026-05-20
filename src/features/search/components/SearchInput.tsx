import { LuSearch, LuX } from 'react-icons/lu';
import type { SearchInputProps } from '../type/search';

export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <div className="relative">
      <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-lg py-[12px] rounded-xl border border-border-card bg-surface-container-lowest text-[15px] text-on-surface placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        aria-label="Search"
        autoFocus
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-surface-container transition-colors"
        >
          <LuX className="w-4 h-4 text-muted" />
        </button>
      )}
    </div>
  );
}
