import { useQuery } from '@tanstack/react-query';
import { projectApi } from '@/services/api';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: projectApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 min
    select: (data) => data.data,
  });
}
