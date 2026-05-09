import { redirect } from 'next/navigation';

// Redirect root to the dashboard — middleware handles the auth check
export default function RootPage() {
  redirect('/dashboard');
}
