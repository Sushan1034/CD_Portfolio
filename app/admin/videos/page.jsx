'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { supabase } from '../../../lib/supabase';

export default function AdminVideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(''); // Used if editing without uploading new file
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    loadVideos();
  }, []);

  async function loadVideos() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('instagram_videos')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setVideos(data || []);
    } catch (err) {
      console.error(err);
      alert('Error loading videos from database.');
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditId(null);
    setTitle('');
    setDisplayOrder(videos.length);
    setVideoFile(null);
    setVideoUrl('');
    setErrorMsg('');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (v) => {
    setEditId(v.id);
    setTitle(v.title);
    setDisplayOrder(v.display_order);
    setVideoFile(null);
    setVideoUrl(v.video_url);
    setErrorMsg('');
    setIsFormOpen(true);
  };

  const handleDelete = async (v) => {
    if (!confirm(`Are you sure you want to delete "${v.title}"?`)) return;

    try {
      // 1. Delete from Supabase Database
      const { error: dbError } = await supabase
        .from('instagram_videos')
        .delete()
        .eq('id', v.id);

      if (dbError) throw dbError;

      // 2. Extract path and delete from Supabase Storage
      try {
        const urlObj = new URL(v.video_url);
        const urlParts = urlObj.pathname.split('/');
        // The bucket path is after '/object/public/videos/'
        const fileIndex = urlParts.indexOf('videos');
        if (fileIndex !== -1 && fileIndex + 1 < urlParts.length) {
          const storagePath = decodeURIComponent(urlParts.slice(fileIndex + 1).join('/'));
          await supabase.storage.from('videos').remove([storagePath]);
        }
      } catch (err) {
        console.warn('Could not extract path to delete file from Storage:', err);
      }

      setVideos(videos.filter(item => item.id !== v.id));
      alert('Video deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Error deleting video.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (!editId && !videoFile) {
      setErrorMsg('Please select an MP4 file to upload.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      let finalVideoUrl = videoUrl;

      // Upload file to Supabase storage if selected
      if (videoFile) {
        const fileExt = videoFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const storagePath = `instagram/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('videos')
          .upload(storagePath, videoFile, {
            contentType: 'video/mp4',
            cacheControl: '3600',
            upsert: true
          });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('videos').getPublicUrl(storagePath);
        finalVideoUrl = data.publicUrl;
      }

      const payload = {
        title,
        video_url: finalVideoUrl,
        display_order: parseInt(displayOrder, 10),
      };

      if (editId) {
        // Update database record
        const { error: updateError } = await supabase
          .from('instagram_videos')
          .update(payload)
          .eq('id', editId);

        if (updateError) throw updateError;
      } else {
        // Insert database record
        const { error: insertError } = await supabase
          .from('instagram_videos')
          .insert(payload);

        if (insertError) throw insertError;
      }

      setIsFormOpen(false);
      loadVideos();
      alert(editId ? 'Video updated successfully!' : 'Video added and uploaded successfully!');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Error occurred during save operations.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Manage Instagram Videos</h1>
          <p className="text-sm text-slate-400 mt-2">Upload and manage bite-sized cloud learning loops served from Supabase S3 storage</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer shrink-0 w-fit"
        >
          ➕ Add Instagram Video
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-widest text-[9px] font-black">
                  <th className="p-4 md:p-5">Order</th>
                  <th className="p-4 md:p-5">Title</th>
                  <th className="p-4 md:p-5">Player Preview</th>
                  <th className="p-4 md:p-5">File URL</th>
                  <th className="p-4 md:p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {videos.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-10 text-center text-slate-500 font-bold">
                      No videos uploaded yet. Click "Add Instagram Video" to upload your first MP4 to Supabase storage.
                    </td>
                  </tr>
                ) : (
                  videos.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-850/30 transition-colors">
                      <td className="p-4 md:p-5 font-bold text-slate-300">{v.display_order}</td>
                      <td className="p-4 md:p-5 font-bold text-white text-sm max-w-xs truncate">{v.title}</td>
                      <td className="p-4 md:p-5">
                        <div className="w-12 h-20 bg-black rounded-lg overflow-hidden border border-slate-800 relative">
                          <video src={v.video_url} className="w-full h-full object-cover" preload="metadata" muted playsInline />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="text-[10px]">▶️</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 md:p-5 text-slate-400 max-w-xs truncate font-mono">
                        <a href={v.video_url} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">
                          {v.video_url}
                        </a>
                      </td>
                      <td className="p-4 md:p-5 text-right space-x-3 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenEdit(v)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(v)}
                          className="px-3 py-1.5 bg-red-950/20 hover:bg-red-600/40 text-red-400 hover:text-white border border-red-950 hover:border-transparent rounded-lg transition-colors cursor-pointer"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload Form Modal Popup */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop click to close */}
            <div onClick={() => !submitting && setIsFormOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            
            {/* Form modal body */}
            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative w-full max-w-lg z-10 space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-extrabold text-white">
                  {editId ? 'Edit Video Details' : 'Upload Instagram Video'}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5">
                  {editId ? 'Modify metadata or replace video files' : 'Select an MP4 file to upload directly to Supabase S3 storage'}
                </p>
              </div>

              {errorMsg && (
                <div className="p-3.5 bg-red-950/40 border border-red-900/40 rounded-xl text-xs font-bold text-red-400 text-center">
                  ⚠️ {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div className="flex flex-col">
                  <label htmlFor="form-title" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Video Title
                  </label>
                  <input
                    type="text"
                    id="form-title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. AWS EC2 Security Groups - Day 1"
                    className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white text-sm transition-all"
                  />
                </div>

                {/* Display Order */}
                <div className="flex flex-col">
                  <label htmlFor="form-order" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Display Order (Sorting weight)
                  </label>
                  <input
                    type="number"
                    id="form-order"
                    required
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white text-sm transition-all"
                  />
                </div>

                {/* MP4 File Selector */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    {editId ? 'Replace Video File (Optional)' : 'Select MP4 Video File'}
                  </label>
                  <input
                    type="file"
                    accept="video/mp4"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                    className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 file:cursor-pointer text-slate-400"
                  />
                  {editId && (
                    <p className="text-[10px] text-slate-500 mt-1 leading-normal italic">
                      If left blank, the current video file will not be replaced.
                    </p>
                  )}
                </div>

                {/* Modal Buttons */}
                <div className="flex gap-4 pt-4 border-t border-slate-850">
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => setIsFormOpen(false)}
                    className="flex-1 py-3 bg-slate-850 hover:bg-slate-800 text-slate-200 rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {submitting ? (
                      <>
                        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Uploading File...
                      </>
                    ) : (
                      editId ? 'Save Changes' : 'Upload Video'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
