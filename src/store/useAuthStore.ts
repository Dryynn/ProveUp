import { create } from 'zustand';
import { apiRequest } from '../services/api';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('@proveup:token'),
  isAuthenticated: !!localStorage.getItem('@proveup:token'),
  isLoading: false,

  setAuth: (user, token) => {
    localStorage.setItem('@proveup:token', token);
    localStorage.setItem('@proveup:user', JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('@proveup:token');
    localStorage.removeItem('@proveup:user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('@proveup:token');
    if (!token) {
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      return;
    }

    try {
      set({ isLoading: true });
      const data = await apiRequest<{ user: User }>('/auth/me');
      set({ user: data.user, isAuthenticated: true, isLoading: false });
    } catch {
      localStorage.removeItem('@proveup:token');
      localStorage.removeItem('@proveup:user');
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
