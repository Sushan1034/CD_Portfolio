'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCert, setFilterCert] = useState('All');
  const [deletingId, setDeletingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('counseling_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (err) {
      console.error('Error loading requests:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('counseling_requests')
        .delete()
        .eq('id', deletingId);

      if (error) throw error;
      setRequests(prev => prev.filter(r => r.id !== deletingId));
      setDeletingId(null);
    } catch (err) {
      console.error('Error deleting request:', err);
      alert('Failed to delete request.');
    } finally {
      setIsDeleting(false);
    }
  }

  // Get unique certifications for filtering
  const uniqueCerts = ['All', ...new Set(requests.map(r => r.certification))];

  // Filter requests
  const filteredRequests = requests.filter(r => {
    const matchesSearch = 
      r.name.toLowerCase().includes(search.toLowerCase()) || 
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.message.toLowerCase().includes(search.toLowerCase());
    
    const matchesCert = filterCert === 'All' || r.certification === filterCert;

    return matchesSearch && matchesCert;
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Counseling Requests</h1>
          <p className="text-sm text-slate-400 mt-2">
            View and manage roadmap requests submitted by students from the training section.
          </p>
        </div>
        <button
          onClick={loadRequests}
          className="self-start sm:self-auto px-5 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by name, email, or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <span className="absolute left-3.5 top-3.5 text-slate-500 text-sm">🔍</span>
        </div>

        <div className="w-full md:w-64">
          <select
            value={filterCert}
            onChange={(e) => setFilterCert(e.target.value)}
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors cursor-pointer text-slate-300"
          >
            {uniqueCerts.map(cert => (
              <option key={cert} value={cert}>{cert}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Requests Content */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <span className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-slate-900/50 border border-slate-800 border-dashed rounded-3xl p-8 text-center">
          <span className="text-4xl mb-4">📥</span>
          <h3 className="text-lg font-bold text-white mb-1">No requests found</h3>
          <p className="text-xs text-slate-400">
            {requests.length === 0 ? "You haven't received any roadmap inquiries yet." : "No requests match your filters."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence>
            {filteredRequests.map((req) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-900 border border-slate-800 rounded-[1.75rem] p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6 hover:border-slate-700 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Visual Accent Line */}
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-blue-600" />

                <div className="space-y-4 flex-1">
                  {/* Row 1: Name, Email & Timestamp */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div>
                      <h3 className="text-lg font-extrabold text-white tracking-tight">{req.name}</h3>
                      <a
                        href={`mailto:${req.email}`}
                        className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1 mt-0.5"
                      >
                        {req.email} <span className="text-[10px]">✉️</span>
                      </a>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      {formatDate(req.created_at)}
                    </span>
                  </div>

                  {/* Row 2: Selected Course Badge */}
                  <div>
                    <span className="px-3 py-1 bg-blue-905/30 border border-blue-900/40 text-blue-400 rounded-lg text-[10px] font-extrabold tracking-wider uppercase">
                      Interest: {req.certification}
                    </span>
                  </div>

                  {/* Row 3: Message Body */}
                  <div className="bg-slate-950/50 border border-slate-850 p-4 rounded-xl">
                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                      {req.message}
                    </p>
                  </div>
                </div>

                {/* Side Actions Column */}
                <div className="flex md:flex-col justify-end items-end gap-3 shrink-0">
                  <a
                    href={`mailto:${req.email}?subject=Regarding your ${req.certification} Counseling Session`}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-blue-500/10"
                  >
                    💬 Reply via Email
                  </a>
                  <button
                    onClick={() => setDeletingId(req.id)}
                    className="px-4 py-2.5 bg-red-950/20 hover:bg-red-900/30 border border-red-900/30 hover:border-red-900/60 text-red-400 hover:text-red-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    🗑️ Delete Request
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Delete Confirmation Modal Popup */}
      <AnimatePresence>
        {deletingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={() => !isDeleting && setDeletingId(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-md w-full relative z-10 space-y-6 shadow-2xl"
            >
              <div className="text-center space-y-2">
                <span className="text-4xl block">⚠️</span>
                <h3 className="text-xl font-bold text-white">Delete Counseling Request?</h3>
                <p className="text-xs text-slate-400 leading-normal">
                  Are you sure you want to delete this roadmap request? This action is permanent and cannot be undone.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setDeletingId(null)}
                  disabled={isDeleting}
                  className="flex-1 py-3 bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer text-slate-300 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-500 rounded-xl text-xs font-bold transition-colors cursor-pointer text-white disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Delete Permanently"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
