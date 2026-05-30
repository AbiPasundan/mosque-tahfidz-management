import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { toast } from 'sonner';

/**
 * Hook untuk mem-block aksi mutasi saat offline.
 * Mengembalikan `isOnline` dan `guardAction` yang wraps callback
 * dengan pengecekan koneksi — menampilkan toast warning jika offline.
 */
export function useOfflineGuard() {
  const isOnline = useNetworkStatus();

  const guardAction = (action: () => void) => {
    if (!isOnline) {
      toast.warning('Kamu sedang offline. Tindakan ini memerlukan koneksi internet.');
      return;
    }
    action();
  };

  return { isOnline, guardAction };
}
