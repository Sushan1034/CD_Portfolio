import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const stages = [
  {
    id: 1,
    title: "Discovery",
    description: "Discovered Cloud Computing during academic coursework, which sparked my curiosity to explore scalable systems and infrastructure.",
    icon: "🔍"
  },
  {
    id: 2,
    title: "Oracle Certifications",
    description: "Completed Oracle Cloud Infrastructure (OCI) Foundations Associate and Architect Associate during an academic opportunity, building a strong foundation in cloud concepts.",
    icon: "🏆"
  },
  {
    id: 3,
    title: "AWS Training",
    description: "Attended a 15-day AWS training program at college, gaining hands-on exposure to core AWS services.",
    icon: "🎓"
  },
  {
    id: 4,
    title: "AWS Cloud Practitioner",
    description: "Earned AWS Cloud Practitioner certification using a provided voucher, validating foundational cloud knowledge.",
    icon: "📜"
  },
  {
    id: 5,
    title: "Internship – Citytech",
    description: "Joined Citytech as a DevOps Intern, where I worked with CI/CD pipelines, automation, and deployment workflows.",
    icon: "💼"
  },
  {
    id: 6,
    title: "AWS Solutions Architect Associate",
    description: "Achieved AWS Solutions Architect Associate certification with mentorship and structured guidance.",
    icon: "🏗️"
  },
  {
    id: 7,
    title: "Future Goal",
    description: "Currently preparing for AWS DevOps Engineer Professional to deepen expertise in automation and scalable infrastructure.",
    icon: "🚀"
  }
];

export default function About() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => (prev + 1) % stages.length);
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => (prev - 1 + stages.length) % stages.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextStep, 6000);
    return () => clearInterval(timer);
  }, [nextStep, isPaused]);

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
          >
            Career Timeline
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            My <span className="text-blue-600">Journey</span>
          </motion.h2>
          <motion.p 
            className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            A continuous pipeline of learning, certification, and professional growth in the cloud ecosystem.
          </motion.p>
        </div>

        <div 
          className="relative max-w-5xl mx-auto py-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
        <div 
          className="relative max-w-5xl mx-auto py-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Pipeline Track - Desktop */}
          <div className="absolute top-[48px] md:top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 rounded-full hidden md:block" />
          
          {/* Progress Line - Desktop */}
          <motion.div 
            className="absolute top-[48px] md:top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)] hidden md:block"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / (stages.length - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* Stages Row - Scrollable on mobile */}
          <div className="relative overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
            <div className="flex md:grid md:grid-cols-7 relative z-20 min-w-max md:min-w-0 h-24 md:h-16 gap-4 md:gap-0 px-4 md:px-0">
              {stages.map((stage, index) => {
                const isActive = index === currentStep;
                const isPast = index < currentStep;

                return (
                  <div key={stage.id} className="flex flex-col items-center relative group w-20 md:w-auto">
                    <div className="relative">
                      <motion.button
                        onClick={() => setCurrentStep(index)}
                        className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-xl transition-all duration-500 border-4 ${
                          isActive 
                          ? 'bg-white dark:bg-slate-900 border-blue-600 shadow-xl shadow-blue-200 dark:shadow-blue-900/20 text-blue-600 dark:text-blue-400' 
                          : isPast 
                          ? 'bg-blue-600 border-blue-600 text-white' 
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 group-hover:border-blue-300 dark:group-hover:border-blue-500'
                        }`}
                        animate={{ 
                          scale: isActive ? 1.15 : 1,
                          y: isActive ? -4 : 0
                        }}
                      >
                        {isActive ? (
                          <motion.span
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                          >
                            {stage.icon}
                          </motion.span>
                        ) : (
                          <span className="font-bold text-sm">{index + 1}</span>
                        )}

                        {/* Active Glow */}
                        {isActive && (
                          <motion.div 
                            className="absolute inset-0 rounded-2xl bg-blue-400/20 blur-md"
                            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          />
                        )}
                      </motion.button>
                    </div>

                    {/* Desktop Title Labels */}
                    <div className="hidden md:block mt-6 text-center">
                      <p className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
                        {stage.title}
                      </p>
                    </div>

                    {/* Mobile Labels */}
                    <div className="md:hidden mt-2 text-center w-full overflow-hidden">
                      <p className={`text-[9px] font-bold uppercase tracking-tighter truncate ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>
                        {stage.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Stage Card */}
          <div className="mt-20 md:mt-32 min-h-[220px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white dark:bg-slate-900/80 backdrop-blur-sm p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none max-w-3xl mx-auto relative group overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 -mr-16 -mt-16 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-blue-200 shrink-0">
                    {stages[currentStep].icon}
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                      {stages[currentStep].title}
                    </h3>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium italic">
                      "{stages[currentStep].description}"
                    </p>
                  </div>
                </div>

                {/* Progress Bar (Manual Timer Visual) */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-blue-600/30"
                  initial={{ width: "0%" }}
                  animate={{ width: isPaused ? "0%" : "100%" }}
                  key={currentStep + (isPaused ? '-paused' : '')}
                  transition={{ duration: 6, ease: "linear" }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-12 flex items-center justify-center gap-6">
            <button 
              onClick={prevStep}
              className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white dark:hover:text-white transition-all active:scale-90 bg-white dark:bg-slate-800"
              aria-label="Previous step"
            >
              ←
            </button>
            
            <div className="flex gap-2">
              {stages.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentStep ? 'w-8 bg-blue-600' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}
                />
              ))}
            </div>

            <button 
              onClick={nextStep}
              className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white dark:hover:text-white transition-all active:scale-90 bg-white dark:bg-slate-800"
              aria-label="Next step"
            >
              →
            </button>
          </div>

          <div className="text-center mt-6">
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
               {isPaused ? (
                 <><span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" /> Paused (Hovering)</>
               ) : (
                 <><span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" /> Auto-playing Journey</>
               )}
             </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
