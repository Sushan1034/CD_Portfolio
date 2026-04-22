import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-2xl shadow-blue-500/30 flex items-center justify-center border border-blue-400/30 backdrop-blur-sm group"
          aria-label="Scroll to top"
        >
          <div className="absolute inset-0 rounded-2xl bg-blue-400/20 blur-md group-hover:bg-blue-400/40 transition-colors" />
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 relative z-10" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M5 15l7-7 7 7" 
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
