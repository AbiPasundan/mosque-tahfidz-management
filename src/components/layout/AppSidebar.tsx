import { NavLink, useLocation, useNavigate } from 'react-router';
import { useSidebarStore } from '@/store/sidebarStore';
import { cn } from '@/utils/cn';
import {
  LuLayoutDashboard,
  LuUsers,
  LuTrendingUp,
  LuSearch,
  LuHistory,
  LuSettings,
  LuLogOut,
} from 'react-icons/lu';
import { useLogout } from '@/hooks/auth/useLogout';
import { useMe } from '@/hooks/auth/useMe';
import { BsFillPersonFill } from 'react-icons/bs';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LuLayoutDashboard, roles: ['admin', 'mentor'] },
  { path: '/students', label: 'Students', icon: LuUsers, roles: ['admin', 'mentor'] },
  { path: '/mentor', label: 'Mentor', icon: BsFillPersonFill, roles: ['admin'] },
  { path: '/progress', label: 'Progress Tracking', icon: LuTrendingUp, roles: ['admin', 'mentor'] },
  { path: '/search', label: 'Global Search', icon: LuSearch, roles: ['admin', 'mentor'] },
  { path: '/history', label: 'Activity Log', icon: LuHistory, roles: ['admin', 'mentor'] },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const { isOpen, setOpen } = useSidebarStore();
  const location = useLocation();
  const logoutMutation = useLogout();
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const { data: data, isLoading, isError } = useMe();
  console.log(data.data.role);
  const userRole = data?.data?.role;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[2px] md:hidden" onClick={() => setOpen(false)} aria-hidden="true" />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 h-screen w-sidebar-width bg-surface-container-low z-40',
          'flex flex-col border-r border-border-light',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0'
        )} >
        {/* Logo */}
        <div className="flex items-center gap-sm px-lg py-4.5">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <LuLayoutDashboard className="w-5 h-5 text-on-primary" />
          </div>
          <div className="min-w-0">
            <h1 className="text-[15px] font-bold text-on-surface leading-tight tracking-tight font-[Manrope]">
              Management<br />Siswa
            </h1>
            <p className="text-[11px] text-muted leading-none mt-0.5">Teacher Portal</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-md py-sm space-y-0.5">
          {!isLoading && !isError && userRole && (
            navItems
              .filter((item) => item.roles.includes(userRole))
              .map((item) => {
                const isActive =
                  item.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.path);
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'group flex items-center gap-md px-md py-2.5 rounded-lg text-[14px] transition-all duration-150 relative',
                      isActive
                        ? 'bg-primary/8 text-primary font-medium'
                        : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                    )} >
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-0.75 rounded-full bg-primary" />
                    )}
                    <item.icon className={cn(
                      'w-4.5 h-4.5 shrink-0',
                      isActive ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'
                    )} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })
          )}
        </nav>

        {/* Bottom items */}
        <div className="px-md py-md space-y-0.5 border-t border-border-light">
          <NavLink
            to="/settings"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-md px-md py-2.5 rounded-lg text-[14px] transition-colors',
                isActive
                  ? 'bg-primary/8 text-primary font-medium'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              )
            }
          >
            <LuSettings className="w-4.5 h-4.5 shrink-0" />
            <span>Settings</span>
          </NavLink>
          <button onClick={() => handleLogout()} className="flex items-center gap-md px-md py-2.5 rounded-lg text-[14px] text-error hover:bg-error-container/50 transition-colors w-full text-left" >
            <LuLogOut className="w-4.5 h-4.5 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
