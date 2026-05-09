import type { User } from '@/types';

// Static credentials for interview demo
const MOCK_USERS = [
  {
    id: 'u1',
    email: 'admin@demo.com',
    password: 'password123',
    name: 'Admin User',
  },
  {
    id: 'u2',
    email: 'dev@demo.com',
    password: 'password123',
    name: 'Dev User',
  },
];

export function login(email: string, password: string): User | null {
  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password,
  );
  if (!user) return null;
  const { password: _pw, ...safeUser } = user;
  localStorage.setItem('auth_token', btoa(JSON.stringify(safeUser)));
  localStorage.setItem('auth_user', JSON.stringify(safeUser));
  return safeUser;
}

export function logout(): void {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
}

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('auth_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getStoredUser();
}
