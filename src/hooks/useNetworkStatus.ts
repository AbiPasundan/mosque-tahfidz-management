import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

/**
 * Hook reaktif untuk mendeteksi status koneksi.
 * Menggunakan useSyncExternalStore (React 18+) agar concurrent-safe.
 */
export function useNetworkStatus() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
