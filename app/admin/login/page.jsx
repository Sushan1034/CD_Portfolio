'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if cookie already exists
    const hasCookie = document.cookie.split(';').some((item) => item.trim().startsWith('sb-access-token='));
    if (hasCookie) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      if (data?.session) {
        const { access_token } = data.session;
        // Save access token in browser cookie for middleware route guards (expires strictly in 1 hour)
        document.cookie = `sb-access-token=${access_token}; path=/; max-age=3600; SameSite=Lax; Secure`;
        router.push('/admin');
      } else {
        setErrorMsg('Authentication succeeded but session could not be established.');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('An unexpected error occurred during login.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      {/* Background ambient blur */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-[2rem] p-8 md:p-10 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Admin Portal</h1>
          <p className="text-xs text-slate-400 mt-2">Sign in to manage Sushan's portfolio dynamic content</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-900/40 rounded-xl text-xs font-bold text-red-400 text-center">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sushanaryal.com.np"
              className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white text-sm transition-all placeholder:text-slate-700"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white text-sm transition-all placeholder:text-slate-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-[0.98] shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed mt-4"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
