'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { supabase } from '../../../lib/supabase';

export default function AdminTrainingPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState(['']); // Array of features
  const [displayOrder, setDisplayOrder] = useState(0);
  const [badgeFile, setBadgeFile] = useState(null);
  const [badgeIconUrl, setBadgeIconUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    loadPrograms();
  }, []);

  async function loadPrograms() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('training_programs')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPrograms(data || []);
    } catch (err) {
      console.error(err);
      alert('Error loading training programs from database.');
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditId(null);
    setTitle('');
    setCode('');
    setLevel('');
    setDescription('');
    setFeatures(['']);
    setDisplayOrder(programs.length);
    setBadgeFile(null);
    setBadgeIconUrl('');
    setErrorMsg('');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditId(p.id);
    setTitle(p.title);
    setCode(p.code);
    setLevel(p.level);
    setDescription(p.description || '');
    setFeatures(p.features && p.features.length > 0 ? p.features : ['']);
    setDisplayOrder(p.display_order || 0);
    setBadgeFile(null);
    setBadgeIconUrl(p.badge_icon || '');
    setErrorMsg('');
    setIsFormOpen(true);
  };

  const handleDelete = async (p) => {
    if (!confirm(`Are you sure you want to delete "${p.title}"?`)) return;

    try {
      const { error } = await supabase
        .from('training_programs')
        .delete()
        .eq('id', p.id);

      if (error) throw error;

      // Remove storage badge if hosted
      if (p.badge_icon && p.badge_icon.includes('.supabase.co')) {
        try {
          const urlObj = new URL(p.badge_icon);
          const urlParts = urlObj.pathname.split('/');
          const fileIndex = urlParts.indexOf('images');
          if (fileIndex !== -1 && fileIndex + 1 < urlParts.length) {
            const storagePath = decodeURIComponent(urlParts.slice(fileIndex + 1).join('/'));
            await supabase.storage.from('images').remove([storagePath]);
          }
        } catch (err) {
          console.warn('Could not remove file from storage:', err);
        }
      }

      setPrograms(programs.filter(item => item.id !== p.id));
      alert('Training program deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Error deleting training program.');
    }
  };

  const handleAddFeatureField = () => {
    setFeatures([...features, '']);
  };

  const handleRemoveFeatureField = (index) => {
    if (features.length === 1) return;
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleFeatureChange = (index, value) => {
    const nextFeatures = [...features];
    nextFeatures[index] = value;
    setFeatures(nextFeatures);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !code.trim() || !level.trim()) return;

    setSubmitting(true);
    setErrorMsg('');

    try {
      let finalBadgeIcon = badgeIconUrl;

      // Upload file to Supabase storage images bucket if selected
      if (badgeFile) {
        const fileExt = badgeFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const storagePath = `programs/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(storagePath, badgeFile, {
            contentType: badgeFile.type,
            cacheControl: '3600',
            upsert: true
          });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('images').getPublicUrl(storagePath);
        finalBadgeIcon = data.publicUrl;
      }

      // Filter empty features
      const filteredFeatures = features
        .map(f => f.trim())
        .filter(f => f !== '');

      const payload = {
        title,
        code,
        level,
        description,
        features: filteredFeatures,
        display_order: parseInt(displayOrder, 10),
        badge_icon: finalBadgeIcon || null
      };

      if (editId) {
        const { error: updateError } = await supabase
          .from('training_programs')
          .update(payload)
          .eq('id', editId);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('training_programs')
          .insert(payload);

        if (insertError) throw insertError;
      }

      setIsFormOpen(false);
      loadPrograms();
      alert(editId ? 'Program updated successfully!' : 'Program added successfully!');
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
          <h1 className="text-3xl font-extrabold tracking-tight">Manage Training Programs</h1>
          <p className="text-sm text-slate-400 mt-2">Create and update AWS certification prep programs, billing scenarios, and learning features</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer shrink-0 w-fit"
        >
          ➕ Add Training Program
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
                  <th className="p-4 md:p-5">Icon</th>
                  <th className="p-4 md:p-5">Title (Code)</th>
                  <th className="p-4 md:p-5">Level Label</th>
                  <th className="p-4 md:p-5">Features Count</th>
                  <th className="p-4 md:p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {programs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-10 text-center text-slate-500 font-bold">
                      No training programs added yet. Click "Add Training Program" to add your first prep course.
                    </td>
                  </tr>
                ) : (
                  programs.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-850/30 transition-colors">
                      <td className="p-4 md:p-5 font-bold text-slate-300">{p.display_order}</td>
                      <td className="p-4 md:p-5">
                        <div className="w-10 h-10 bg-slate-850 rounded-lg border border-slate-800 flex items-center justify-center p-1 relative">
                          {p.badge_icon ? (
                            <img src={p.badge_icon} alt={p.title} className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-[14px]">☁️</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 md:p-5">
                        <p className="font-bold text-white text-sm">{p.title}</p>
                        <p className="text-[9px] font-black text-slate-400 mt-0.5">{p.code}</p>
                      </td>
                      <td className="p-4 md:p-5 text-slate-300 font-medium">{p.level}</td>
                      <td className="p-4 md:p-5 text-slate-400 font-mono">{(p.features || []).length} items</td>
                      <td className="p-4 md:p-5 text-right space-x-3 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
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

      {/* Program Form Modal popup */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={() => !submitting && setIsFormOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative w-full max-w-xl z-10 max-h-[85vh] overflow-y-auto">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-extrabold text-white">
                  {editId ? 'Edit Program Details' : 'Add Prep Program'}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5">
                  Define targeted certifications prep plans, features, and roadmaps
                </p>
              </div>

              {errorMsg && (
                <div className="p-3.5 bg-red-950/40 border border-red-900/40 rounded-xl text-xs font-bold text-red-400 text-center">
                  ⚠️ {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="flex flex-col">
                    <label htmlFor="prog-title" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Program Title
                    </label>
                    <input
                      type="text"
                      id="prog-title"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. AWS Solutions Architect"
                      className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white text-sm"
                    />
                  </div>

                  {/* Code */}
                  <div className="flex flex-col">
                    <label htmlFor="prog-code" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Certification Code
                    </label>
                    <input
                      type="text"
                      id="prog-code"
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="e.g. SAA-C03"
                      className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Level */}
                  <div className="flex flex-col">
                    <label htmlFor="prog-level" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Level Label
                    </label>
                    <input
                      type="text"
                      id="prog-level"
                      required
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      placeholder="e.g. Associate Level Counseling"
                      className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white text-sm"
                    />
                  </div>

                  {/* Display Order */}
                  <div className="flex flex-col">
                    <label htmlFor="prog-order" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Display Order (Sorting weight)
                    </label>
                    <input
                      type="number"
                      id="prog-order"
                      required
                      value={displayOrder}
                      onChange={(e) => setDisplayOrder(e.target.value)}
                      className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white text-sm"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col">
                  <label htmlFor="prog-desc" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Description Text
                  </label>
                  <textarea
                    id="prog-desc"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a detailed roadmap description of the mentorship path..."
                    className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white text-sm resize-none"
                  />
                </div>

                {/* Dynamic Features List */}
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Mentorship Focus Features (Bullet Points)
                    </label>
                    <button
                      type="button"
                      onClick={handleAddFeatureField}
                      className="text-[10px] text-blue-400 hover:text-blue-300 font-bold uppercase transition-colors"
                    >
                      ➕ Add Bullet Point
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                    {features.map((feature, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <input
                          type="text"
                          required
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          placeholder={`Bullet #${index + 1}`}
                          className="flex-1 px-4 py-2 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white text-xs"
                        />
                        <button
                          type="button"
                          disabled={features.length === 1}
                          onClick={() => handleRemoveFeatureField(index)}
                          className="w-8 h-8 rounded-lg bg-red-950/20 hover:bg-red-650/40 text-red-400 hover:text-white flex items-center justify-center transition-colors disabled:opacity-30 cursor-pointer"
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Icon badge uploader */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    {editId ? 'Replace Program Badge Image (Optional)' : 'Select Badge Image File'}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBadgeFile(e.target.files[0])}
                    className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 file:cursor-pointer text-slate-400"
                  />
                  {editId && (
                    <p className="text-[9px] text-slate-500 mt-1 italic">
                      If left blank, the current program badge will be kept.
                    </p>
                  )}
                </div>

                {/* Form Buttons */}
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
                        Saving...
                      </>
                    ) : (
                      editId ? 'Save Changes' : 'Add Program'
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
