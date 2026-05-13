import { create } from 'zustand';

interface User {
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'staff';
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  login: async (email: string) => {
    // Mock authentication
    await new Promise(resolve => setTimeout(resolve, 500));
    set({
      isAuthenticated: true,
      user: {
        email,
        name: 'Ustadz Ahmad',
        role: 'admin',
      },
      token: 'mock-token',
    });
    return true;
  },
  logout: () => set({ isAuthenticated: false, user: null, token: null }),
}));
