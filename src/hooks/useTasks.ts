import { useAppStore } from '@/store/useAppStore';

export function useTasks(projectId?: string) {
  const tasks = useAppStore((s) => s.tasks);

  const filtered = projectId
    ? tasks.filter((t) => t.projectId === projectId)
    : tasks;

  return {
    data: filtered,
    isLoading: false,
    isError: false,
  };
}
