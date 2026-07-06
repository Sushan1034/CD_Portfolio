import { supabase } from '../../../lib/supabase';
import Navbar from '../../../src/components/Navbar';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60; // Revalidate every 60 seconds

// Generate SEO Metadata dynamically
export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const { data: blog } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();

    if (!blog) return { title: 'Article Not Found' };

    return {
      title: `${blog.title} | Sushan Aryal`,
      description: blog.excerpt || `Read Sushan's tech note on ${blog.title}`,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        images: blog.image_url ? [blog.image_url] : [],
      }
    };
  } catch (err) {
    return { title: 'Article Details' };
  }
}

// Custom Markdown formatter to render content blocks safely with style
function BlogPostContentRenderer({ content }) {
  if (!content) return null;

  // Split content by paragraphs/blocks
  const blocks = content.split(/\n\s*\n/);

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-200">
      {blocks.map((block, idx) => {
        const text = block.trim();
        if (!text) return null;

        // Headers
        if (text.startsWith('# ')) {
          return (
            <h1 key={idx} className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white pt-8 pb-2 tracking-tight leading-tight border-b border-slate-100 dark:border-slate-800/80">
              {text.slice(2)}
            </h1>
          );
        }
        if (text.startsWith('## ')) {
          return (
            <h2 key={idx} className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white pt-6 pb-1.5 tracking-tight leading-tight">
              {text.slice(3)}
            </h2>
          );
        }
        if (text.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white pt-4 pb-1 tracking-tight">
              {text.slice(4)}
            </h3>
          );
        }

        // Blockquotes
        if (text.startsWith('> ')) {
          const quoteText = text.replace(/^>\s*/, '');
          return (
            <blockquote key={idx} className="border-l-4 border-blue-500 pl-5 py-2.5 my-6 italic text-slate-700 dark:text-slate-355 bg-blue-50/20 dark:bg-blue-950/15 rounded-r-2xl border-dashed">
              {quoteText}
            </blockquote>
          );
        }

        // Code Blocks
        if (text.startsWith('```')) {
          const lines = text.split('\n');
          // Strip language indicator
          const codeLines = lines.slice(1, lines[lines.length - 1].startsWith('```') ? -1 : undefined);
          const codeString = codeLines.join('\n');
          return (
            <pre key={idx} className="bg-slate-955 text-slate-100 p-5 rounded-2xl my-6 overflow-x-auto text-xs font-mono border border-slate-900 shadow-lg leading-relaxed">
              <code>{codeString}</code>
            </pre>
          );
        }

        // Unordered Lists
        if (text.startsWith('- ') || text.startsWith('* ')) {
          const items = text.split(/\n[-*]\s+/);
          return (
            <ul key={idx} className="list-disc pl-6 space-y-2.5 my-4 text-slate-700 dark:text-slate-300">
              {items.map((item, i) => {
                const cleanItem = i === 0 ? item.substring(2) : item;
                return <li key={i} className="leading-relaxed">{cleanItem}</li>;
              })}
            </ul>
          );
        }

        // Standard Paragraph
        return (
          <p key={idx} className="text-base md:text-lg text-slate-650 dark:text-slate-300 leading-relaxed font-normal antialiased">
            {text}
          </p>
        );
      })}
    </div>
  );
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  let blog = null;
  try {
    const { data } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();
    blog = data;
  } catch (err) {
    console.error('Error fetching blog post:', err);
  }

  if (!blog) {
    notFound();
  }

  const formattedDate = blog.date 
    ? new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-50 relative overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] w-[60%] md:w-[40%] h-[40%] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute top-[30%] right-[-5%] w-[50%] md:w-[35%] h-[35%] bg-slate-200/50 dark:bg-slate-800/20 rounded-full blur-[60px] md:blur-[100px]" />
      </div>

      <Navbar />

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-36 pb-24">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            ← Back to Articles
          </Link>
        </div>

        {/* Article Container */}
        <article className="glass-card p-6 md:p-12 shadow-xl rounded-[2.5rem] bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
          
          {/* Cover Banner */}
          {blog.image_url && (
            <div className="h-64 md:h-[400px] w-full rounded-2xl md:rounded-[2rem] overflow-hidden mb-10 shadow-md">
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">
            <span>{formattedDate}</span>
            {formattedDate && <span>•</span>}
            <span>{blog.read_time || '5 min read'}</span>
            <span>•</span>
            <div className="flex gap-1.5 flex-wrap">
              {(blog.tags || []).map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/50 text-[10px] text-blue-600 dark:text-blue-400 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Heading Title */}
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tight leading-tight">
            {blog.title}
          </h1>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 italic border-l-2 border-slate-300 dark:border-slate-800 pl-4 py-1 mb-10">
              {blog.excerpt}
            </p>
          )}

          {/* Content Body */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <BlogPostContentRenderer content={blog.content} />
          </div>

        </article>
      </main>
    </div>
  );
}
