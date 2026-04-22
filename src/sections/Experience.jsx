import { motion } from 'framer-motion';

const experiences = [
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

function ExperienceItem({ exp, index }) {
  const isImagePath = exp.logo.startsWith('/');

  return (
    <div className="relative pl-12 md:pl-20 pb-16 border-l-2 border-slate-200 dark:border-slate-800 last:pb-0 ml-6 md:ml-12 group">
      {/* Timeline Dot & Pulsing Effect */}
      <div className="absolute -left-[11px] top-0">
        <div className="relative flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-blue-600 dark:bg-cyan-500 border-4 border-white dark:border-slate-950 shadow-md relative z-10" />
          <div className="absolute inset-0 w-5 h-5 bg-blue-400 dark:bg-cyan-400 rounded-full animate-ping opacity-20 dark:opacity-40" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
        className="relative bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/60 shadow-xl shadow-slate-200/40 dark:shadow-none hover:shadow-2xl hover:shadow-blue-200/30 dark:hover:shadow-cyan-900/20 transition-all group/card overflow-hidden"
      >
        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-cyan-900/20 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover/card:opacity-100 transition-opacity" />

        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              className="w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-slate-900/80 rounded-3xl flex items-center justify-center overflow-hidden border-2 border-slate-50 dark:border-slate-800 shadow-2xl p-4 shrink-0 transition-transform"
            >
              {isImagePath ? (
                <img
                  src={exp.logo}
                  alt={exp.company}
                  className="w-full h-full object-contain filter drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                />
              ) : (
                <span className="text-4xl">{exp.logo}</span>
              )}
            </motion.div>

            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                {exp.role}
              </h3>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-1">
                <span className="px-4 py-1.5 rounded-full bg-blue-600 dark:bg-cyan-500/20 text-white dark:text-cyan-400 font-bold text-sm shadow-lg shadow-blue-200 dark:shadow-none border border-transparent dark:border-cyan-500/30">
                  {exp.company}
                </span>
                <span className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 font-medium text-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {exp.location}
                </span>
                <span className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 font-medium text-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {exp.dateRange}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exp.responsibilities.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700/50 group/item"
            >
              <div className="mt-1.5 w-6 h-6 rounded-lg bg-blue-50 dark:bg-cyan-500/10 flex items-center justify-center shrink-0 border border-blue-100 dark:border-cyan-500/20 group-hover/item:border-blue-200 dark:group-hover/item:border-cyan-500/40 transition-colors">
                <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400 shadow-[0_0_8px_rgba(37,99,235,0.6)] dark:shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 dark:bg-cyan-900/10 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-50 dark:bg-blue-900/10 rounded-full blur-[120px] -ml-64 -mb-64 pointer-events-none transition-colors duration-500" />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
          >
            Professional Journey
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Work <span className="text-blue-600 dark:text-cyan-400">Experience</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Building scalable infrastructure and efficient deployment pipelines at scale.
          </motion.p>
        </div>

        <div className="mt-12 max-w-5xl mx-auto">
          {experiences.map((exp, i) => (
            <ExperienceItem key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
