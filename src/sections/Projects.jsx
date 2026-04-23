import { motion } from 'framer-motion';

const projects = [
  {
    id: "dshare",
    title: "D-Share",
    description: "Blockchain-based decentralized file sharing system",
    tech: ["Blockchain", "Node.js", "Express"],
    details: "D-Share is a decentralized platform designed to securely share files without relying on centralized servers. It ensures data integrity and removes single points of failure.",
    usecase: "Useful for secure file transfer where trust and decentralization are important.",
    github: "#"
  },
  {
    id: "upacharhub",
    title: "UpacharHub",
    description: "Mental health support platform for youth",
    tech: ["MERN Stack"],
    details: "Platform designed to support youth dealing with stress and mental health challenges through guidance and counseling.",
    usecase: "Helps users access mental health resources easily.",
    github: "#"
  },
  {
    id: "spendwise",
    title: "SpendWise",
    description: "Income and expense tracking platform",
    tech: ["MERN Stack"],
    details: "Tracks income and expenses, categorizes spending, and suggests better saving strategies.",
    usecase: "Helps individuals manage finances and improve saving habits.",
    github: "#"
  },
  {
    id: "powerpledge",
    title: "PowerPledge",
    description: "Electricity usage monitoring platform",
    tech: ["PHP", "MySQL"],
    details: "Monitors electricity usage across multiple sources and provides insights.",
    usecase: "Useful for energy tracking and optimization.",
    github: "#"
  },
  {
    id: "hamronepal",
    title: "HamroNepal",
    description: "E-commerce platform for local Nepali products",
    tech: ["React", "Go", "PostgreSQL"],
    details: "Promotes local products from all 77 districts of Nepal.",
    usecase: "Supports local businesses and cultural products.",
    github: "#"
  },
  {
    id: "patchforge",
    title: "PatchForge",
    description: "Database patch automation platform",
    tech: ["Node.js", "Docker", "PostgreSQL"],
    details: "Automates database patching and updates without manual intervention.",
    usecase: "Reduces human error and improves efficiency.",
    github: "#"
  }
];

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group relative glass-card p-6 md:p-8 flex flex-col h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden dark:bg-slate-900/80 dark:border-slate-800 dark:hover:border-blue-900"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 md:w-32 md:h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500" />

      <div className="relative z-10 flex-1">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mb-6 font-medium leading-tight">
          {project.description}
        </p>

        <div className="space-y-4 mb-8">
          <div>
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-slate-400 block mb-1">Impact & Details</span>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-4">
              {project.details}
            </p>
          </div>
          <div>
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-slate-400 block mb-1">Best Use Case</span>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 italic line-clamp-2">
              "{project.usecase}"
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-0.5 md:px-2.5 md:py-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[9px] md:text-[10px] font-bold rounded-md border border-slate-100 dark:border-slate-700 uppercase tracking-wider group-hover:border-blue-100 dark:group-hover:border-blue-900/50 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors duration-300">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
          >
            Portfolio Showcase
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight"
          >
            Featured <span className="text-blue-600">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            A collection of systems and platforms focusing on decentralization, scalability, and user-centric solutions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <a href="https://github.com/Sushan1034" target="_blank" rel="noreferrer" className="btn-secondary group">
            <span>Explore more on GitHub</span>
            <svg className="w-4 h-4 ml-2 inline-block transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
