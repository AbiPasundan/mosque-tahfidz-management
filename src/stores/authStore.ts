import { create } from 'zustand';

interface User {
  email: string;
  name: string;
  role: 'admin' | 'mentor' | 'student';
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setToken: (token) => set({ token }),
  logout: () => set({ isAuthenticated: false, user: null, token: null }),
}));
