import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,

        setUser: (user, token) =>
          set({ user, token, isAuthenticated: true }, false, 'auth/setUser'),

        logout: () =>
          set(
            { user: null, token: null, isAuthenticated: false },
            false,
            'auth/logout',
          ),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ user: state.user, token: state.token }),
      },
    ),
    { name: 'AuthStore' },
  ),
);
