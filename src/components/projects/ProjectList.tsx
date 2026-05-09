'use client';

import { useProjects } from '@/hooks/useProjects';
import { useAppStore } from '@/store/useAppStore';
import { ProjectItem } from './ProjectItem';
import { Spinner } from '@/components/ui/Spinner';

export function ProjectList() {
  const { data: projects, isLoading, isError } = useProjects();
  const { selectedProject, setSelectedProject } = useAppStore();

  return (
    <aside className='w-72 shrink-0 bg-white border-r border-gray-100 flex flex-col h-full'>
      <div className='px-5 py-4 border-b border-gray-100'>
        <h2 className='text-xs font-semibold uppercase tracking-widest text-gray-400'>
          Projects
        </h2>
      </div>

      <div className='flex-1 overflow-y-auto p-3 space-y-1'>
        {isLoading && (
          <div className='flex justify-center pt-8'>
            <Spinner size='sm' />
          </div>
        )}
        {isError && (
          <p className='text-xs text-red-500 text-center pt-4'>
            Failed to load projects.
          </p>
        )}
        {projects?.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            isSelected={selectedProject?.id === project.id}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>
    </aside>
  );
}
