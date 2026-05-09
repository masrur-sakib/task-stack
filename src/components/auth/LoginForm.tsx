'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';
import { useAppStore } from '@/store/useAppStore';
import { Spinner } from '@/components/ui/Spinner';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setUser = useAppStore((s) => s.setUser);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600));

    const user = login(email, password);
    setLoading(false);

    if (!user) {
      setError('Invalid email or password.');
      return;
    }

    setUser(user);
    router.push('/');
  }

  return (
    <div
      className='min-h-screen bg-gradient-to-br from-slate-900 to-blue-950
                    flex items-center justify-center px-4'
    >
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8'>
        {/* Logo / Title */}
        <div className='mb-8 text-center'>
          <div
            className='inline-flex items-center justify-center w-12 h-12
                          bg-blue-600 rounded-xl mb-4'
          >
            <svg
              className='w-6 h-6 text-white'
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
          <h1 className='text-xl font-bold text-gray-900'>Task Manager</h1>
          <p className='text-sm text-gray-500 mt-1'>
            Sign in to your workspace
          </p>
        </div>

        {/* Demo hint */}
        <div className='mb-5 px-3 py-2.5 bg-blue-50 rounded-lg text-xs text-blue-700 border border-blue-100'>
          Demo credentials: <strong>admin@demo.com</strong> /{' '}
          <strong>password123</strong>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='admin@demo.com'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Password
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='••••••••'
            />
          </div>

          {error && (
            <p className='text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-lg'>
              {error}
            </p>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60
                       text-white font-medium py-2.5 rounded-lg text-sm
                       transition-colors flex items-center justify-center gap-2'
          >
            {loading && <Spinner size='sm' />}
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
