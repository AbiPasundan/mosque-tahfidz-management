import { cn } from '@/utils/cn';
import type { SearchFiltersProps } from '../type/search';

export function SearchFilters({
  categories,
  categoryFilter,
  setCategoryFilter,
  statusFilters,
  toggleStatus,
  onClear
}: SearchFiltersProps) {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg sticky top-20">
      <div className="flex items-center justify-between mb-md">
        <h3 className="text-[14px] font-semibold text-on-surface flex items-center gap-sm">
          ⚙ Filters
        </h3>
        <button
          onClick={onClear}
          className="text-[12px] font-medium text-primary hover:underline"
        >
          Clear
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-md">
        <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-sm">Category</p>
        <div className="flex flex-wrap gap-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat.toLowerCase())}
              className={cn(
                'px-md py-[5px] rounded-full text-[11px] font-semibold transition-colors',
                categoryFilter === cat.toLowerCase()
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Status checkboxes */}
      <div className="mb-md">
        <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-sm">Student Status</p>
        <div className="space-y-sm">
          {['Active', 'Pending', 'Inactive', 'Graduated'].map((status) => (
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
    </div>
  );
}
