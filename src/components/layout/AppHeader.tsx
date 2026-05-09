import { useSidebarStore } from '@/stores/sidebarStore';
import { LuMenu, LuBell, LuCircleHelp } from 'react-icons/lu';
import { SearchBar } from '@/components/ui/SearchBar';

export function AppHeader() {
  const { toggle } = useSidebarStore();

  return (
    <header className="sticky top-0 z-20 bg-surface-container-lowest/80 backdrop-blur-md border-b border-border-light">
      <div className="flex items-center h-14 px-gutter gap-md">
        {/* Mobile menu button */}
        <button onClick={toggle} className="md:hidden p-sm rounded-lg hover:bg-surface-container transition-colors shrink-0" aria-label="Toggle sidebar" >
          <LuMenu className="w-5 h-5 text-on-surface" />
        </button>

        {/* Search bar */}
        <div className="flex-1 max-w-full">
          <SearchBar />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-xs ml-auto shrink-0">
          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-surface-container transition-colors relative" aria-label="Notifications" >
            <LuBell className="w-4.5 h-4.5 text-on-surface-variant" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface-container-lowest" />
          </button>

          {/* Help */}
          <button className="p-2 rounded-lg hover:bg-surface-container transition-colors" aria-label="Help" >
            <LuCircleHelp className="w-4.5 h-4.5 text-on-surface-variant" />
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-border-light mx-xs hidden sm:block" />

          {/* User profile */}
          <div className="flex items-center gap-sm ml-xs">
            <div className="hidden sm:block text-right">
              <p className="text-[13px] font-medium text-on-surface leading-tight">Ustadz Ahmad</p>
              <p className="text-[11px] text-muted leading-tight">Administrator</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-primary-container flex items-center justify-center text-on-primary text-[13px] font-semibold ring-2 ring-border-light">
              UA
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
