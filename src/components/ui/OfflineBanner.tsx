import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export function OfflineBanner() {
  const isOnline = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-amber-950 text-center py-2 px-4 text-sm font-medium shadow-md animate-in slide-in-from-top-2 duration-300">
      <span className="inline-flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-amber-900 animate-pulse" />
        Mode Offline — Menampilkan data tersimpan. Perubahan tidak dapat disimpan.
      </span>
    </div>
  );
}
