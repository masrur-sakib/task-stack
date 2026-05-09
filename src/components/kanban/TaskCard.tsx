import type { Task } from '@/types';
import { Badge } from '@/components/ui/Badge';

export function TaskCard({ task }: { task: Task }) {
  const date = new Date(task.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className='bg-white rounded-xl border border-gray-100 p-4 shadow-sm
                    hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 cursor-pointer group'
    >
      <p className='text-sm font-medium text-gray-800 leading-snug mb-3'>
        {task.title}
      </p>
      <div className='flex items-center justify-between'>
        <Badge priority={task.priority} />
        <span className='text-xs text-gray-400'>{date}</span>
      </div>
    </div>
  );
}
