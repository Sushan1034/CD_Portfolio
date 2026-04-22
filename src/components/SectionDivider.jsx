import { motion } from 'framer-motion';

export default function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative flex items-center justify-center px-6 md:px-20"
    >
      {/* Left line */}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-slate-300 dark:to-slate-700" />

      {/* Center dot */}
      <div className="relative mx-4 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60 dark:bg-blue-500/60" />
        <div className="absolute w-4 h-4 rounded-full border border-blue-200/60 dark:border-blue-500/30" />
      </div>

      {/* Right line */}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-200 dark:via-slate-800 to-slate-300 dark:to-slate-700" />
    </motion.div>
  );
}
