import { useRef, useState } from 'react';
import type { Task, TaskStatus } from '@/types';
import { TaskCard } from './TaskCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppStore } from '@/store/useAppStore';

const COLUMN_CONFIG: Record<
  TaskStatus,
  { label: string; accent: string; dot: string }
> = {
  todo: { label: 'To Do', accent: 'border-t-slate-400', dot: 'bg-slate-400' },
  inprogress: {
    label: 'In Progress',
    accent: 'border-t-blue-500',
    dot: 'bg-blue-500',
  },
  done: {
    label: 'Done',
    accent: 'border-t-emerald-500',
    dot: 'bg-emerald-500',
  },
};

interface Props {
  status: TaskStatus;
  tasks: Task[];
}

export function KanbanColumn({ status, tasks }: Props) {
  const config = COLUMN_CONFIG[status];
  const updateTaskStatus = useAppStore((s) => s.updateTaskStatus);
  const [isDragOver, setIsDragOver] = useState(false);
  const dragCounter = useRef(0); // tracks how deep into children we are

  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault();
    dragCounter.current += 1;
    if (dragCounter.current === 1) setIsDragOver(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) setIsDragOver(false); // only hides when truly leaving the column
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    dragCounter.current = 0; // reset counter on drop
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) updateTaskStatus(taskId, status);
  }

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`flex flex-col rounded-2xl border-t-4 flex-1 min-w-[280px] max-w-sm
        transition-colors duration-150
        ${config.accent}
        ${isDragOver ? 'bg-blue-50 ring-2 ring-blue-300 ring-inset' : 'bg-gray-50'}`}
    >
      {/* Header */}
      <div className='flex items-center justify-between px-4 py-3'>
        <div className='flex items-center gap-2'>
          <span className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
          <h3 className='text-sm font-semibold text-gray-700'>
            {config.label}
          </h3>
        </div>
        <span className='text-xs font-medium bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full'>
          {tasks.length}
        </span>
      </div>

      {/* Drop zone hint */}
      {isDragOver && (
        <div className='mx-3 mb-2 border-2 border-dashed border-blue-300 rounded-xl py-4 text-center text-xs text-blue-400'>
          Drop here
        </div>
      )}

      {/* Cards */}
      <div className='flex-1 overflow-y-auto px-3 pb-3 space-y-3'>
        {tasks.length === 0 && !isDragOver ? (
          <EmptyState message='No tasks here' />
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
