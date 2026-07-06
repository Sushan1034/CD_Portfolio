import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';

const STATIC_PROGRAMS = [
  {
    title: "AWS Cloud Practitioner",
    code: "CLF-C02",
    level: "FOUNDATIONAL LEVEL",
    badgeColor: "bg-[#2563eb] text-white",
    levelColor: "text-blue-500",
    btnGradient: "from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/10",
    bulletBg: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    borderColor: "border-blue-500/10 hover:border-blue-500/40 shadow-blue-500/5 hover:shadow-blue-500/20",
    badgeIcon: "/CLP1.png",
    features: [
      {
        text: "Core AWS concepts",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
      },
      {
        text: "Security & pricing basics",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        )
      },
      {
        text: "Curated study resources",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        )
      }
    ]
  },
  {
    title: "AWS Solutions Architect",
    code: "SAA-C03",
    level: "ASSOCIATE LEVEL",
    badgeColor: "bg-[#f97316] text-white",
    levelColor: "text-orange-500",
    btnGradient: "from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-orange-500/10",
    bulletBg: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
    borderColor: "border-orange-500/10 hover:border-orange-500/40 shadow-orange-500/5 hover:shadow-orange-500/20",
    badgeIcon: "/SAA1-C03.png",
    features: [
      {
        text: "Design resilient architectures",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
        )
      },
      {
        text: "VPC, Auto Scaling, ELB",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        )
      },
      {
        text: "Hands-on labs & scenarios",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l.707-.707m2.808 13.069l1.01-1.01m4.054 0l1.01 1.01M9 10.5a3 3 0 116 0 3 3 0 01-6 0z" />
          </svg>
        )
      }
    ]
  },
  {
    title: "AWS Developer Associate",
    code: "DVA-C02",
    level: "ASSOCIATE LEVEL",
    badgeColor: "bg-[#7c3aed] text-white",
    levelColor: "text-purple-500",
    btnGradient: "from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-500/10",
    bulletBg: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    borderColor: "border-purple-500/10 hover:border-purple-500/40 shadow-purple-500/5 hover:shadow-purple-500/20",
    badgeIcon: "/DA.png",
    features: [
      {
        text: "Serverless & application design",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3m3.75-3.75L3 12m0 0l3.75 3.75" />
          </svg>
        )
      },
      {
        text: "AWS services & security",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        )
      },
      {
        text: "CI/CD with AWS tools",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41a14.98 14.98 0 00-2.58 5.84m8.54-2.58l-5.84 5.84M3.75 20.25h.007v.007H3.75v-.007zm3.375-3.375h.008v.008H7.125v-.008z" />
          </svg>
        )
      }
    ]
  }
];

const genericFeatureIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
  </svg>
);

function getProgramStyles(code, badgeIcon, title) {
  const lower = (code || title || '').toLowerCase();
  if (lower.includes('practitioner') || lower.includes('clf')) {
    return {
      badgeColor: "bg-[#2563eb] text-white",
      levelColor: "text-blue-500",
      btnGradient: "from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/10",
      bulletBg: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
      borderColor: "border-blue-500/10 hover:border-blue-500/40 shadow-blue-500/5 hover:shadow-blue-500/20",
      badgeIcon: badgeIcon || "/CLP1.png",
    };
  } else if (lower.includes('architect') || lower.includes('saa')) {
    return {
      badgeColor: "bg-[#f97316] text-white",
      levelColor: "text-orange-500",
      btnGradient: "from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-orange-500/10",
      bulletBg: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
      borderColor: "border-orange-500/10 hover:border-orange-500/40 shadow-orange-500/5 hover:shadow-orange-500/20",
      badgeIcon: badgeIcon || "/SAA1-C03.png",
    };
  } else {
    return {
      badgeColor: "bg-[#7c3aed] text-white",
      levelColor: "text-purple-500",
      btnGradient: "from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-500/10",
      bulletBg: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
      borderColor: "border-purple-500/10 hover:border-purple-500/40 shadow-purple-500/5 hover:shadow-purple-500/20",
      badgeIcon: badgeIcon || "/DA.png",
    };
  }
}

export default function Training({ dbPrograms }) {
  const programDetails = dbPrograms && dbPrograms.length > 0
    ? dbPrograms.map(p => {
        const styles = getProgramStyles(p.code, p.badge_icon, p.title);
        return {
          title: p.title,
          code: p.code,
          level: p.level,
          ...styles,
          features: (p.features || []).map(f => ({
            text: f,
            icon: genericFeatureIcon
          }))
        };
      })
    : STATIC_PROGRAMS;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Captcha verification states
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    certification: 'AWS Solutions Architect',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCaptchaClick = () => {
    if (captchaChecked || captchaLoading) return;
    setCaptchaLoading(true);
    setTimeout(() => {
      setCaptchaLoading(false);
      setCaptchaChecked(true);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || !captchaChecked) return;
    
    setSubmitting(true);
    try {
      const { error: dbError } = await supabase
        .from('counseling_requests')
        .insert({
          name: formData.name,
          email: formData.email,
          certification: formData.certification,
          message: formData.message
        });

      if (!dbError) {
        setFormSubmitted(true);
        // Reset forms and Captcha
        setFormData({ name: '', email: '', certification: 'AWS Solutions Architect', message: '' });
        setCaptchaChecked(false);
      } else {
        console.error('Supabase DB save error:', dbError);
        alert("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error('Database connection error:', err);
      alert("Failed to send message. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  const getFullCertificationLabel = (cert) => {
    switch (cert) {
      case "AWS Cloud Practitioner":
        return "AWS Cloud Practitioner (CLF-C02)";
      case "AWS Solutions Architect":
        return "AWS Solutions Architect Associate (SAA-C03)";
      case "AWS Developer Associate":
        return "AWS Developer Associate (DVA-C02)";
      default:
        return cert;
    }
  };

  return (
    <section id="training" className="relative overflow-hidden bg-[#080d19] py-12 md:py-16 text-white border-t border-slate-900/60">
      
      {/* Background radial atmosphere */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="section-container relative z-10 space-y-12 md:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            AWS Mentorship & <span className="text-blue-600">Counseling</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-slate-400 leading-relaxed font-medium"
          >
            Choose a course that fits your goals and level
          </motion.p>
        </div>

        {/* 3 Major Certification Training Programs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {programDetails.map((prog, idx) => (
            <motion.div
              key={prog.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`group relative bg-[#0b1329]/80 backdrop-blur-xl border rounded-[2.25rem] p-8 md:p-10 flex flex-col justify-between hover:scale-[1.01] hover:shadow-2xl transition-all duration-300 ${prog.borderColor}`}
            >
              <div>
                {/* Badge code & Icon row */}
                <div className="flex items-center justify-between mb-8">
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-extrabold tracking-wider ${prog.badgeColor}`}>
                    {prog.code}
                  </span>
                  <img
                    src={prog.badgeIcon}
                    alt={prog.title}
                    className="w-16 h-16 object-contain drop-shadow-[0_4px_12px_rgba(255,255,255,0.05)]"
                  />
                </div>

                {/* Title and Level */}
                <h3 className="text-2xl font-extrabold text-white leading-tight mb-2">
                  {prog.title}
                </h3>
                <p className={`text-[10px] font-extrabold tracking-widest uppercase mb-8 ${prog.levelColor}`}>
                  {prog.level}
                </p>

                {/* Separator line */}
                <div className="h-[1px] w-full bg-slate-800/80 mb-8" />

                {/* Bullet Points */}
                <ul className="space-y-5 mb-10">
                  {prog.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${prog.bulletBg}`}>
                        {feat.icon}
                      </div>
                      <span className="text-sm text-slate-300 font-medium">
                        {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Book session Button - Opens Modal */}
              <button
                onClick={() => {
                  setFormData(prev => ({ ...prev, certification: prog.title }));
                  setCaptchaChecked(false); // Reset captcha status when opening a new form
                  setIsModalOpen(true);
                }}
                className={`w-full inline-flex items-center justify-between px-6 py-4 bg-gradient-to-r ${prog.btnGradient} text-white rounded-2xl font-bold text-sm transition-all active:scale-[0.98] cursor-pointer shadow-lg`}
              >
                <span>Book Session</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Modal Overlay Form Container */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark glass backdrop click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body (Scrollable, limited height) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#0b1329]/95 backdrop-blur-2xl border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-y-auto w-full max-w-xl z-10 max-h-[85vh] scrollbar-thin scrollbar-thumb-slate-800"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition active:scale-90 cursor-pointer border border-slate-700/40"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16" />

              <div className="text-center mb-8 pr-6">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  Request Counseling
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Fill in your details below and I'll get back to you with a personalized certification roadmap.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Full Name */}
                    <div className="flex flex-col">
                      <label htmlFor="name" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
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
                        className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/55 text-white text-sm transition-all placeholder:text-slate-600"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col">
                      <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
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
                        className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/55 text-white text-sm transition-all placeholder:text-slate-600"
                      />
                    </div>

                    {/* Target Certification (Fixed & Not Changeable) */}
                    <div className="flex flex-col">
                      <label htmlFor="certification" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Target Certification
                      </label>
                      <input
                        type="text"
                        id="certification"
                        name="certification"
                        readOnly
                        value={getFullCertificationLabel(formData.certification)}
                        className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl text-slate-400 text-sm font-semibold select-none cursor-not-allowed border-dashed"
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col">
                      <label htmlFor="message" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
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
                        className="w-full px-4 py-3 bg-[#070b13] border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/55 text-white text-sm transition-all resize-none placeholder:text-slate-600"
                      />
                    </div>

                    {/* reCAPTCHA style "I'm not a robot" Captcha */}
                    <div className="flex items-center justify-between p-4 bg-[#070b13] border border-slate-800 rounded-xl">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={handleCaptchaClick}
                          className={`w-6 h-6 rounded border flex items-center justify-center transition-all ${
                            captchaChecked 
                              ? 'border-emerald-500 bg-emerald-500/25 text-emerald-400' 
                              : 'border-slate-800 bg-[#0c1222] hover:border-slate-600 text-transparent'
                          }`}
                        >
                          {captchaLoading && (
                            <span className="w-3.5 h-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                          )}
                          {captchaChecked && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <span className="text-xs text-slate-300 font-semibold select-none">
                          I'm not a robot
                        </span>
                      </div>
                      
                      <div className="flex flex-col items-center select-none opacity-50 shrink-0">
                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                        </svg>
                        <span className="text-[7px] text-slate-400 font-bold uppercase mt-1">reCAPTCHA</span>
                        <span className="text-[5px] text-slate-500">Privacy - Terms</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting || !captchaChecked}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/30 disabled:text-white/40 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-[0.98] shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed mt-4"
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
                    className="text-center py-8 space-y-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center text-3xl mx-auto shadow-md shadow-emerald-500/30 animate-bounce">
                      ✓
                    </div>
                    <h4 className="text-xl font-extrabold text-white">
                      Request Received!
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                      Thank you for reaching out, Sushan will review your profile and get back to you shortly at your email to schedule a counseling session!
                    </p>
                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="flex-1 py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-xs font-bold transition-all"
                      >
                        Send Another Message
                      </button>
                      <button
                        onClick={() => {
                          setFormSubmitted(false);
                          setIsModalOpen(false);
                        }}
                        className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all"
                      >
                        Close Modal
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
