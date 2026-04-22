import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const stages = [
  {
    id: 'vscode',
    label: 'VS Code Push',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg'
  },
  {
    id: 'github',
    label: 'GitHub Trigger',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg'
  },
  {
    id: 'jenkins',
    label: 'Jenkins CI/CD',
    icon: '/Jenkins.png'
  },
  {
    id: 'sonarqube',
    label: 'SonarQube Test',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sonarqube/sonarqube-original.svg'
  },
  { 
    id: 'trivy', 
    label: 'Trivy Scan', 
    icon: 'https://avatars.githubusercontent.com/u/12783832?v=4' 
  },
  {
    id: 'aws',
    label: 'Deploy to EC2',
    icon: '/EC2.png'
  },
];

import FloatingBackground from './FloatingBackground';

const Preloader = ({ onComplete }) => {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (currentStage < stages.length) {
      const timer = setTimeout(() => {
        setCurrentStage((prev) => prev + 1);
      }, 1200); // Slower for clarity
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStage, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
    >
      <FloatingBackground />

      {/* Ambient Blurs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-slate-200/50 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-10">
        <div className="text-center mb-24">
          <motion.h2
            className="text-slate-900 font-bold text-2xl md:text-3xl tracking-tight mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Portfolio Deployment In Progress
          </motion.h2>
          <div className="flex items-center justify-center gap-2 text-blue-600 font-mono text-sm tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            Pipeline Active
          </div>
        </div>

        <div className="relative">
          {/* Pipeline Track */}
          <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-200 -translate-y-1/2 rounded-full" />

          {/* Active Progress Line */}
          <motion.div
            className="absolute top-1/2 left-0 h-1.5 bg-blue-600 -translate-y-1/2 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.3)]"
            initial={{ width: '0%' }}
            animate={{ width: `${(Math.min(currentStage, stages.length - 1) / (stages.length - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease: "circOut" }}
          />

          <div className="flex justify-between items-center w-full relative z-10">
            {stages.map((stage, index) => {
              const isActive = index <= currentStage;
              const isCurrent = index === currentStage;

              return (
                <div key={stage.id} className="flex flex-col items-center">
                  <motion.div
                    className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 relative ${isActive
                        ? 'bg-white border-blue-600 shadow-xl shadow-blue-900/10'
                        : 'bg-white border-slate-200'
                      }`}
                    animate={{
                      scale: isCurrent ? 1.2 : 1,
                      y: isCurrent ? -10 : 0,
                      rotate: isCurrent ? [0, -5, 5, 0] : 0
                    }}
                  >
                    {/* Pulsing indicator */}
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-4 border-blue-200"
                        animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      />
                    )}

                    <div className="p-3 w-full h-full flex items-center justify-center">
                      <img
                        src={stage.icon}
                        alt={stage.label}
                        className={`w-full h-full object-contain transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-20 grayscale'}`}
                      />
                    </div>
                  </motion.div>

                  <div className="absolute mt-28 md:mt-32 text-center w-32">
                    <p className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                      {stage.label}
                    </p>
                    {isCurrent && (
                      <motion.div
                        className="w-full bg-slate-100 h-1 mt-2 rounded-full overflow-hidden"
                      >
                        <motion.div
                          className="h-full bg-blue-600"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.2, ease: "linear" }}
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-56">
          <div className="max-w-md mx-auto bg-slate-900 rounded-xl p-4 shadow-2xl">
            <div className="flex gap-1.5 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="font-mono text-[10px] md:text-xs leading-relaxed"
              >
                <p className="text-blue-400">admin@devops:~$ <span className="text-white">./deploy_portfolio.sh</span></p>
                <p className="text-slate-400 mt-1">
                  {currentStage < stages.length
                    ? `[INFO] Current Stage: ${stages[currentStage].label}...`
                    : '[SUCCESS] Pipeline completed. Redirecting to production...'}
                </p>
                <p className="text-green-400 mt-0.5">
                  {currentStage < stages.length
                    ? `> Progress: ${Math.round((currentStage / stages.length) * 100)}%`
                    : '> Status: 200 OK'}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
