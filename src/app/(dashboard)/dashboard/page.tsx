'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { ProjectList } from '@/components/projects/ProjectList';
import { KanbanBoard } from '@/components/kanban/KanbanBoard';

export default function DashboardPage() {
  const { user, selectedProject, logout } = useAppStore();
  const router = useRouter();

  // Client-side auth guard
  useEffect(() => {
    if (user === null) {
      const raw = localStorage.getItem('auth_user');
      if (!raw) router.replace('/login');
    }
  }, [user, router]);

  if (!user) return null; // Prevents flash of dashboard before redirect

  return (
    <div className='flex flex-col h-screen bg-gray-50'>
      {/* Top navigation */}
      <header
        className='h-14 bg-white border-b border-gray-100 flex items-center
                         justify-between px-6 shrink-0 z-10 shadow-sm'
      >
        <div className='flex items-center gap-3'>
          <div className='w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center'>
            <svg
              className='w-4 h-4 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
              />
            </svg>
          </div>
          <span className='font-semibold text-gray-900 text-sm'>
            Task Manager
          </span>
          {selectedProject && (
            <>
              <span className='text-gray-300 text-xs'>/</span>
              <span className='text-sm text-gray-600 font-medium'>
                {selectedProject.name}
              </span>
            </>
          )}
        </div>

        <div className='flex items-center gap-3'>
          <span className='text-xs text-gray-500 hidden sm:block'>
            {user.email}
          </span>
          <button
            onClick={() => {
              logout();
              router.push('/login');
            }}
            className='text-xs text-gray-500 hover:text-red-600 border border-gray-200
                       hover:border-red-200 px-3 py-1.5 rounded-lg transition-colors'
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className='flex flex-1 overflow-hidden'>
        <ProjectList />
        <KanbanBoard />
      </div>
    </div>
  );
}
