import { motion } from 'framer-motion';

export default function Home() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      <div className="section-container relative z-10 w-full">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 lg:gap-20 text-center md:text-left">

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-shrink-0"
          >
            <div className="relative w-32 h-32 xs:w-40 xs:h-40 md:w-56 md:h-56">
              <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-10 dark:opacity-20 animate-pulse" />
              <div className="relative w-full h-full rounded-full border-[4px] md:border-[6px] border-white dark:border-slate-800 shadow-2xl overflow-hidden">
                <img
                  src="/profile.JPG"
                  alt="Sushan Aryal"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl xs:text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight leading-[1.1]">
                Sushan Aryal
              </h1>
              <p className="text-lg md:text-2xl font-medium text-blue-600 dark:text-blue-400 mb-6 tracking-tight">
                AWS Solution Architect Associate | Oracle Architect Associate
              </p>
              <p className="text-base md:text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-xl mx-auto md:mx-0">
                Building cloud-native and scalable systems. Focused on architecting secure, automated, and high-performance infrastructure on AWS.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a
                  href="#projects"
                  className="btn-primary"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="btn-secondary"
                >
                  Contact Me
                </a>
              </div>
            </motion.div>

            {/* Subtle Social Links */}
            <motion.div
              className="mt-12 flex justify-center md:justify-start gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <a href="https://github.com/Sushan1034" target="_blank" rel="noreferrer" className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                <span className="font-medium text-sm">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/sushan-aryal" target="_blank" rel="noreferrer" className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                <span className="font-medium text-sm">LinkedIn</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-slate-300 dark:from-slate-600 to-transparent" />
      </motion.div>
    </section>
  );
}
