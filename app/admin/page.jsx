'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    videos: 0,
    blogs: 0,
    certifications: 0,
    training: 0,
    requests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [
          { count: videoCount },
          { count: blogCount },
          { count: certCount },
          { count: trainingCount },
          { count: requestsCount }
        ] = await Promise.all([
          supabase.from('instagram_videos').select('*', { count: 'exact', head: true }),
          supabase.from('blogs').select('*', { count: 'exact', head: true }),
          supabase.from('certifications').select('*', { count: 'exact', head: true }),
          supabase.from('training_programs').select('*', { count: 'exact', head: true }),
          supabase.from('counseling_requests').select('*', { count: 'exact', head: true })
        ]);

        setStats({
          videos: videoCount || 0,
          blogs: blogCount || 0,
          certifications: certCount || 0,
          training: trainingCount || 0,
          requests: requestsCount || 0,
        });
      } catch (err) {
        console.error('Error fetching dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const adminCards = [
    {
      title: "Instagram Videos",
      desc: "Manage loop/feed of bite-sized cloud learning videos",
      count: stats.videos,
      href: "/admin/videos",
      icon: "🎥",
      color: "border-blue-500/20 hover:border-blue-500/50 hover:shadow-blue-500/5"
    },
    {
      title: "Blogs & Technical Writing",
      desc: "Add or edit guides published on Medium or other sites",
      count: stats.blogs,
      href: "/admin/blogs",
      icon: "✍️",
      color: "border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-emerald-500/5"
    },
    {
      title: "Certifications",
      desc: "Add AWS/Oracle credentials, badges, and validation links",
      count: stats.certifications,
      href: "/admin/certifications",
      icon: "🎓",
      color: "border-orange-500/20 hover:border-orange-500/50 hover:shadow-orange-500/5"
    },
    {
      title: "Training Programs",
      desc: "Modify mentorship course features and curriculum outlines",
      count: stats.training,
      href: "/admin/training",
      icon: "☁️",
      color: "border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/5"
    },
    {
      title: "Counseling Requests",
      desc: "View and manage incoming student roadmap and scheduling inquiries",
      count: stats.requests,
      href: "/admin/requests",
      icon: "✉️",
      color: "border-sky-500/20 hover:border-sky-500/50 hover:shadow-sky-500/5"
    }
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          Welcome back! Here is a summary of Sushan's dynamic portfolio content served from the Supabase database.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <span className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {adminCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={`bg-slate-900 border ${card.color} rounded-[2rem] p-8 flex flex-col justify-between hover:scale-[1.01] transition-all duration-300 group`}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-4xl">{card.icon}</span>
                  <span className="px-4 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-lg font-bold text-slate-300">
                    {card.count}
                  </span>
                </div>
                <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors mb-2">{card.title}</h3>
                <p className="text-xs text-slate-400 leading-normal">{card.desc}</p>
              </div>

              <div className="mt-8 flex items-center justify-between text-xs font-bold text-blue-400 hover:text-blue-300 group/link pt-4 border-t border-slate-850">
                <span>Manage Collection</span>
                <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
