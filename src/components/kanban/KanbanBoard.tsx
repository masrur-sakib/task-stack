'use client';

import type { TaskStatus } from '@/types';
import { useTasks } from '@/hooks/useTasks';
import { useAppStore } from '@/store/useAppStore';
import { KanbanColumn } from './KanbanColumn';

const STATUSES: TaskStatus[] = ['todo', 'inprogress', 'done'];

export function KanbanBoard() {
  const { selectedProject } = useAppStore();
  const { data: tasks, isLoading, isError } = useTasks(selectedProject?.id);

  if (!selectedProject) {
    return (
      <div className='flex-1 flex items-center justify-center text-gray-400 flex-col gap-3'>
        <svg
          className='w-12 h-12 opacity-40'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.5}
            d='M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2'
          />
        </svg>
        <p className='text-sm'>Select a project to view its board</p>
      </div>
    );
  }

  if (isLoading) return null;

  if (isError) {
    return (
      <div className='flex-1 flex items-center justify-center text-red-500 text-sm'>
        Failed to load tasks. Please try again.
      </div>
    );
  }

  return (
    <div className='flex-1 overflow-auto p-6'>
      <div className='flex gap-4 h-full min-h-[500px]'>
        {STATUSES.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={(tasks ?? []).filter((t) => t.status === status)}
          />
        ))}
      </div>
    </div>
  );
}
