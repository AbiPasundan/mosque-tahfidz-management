import { Navigate, Outlet } from 'react-router';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { MobileBottomNav } from '../navigation/MobileBottomNav';
import { OfflineBanner } from '@/components/ui/OfflineBanner';
import { useMe } from '@/features/auth/hooks/useMe';
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';

function AppShell() {
  return (
    <div className="min-h-screen bg-surface flex">
      <OfflineBanner />
      <AppSidebar />
      <div className="flex-1 flex flex-col min-h-screen md:ml-sidebar-width min-w-0">
        <AppHeader />
        <main className="flex-1 px-gutter py-lg mx-auto w-full max-w-max-content-width pb-20 md:pb-lg min-w-0">
          <Outlet />
        </main>
        <MobileBottomNav />
      </div>
    </div>
  );
}

export function AppLayout() {
  const { data, isLoading, isFetching, isError, error } = useMe();
  const { isAuthenticated, logout } = useAuthStore();

  // 1. Masih loading / sedang fetch → tampilkan loading
  if (isLoading || (isFetching && !data && !isError)) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // 2. Fetch berhasil → tampilkan app
  if (data) {
    return <AppShell />;
  }

  // 3. Error 401 (token expired / invalid)
  if (isError && axios.isAxiosError(error) && error.response?.status === 401) {
    // Bersihkan local state agar tidak looping
    if (isAuthenticated) {
      logout();
    }
    return <Navigate to="/login" replace />;
  }

  // 4. Error jaringan (server mati, offline, dll.) tapi user pernah login
  //    → tetap tampilkan app dengan data cached
  if (isError && isAuthenticated) {
    return <AppShell />;
  }

  // 5. Error jaringan tanpa session lokal → tampilkan error page
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

  // 6. Tidak ada data dan tidak ada session lokal → redirect login
  if (!data && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 7. Fallback: ada session lokal tapi data belum tersedia
  //    (transient state saat PersistQueryClient restore)
  return <AppShell />;
}