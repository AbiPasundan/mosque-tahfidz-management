import { Navigate, Outlet } from 'react-router';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { MobileBottomNav } from '../navigation/MobileBottomNav';
import { useMe } from '@/hooks/auth/useMe';
// import { useMe } from '@/services/auth';

export function AppLayout() {
  const { data, isLoading, isError } = useMe();
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError || !data) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-surface flex">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-h-screen md:ml-sidebar-width">
        <AppHeader />
        <main className="flex-1 px-gutter py-lg mx-auto w-full max-w-max-content-width pb-20 md:pb-lg">
          <Outlet />
        </main>
        <MobileBottomNav />
      </div>
    </div>
  );
}