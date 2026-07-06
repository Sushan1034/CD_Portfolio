import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle';

const allBlogs = [
  {
    title: "AWS Shared Responsibility Model Demystified",
    excerpt: "Understanding who is responsible for what in the cloud is crucial. Here is an easy-to-follow guide with real-world examples.",
    readTime: "5 min read",
    link: "https://medium.com/@sushanaryal/aws-shared-responsibility-model-demystified",
    date: "Feb 10, 2026",
    tags: ["Security", "AWS Basics"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "AWS Billing & Cost Management: A Survival Guide",
    excerpt: "How to set up budgets, billing alarms, and understand the difference between Cost Explorer and Budgets to avoid unexpected bills.",
    readTime: "7 min read",
    link: "https://medium.com/@sushanaryal/aws-billing-cost-management-survival-guide",
    date: "Feb 18, 2026",
    tags: ["Billing", "FinOps"],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Designing Highly Available & Resilient Multi-Tier Architectures",
    excerpt: "A blueprint for setting up Auto Scaling Groups across multiple Availability Zones with ALBs and Multi-AZ RDS deployments.",
    readTime: "12 min read",
    link: "https://medium.com/@sushanaryal/designing-highly-available-resilient-multi-tier-architectures",
    date: "Mar 05, 2026",
    tags: ["Architecture", "Resilience"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Decoupling Microservices: AWS SQS vs. SNS vs. EventBridge",
    excerpt: "An architectural comparison of message queues, pub/sub topics, and event buses. When to use which for asynchronous workflows.",
    readTime: "9 min read",
    link: "https://medium.com/@sushanaryal/decoupling-microservices-sqs-sns-eventbridge",
    date: "Mar 22, 2026",
    tags: ["Integration", "Microservices"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Mastering DynamoDB: Single-Table Design Patterns",
    excerpt: "How to model one-to-many and many-to-many relationships in a single DynamoDB table using partition keys, sort keys, and GSIs.",
    readTime: "15 min read",
    link: "https://medium.com/@sushanaryal/mastering-dynamodb-single-table-design",
    date: "Apr 12, 2026",
    tags: ["Database", "NoSQL"],
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Building Serverless CI/CD Pipelines with AWS CodePipeline",
    excerpt: "A step-by-step guide to automating serverless deployments using AWS CodeBuild, CodeDeploy, and GitHub integration.",
    readTime: "10 min read",
    link: "https://medium.com/@sushanaryal/building-serverless-cicd-pipelines-aws-codepipeline",
    date: "Apr 29, 2026",
    tags: ["CI/CD", "Serverless"],
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80"
  }
];

const availableTags = ["All", "Security", "AWS Basics", "Billing", "FinOps", "Architecture", "Resilience", "Integration", "Microservices", "Database", "NoSQL", "CI/CD", "Serverless"];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredBlogs = allBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = activeTag === 'All' || blog.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-50 relative overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] w-[60%] md:w-[40%] h-[40%] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute top-[30%] right-[-5%] w-[50%] md:w-[35%] h-[35%] bg-slate-200/50 dark:bg-slate-800/20 rounded-full blur-[60px] md:blur-[100px]" />
      </div>

      {/* Header / Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="glass-card px-6 py-4 flex items-center justify-between shadow-md">
            <a href="#/" className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              SA<span className="text-blue-600">.</span>
            </a>
            <div className="flex items-center gap-6">
              <ThemeToggle />
              <a
                href="#/"
                className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-blue-600 transition text-sm flex items-center gap-2 dark:bg-slate-800 dark:hover:bg-blue-600 shadow-sm"
              >
                ← Back to Home
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Body */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* Intro */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight"
          >
            Technical <span className="text-blue-600">Writing</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Deep dives into cloud computing, systems architecture patterns, and DevOps automation guides.
          </motion.p>
        </div>

        {/* Search & Tags */}
        <div className="mb-12 space-y-6">
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600/55 dark:focus:ring-blue-500/55 dark:text-white font-medium text-sm transition-all"
            />
            <span className="absolute right-4 top-3.5 text-slate-400">🔍</span>
          </div>

          {/* Scrolling Tags */}
          <div className="flex gap-2 justify-center flex-wrap max-w-3xl mx-auto">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeTag === tag
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.map((blog, idx) => (
              <motion.article
                key={blog.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                layout
                className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div>
                  {/* Article Header Image */}
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap z-10">
                      {blog.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-[9px] font-bold rounded-md uppercase tracking-wider text-blue-600 dark:text-blue-400 shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 mb-3">
                      <span>{blog.date}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>

                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {blog.title}
                    </h2>

                    <p className="text-sm text-slate-650 dark:text-slate-450 leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Action footer */}
                <div className="px-6 pb-6 pt-2">
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-200 rounded-xl font-bold text-xs hover:bg-blue-600 dark:hover:bg-blue-600 transition-all active:scale-[0.98]"
                  >
                    Read on Medium
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* No results state */}
        {filteredBlogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-slate-500 dark:text-slate-400 font-medium"
          >
            <p className="text-2xl mb-2">No articles found</p>
            <p className="text-sm">Try searching for a different keyword or tag.</p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
