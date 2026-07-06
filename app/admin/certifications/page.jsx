'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { supabase } from '../../../lib/supabase';

export default function AdminCertificationsPage() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [link, setLink] = useState('');
  const [color, setColor] = useState('from-blue-400 to-blue-600');
  const [displayOrder, setDisplayOrder] = useState(0);
  const [iconFile, setIconFile] = useState(null);
  const [iconUrl, setIconUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    loadCerts();
  }, []);

  async function loadCerts() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setCerts(data || []);
    } catch (err) {
      console.error(err);
      alert('Error loading certifications from database.');
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditId(null);
    setTitle('');
    setIssuer('Amazon Web Services');
    setLink('');
    setColor('from-blue-400 to-blue-600');
    setDisplayOrder(certs.length);
    setIconFile(null);
    setIconUrl('');
    setErrorMsg('');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (c) => {
    setEditId(c.id);
    setTitle(c.title);
    setIssuer(c.issuer);
    setLink(c.link || '');
    setColor(c.color || 'from-blue-400 to-blue-600');
    setDisplayOrder(c.display_order);
    setIconFile(null);
    setIconUrl(c.icon_url || '');
    setErrorMsg('');
    setIsFormOpen(true);
  };

  const handleDelete = async (c) => {
    if (!confirm(`Are you sure you want to delete "${c.title}"?`)) return;

    try {
      // 1. Delete database record
      const { error: dbError } = await supabase
        .from('certifications')
        .delete()
        .eq('id', c.id);

      if (dbError) throw dbError;

      // 2. Remove icon file from Supabase storage if it is hosted there
      if (c.icon_url && c.icon_url.includes('.supabase.co')) {
        try {
          const urlObj = new URL(c.icon_url);
          const urlParts = urlObj.pathname.split('/');
          const fileIndex = urlParts.indexOf('images');
          if (fileIndex !== -1 && fileIndex + 1 < urlParts.length) {
            const storagePath = decodeURIComponent(urlParts.slice(fileIndex + 1).join('/'));
            await supabase.storage.from('images').remove([storagePath]);
          }
        } catch (err) {
          console.warn('Could not extract badge path to delete from storage:', err);
        }
      }

      setCerts(certs.filter(item => item.id !== c.id));
      alert('Certification deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Error deleting certification.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !issuer.trim()) return;
    if (!editId && !iconFile) {
      setErrorMsg('Please select a badge image file to upload.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      let finalIconUrl = iconUrl;

      // Upload file to Supabase images bucket if selected
      if (iconFile) {
        const fileExt = iconFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const storagePath = `badges/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(storagePath, iconFile, {
            contentType: iconFile.type,
            cacheControl: '3600',
            upsert: true
          });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('images').getPublicUrl(storagePath);
        finalIconUrl = data.publicUrl;
      }

      const payload = {
        title,
        issuer,
        link,
        color,
        display_order: parseInt(displayOrder, 10),
        icon_url: finalIconUrl,
      };

      if (editId) {
        const { error: updateError } = await supabase
          .from('certifications')
          .update(payload)
          .eq('id', editId);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('certifications')
          .insert(payload);

        if (insertError) throw insertError;
      }

      setIsFormOpen(false);
      loadCerts();
      alert(editId ? 'Certification updated successfully!' : 'Certification added successfully!');
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
          <h1 className="text-3xl font-extrabold tracking-tight">Manage Certifications</h1>
          <p className="text-sm text-slate-400 mt-2">Manage Sushan's credentials and rotating 3D slider badges served dynamically</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer shrink-0 w-fit"
        >
          ➕ Add Certification
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
                  <th className="p-4 md:p-5">Badge Preview</th>
                  <th className="p-4 md:p-5">Title</th>
                  <th className="p-4 md:p-5">Issuer</th>
                  <th className="p-4 md:p-5">Tailwind Color</th>
                  <th className="p-4 md:p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {certs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-10 text-center text-slate-500 font-bold">
                      No certifications added yet. Click "Add Certification" to add your first badge.
                    </td>
                  </tr>
                ) : (
                  certs.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-850/30 transition-colors">
                      <td className="p-4 md:p-5 font-bold text-slate-300">{c.display_order}</td>
                      <td className="p-4 md:p-5">
                        <div className="w-12 h-12 bg-slate-850 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center p-1.5">
                          {c.icon_url ? (
                            <img src={c.icon_url} alt={c.title} className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-[9px] text-slate-600">No Icon</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 md:p-5">
                        <p className="font-bold text-white text-sm">{c.title}</p>
                        {c.link && (
                          <a href={c.link} target="_blank" rel="noreferrer" className="text-[10px] text-blue-400 hover:text-blue-300 font-mono truncate max-w-[200px] block mt-0.5">
                            {c.link}
                          </a>
                        )}
                      </td>
                      <td className="p-4 md:p-5 text-slate-300 font-semibold">{c.issuer}</td>
                      <td className="p-4 md:p-5 text-slate-400 font-mono">{c.color}</td>
                      <td className="p-4 md:p-5 text-right space-x-3 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenEdit(c)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(c)}
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

      {/* Cert Form Modal popup */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={() => !submitting && setIsFormOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative w-full max-w-lg z-10 max-h-[85vh] overflow-y-auto">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-extrabold text-white">
                  {editId ? 'Edit Certification' : 'Add Certification'}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5">
                  Define AWS, Oracle, or other industry certifications rotating on the home page slider
                </p>
              </div>

              {errorMsg && (
                <div className="p-3.5 bg-red-950/40 border border-red-900/40 rounded-xl text-xs font-bold text-red-400 text-center">
                  ⚠️ {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div className="flex flex-col">
                  <label htmlFor="cert-title" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Certification Title
                  </label>
                  <input
                    type="text"
                    id="cert-title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. AWS Certified Solutions Architect Associate"
                    className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white text-sm"
                  />
                </div>

                {/* Issuer */}
                <div className="flex flex-col">
                  <label htmlFor="cert-issuer" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Accredited Issuer
                  </label>
                  <input
                    type="text"
                    id="cert-issuer"
                    required
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                    placeholder="e.g. Amazon Web Services"
                    className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white text-sm"
                  />
                </div>

                {/* Link */}
                <div className="flex flex-col">
                  <label htmlFor="cert-link" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Credential URL / Verification Link
                  </label>
                  <input
                    type="url"
                    id="cert-link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://www.credly.com/badges/..."
                    className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Tailwind gradient color */}
                  <div className="flex flex-col">
                    <label htmlFor="cert-color" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Card Glow (Tailwind Gradient Class)
                    </label>
                    <input
                      type="text"
                      id="cert-color"
                      required
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      placeholder="from-orange-400 to-orange-600"
                      className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white text-sm"
                    />
                  </div>

                  {/* Display Order */}
                  <div className="flex flex-col">
                    <label htmlFor="cert-order" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Display Order (Sorting weight)
                    </label>
                    <input
                      type="number"
                      id="cert-order"
                      required
                      value={displayOrder}
                      onChange={(e) => setDisplayOrder(e.target.value)}
                      className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white text-sm"
                    />
                  </div>
                </div>

                {/* Badge Image upload */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    {editId ? 'Replace Badge Image (Optional)' : 'Select Badge Image File'}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setIconFile(e.target.files[0])}
                    className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 file:cursor-pointer text-slate-400"
                  />
                  {editId && (
                    <p className="text-[9px] text-slate-500 mt-1 italic">
                      If left blank, the current badge image will be kept.
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
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
                        Saving Badge...
                      </>
                    ) : (
                      editId ? 'Save Changes' : 'Add Certification'
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
