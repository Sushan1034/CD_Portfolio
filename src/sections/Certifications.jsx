import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const certifications = [
  {
    title: "AWS Solutions Architect Associate",
    issuer: "Amazon Web Services",
    link: "https://www.credly.com/badges/8cf802c9-2b2e-4e88-84d7-f2c5c08abc21",
    icon: "/SAA1-C03.png",
    color: "from-orange-400 to-orange-600"
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    link: "https://www.credly.com/badges/4f2a8365-92c3-4e10-8ac4-497de332703f",
    icon: "/CLP1.png",
    color: "from-blue-400 to-blue-600"
  },
  {
    title: "Oracle Architect Associate",
    issuer: "Oracle",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=91504DD65238D09DBA697AA9D265BEC3E69B56EBC4C592B35E1D611470C99036",
    icon: "/OAA1.png",
    color: "from-red-400 to-red-600"
  },
  {
    title: "OCI Foundations Associate",
    issuer: "Oracle",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=4A3497FCDDBEAF6437EDBCF6AAD1B20A2DE06BE986270C091CC15FEB738450C0",
    icon: "/OFA1.png",
    color: "from-slate-400 to-slate-600"
  }
];

export default function Certifications() {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setRotation(prev => prev - 90);
      setActiveIndex(prev => (prev + 1) % certifications.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            Carrer Timeline
          </div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Professional <span className="text-blue-600">Credentials</span>
          </motion.h2>
          <motion.div
            className="h-1.5 w-16 bg-blue-600 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
          />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-20 lg:gap-32">
          {/* 3D Circular Animation Stage */}
          <div
            className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] perspective-2000 flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              className="relative w-full h-full"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{
                rotateY: rotation,
              }}
              transition={{ duration: 1, ease: "circOut" }}
            >
              {certifications.map((cert, index) => {
                const angle = index * 90;
                const isActive = index === activeIndex;

                return (
                  <motion.div
                    key={cert.title}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `rotateY(${angle}deg) translateZ(250px)`,
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className={`block w-40 h-40 md:w-64 md:h-64 transition-all duration-700 ${isActive ? 'scale-110 opacity-100 grayscale-0' : 'scale-90 opacity-40 grayscale blur-[2px]'
                        }`}
                      onClick={() => setActiveIndex(index)}
                    >
                      <img
                        src={cert.icon}
                        alt={cert.title}
                        className={`w-full h-full object-contain transition-all duration-700 ${isActive ? 'drop-shadow-[0_20px_40px_rgba(37,99,235,0.5)]' : 'drop-shadow-lg'
                          }`}
                      />
                    </a>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Ambient Base Shadow */}
            <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[120%] h-12 bg-slate-900/5 rounded-[100%] blur-3xl -z-10" />
          </div>

          {/* Info Card */}
          <div className="flex-1 max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/60 dark:shadow-none border border-slate-100 dark:border-slate-800 relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${certifications[activeIndex].color} opacity-5 -mr-16 -mt-16 rounded-full blur-3xl`} />

                <span className="inline-block px-5 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase mb-8">
                  Official Badge
                </span>

                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                  {certifications[activeIndex].title}
                </h3>

                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 shadow-sm dark:shadow-none">
                    <span className="text-xl">🎓</span>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-[0.2em]">Accredited By</p>
                    <p className="text-slate-900 dark:text-slate-100 font-bold text-lg">{certifications[activeIndex].issuer}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href={certifications[activeIndex].link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-600 dark:hover:bg-blue-700 transition-all shadow-lg active:scale-95 group/btn"
                  >
                    Verify Credential
                    <svg className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>

                {/* Perspective Dots */}
                <div className="flex gap-3 mt-12">
                  {certifications.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setActiveIndex(i);
                        setRotation(i * -90);
                      }}
                      className={`h-2.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-12 bg-blue-600' : 'w-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 3D Space Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-50/20 rounded-full blur-[140px] pointer-events-none -z-10" />
    </section>
  );
}
