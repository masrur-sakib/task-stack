import { create } from 'zustand';
import type { Project, Task, TaskStatus, User } from '@/types';
import { logout as authLogout } from '@/lib/auth';
import tasksData from '@/data/tasks.json';

interface AppState {
  user: User | null;
  selectedProject: Project | null;
  tasks: Task[];
  setUser: (user: User | null) => void;
  setSelectedProject: (project: Project | null) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  logout: () => void;
  initFromStorage: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  selectedProject: null,
  tasks: tasksData.data as Task[],

  setUser: (user) => set({ user }),
  setSelectedProject: (project) => set({ selectedProject: project }),

  updateTaskStatus: (taskId, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)),
    })),

  logout: () => {
    authLogout();
    set({ user: null, selectedProject: null });
  },

  initFromStorage: () => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem('auth_user');
      const user = raw ? JSON.parse(raw) : null;
      set({ user });
    } catch {
      set({ user: null });
    }
  },
}));
