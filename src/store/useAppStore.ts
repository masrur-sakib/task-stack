import { create } from 'zustand';
import type { Project, User } from '@/types';
import { getStoredUser, logout as authLogout } from '@/lib/auth';

interface AppState {
  user: User | null;
  selectedProject: Project | null;
  setUser: (user: User | null) => void;
  setSelectedProject: (project: Project | null) => void;
  logout: () => void;
  initFromStorage: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  selectedProject: null,

  setUser: (user) => set({ user }),

  setSelectedProject: (project) => set({ selectedProject: project }),

  logout: () => {
    authLogout();
    set({ user: null, selectedProject: null });
  },

  initFromStorage: () => {
    const user = getStoredUser();
    set({ user });
  },
}));
