import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const experiences = [
  {
    company: "Digo Solutions",
    role: "Solutions Architect",
    dateRange: "April 2026 – Current",
    location: "Kathmandu, Nepal",
    logo: "/digo.png",
    responsibilities: [
      "Architecting highly available, secure, and cost-optimized infrastructure on Amazon Web Services (AWS).",
      "Designing multi-tier application architectures incorporating Elastic Load Balancing, Auto Scaling, and multi-AZ deployments.",
      "Creating infrastructure as code (IaC) blueprints using AWS CloudFormation and Terraform.",
      "Consulting with development and client teams to design migration plans for legacy setups to AWS."
    ],
    color: "cyan"
  },
  {
    company: "Digo Solutions",
    role: "Junior Cloud Engineer",
    dateRange: "Jan 2026 – April 2026",
    location: "Kathmandu, Nepal",
    logo: "/digo.png",
    responsibilities: [
      "Assisted in configuring and deploying basic AWS resources (EC2, S3, RDS, IAM).",
      "Created and managed CloudWatch alerts and configured Billing Alarms for budget control.",
      "Maintained and audited IAM policies to adhere to the principle of least privilege.",
      "Assisted client teams with basic cloud troubleshooting and system monitoring tasks."
    ],
    color: "blue"
  },
  {
    company: "Citytech",
    role: "Software Engineering (DevOps)",
    dateRange: "Jan 2026 – April 2026",
    location: "Kathmandu, Nepal",
    logo: "/citytech.png",
    responsibilities: [
      "Set up and managed K3s lightweight Kubernetes clusters for local and staging environments.",
      "Deployed and maintained workloads on Kubernetes (K8s), managing pods, services, and namespaces.",
      "Built and maintained Jenkins CI/CD pipelines for automated build, test, and deployment workflows.",
      "Implemented GitOps-based continuous delivery using ArgoCD for Kubernetes application management.",
      "Containerized applications using Docker and managed private image registries with Harbor.",
      "Deployed Prometheus and Grafana for infrastructure and application performance monitoring.",
      "Created and maintained Helm charts for standardized, repeatable Kubernetes deployments.",
      "Worked on Linux server administration, including service management and resource optimization.",
      "Performed memory dump analysis and debugging to diagnose server-side performance issues.",
      "Utilized Lens and K9s for efficient Kubernetes pod management and cluster troubleshooting."
    ],
    color: "blue"
  }
];

function ExperienceCard({ exp, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isImagePath = exp.logo.startsWith('/');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      className="relative bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl p-6 md:p-8 rounded-3xl md:rounded-[2rem] border border-slate-100 dark:border-slate-800/60 shadow-xl shadow-slate-200/40 dark:shadow-none hover:shadow-2xl hover:shadow-blue-200/30 dark:hover:shadow-cyan-900/20 transition-all group/card overflow-hidden w-full cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Decorative hover gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-cyan-900/20 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover/card:opacity-100 transition-opacity" />

      <div className="flex flex-col gap-4">
        
        {/* Header row with logo, title, and company */}
        <div className="flex items-center gap-4 w-full">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            className="w-14 h-14 bg-white dark:bg-slate-900/80 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-150 dark:border-slate-800 shadow-md p-2 shrink-0 transition-transform"
          >
            {isImagePath ? (
              <img
                src={exp.logo}
                alt={exp.company}
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            ) : (
              <span className="text-2xl">{exp.logo}</span>
            )}
          </motion.div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight truncate leading-tight">
              {exp.role}
            </h3>
            <p className="text-xs font-black text-blue-600 dark:text-cyan-400 mt-1 uppercase tracking-wider">
              {exp.company}
            </p>
          </div>
        </div>

        {/* Date and Location info bar */}
        <div className="flex flex-wrap items-center gap-3 text-slate-405 dark:text-slate-500 font-bold text-[10px] uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {exp.dateRange}
          </span>
          <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {exp.location}
          </span>
        </div>
      </div>

      {/* Expandable Key Responsibilities list */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80">
              <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
                Key Responsibilities:
              </h4>
              <div className="grid grid-cols-1 gap-3.5">
                {exp.responsibilities.map((item, i) => (
                  <div
                    key={i}
                    className="text-xs md:text-sm text-slate-650 dark:text-slate-355 flex items-start gap-2.5 leading-relaxed"
                  >
                    <span className="text-blue-500 dark:text-cyan-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show/Hide details visual control */}
      <div className="flex justify-end mt-5 pt-3 border-t border-slate-100/40 dark:border-slate-850/40">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:text-blue-500 dark:hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
        >
          {isExpanded ? "Hide Details" : "View Full Details"}
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden py-12 md:py-16 bg-slate-50/30 dark:bg-slate-950/30">
      
      {/* Background radial glow */}
      <div className="absolute top-[30%] left-[-10%] w-[400px] h-[400px] bg-blue-500/5 dark:bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="section-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Work <span className="text-blue-600">Experience</span>
          </motion.h2>
          <motion.div
            className="h-1.5 w-16 bg-blue-600 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
          />
        </div>

        {/* Alternating Timeline Area */}
        <div className="relative max-w-5xl mx-auto px-4 md:px-0">
          
          {/* Vertical central divider line (aligned to left on mobile, center on desktop) */}
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800" />

          {/* Timeline Nodes */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => {
              // Solutions Architect (Index 0): Left side
              // Junior Cloud (Index 1): Right side
              // DevOps (Index 2): Left side
              const alignRight = index % 2 === 1;

              return (
                <div 
                  key={`${exp.company}-${index}`} 
                  className={`relative flex flex-col md:flex-row items-center w-full justify-between ${
                    alignRight ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Centered Timeline Node with pulsing ping overlay */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-[58px] z-20">
                    <div className="relative flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-blue-600 dark:bg-cyan-400 border-4 border-slate-50 dark:border-slate-950 shadow-md relative z-10" />
                      <div className="absolute inset-0 w-4 h-4 bg-blue-400 dark:bg-cyan-400 rounded-full animate-ping opacity-35" />
                    </div>
                  </div>

                  {/* Horizontal Link Branch Connectors (Desktop only) */}
                  {alignRight ? (
                    // Right-side card connector (runs from 50% line to 50% + offset card edge)
                    <div className="absolute top-[66px] left-1/2 w-8 lg:w-10 h-0.5 bg-slate-200 dark:bg-slate-800 hidden md:block" />
                  ) : (
                    // Left-side card connector (runs from 50% line to 50% - offset card edge)
                    <div className="absolute top-[66px] right-1/2 w-8 lg:w-10 h-0.5 bg-slate-200 dark:bg-slate-800 hidden md:block" />
                  )}

                  {/* Card Wrapper (takes 100% on mobile, exactly 50%-offset on desktop) */}
                  <div className="w-full md:w-[calc(50%-32px)] pl-14 md:pl-0">
                    <ExperienceCard exp={exp} index={index} />
                  </div>

                  {/* Spacer to push card to the side (Desktop only) */}
                  <div className="hidden md:block md:w-[calc(50%-32px)]" />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
