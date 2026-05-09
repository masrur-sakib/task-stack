import type { Task, TaskStatus } from '@/types';
import { TaskCard } from './TaskCard';
import { EmptyState } from '@/components/ui/EmptyState';

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

  return (
    <div
      className={`flex flex-col bg-gray-50 rounded-2xl border-t-4 ${config.accent} flex-1 min-w-[280px] max-w-sm`}
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

      {/* Cards */}
      <div className='flex-1 overflow-y-auto px-3 pb-3 space-y-3'>
        {tasks.length === 0 ? (
          <EmptyState message='No tasks here' />
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
