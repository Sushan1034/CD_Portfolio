'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Certs', href: '#certifications' },
  { label: 'Videos', href: '#instagram-creation' },
  { label: 'Work', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Mentorship', href: '#training' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Disable cross-page layoutId animations during initial page mounts
  useEffect(() => {
    setCanAnimate(false);
    const timer = setTimeout(() => {
      setCanAnimate(true);
    }, 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks
        .filter((l) => l.href.startsWith('#'))
        .map((l) => l.href.replace('#', ''));
        
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleNavClick = (e, href) => {
    setMenuOpen(false);
    
    if (href.startsWith('#')) {
      e.preventDefault();
      const sectionId = href.replace('#', '');
      if (pathname !== '/') {
        router.push(`/?scroll=${sectionId}`);
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <nav className={`glass-card px-4 py-3 flex items-center justify-between transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>

          {/* Logo / Name */}
          <div className="px-4">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="text-xl font-bold text-slate-900 dark:text-white tracking-tight"
            >
              SA<span className="text-blue-600">.</span>
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = link.href.startsWith('#')
                ? activeSection === link.href.replace('#', '') && pathname === '/'
                : pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-2.5 lg:px-4 py-2 text-sm lg:text-base font-semibold transition-all duration-200 rounded-lg ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId={canAnimate ? "nav-indicator" : undefined}
                      className="absolute inset-0 bg-blue-50 dark:bg-blue-900/30 rounded-lg z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Download CV */}
            <a
              href="/SushanAryal_CV.pdf"
              download
              className="hidden md:inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Download CV
            </a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2.5 -mr-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-5 h-0.5 bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </nav>
      </div>


      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-full left-0 right-0 mx-4 mt-2 glass-card p-4 md:hidden z-50 shadow-2xl"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = link.href.startsWith('#')
                  ? activeSection === link.href.replace('#', '') && pathname === '/'
                  : pathname === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-4 py-3.5 rounded-xl text-base font-semibold transition-colors ${isActive ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
              <a
                href="/SushanAryal_CV.pdf"
                download
                className="w-full px-4 py-4 bg-blue-600 text-white rounded-xl font-bold text-center hover:bg-blue-700 transition shadow-lg shadow-blue-200 dark:shadow-none"
              >
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
