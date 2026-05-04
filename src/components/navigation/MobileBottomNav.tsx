import { NavLink, useLocation } from 'react-router';
import { cn } from '@/utils/cn';
import {
  LuLayoutDashboard,
  LuUsers,
  LuSearch,
  LuTrendingUp,
  LuSettings,
} from 'react-icons/lu';

const items = [
  { path: '/', label: 'Home', icon: LuLayoutDashboard },
  { path: '/students', label: 'Students', icon: LuUsers },
  { path: '/search', label: 'Search', icon: LuSearch },
  { path: '/progress', label: 'Progress', icon: LuTrendingUp },
  { path: '/settings', label: 'Settings', icon: LuSettings },
];

export function MobileBottomNav() {
  const location = useLocation();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-lowest/95 backdrop-blur-md border-t border-border-light z-40"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="flex justify-around items-center px-xs py-[6px] safe-area-inset-bottom">
        {items.map((item) => {
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-[2px] py-[4px] px-sm rounded-lg min-w-[56px] transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted hover:text-on-surface-variant'
              )}
            >
              <item.icon className={cn('w-5 h-5', isActive && 'stroke-[2.5]')} />
              <span className="text-[10px] font-medium leading-tight">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
