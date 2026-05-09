import { useQuery } from '@tanstack/react-query';
import { taskApi } from '@/services/api';

export function useTasks(projectId?: string) {
  return useQuery({
    queryKey: ['tasks', projectId],
    queryFn: taskApi.getAll,
    staleTime: 5 * 60 * 1000,
    select: (data) =>
      projectId
        ? data.data.filter((t) => t.projectId === projectId)
        : data.data,
    enabled: !!projectId,
  });
}
