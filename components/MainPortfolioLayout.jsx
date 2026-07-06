'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Preloader from '../src/components/Preloader';
import FloatingBackground from '../src/components/FloatingBackground';
import Navbar from '../src/components/Navbar';
import Home from '../src/sections/Home';
import Experience from '../src/sections/Experience';
import Projects from '../src/sections/Projects';
import Certifications from '../src/sections/Certifications';
import InstagramCreation from '../src/sections/InstagramCreation';
import Training from '../src/sections/Training';
import Contact from '../src/sections/Contact';

import ScrollToTop from '../src/components/ScrollToTop';
import AIChatbot from '../src/components/AIChatbot';
import SectionDivider from '../src/components/SectionDivider';

export default function MainPortfolioLayout({ data }) {
  const [loading, setLoading] = useState(true);

  // Skip preloader if it has already run in this session
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('preloader_run') === 'true') {
      setLoading(false);
    }
  }, []);

  const handleLoadingComplete = useCallback(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('preloader_run', 'true');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      const params = new URLSearchParams(window.location.search);
      const scrollTo = params.get('scroll');
      if (scrollTo) {
        const timer = setTimeout(() => {
          const element = document.getElementById(scrollTo);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            // Clean up the URL query parameters so it looks pristine
            window.history.replaceState(null, '', '/');
          }
        }, 600);
        return () => clearTimeout(timer);
      }
    }
  }, [loading]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-50 dark:bg-slate-950 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-50">
      {/* Entry Animation */}
      <AnimatePresence>
        {loading && <Preloader onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          
          {/* Unified Global Background */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] dark:hidden" />
            <FloatingBackground />
            <div className="absolute -top-[10%] -left-[5%] w-[60%] md:w-[40%] h-[40%] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-[80px] md:blur-[120px]" />
            <div className="absolute top-[30%] right-[-5%] w-[50%] md:w-[35%] h-[35%] bg-slate-200/50 dark:bg-slate-800/20 rounded-full blur-[60px] md:blur-[100px]" />
            <div className="absolute bottom-[10%] left-[10%] w-[45%] md:w-[30%] h-[30%] bg-blue-50/50 dark:bg-blue-900/20 rounded-full blur-[80px] md:blur-[120px]" />
          </div>

          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <Home />
            <SectionDivider />
            <Certifications dbCertifications={data.certifications} />
            <SectionDivider />
            <InstagramCreation dbVideos={data.instagramVideos} />
            <SectionDivider />
            <Experience />
            <SectionDivider />
            <Projects />
            <SectionDivider />
            <Training dbPrograms={data.trainingPrograms} />
            <SectionDivider />
            <Contact />
            
            <footer className="py-12 text-center text-slate-500 dark:text-slate-400 text-sm border-t border-slate-200 dark:border-slate-800">
              <p>© {new Date().getFullYear()} Sushan Aryal.</p>
            </footer>

            <ScrollToTop />
            <AIChatbot />
          </motion.main>
        </>
      )}
    </div>
  );
}
