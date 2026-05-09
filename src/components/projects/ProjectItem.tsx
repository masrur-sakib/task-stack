import type { Project } from '@/types';

interface Props {
  project: Project;
  isSelected: boolean;
  onClick: () => void;
}

export function ProjectItem({ project, isSelected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-150 group
        ${
          isSelected
            ? 'bg-blue-600 text-white shadow-sm'
            : 'hover:bg-gray-100 text-gray-700'
        }`}
    >
      <div className='flex items-center justify-between'>
        <span className='font-medium text-sm truncate'>{project.name}</span>
        <span
          className={`text-xs px-1.5 py-0.5 rounded-full shrink-0 ml-2
            ${
              project.status === 'active'
                ? isSelected
                  ? 'bg-blue-500 text-blue-100'
                  : 'bg-green-100 text-green-700'
                : isSelected
                  ? 'bg-blue-500 text-blue-200'
                  : 'bg-gray-100 text-gray-500'
            }`}
        >
          {project.status}
        </span>
      </div>
      <p
        className={`text-xs mt-0.5 truncate
          ${isSelected ? 'text-blue-200' : 'text-gray-400'}`}
      >
        {project.description}
      </p>
    </button>
  );
}
