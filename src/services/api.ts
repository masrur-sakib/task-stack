import axios from 'axios';
import type { ApiResponse, Project, Task } from '@/types';

export const apiClient = axios.create({
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

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
    apiClient
      .get<
        ApiResponse<Project>
      >('https://api.mockfly.dev/mocks/952d7413-744d-4aee-b2b0-e2cdea4cf12e/api/v1/projects')
      .then((r) => r.data),
};

export const taskApi = {
  getAll: () =>
    apiClient
      .get<
        ApiResponse<Task>
      >('https://mf-tech.free.beeceptor.com/api/v1/task-list')
      .then((r) => r.data),
};
