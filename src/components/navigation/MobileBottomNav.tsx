import { BsFillPersonFill } from "react-icons/bs"; 
import { NavLink, useLocation } from 'react-router';
import { cn } from '@/utils/cn';
import {
  LuLayoutDashboard,
  LuUsers,
  LuSearch,
  LuTrendingUp,
  LuHistory,
} from 'react-icons/lu';
const items = [
  { path: '/', label: 'Dashboard', icon: LuLayoutDashboard, roles: ['admin', 'mentor'] },
  { path: '/students', label: 'Students', icon: LuUsers, roles: ['admin', 'mentor'] },
  { path: '/mentor', label: 'Mentor', icon: BsFillPersonFill, roles: ['admin'] },
  { path: '/progress', label: 'Progress Tracking', icon: LuTrendingUp, roles: ['admin', 'mentor'] },
  { path: '/search', label: 'Global Search', icon: LuSearch, roles: ['admin', 'mentor'] },
  { path: '/history', label: 'Activity Log', icon: LuHistory, roles: ['admin', 'mentor'] },
];

export function MobileBottomNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-lowest/95 backdrop-blur-md border-t border-border-light z-40" role="navigation" aria-label="Mobile navigation" >
      <div className="flex justify-around items-center px-xs py-1.5 safe-area-inset-bottom">
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
                'flex flex-col items-center gap-0.5 py-[4px] px-sm rounded-lg min-w-14 transition-colors',
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
