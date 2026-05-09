import { cn } from '@/utils/cn';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  pageSize = 10,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between pt-lg border-t border-outline-variant">
      <p className="text-label-sm text-on-surface-variant">
        Showing {startItem}-{endItem} of {totalItems}
      </p>
      <div className="flex items-center gap-sm">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            'p-sm rounded-lg border border-outline-variant',
            'hover:bg-surface-container transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          aria-label="Previous page"
        >
          <LuChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              'w-8 h-8 rounded-lg text-label-sm transition-colors',
              page === currentPage
                ? 'bg-primary text-on-primary'
                : 'border border-outline-variant hover:bg-surface-container'
            )}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            'p-sm rounded-lg border border-outline-variant',
            'hover:bg-surface-container transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          aria-label="Next page"
        >
          <LuChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
