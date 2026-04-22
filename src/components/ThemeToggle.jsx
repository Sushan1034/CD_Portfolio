import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <motion.svg
          className="absolute w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          initial={false}
          animate={{
            scale: theme === 'dark' ? 0 : 1,
            opacity: theme === 'dark' ? 0 : 1,
            rotate: theme === 'dark' ? -90 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </motion.svg>
        <motion.svg
          className="absolute w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          initial={false}
          animate={{
            scale: theme === 'light' ? 0 : 1,
            opacity: theme === 'light' ? 0 : 1,
            rotate: theme === 'light' ? 90 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </motion.svg>
      </div>
    </button>
  );
}
