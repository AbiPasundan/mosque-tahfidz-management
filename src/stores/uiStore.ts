import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface UIState {
  isSidebarOpen: boolean;
  toasts: Toast[];

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      isSidebarOpen: true,
      toasts: [],

      toggleSidebar: () =>
        set(
          (state) => ({ isSidebarOpen: !state.isSidebarOpen }),
          false,
          'ui/toggleSidebar',
        ),

      setSidebarOpen: (open) =>
        set({ isSidebarOpen: open }, false, 'ui/setSidebarOpen'),

      addToast: (message, type = 'info') =>
        set(
          (state) => ({
            toasts: [
              ...state.toasts,
              { id: crypto.randomUUID(), message, type },
            ],
          }),
          false,
          'ui/addToast',
        ),

      removeToast: (id) =>
        set(
          (state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
          }),
          false,
          'ui/removeToast',
        ),
    }),
    { name: 'UIStore' },
  ),
);
