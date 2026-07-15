'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { supabase } from '../../../lib/supabase';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [readTime, setReadTime] = useState('');
  const [link, setLink] = useState('');
  const [date, setDate] = useState('');
  const [tagsInput, setTagsInput] = useState(''); // Comma separated tags input
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState(''); // Blog content body
  const [slug, setSlug] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    loadBlogs();
  }, []);

  async function loadBlogs() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (err) {
      console.error(err);
      alert('Error loading blogs from database.');
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditId(null);
    setTitle('');
    setExcerpt('');
    setReadTime('5 min read');
    setLink('');
    setContent('');
    // Default date to today
    setDate(new Date().toISOString().split('T')[0]);
    setTagsInput('');
    setImageFile(null);
    setImageUrl('');
    setSlug('');
    setErrorMsg('');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (b) => {
    setEditId(b.id);
    setTitle(b.title);
    setExcerpt(b.excerpt || '');
    setReadTime(b.read_time || '');
    setLink(b.link || '');
    setContent(b.content || '');
    setDate(b.date || '');
    setTagsInput((b.tags || []).join(', '));
    setImageFile(null);
    setImageUrl(b.image_url || '');
    setSlug(b.slug || '');
    setErrorMsg('');
    setIsFormOpen(true);
  };

  const handleDelete = async (b) => {
    if (!confirm(`Are you sure you want to delete "${b.title}"?`)) return;

    try {
      // 1. Delete from database
      const { error: dbError } = await supabase
        .from('blogs')
        .delete()
        .eq('id', b.id);

      if (dbError) throw dbError;

      // 2. Remove banner image from Supabase storage if it is hosted there
      if (b.image_url && b.image_url.includes('.supabase.co')) {
        try {
          const urlObj = new URL(b.image_url);
          const urlParts = urlObj.pathname.split('/');
          const fileIndex = urlParts.indexOf('images');
          if (fileIndex !== -1 && fileIndex + 1 < urlParts.length) {
            const storagePath = decodeURIComponent(urlParts.slice(fileIndex + 1).join('/'));
            await supabase.storage.from('images').remove([storagePath]);
          }
        } catch (err) {
          console.warn('Could not extract image path to delete from storage:', err);
        }
      }

      setBlogs(blogs.filter(item => item.id !== b.id));
      alert('Blog post deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Error deleting blog post.');
    }
  };

  const insertMarkdown = (syntaxBefore, syntaxAfter = '') => {
    const textarea = document.getElementById('blog-content');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    const replacement = syntaxBefore + (selectedText || '') + syntaxAfter;
    const newContent = text.substring(0, start) + replacement + text.substring(end);
    
    setContent(newContent);

    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + syntaxBefore.length,
        start + syntaxBefore.length + (selectedText || '').length
      );
    }, 0);
  };

  const handleInsertLink = () => {
    const url = prompt("Enter URL (e.g., /about for internal, or https://... for external):");
    if (url === null) return;
    const text = prompt("Enter link text:", "link");
    if (text === null) return;
    insertMarkdown(`[${text}](${url})`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    setErrorMsg('');

    if (!link.trim() && !content.trim()) {
      setErrorMsg("Please either specify an External Article Link OR write the Blog Article Body content.");
      setSubmitting(false);
      return;
    }

    try {
      let finalImageUrl = imageUrl;

      // Upload banner image file to Supabase images bucket if selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const storagePath = `blog-banners/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(storagePath, imageFile, {
            contentType: imageFile.type,
            cacheControl: '3600',
            upsert: true
          });

        if (uploadError) {
          throw { isSupabaseError: true, ...uploadError, customMessage: "Failed to upload banner image." };
        }

        const { data } = supabase.storage.from('images').getPublicUrl(storagePath);
        finalImageUrl = data.publicUrl;
      }

      // Parse tags input
      const tagsArray = tagsInput
        .split(',')
        .map(t => t.trim())
        .filter(t => t !== '');

      const finalSlug = (slug.trim() || title)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      const payload = {
        title,
        slug: finalSlug,
        excerpt,
        read_time: readTime,
        link: link.trim() || null,
        content: content.trim() || null,
        date: date || null,
        tags: tagsArray,
        image_url: finalImageUrl || null,
      };

      if (editId) {
        const res = await supabase
          .from('blogs')
          .update(payload)
          .eq('id', editId);

        if (res.error) {
          throw { isSupabaseError: true, ...res.error };
        }
      } else {
        const res = await supabase
          .from('blogs')
          .insert(payload);

        if (res.error) {
          throw { isSupabaseError: true, ...res.error };
        }
      }

      setIsFormOpen(false);
      loadBlogs();
      alert(editId ? 'Blog updated successfully!' : 'Blog post added successfully!');
    } catch (err) {
      console.warn('Blog Save Attempt Failed:', err);
      
      let msg = err?.customMessage || err?.message || 'Error occurred during save operations.';
      
      // Handle Postgres unique constraint violation (duplicate slug)
      if (err?.code === '23505') {
        msg = "A blog post with this Title/Slug already exists. Please use a different title or modify the Custom Slug to be unique.";
      }
      
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Manage Blog Posts</h1>
          <p className="text-sm text-slate-400 mt-2">Manage Sushan's technical articles and study notes shown in the dynamic slider pages</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer shrink-0 w-fit"
        >
          ➕ Add Blog Post
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
                  <th className="p-4 md:p-5">Banner</th>
                  <th className="p-4 md:p-5">Title</th>
                  <th className="p-4 md:p-5">Published Date</th>
                  <th className="p-4 md:p-5">Tags</th>
                  <th className="p-4 md:p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {blogs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-10 text-center text-slate-500 font-bold">
                      No blog posts published yet. Click "Add Blog Post" to add your first article.
                    </td>
                  </tr>
                ) : (
                  blogs.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-850/30 transition-colors">
                      <td className="p-4 md:p-5">
                        <div className="w-14 h-9 bg-slate-850 rounded overflow-hidden border border-slate-800 relative">
                          {b.image_url ? (
                            <img src={b.image_url} alt={b.title} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[10px] absolute inset-0 flex items-center justify-center text-slate-600">No Image</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 md:p-5 max-w-xs md:max-w-sm">
                        <p className="font-bold text-white text-sm truncate">{b.title}</p>
                        <p className="text-[10px] text-slate-500 mt-1 max-w-[280px] truncate">{b.excerpt}</p>
                      </td>
                      <td className="p-4 md:p-5 text-slate-300 font-medium whitespace-nowrap">{b.date}</td>
                      <td className="p-4 md:p-5">
                        <div className="flex flex-wrap gap-1.5 max-w-xs">
                          {(b.tags || []).map(t => (
                            <span key={t} className="px-1.5 py-0.5 bg-slate-800 border border-slate-750 text-slate-400 text-[9px] rounded font-bold uppercase">{t}</span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 md:p-5 text-right space-x-3 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenEdit(b)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(b)}
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

      {/* Blog Entry Form Modal popup */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={() => !submitting && setIsFormOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative w-full max-w-xl z-10 max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-extrabold text-white">
                  {editId ? 'Edit Blog Post' : 'Add New Blog Post'}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5">
                  Provide credentials, dates, tags, and custom banners for your articles
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
                  <label htmlFor="blog-title" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    id="blog-title"
                    required
                    value={title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      setTitle(newTitle);
                      // If it's a new blog, auto-generate the slug from the title
                      if (!editId) {
                        const generatedSlug = newTitle
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)+/g, '');
                        setSlug(generatedSlug);
                      }
                    }}
                    placeholder="AWS Shared Responsibility Model Demystified"
                    className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white text-sm"
                  />
                </div>

                {/* Slug */}
                <div className="flex flex-col">
                  <label htmlFor="blog-slug" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Custom Slug
                  </label>
                  <input
                    type="text"
                    id="blog-slug"
                    required
                    value={slug}
                    onChange={(e) => {
                      const cleanSlug = e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]+/g, '-');
                      setSlug(cleanSlug);
                    }}
                    placeholder="aws-shared-responsibility-model-demystified"
                    className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white text-sm"
                  />
                </div>

                {/* Excerpt */}
                <div className="flex flex-col">
                  <label htmlFor="blog-excerpt" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Short Excerpt / Description
                  </label>
                  <textarea
                    id="blog-excerpt"
                    rows="3"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Write a brief overview describing what readers will learn..."
                    className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white text-sm resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Read Time */}
                  <div className="flex flex-col">
                    <label htmlFor="blog-readtime" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Read Time
                    </label>
                    <input
                      type="text"
                      id="blog-readtime"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      placeholder="e.g. 5 min read"
                      className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/55 text-white text-sm"
                    />
                  </div>

                  {/* Date */}
                  <div className="flex flex-col">
                    <label htmlFor="blog-date" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Publish Date
                    </label>
                    <input
                      type="date"
                      id="blog-date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/55 text-white text-sm"
                    />
                  </div>
                </div>

                {/* Medium Link */}
                <div className="flex flex-col">
                  <label htmlFor="blog-link" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    External Article URL (Medium / Dev.to Link)
                  </label>
                  <input
                    type="url"
                    id="blog-link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://medium.com/@sushanaryal/..."
                    className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white text-sm"
                  />
                </div>

                {/* Blog Content (System Native) */}
                <div className="flex flex-col">
                  <label htmlFor="blog-content" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Blog Article Body (Markdown Content)
                  </label>
                  
                  {/* Markdown Helper Toolbar */}
                  <div className="flex flex-wrap gap-1.5 mb-2 p-1.5 bg-[#05080e] border border-slate-800 rounded-xl">
                    <button
                      type="button"
                      onClick={() => insertMarkdown('**', '**')}
                      className="px-2.5 py-1 text-[11px] font-extrabold bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                      title="Bold"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('*', '*')}
                      className="px-2.5 py-1 text-[11px] italic font-serif bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                      title="Italic"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('<u>', '</u>')}
                      className="px-2.5 py-1 text-[11px] underline bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                      title="Underline"
                    >
                      U
                    </button>
                    <div className="w-px h-5 bg-slate-800 align-middle my-auto mx-1" />
                    <button
                      type="button"
                      onClick={() => insertMarkdown('# ')}
                      className="px-2 py-1 text-[10px] font-bold bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                      title="Heading 1"
                    >
                      H1
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('## ')}
                      className="px-2 py-1 text-[10px] font-bold bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                      title="Heading 2"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('### ')}
                      className="px-2 py-1 text-[10px] font-bold bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                      title="Heading 3"
                    >
                      H3
                    </button>
                    <div className="w-px h-5 bg-slate-800 align-middle my-auto mx-1" />
                    <button
                      type="button"
                      onClick={() => insertMarkdown('- ')}
                      className="px-2 py-1 text-[10px] bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                      title="List Item"
                    >
                      • List
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('> ')}
                      className="px-2 py-1 text-[10px] bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                      title="Quote"
                    >
                      “ Quote
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('```\n', '\n```')}
                      className="px-2 py-1 text-[10px] font-mono bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                      title="Code Block"
                    >
                      &lt;/&gt; Code
                    </button>
                    <div className="w-px h-5 bg-slate-800 align-middle my-auto mx-1" />
                    <button
                      type="button"
                      onClick={handleInsertLink}
                      className="px-2.5 py-1 text-[10px] font-bold bg-blue-950/40 hover:bg-blue-600/40 border border-blue-900 text-blue-400 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                      title="Insert Link"
                    >
                      🔗 Link
                    </button>
                  </div>

                  <textarea
                    id="blog-content"
                    rows="8"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your article content here... Supports markdown formatting (e.g. # Header, ## Subheader, - List, > Quote, ``` Code Blocks)"
                    className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white text-sm scrollbar-thin scrollbar-thumb-slate-800"
                  />
                </div>

                {/* Tags */}
                <div className="flex flex-col">
                  <label htmlFor="blog-tags" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    id="blog-tags"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="e.g. Security, AWS Basics, Architecture"
                    className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white text-sm"
                  />
                  <p className="text-[9px] text-slate-500 mt-1 italic leading-normal">
                    Tip: tag values like `Security` or `AWS Basics` place the blog in the Practitioner tab; `Architecture` or `Resilience` in the Architect tab; `Database` or `Serverless` in the Developer tab.
                  </p>
                </div>

                {/* Banner image file input */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    {editId ? 'Replace Banner Image (Optional)' : 'Select Banner Image File'}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 file:cursor-pointer text-slate-400"
                  />
                  {editId && (
                    <p className="text-[9px] text-slate-500 mt-1 italic">
                      If left blank, the current banner image will be kept.
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-slate-850">
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => setIsFormOpen(false)}
                    className="flex-1 py-3 bg-slate-855 hover:bg-slate-800 text-slate-200 rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
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
                        Saving Post...
                      </>
                    ) : (
                      editId ? 'Save Changes' : 'Publish Blog'
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
