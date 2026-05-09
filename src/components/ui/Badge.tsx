import type { Priority } from '@/types';

const priorityStyles: Record<Priority, string> = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-green-100 text-green-700 border-green-200',
};

export function Badge({ priority }: { priority: Priority }) {
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${priorityStyles[priority]}`}
    >
      {priority}
    </span>
  );
}
