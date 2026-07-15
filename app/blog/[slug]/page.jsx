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
        canonical: blog.link || `/blog/${slug}`,
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

// Helper to find raw URLs in plain text and convert to links
function parseRawUrls(text, offsetKey = 0) {
  if (!text) return text;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    
    let url = match[1];
    let trailingPunctuation = '';
    // Strip trailing punctuation that often gets caught in raw URLs
    if (/[.,;!?>)]$/.test(url)) {
      trailingPunctuation = url.slice(-1);
      url = url.slice(0, -1);
    }

    parts.push(
      <a
        key={`raw-${offsetKey}-${match.index}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
      >
        {url}
      </a>
    );
    if (trailingPunctuation) {
      parts.push(trailingPunctuation);
    }
    lastIndex = urlRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts;
}

// Recursive helper function to parse and render inline markdown (links, bold, italic, underline)
function renderTextWithLinks(text) {
  return parseInlineMarkdown(text);
}

function parseInlineMarkdown(text) {
  if (!text) return [];

  // Match markdown links, HTML links, bold, italic, and underline
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/;
  const htmlLinkRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*?>(.*?)<\/a>/;
  const boldRegex = /(\*\*|__)(.*?)\1/;
  const italicRegex = /(\*|_)(.*?)\3/;
  const underlineRegex = /<u>(.*?)<\/u>/;

  let firstMatch = null;
  let matchType = '';
  let minIndex = Infinity;

  const linkMatch = linkRegex.exec(text);
  if (linkMatch && linkMatch.index < minIndex) {
    minIndex = linkMatch.index;
    firstMatch = linkMatch;
    matchType = 'link';
  }

  const htmlLinkMatch = htmlLinkRegex.exec(text);
  if (htmlLinkMatch && htmlLinkMatch.index < minIndex) {
    minIndex = htmlLinkMatch.index;
    firstMatch = htmlLinkMatch;
    matchType = 'htmlLink';
  }

  const boldMatch = boldRegex.exec(text);
  if (boldMatch && boldMatch.index < minIndex) {
    minIndex = boldMatch.index;
    firstMatch = boldMatch;
    matchType = 'bold';
  }

  const italicMatch = italicRegex.exec(text);
  if (italicMatch && italicMatch.index < minIndex) {
    minIndex = italicMatch.index;
    firstMatch = italicMatch;
    matchType = 'italic';
  }

  const underlineMatch = underlineRegex.exec(text);
  if (underlineMatch && underlineMatch.index < minIndex) {
    minIndex = underlineMatch.index;
    firstMatch = underlineMatch;
    matchType = 'underline';
  }

  // If no markdown tokens found, fallback to parsing raw URLs
  if (!firstMatch) {
    return parseRawUrls(text);
  }

  const parts = [];
  // Parse everything before the first markdown token
  if (minIndex > 0) {
    parts.push(...parseInlineMarkdown(text.substring(0, minIndex)));
  }

  const matchLength = firstMatch[0].length;
  const remainingText = text.substring(minIndex + matchLength);

  if (matchType === 'link') {
    const [_, linkText, linkUrl] = firstMatch;
    const isExternal = linkUrl.startsWith('http://') || linkUrl.startsWith('https://');
    // Recursively parse formatting inside the link text (like bold/italic/underline)
    const children = parseInlineMarkdown(linkText);

    if (isExternal) {
      parts.push(
        <a
          key={`link-${minIndex}`}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
        >
          {children}
        </a>
      );
    } else {
      parts.push(
        <Link
          key={`link-${minIndex}`}
          href={linkUrl}
          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold transition-colors"
        >
          {children}
        </Link>
      );
    }
  } else if (matchType === 'htmlLink') {
    const [_, quote, linkUrl, linkText] = firstMatch;
    const isExternal = linkUrl.startsWith('http://') || linkUrl.startsWith('https://');
    const children = parseInlineMarkdown(linkText);

    if (isExternal) {
      parts.push(
        <a
          key={`link-${minIndex}`}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
        >
          {children}
        </a>
      );
    } else {
      parts.push(
        <Link
          key={`link-${minIndex}`}
          href={linkUrl}
          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold transition-colors"
        >
          {children}
        </Link>
      );
    }
  } else if (matchType === 'bold') {
    const [_, marker, boldContent] = firstMatch;
    parts.push(
      <strong key={`bold-${minIndex}`} className="font-extrabold text-slate-900 dark:text-white">
        {parseInlineMarkdown(boldContent)}
      </strong>
    );
  } else if (matchType === 'italic') {
    const [_, marker, italicContent] = firstMatch;
    parts.push(
      <em key={`italic-${minIndex}`} className="italic text-slate-800 dark:text-slate-200">
        {parseInlineMarkdown(italicContent)}
      </em>
    );
  } else if (matchType === 'underline') {
    const [_, underlineContent] = firstMatch;
    parts.push(
      <u key={`underline-${minIndex}`} className="underline">
        {parseInlineMarkdown(underlineContent)}
      </u>
    );
  }

  // Parse everything after the token
  parts.push(...parseInlineMarkdown(remainingText));

  return parts;
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
              {renderTextWithLinks(text.slice(2))}
            </h1>
          );
        }
        if (text.startsWith('## ')) {
          return (
            <h2 key={idx} className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white pt-6 pb-1.5 tracking-tight leading-tight">
              {renderTextWithLinks(text.slice(3))}
            </h2>
          );
        }
        if (text.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white pt-4 pb-1 tracking-tight">
              {renderTextWithLinks(text.slice(4))}
            </h3>
          );
        }

        // Blockquotes
        if (text.startsWith('> ')) {
          const quoteText = text.replace(/^>\s*/, '');
          return (
            <blockquote key={idx} className="border-l-4 border-blue-500 pl-5 py-2.5 my-6 italic text-slate-700 dark:text-slate-355 bg-blue-50/20 dark:bg-blue-955/15 rounded-r-2xl border-dashed">
              {renderTextWithLinks(quoteText)}
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
                return <li key={i} className="leading-relaxed">{renderTextWithLinks(cleanItem)}</li>;
              })}
            </ul>
          );
        }

        // Standard Paragraph
        return (
          <p key={idx} className="text-base md:text-lg text-slate-650 dark:text-slate-300 leading-relaxed font-normal antialiased">
            {renderTextWithLinks(text)}
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
            {blog.content ? (
              <BlogPostContentRenderer content={blog.content} />
            ) : blog.link ? (
              <div className="mt-8 p-8 md:p-12 text-center rounded-[2rem] bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-100/50 dark:border-blue-900/30 shadow-inner flex flex-col items-center justify-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-2xl text-blue-600 dark:text-blue-400">
                  🔗
                </div>
                <div className="space-y-2 max-w-lg">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                    Originally Published Externally
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-455 leading-relaxed">
                    This article is published on an external technical writing platform. Click the button below to read the complete post with full code snippets and diagrams.
                  </p>
                </div>
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  Read Full Article
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 italic">No content available for this post.</p>
            )}
          </div>

        </article>
      </main>
    </div>
  );
}
