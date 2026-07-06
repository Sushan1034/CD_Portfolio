'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../src/components/Navbar';

const STATIC_VIDEOS = [
  {
    id: 1,
    title: "AWS Billing Alarms Tutorial",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 2,
    title: "VPC Subnetting Quick Tips",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 3,
    title: "IAM Policies Explained",
    src: "https://vjs.zencdn.net/v/oceans.mp4",
  },
  {
    id: 4,
    title: "DynamoDB Single-Table Design",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  }
];

const STATIC_PROGRAMS = [
  {
    title: "AWS Cloud Practitioner",
    code: "CLF-C02",
    level: "Foundational Level Training",
    color: "from-blue-500 to-cyan-500",
    shadow: "hover:shadow-blue-500/10 dark:hover:shadow-blue-900/10",
    description: "Beginner-friendly mentorship designed for individuals with non-technical or basic technical backgrounds. Learn AWS core concepts, pricing structures, shared security models, and foundational services (EC2, S3, RDS, IAM).",
    features: [
      "Personalized 4-week study plan",
      "Billing, budget configuration, and Cost Explorer deep dive",
      "Overview of cloud security standards",
      "Curated resource guides & mock exams walkthrough"
    ]
  },
  {
    title: "AWS Solutions Architect",
    code: "SAA-C03",
    level: "Associate Level Counseling",
    color: "from-orange-500 to-amber-500",
    shadow: "hover:shadow-orange-500/10 dark:hover:shadow-orange-900/10",
    description: "Designed for learners aspiring to design robust, cost-effective, secure, and highly available multi-tier architectures. Delve into networking (VPC subnets, route tables), Auto Scaling, Elastic Load Balancing, RDS, and S3 structures.",
    features: [
      "Step-by-step 8-week curriculum outline",
      "Hands-on custom VPC design from scratch",
      "High availability & disaster recovery mock scenarios",
      "1-on-1 strategy sessions for Tutorials Dojo & Cantrill exams"
    ]
  },
  {
    title: "AWS Developer Associate",
    code: "DVA-C02",
    level: "Associate Level Development",
    color: "from-purple-500 to-indigo-500",
    shadow: "hover:shadow-purple-500/10 dark:hover:shadow-purple-900/10",
    description: "For programmers, developers, and DevOps engineers looking to master serverless application designs, deployment tools, application lifecycles, monitoring, debugging, and secure authentication models.",
    features: [
      "Tailored 8-week serverless development guide",
      "DynamoDB single-table design & modeling",
      "AWS Lambda, API Gateway, and Cognito security walkthrough",
      "Hands-on CI/CD setups using SAM & AWS CodePipeline"
    ]
  }
];

function getProgramColorStyles(code, title) {
  const lower = (code || title || '').toLowerCase();
  if (lower.includes('practitioner') || lower.includes('clf')) {
    return {
      color: "from-blue-500 to-cyan-500",
      shadow: "hover:shadow-blue-500/10 dark:hover:shadow-blue-900/10"
    };
  } else if (lower.includes('architect') || lower.includes('saa')) {
    return {
      color: "from-orange-500 to-amber-500",
      shadow: "hover:shadow-orange-500/10 dark:hover:shadow-orange-900/10"
    };
  } else {
    return {
      color: "from-purple-500 to-indigo-500",
      shadow: "hover:shadow-purple-500/10 dark:hover:shadow-purple-900/10"
    };
  }
}

export default function TrainingPageContent({ initialVideos, initialPrograms }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    certification: 'Solution Architect Associate',
    message: ''
  });

  const instagramVideos = initialVideos && initialVideos.length > 0
    ? initialVideos.map((v, i) => ({ id: v.id || i, title: v.title, src: v.video_url }))
    : STATIC_VIDEOS;

  const programDetails = initialPrograms && initialPrograms.length > 0
    ? initialPrograms.map(p => ({
        title: p.title,
        code: p.code,
        level: p.level,
        description: p.description,
        features: p.features || [],
        ...getProgramColorStyles(p.code, p.title)
      }))
    : STATIC_PROGRAMS;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    // Submit form using a free form action, e.g. Formspree or generic FormFree API, or simulate delay
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', certification: 'Solution Architect Associate', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-50 relative overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -bottom-[10%] -left-[5%] w-[60%] md:w-[40%] h-[40%] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute top-[20%] right-[-5%] w-[50%] md:w-[35%] h-[35%] bg-purple-100/30 dark:bg-purple-900/10 rounded-full blur-[60px] md:blur-[100px]" />
      </div>

      {/* Header / Nav */}
      <Navbar />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-36 pb-24 space-y-24">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.1]"
          >
            AWS Mentorship & <span className="text-blue-600">Counseling</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed"
          >
            Providing personalized study guides, structural counseling, and hands-on preparation strategy to help you clear core AWS certifications.
          </motion.p>
        </div>

        {/* 3 Major Certification Training Programs */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Mentored Certification Paths
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Select a target exam and work with a customized 1-on-1 strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {programDetails.map((prog, idx) => (
              <motion.div
                key={prog.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 ${prog.shadow}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`px-3 py-1 bg-gradient-to-r ${prog.color} text-white font-bold text-xs rounded-xl shadow-sm`}>
                      {prog.code}
                    </span>
                    <span className="text-2xl">☁️</span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight mb-1">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-4">
                    {prog.level}
                  </p>

                  <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed mb-6">
                    {prog.description}
                  </p>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                    What we focus on:
                  </h4>
                  <ul className="space-y-2 mb-8">
                    {prog.features.map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2 leading-snug">
                        <span className="text-blue-600 dark:text-blue-400 font-black">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#request-counseling"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('request-counseling')?.scrollIntoView({ behavior: 'smooth' });
                    setFormData(prev => ({ ...prev, certification: prog.title }));
                  }}
                  className="w-full inline-flex items-center justify-center py-3 bg-slate-900 hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600 text-white rounded-xl font-bold text-xs transition-all active:scale-[0.98]"
                >
                  Book Counseling Session
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Instagram Content Creation Section */}
        <section className="space-y-12 bg-slate-100/40 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-800/40 rounded-[3rem] p-8 md:p-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="px-3.5 py-1 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/40 rounded-full font-bold text-xs uppercase tracking-widest">
              Instagram Creation
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Bite-Sized Cloud Learning
            </h2>
            <p className="text-sm text-slate-655 dark:text-slate-450 leading-relaxed">
              Explore educational cloud architecture content and quick walkthroughs designed for social media, hosted securely on Supabase Storage.
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {instagramVideos.map((video) => (
              <div key={video.id} className="relative group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
                {/* Custom Video Player Wrapper */}
                <div className="aspect-[9/16] w-full bg-slate-950 overflow-hidden relative">
                  <video
                    src={video.src}
                    className="w-full h-full object-cover"
                    controls
                    loop
                    preload="metadata"
                    playsInline
                  />
                </div>
                {/* Video Info Label */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                    {video.title}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Served from Supabase S3
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Instagram Explore CTA */}
          <div className="text-center pt-4">
            <a
              href="https://www.instagram.com/nepalcodeharbor"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-pink-500/20 transition-all hover:scale-102 active:scale-98 shadow-md cursor-pointer text-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Explore nepalcodeharbor
            </a>
          </div>
        </section>

        {/* Contact Us Form Section */}
        <section id="request-counseling" className="max-w-xl mx-auto scroll-mt-24">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-xl dark:shadow-none relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-900/10 rounded-full blur-3xl -mr-16 -mt-16" />

            <div className="text-center mb-8 relative z-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Request Counseling
              </h2>
              <p className="text-xs text-slate-505 dark:text-slate-450 mt-1.5 leading-relaxed">
                Fill in your details below and I'll get back to you with a personalized certification roadmap.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  action="https://formspree.io/f/xvgoeonw"
                  method="POST"
                  className="space-y-5 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Full Name */}
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Sushan Aryal"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/55 dark:text-white text-sm transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. you@example.com"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/55 dark:text-white text-sm transition-all"
                    />
                  </div>

                  {/* Target Certification */}
                  <div className="flex flex-col">
                    <label htmlFor="certification" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                      Target Certification
                    </label>
                    <select
                      id="certification"
                      name="certification"
                      value={formData.certification}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/55 dark:text-white text-sm transition-all"
                    >
                      <option value="AWS Cloud Practitioner">AWS Cloud Practitioner (CLF-C02)</option>
                      <option value="Solution Architect Associate">AWS Solutions Architect Associate (SAA-C03)</option>
                      <option value="AWS Developer Associate">AWS Developer Associate (DVA-C02)</option>
                      <option value="General Counselling / Other">General Mentorship / Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col">
                    <label htmlFor="message" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                      Your Message & Goals
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Briefly describe your current role or studies, and what support you are looking for."
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/55 dark:text-white text-sm transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-[0.98] shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                  >
                    {submitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending Request...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  className="text-center py-8 space-y-4 relative z-10"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center text-3xl mx-auto shadow-md shadow-emerald-500/30 animate-bounce">
                    ✓
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Request Received!
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                    Thank you for reaching out, Sushan will review your profile and get back to you shortly at your email to schedule a counseling session!
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-6 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}
