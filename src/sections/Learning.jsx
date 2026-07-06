import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const certLevels = [
  {
    id: "practitioner",
    name: "Cloud Practitioner",
    code: "CLF-C02",
    badge: "Foundational",
    color: "blue",
    themeClass: "from-blue-500 via-blue-600 to-cyan-500",
    shadowClass: "shadow-blue-500/10 dark:shadow-blue-900/10",
    borderClass: "group-hover:border-blue-500/30 dark:group-hover:border-blue-500/20",
    activeText: "text-blue-600 dark:text-blue-400",
    activeBg: "bg-blue-50 dark:bg-blue-950/40",
    glowColor: "rgba(59, 130, 246, 0.15)",
    courses: [
      {
        title: "AWS Cloud Practitioner Essentials",
        provider: "AWS Skill Builder",
        link: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials",
        duration: "6 Hours",
        type: "Official",
        badgeStyle: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30",
        description: "Official AWS foundational course covering core cloud concepts, security, architecture, pricing, and support."
      },
      {
        title: "Ultimate AWS Certified Cloud Practitioner",
        provider: "Udemy (Stephane Maarek)",
        link: "https://www.udemy.com/course/aws-certified-cloud-practitioner-clf-c01/",
        duration: "15 Hours",
        type: "Exam Prep",
        badgeStyle: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30",
        description: "Deep dive into all AWS concepts with hands-on labs, practice exams, and direct strategies to pass the exam."
      }
    ],
    blogs: [
      {
        title: "AWS Shared Responsibility Model Demystified",
        excerpt: "Understanding who is responsible for what in the cloud is crucial. Here is an easy-to-follow guide with real-world examples.",
        readTime: "5 min read",
        link: "https://medium.com/@sushanaryal/aws-shared-responsibility-model-demystified",
        date: "Feb 10, 2026",
        tags: ["Security", "AWS Basics"]
      },
      {
        title: "AWS Billing & Cost Management: A Survival Guide",
        excerpt: "How to set up budgets, billing alarms, and understand the difference between Cost Explorer and Budgets to avoid unexpected bills.",
        readTime: "7 min read",
        link: "https://medium.com/@sushanaryal/aws-billing-cost-management-survival-guide",
        date: "Feb 18, 2026",
        tags: ["Billing", "FinOps"]
      }
    ]
  },
  {
    id: "architect",
    name: "Solutions Architect",
    code: "SAA-C03",
    badge: "Associate",
    color: "orange",
    themeClass: "from-orange-500 via-orange-600 to-amber-500",
    shadowClass: "shadow-orange-500/10 dark:shadow-orange-900/10",
    borderClass: "group-hover:border-orange-500/30 dark:group-hover:border-orange-500/20",
    activeText: "text-orange-600 dark:text-orange-400",
    activeBg: "bg-orange-50 dark:bg-orange-950/40",
    glowColor: "rgba(249, 115, 22, 0.15)",
    courses: [
      {
        title: "AWS Certified Solutions Architect Associate Course",
        provider: "Cantrill.io (Adrian Cantrill)",
        link: "https://learn.cantrill.io/p/aws-certified-solutions-architect-associate-saa-c03",
        duration: "70 Hours",
        type: "In-Depth",
        badgeStyle: "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-900/30",
        description: "Industry-standard, highly visual course with hands-on custom architectures, scenarios, and real-world system designs."
      },
      {
        title: "AWS Solutions Architect Associate Practice Exams",
        provider: "Tutorials Dojo (Jon Bonso)",
        link: "https://portal.tutorialsdojo.com/courses/aws-certified-solutions-architect-associate-practice-exams/",
        duration: "6 Exams",
        type: "Practice Tests",
        badgeStyle: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30",
        description: "High-quality exam simulations with detailed explanations, reference links, and cheat sheets for every question."
      }
    ],
    blogs: [
      {
        title: "Designing Highly Available & Resilient Multi-Tier Architectures",
        excerpt: "A blueprint for setting up Auto Scaling Groups across multiple Availability Zones with ALBs and Multi-AZ RDS deployments.",
        readTime: "12 min read",
        link: "https://medium.com/@sushanaryal/designing-highly-available-resilient-multi-tier-architectures",
        date: "Mar 05, 2026",
        tags: ["Architecture", "Resilience"]
      },
      {
        title: "Decoupling Microservices: AWS SQS vs. SNS vs. EventBridge",
        excerpt: "An architectural comparison of message queues, pub/sub topics, and event buses. When to use which for asynchronous workflows.",
        readTime: "9 min read",
        link: "https://medium.com/@sushanaryal/decoupling-microservices-sqs-sns-eventbridge",
        date: "Mar 22, 2026",
        tags: ["Integration", "Microservices"]
      }
    ]
  },
  {
    id: "developer",
    name: "Developer Associate",
    code: "DVA-C02",
    badge: "Associate",
    color: "purple",
    themeClass: "from-purple-500 via-purple-600 to-indigo-500",
    shadowClass: "shadow-purple-500/10 dark:shadow-purple-900/10",
    borderClass: "group-hover:border-purple-500/30 group-hover:border-purple-500/20",
    activeText: "text-purple-600 dark:text-purple-400",
    activeBg: "bg-purple-50 dark:bg-purple-950/40",
    glowColor: "rgba(168, 85, 247, 0.15)",
    courses: [
      {
        title: "Ultimate AWS Certified Developer Associate",
        provider: "Udemy (Stephane Maarek)",
        link: "https://www.udemy.com/course/aws-certified-developer-associate-dva-c01/",
        duration: "32 Hours",
        type: "Exam Prep",
        badgeStyle: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30",
        description: "Excellent exam-focused prep covering serverless (Lambda, API Gateway, DynamoDB), deployment tools, and security."
      },
      {
        title: "AWS Developer Associate Practical Labs",
        provider: "AWS Skill Builder",
        link: "https://skillbuilder.aws/",
        duration: "10 Hours",
        type: "Labs",
        badgeStyle: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30",
        description: "Hands-on environments to deploy, debug, and monitor code using AWS CLI, SAM templates, and cloud developer kits."
      }
    ],
    blogs: [
      {
        title: "Mastering DynamoDB: Single-Table Design Patterns",
        excerpt: "How to model one-to-many and many-to-many relationships in a single DynamoDB table using partition keys, sort keys, and GSIs.",
        readTime: "15 min read",
        link: "https://medium.com/@sushanaryal/mastering-dynamodb-single-table-design",
        date: "Apr 12, 2026",
        tags: ["Database", "NoSQL"]
      },
      {
        title: "Building Serverless CI/CD Pipelines with AWS CodePipeline",
        excerpt: "A step-by-step guide to automating serverless deployments using AWS CodeBuild, CodeDeploy, and GitHub integration.",
        readTime: "10 min read",
        link: "https://medium.com/@sushanaryal/building-serverless-cicd-pipelines-aws-codepipeline",
        date: "Apr 29, 2026",
        tags: ["CI/CD", "Serverless"]
      }
    ]
  }
];

const getBlogsForLevel = (levelId, allDbBlogs) => {
  if (!allDbBlogs || allDbBlogs.length === 0) return null;
  
  return allDbBlogs.filter(blog => {
    const tags = (blog.tags || []).map(t => t.toLowerCase());
    if (levelId === 'practitioner') {
      return tags.some(t => ['security', 'aws basics', 'billing', 'finops', 'practitioner'].includes(t));
    }
    if (levelId === 'architect') {
      return tags.some(t => ['architecture', 'resilience', 'integration', 'microservices', 'architect'].includes(t));
    }
    if (levelId === 'developer') {
      return tags.some(t => ['database', 'nosql', 'ci/cd', 'serverless', 'developer', 'devops'].includes(t));
    }
    return false;
  }).map(b => ({
    title: b.title,
    excerpt: b.excerpt,
    readTime: b.read_time || b.readTime,
    link: b.link,
    date: b.date ? new Date(b.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '',
    tags: b.tags || []
  }));
};

export default function Learning({ dbBlogs }) {
  const [activeTab, setActiveTab] = useState("practitioner");

  // Dynamically map certifications levels with Supabase data if loaded
  const currentLevels = certLevels.map(level => {
    const dbFilteredBlogs = getBlogsForLevel(level.id, dbBlogs);
    if (dbFilteredBlogs && dbFilteredBlogs.length > 0) {
      return {
        ...level,
        blogs: dbFilteredBlogs
      };
    }
    return level;
  });

  const currentData = currentLevels.find(c => c.id === activeTab);

  return (
    <section id="learning" className="relative overflow-hidden bg-slate-50/30 dark:bg-slate-950/30">
      {/* Decorative background gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-100/10 dark:bg-slate-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight"
          >
            Blogs & <span className="text-blue-600 dark:text-blue-400">Courses</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            A curated list of my technical articles, notes, and top-tier recommended training resources for AWS certifications.
          </motion.p>
        </div>

        {/* Custom Tab Switcher */}
        <div className="flex justify-center mb-16">
          <div className="glass-card p-1.5 flex gap-2 md:gap-3 rounded-2xl max-w-full overflow-x-auto hide-scrollbar">
            {certLevels.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-3 rounded-xl font-bold text-sm md:text-base transition-all duration-300 whitespace-nowrap ${
                    isActive 
                      ? tab.activeText 
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-learning-tab"
                      className={`absolute inset-0 rounded-xl ${tab.activeBg} border border-slate-200/50 dark:border-slate-800/50 -z-10`}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${tab.themeClass}`} />
                    <span>{tab.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14"
          >
            {/* Left Column: Recommended Training */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${currentData.themeClass} flex items-center justify-center text-white text-sm font-black`}>
                  🎓
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Training & Practice
                </h3>
              </div>

              <div className="space-y-6">
                {currentData.courses.map((course, idx) => (
                  <motion.div
                    key={course.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`group relative glass-card p-6 md:p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-800 hover:border-transparent ${currentData.borderClass}`}
                  >
                    {/* Hover Glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                      style={{ boxShadow: `0 0 0 1px ${currentData.color === 'blue' ? 'rgba(59,130,246,0.3)' : currentData.color === 'orange' ? 'rgba(249,115,22,0.3)' : 'rgba(168,85,247,0.3)'}, 0 4px 20px ${currentData.glowColor}` }}
                    />
                    
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full ${course.badgeStyle}`}>
                          {course.type}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">
                          ⏱️ {course.duration}
                        </span>
                      </div>
                      
                      <h4 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {course.title}
                      </h4>
                      
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                        by {course.provider}
                      </p>
                      
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                        {course.description}
                      </p>
                    </div>

                    <a
                      href={course.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-200 rounded-xl font-bold text-xs hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all active:scale-[0.98] w-fit"
                    >
                      Access Course
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: Blogs & Study Notes */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${currentData.themeClass} flex items-center justify-center text-white text-sm font-black`}>
                  ✍️
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Blogs & Study Guides
                </h3>
              </div>

              <div className="space-y-6">
                {currentData.blogs.map((blog, idx) => (
                  <motion.div
                    key={blog.title}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`group relative glass-card p-6 md:p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-800 hover:border-transparent ${currentData.borderClass}`}
                  >
                    {/* Hover Glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                      style={{ boxShadow: `0 0 0 1px ${currentData.color === 'blue' ? 'rgba(59,130,246,0.3)' : currentData.color === 'orange' ? 'rgba(249,115,22,0.3)' : 'rgba(168,85,247,0.3)'}, 0 4px 20px ${currentData.glowColor}` }}
                    />

                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[9px] font-bold rounded-md uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h4 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {blog.title}
                      </h4>

                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 mt-auto">
                      <a
                        href={blog.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/link"
                      >
                        Read Article
                        <svg className="w-4 h-4 transform group-hover/link:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                      
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">{blog.date}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{blog.readTime}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
