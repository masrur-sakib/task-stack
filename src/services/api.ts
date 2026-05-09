import axios from 'axios';
import type { ApiResponse, Project, Task } from '@/types';

const BASE_URL = 'https://mf-tech.free.beeceptor.com/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach auth token if present
apiClient.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor — global error handler
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export const projectApi = {
  getAll: () =>
    apiClient.get<ApiResponse<Project>>('/project-list').then((r) => r.data),
};

export const taskApi = {
  getAll: () =>
    apiClient.get<ApiResponse<Task>>('/task-list').then((r) => r.data),
};
