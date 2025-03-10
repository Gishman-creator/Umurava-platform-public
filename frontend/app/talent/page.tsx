'use client';
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/talent/dashboard'); // Redirect to /admin/dashboard
  return null; // Prevent rendering anything on this page
}
