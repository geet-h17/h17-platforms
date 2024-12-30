'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const devInfo = {
  stats: [
    { label: 'Experience', value: '2+ Years', icon: '👨‍💻' },
    { label: 'Projects', value: '10+', icon: '🚀' },
    { label: 'Certifications', value: '3', icon: '🏆' },
    { label: 'Open Source', value: '2+', icon: '🌟' },
  ],
  skills: [
    { name: 'Cloud Security', level: 95, color: 'from-blue-500 to-cyan-500' },
    { name: 'AWS & Azure', level: 90, color: 'from-orange-500 to-red-500' },
    { name: 'DevSecOps', level: 88, color: 'from-green-500 to-emerald-500' },
    { name: 'Python', level: 85, color: 'from-yellow-500 to-orange-500' },
    { name: 'IaC Security', level: 92, color: 'from-purple-500 to-pink-500' },
  ],
  experience: [
    "Cloud Security Engineer @ we45 Solutions",
    "Associate Cloud Security Engineer",
    "Cloud Infrastructure & DevSecOps Specialist",
    "Open Source Contributor - Kubernetes & Helm",
  ],
  social: [
    { name: 'GitHub', url: 'https://github.com/geet-h17', icon: <GithubIcon className="h-4 w-4" /> },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/geethirawat', icon: <LinkedInIcon className="h-4 w-4" /> },
    { name: 'Email', url: 'mailto:mailmeatgeet@gmail.com', icon: <MailIcon className="h-4 w-4" /> },
  ],
};

export function DevPortalTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'stats' | 'skills' | 'journey'>('stats');

  return (
    <div className="relative inline-block">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 rounded-lg border bg-card/95 px-3 py-1 text-sm backdrop-blur-sm"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 blur transition-opacity group-hover:opacity-100"
        />
        <span className="relative">know the G</span>
        <motion.span
          className="relative text-xs opacity-60"
          animate={{ rotate: isOpen ? 180 : 0 }}
        >
          ↓
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Card */}
            <motion.div
              className="absolute left-0 top-full z-50 mt-2 w-[300px] overflow-hidden rounded-xl border bg-card/95 p-4 shadow-xl backdrop-blur-sm"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
            >
              {/* Header */}
              <div className="mb-4 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-[2px]">
                  <div className="h-full w-full rounded-full bg-card p-1">
                    <span className="text-xl">👨‍💻</span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-green-500" />
                </div>
                <div>
                  <h3 className="font-medium">Geet Hirawat</h3>
                  <p className="text-xs text-muted-foreground">Cloud Security Engineer</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="mb-4 flex gap-1">
                {(['stats', 'skills', 'journey'] as const).map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`relative rounded-lg px-3 py-1.5 text-xs transition-colors ${
                      activeSection === section
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    {activeSection === section && (
                      <motion.div
                        layoutId="active-section"
                        className="absolute inset-0 rounded-lg bg-primary/10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative capitalize">
                      {section}
                    </span>
                  </button>
                ))}
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  {activeSection === 'stats' && (
                    <div className="grid grid-cols-2 gap-2">
                      {devInfo.stats.map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          className="group relative overflow-hidden rounded-lg border bg-card/50 p-3"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 transition-opacity group-hover:opacity-100"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                          <div className="relative">
                            <div className="text-xl">{stat.icon}</div>
                            <div className="mt-1 text-sm font-medium">{stat.value}</div>
                            <div className="text-xs text-muted-foreground">{stat.label}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {activeSection === 'skills' && (
                    <div className="space-y-2">
                      {devInfo.skills.map((skill, i) => (
                        <motion.div
                          key={skill.name}
                          className="space-y-1"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className="flex justify-between text-xs">
                            <span>{skill.name}</span>
                            <span className="text-muted-foreground">{skill.level}%</span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-muted/30">
                            <motion.div
                              className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {activeSection === 'journey' && (
                    <div className="space-y-2">
                      {devInfo.experience.map((exp, i) => (
                        <motion.div
                          key={i}
                          className="group relative overflow-hidden rounded-lg border bg-card/50 p-2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 transition-opacity group-hover:opacity-100"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                          <div className="relative flex items-center gap-2">
                            <span className="text-sm">🎯</span>
                            <p className="text-xs">{exp}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Connect Button */}
              <div className="mt-4 flex justify-center">
                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                  className="group relative overflow-hidden rounded-lg border px-6 py-2 text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20"
                    animate={{
                      x: ['0%', '100%', '0%'],
                    }}
                    transition={{
                      duration: 3,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  />
                  <motion.div
                    className="relative flex items-center gap-2"
                    whileHover={{ gap: '8px' }}
                  >
                    <span>Let's Connect</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
} 