import { motion } from 'framer-motion';

export default function Contact() {
  const socialLinks = [
    {
      id: 'email',
      label: 'Email',
      value: 'aryaladitya06@gmail.com',
      href: 'mailto:aryaladitya06@gmail.com',
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      )
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'Sushan Aryal',
      href: 'https://linkedin.com/in/sushan-aryal',
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    {
      id: 'github',
      label: 'GitHub',
      value: 'SushanAryal',
      href: 'https://github.com/Sushan1034',
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      )
    }
  ];

  return (
    <section id="contact" className="py-24 border-t border-slate-200/30 dark:border-slate-800/30">
      <div className="section-container">
        <div className="max-w-5xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              Get In Touch
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900 dark:text-white">
              Let's <span className="text-blue-600 dark:text-blue-400">Connect</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-16 leading-relaxed max-w-2xl mx-auto">
              I'm always looking for new challenges and collaborations in the cloud space. Feel free to reach out via any of these channels!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {socialLinks.map((link) => (
                <a 
                  key={link.id}
                  href={link.href} 
                  target={link.id !== 'email' ? "_blank" : undefined}
                  rel={link.id !== 'email' ? "noreferrer" : undefined}
                  className="flex flex-col items-center group"
                >
                  <div className="w-16 h-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-blue-600 dark:group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white dark:group-hover:text-white transition-all shadow-sm mb-4">
                    <div className="group-hover:scale-110 transition-transform">
                      {link.icon}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-1">{link.label}</p>
                    <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {link.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
