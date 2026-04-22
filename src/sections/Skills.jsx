import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// SVG icon components for AWS services and other tools
const AwsIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full">
    <path fill="#FF9900" d="M18.6 26.4c0 .8.1 1.5.3 2s.5.9.8 1.2c.3.3.7.5 1.1.6.4.1.8.2 1.2.2.3 0 .7 0 1-.1.4-.1.7-.2 1-.4.3-.2.5-.4.7-.7.2-.3.3-.7.3-1.1 0-.4-.1-.8-.4-1.1-.3-.3-.6-.5-1-.7-.4-.2-.9-.4-1.4-.5-.5-.1-1.1-.3-1.6-.4-.5-.1-1.1-.3-1.6-.5-.5-.2-1-.4-1.4-.8-.4-.3-.8-.8-1-1.3-.3-.5-.4-1.2-.4-2 0-.8.2-1.5.5-2.1.3-.6.8-1.1 1.3-1.5.5-.4 1.1-.7 1.8-.9.7-.2 1.3-.3 2-.3.7 0 1.4.1 2 .3.6.2 1.2.5 1.7.9.5.4.9.9 1.1 1.5.3.6.4 1.3.4 2h-2.3c-.1-.8-.3-1.4-.8-1.8-.5-.4-1.1-.6-1.9-.6-.3 0-.5 0-.8.1-.3.1-.5.2-.7.3-.2.1-.4.3-.5.5-.1.2-.2.5-.2.8 0 .4.1.7.3.9.2.3.5.5.9.7.4.2.8.3 1.3.5.5.1 1 .3 1.6.4.5.1 1 .3 1.6.5.5.2 1 .5 1.4.8.4.3.7.8 1 1.3.3.5.4 1.1.4 1.9 0 .9-.2 1.7-.5 2.3-.4.7-.8 1.2-1.4 1.6-.6.4-1.2.7-1.9.9-.7.2-1.4.3-2.2.3-.8 0-1.6-.1-2.3-.3-.7-.2-1.3-.5-1.8-1-.5-.4-.9-1-1.2-1.7-.3-.7-.4-1.5-.4-2.4h2.3zM28.8 21.6h2.1l2.8 9.2h.1l2.7-9.2h2l-3.8 11.7h-2l-3.9-11.7zM44 30.7c.3.5.8.8 1.5.8.5 0 .9-.1 1.2-.3.3-.2.6-.5.7-.8h2c-.3.9-.8 1.6-1.5 2-.7.4-1.5.6-2.5.6-.7 0-1.3-.1-1.9-.4-.5-.2-1-.6-1.4-1s-.7-.9-.9-1.5c-.2-.6-.3-1.2-.3-1.9 0-.7.1-1.3.3-1.8.2-.6.5-1.1.9-1.5.4-.4.9-.7 1.4-1 .6-.2 1.2-.4 1.8-.4.8 0 1.4.2 2 .5.6.3 1 .7 1.4 1.2.4.5.6 1.1.8 1.7.1.6.1 1.3 0 2h-6c0 .7.2 1.3.5 1.8zm2.6-4.9c-.3-.4-.8-.6-1.4-.6-.4 0-.7.1-1 .2-.3.1-.5.3-.7.5-.2.2-.3.4-.4.7-.1.2-.1.5-.1.7h4c-.1-.7-.2-1.1-.4-1.5z"/>
    <path fill="#FF9900" d="M12 40.5c-1.5.8-2.3 2-2.3 3.5 0 .8.2 1.6.7 2.2.4.7 1 1.2 1.8 1.7.8.5 1.7.8 2.7 1.1 1 .3 2.1.5 3.3.7 1.2.2 2.3.4 3.4.7 1.1.2 2.1.6 3 1 .9.4 1.6 1 2.1 1.7.6.7.8 1.6.8 2.8 0 1-.2 1.9-.6 2.6-.4.7-1 1.3-1.7 1.8-.7.5-1.6.8-2.6 1-1 .2-2 .3-3.1.3-1.3 0-2.5-.1-3.7-.4-1.2-.3-2.2-.7-3.2-1.3-1-.6-1.7-1.4-2.3-2.4-.6-1-.9-2.2-.9-3.6h2.9c0 .9.2 1.7.6 2.3.4.6.9 1.1 1.6 1.5.6.4 1.4.7 2.2.8.8.2 1.7.3 2.6.3.8 0 1.6-.1 2.3-.2.8-.2 1.4-.4 2-.8.6-.4 1-.8 1.4-1.4.4-.6.5-1.2.5-2 0-.9-.2-1.7-.7-2.2-.5-.6-1.1-1-1.9-1.4-.8-.4-1.7-.7-2.8-1-1.1-.2-2.2-.5-3.3-.7-1.1-.2-2.2-.5-3.3-.8-1.1-.3-2-.7-2.8-1.3-.8-.5-1.5-1.2-2-2.1-.5-.8-.7-1.9-.7-3.2 0-.9.2-1.8.6-2.5.4-.7.9-1.3 1.6-1.8.7-.5 1.5-.9 2.4-1.1.9-.3 1.9-.4 3-.4 1.2 0 2.4.2 3.4.5 1.1.3 2 .8 2.8 1.5.8.7 1.4 1.5 1.8 2.5.4 1 .7 2.1.7 3.4h-2.9c-.1-1.6-.6-2.8-1.5-3.6-.9-.8-2.3-1.2-4-1.2-.8 0-1.5.1-2.1.3-.7.1-1.3.4-1.7.7zM38 55.8v-9.3h-2.8v-2.3H38v-2.6c0-2 .4-3.4 1.3-4.2.9-.8 2.3-1.2 4.2-1.2.3 0 .6 0 1 .1.3 0 .6.1 1 .2v2.3c-.3-.1-.5-.1-.8-.1-.3 0-.5 0-.7 0-1 0-1.6.2-1.9.6-.3.4-.5 1.1-.5 2v2.8h3.6v2.3h-3.6v9.3H38z"/>
  </svg>
);

const ServiceIcon = ({ color, letter }) => (
  <div
    className="w-full h-full rounded-lg flex items-center justify-center text-white font-bold text-xs"
    style={{ background: color }}
  >
    {letter}
  </div>
);

const skillCategories = [
  {
    title: "AWS Cloud Services",
    badge: "Core Infrastructure",
    skills: [
      { name: "Amazon EC2", abbr: "EC2", color: "#FF9900", desc: "Virtual Servers" },
      { name: "Amazon VPC", abbr: "VPC", color: "#8C4FFF", desc: "Network Isolation" },
      { name: "Amazon S3", abbr: "S3", color: "#3F9142", desc: "Object Storage" },
      { name: "Amazon RDS", abbr: "RDS", color: "#3B48CC", desc: "Managed Databases" },
      { name: "AWS Lambda", abbr: "λ", color: "#FF9900", desc: "Serverless Compute" },
      { name: "CloudWatch", abbr: "CW", color: "#E7157B", desc: "Monitoring & Logs" },
      { name: "Amazon SES", abbr: "SES", color: "#1A73E8", desc: "Email Service" },
      { name: "Amazon SNS", abbr: "SNS", color: "#E7157B", desc: "Notifications" },
      { name: "Amazon IAM", abbr: "IAM", color: "#DD344C", desc: "Access Management" },
      { name: "Amazon ECS", abbr: "ECS", color: "#FF9900", desc: "Container Service" },
      { name: "Amazon EKS", abbr: "EKS", color: "#326CE5", desc: "Kubernetes Service" },
      { name: "CloudFront", abbr: "CF", color: "#8C4FFF", desc: "CDN Distribution" },
    ]
  },
  {
    title: "DevOps & Automation",
    badge: "CI/CD Pipeline",
    skills: [
      { name: "Kubernetes", icon: "/Kubernetes.png", color: "#326CE5" },
      { name: "Docker", abbr: "🐳", color: "#2496ED" },
      { name: "Jenkins", icon: "/Jenkins.png", color: "#D24939" },
      { name: "ArgoCD", icon: "/Argocd.png", color: "#EF7B4D" },
      { name: "Terraform", abbr: "TF", color: "#7B42BC" },
      { name: "Ansible", abbr: "⚙️", color: "#EE0000" },
      { name: "Helm", abbr: "⛵", color: "#0F1628" },
      { name: "GitHub Actions", abbr: "GA", color: "#2088FF" },
    ]
  },
  {
    title: "Backend & Databases",
    badge: "Application Stack",
    skills: [
      { name: "Node.js", abbr: "🟢", color: "#339933" },
      { name: "Python", abbr: "🐍", color: "#3776AB" },
      { name: "Go", abbr: "🐹", color: "#00ADD8" },
      { name: "PostgreSQL", abbr: "🐘", color: "#4169E1" },
      { name: "MongoDB", abbr: "🍃", color: "#47A248" },
      { name: "Redis", abbr: "🔴", color: "#DC382D" },
    ]
  },
  {
    title: "Observability & Ops",
    badge: "Monitoring Tools",
    skills: [
      { name: "Prometheus", abbr: "🔥", color: "#E6522C" },
      { name: "Grafana", abbr: "📊", color: "#F46800" },
      { name: "ELK Stack", abbr: "ELK", color: "#005571" },
      { name: "Linux", abbr: "🐧", color: "#FCC624" },
    ]
  }
];

function SkillCard({ skill, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const isEmoji = skill.abbr && (skill.abbr.length <= 2 || /\p{Emoji}/u.test(skill.abbr));
  const isImagePath = skill.icon && skill.icon.startsWith('/');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group cursor-default"
    >
      <div
        className="relative p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm dark:shadow-none overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:border-transparent"
        style={{ '--glow': skill.color }}
      >
        {/* Brand glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300 pointer-events-none rounded-xl"
          style={{ background: `radial-gradient(circle at 50% 50%, ${skill.color}, transparent 70%)` }}
        />
        {/* Border glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
          style={{ boxShadow: `0 0 0 1.5px ${skill.color}40, 0 8px 24px ${skill.color}20` }}
        />

        <div className="relative z-10 flex items-center gap-3" style={{ transform: "translateZ(16px)" }}>
          {/* Icon */}
          <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center">
            {isImagePath ? (
              <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
            ) : skill.abbr && isEmoji ? (
              <span className="text-2xl leading-none">{skill.abbr}</span>
            ) : skill.abbr ? (
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center text-white font-black text-[10px] tracking-tight"
                style={{ background: skill.color }}
              >
                {skill.abbr}
              </div>
            ) : null}
          </div>

          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate leading-tight">{skill.name}</p>
            {skill.desc && (
              <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate font-medium mt-0.5">{skill.desc}</p>
            )}
          </div>
        </div>

        {/* Pulsing status dot */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
          transition={{ duration: 2.5 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: skill.color }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-slate-50/50 dark:bg-slate-950/50 overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-1/4 -left-24 w-72 h-72 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-72 h-72 bg-slate-200/30 dark:bg-slate-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header — consistent with all other sections */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
          >
            Technical Ecosystem
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight"
          >
            Tools & <span className="text-blue-600">Technologies</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            A deep ecosystem spanning AWS cloud services, DevOps automation, and modern application stacks.
          </motion.p>
        </div>

        {/* Skill Categories */}
        <div className="space-y-14">
          {skillCategories.map((category, catIndex) => (
            <div key={category.title}>
              {/* Category header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.05 }}
                className="flex items-center gap-4 mb-6"
              >
                <span className="w-10 h-0.5 bg-blue-600 rounded-full" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{category.title}</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                  {category.badge}
                </span>
              </motion.div>

              {/* Cards grid */}
              <div className={`grid gap-3 ${
                catIndex === 0
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
                  : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
              }`}>
                {category.skills.map((skill, idx) => (
                  <SkillCard key={skill.name} skill={skill} index={idx + catIndex * 12} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
