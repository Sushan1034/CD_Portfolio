import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Preloader from './components/Preloader';
import FloatingBackground from './components/FloatingBackground';
import Navbar from './components/Navbar';
import Home from './sections/Home';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';

import ScrollToTop from './components/ScrollToTop';
import SectionDivider from './components/SectionDivider';

export default function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

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
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] dark:opacity-[0.1]" />
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
            <About />
            <SectionDivider />
            <Experience />
            <SectionDivider />
            <Projects />
            <SectionDivider />
            <Skills />
            <SectionDivider />
            <Certifications />
            <SectionDivider />
            <Contact />
            
            <footer className="py-12 text-center text-slate-500 dark:text-slate-400 text-sm border-t border-slate-200 dark:border-slate-800">
              <p>© {new Date().getFullYear()} Sushan Aryal. Built with React & Tailwind CSS.</p>
            </footer>

            <ScrollToTop />
          </motion.main>
        </>
      )}
    </div>
  );
}
