import { Navigate, Outlet } from 'react-router';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { MobileBottomNav } from '../navigation/MobileBottomNav';
import { useMe } from '@/features/auth/hooks/useMe';
import axios from 'axios';

export function AppLayout() {
  const { data, isLoading, isError, error } = useMe();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError && axios.isAxiosError(error) && error.response?.status === 401) {
    return <Navigate to="/login" replace />;
  }

  if (isError) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-md p-lg text-center">
        <div className="text-error text-4xl">⚠️</div>
        <h2 className="text-h2 text-on-surface">Connection Error</h2>
        <p className="text-body-md text-muted max-w-md">
          Unable to reach the server. Please check your internet connection or try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-lg py-2 rounded-lg bg-primary text-on-primary text-[14px] font-semibold"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  if (!data) {
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