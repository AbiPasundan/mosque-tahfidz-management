import { LuSearch } from 'react-icons/lu';
import { cn } from '@/utils/cn';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="relative w-full">
      <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search students, progress, or logs..."
        className={cn(
          'w-full pl-9 pr-md py-[7px] rounded-lg border border-border-light',
          'bg-surface-container-low text-[13px] text-on-surface',
          'placeholder:text-muted',
          'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30',
          'transition-all duration-150'
        )}
        aria-label="Global search"
      />
    </div>
  );
}
