export type ProjectStatus = 'active' | 'inactive';
export type TaskStatus = 'todo' | 'inprogress' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  projectId: string;
  priority: Priority;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  responseCode: number;
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export const KANBAN_COLUMNS: {
  id: TaskStatus;
  label: string;
  color: string;
}[] = [
  { id: 'todo', label: 'To Do', color: 'bg-slate-100 border-slate-300' },
  {
    id: 'inprogress',
    label: 'In Progress',
    color: 'bg-blue-50 border-blue-300',
  },
  { id: 'done', label: 'Done', color: 'bg-green-50 border-green-300' },
];
