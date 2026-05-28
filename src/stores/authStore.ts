import { create } from 'zustand';

interface User {
  email: string;
  name: string;
  role: 'admin' | 'mentor' | 'student';
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('user'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  setUser: (user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }

    set({ user, isAuthenticated: !!user });
  },
  logout: () => {
    localStorage.removeItem('user');
    set({ isAuthenticated: false, user: null });
  },
}));


