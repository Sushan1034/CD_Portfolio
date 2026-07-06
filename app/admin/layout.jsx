'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setCheckingAuth(false);
      return;
    }

    async function checkUser() {
      // Check local cookie presence (valid for 1 hour only)
      const hasCookie = document.cookie.split(';').some((item) => item.trim().startsWith('sb-access-token='));
      if (!hasCookie) {
        await supabase.auth.signOut(); // Wipe any remaining supabase session from client cache
        router.push('/admin/login');
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
        return;
      }
      setCheckingAuth(false);
    }
    checkUser();
  }, [pathname, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    document.cookie = 'sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="mb-8 px-2">
            <Link href="/" className="text-xl font-bold tracking-tight hover:text-blue-400 transition-colors">
              SA Admin<span className="text-blue-500">.</span>
            </Link>
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Management Portal</p>
          </div>

          <nav className="space-y-1.5">
            <Link
              href="/admin"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                pathname === '/admin' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              📊 Dashboard
            </Link>
            <Link
              href="/admin/videos"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                pathname === '/admin/videos' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              🎥 Instagram Videos
            </Link>
            <Link
              href="/admin/blogs"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                pathname === '/admin/blogs' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              ✍️ Manage Blogs
            </Link>
            <Link
              href="/admin/certifications"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                pathname === '/admin/certifications' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              🎓 Certifications
            </Link>
            <Link
              href="/admin/training"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                pathname === '/admin/training' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              ☁️ Training Programs
            </Link>
            <Link
              href="/admin/requests"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                pathname === '/admin/requests' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              ✉️ Counseling Requests
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-8 flex items-center justify-center gap-2 px-4 py-3 bg-red-950/20 border border-red-900/40 text-red-400 hover:bg-red-900/40 hover:text-white rounded-xl text-sm font-bold transition-all cursor-pointer"
        >
          🚪 Sign Out
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}
