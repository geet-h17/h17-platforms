'use client';

import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { useState, useEffect } from 'react';

// Cool tech emojis and phrases for random display
const techEmojis = ['⚡', '🚀', '💻', '🎮', '🎯', '🔥', '💫', '🌟', '🎨', '🎼'];
const phrases = [
  "meet the real G",
  "vibe check ✨",
  "let's cook 🔥",
  "certified dev moment",
  "main character energy",
  "it's giving tech wizard",
  "no cap, just vibes",
  "straight bussin fr fr",
];

// 3D objects that will float around
const floatingObjects = [
  { emoji: '💻', rotation: 20 },
  { emoji: '⚡', rotation: -15 },
  { emoji: '🎮', rotation: 30 },
  { emoji: '🚀', rotation: -25 },
  { emoji: '🎯', rotation: 15 },
];

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
    { name: 'GitHub', url: 'https://github.com/geet-h17', icon: <GithubIcon className="h-5 w-5" /> },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/geethirawat', icon: <LinkedInIcon className="h-5 w-5" /> },
    { name: 'Email', url: 'mailto:mailmeatgeet@gmail.com', icon: <MailIcon className="h-5 w-5" /> },
  ],
};

function FloatingEmoji({ emoji }: { emoji: string }) {
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);
  
  useEffect(() => {
    const randomX = Math.random() * window.innerWidth;
    const randomDuration = 15 + Math.random() * 10;
    
    y.set(0);
    rotate.set(0);
    
    const yAnimation = animate(y, [-20, window.innerHeight + 100], {
      duration: randomDuration,
      repeat: Infinity,
      ease: "linear",
    });

    const rotateAnimation = animate(rotate, [0, 360], {
      duration: randomDuration,
      repeat: Infinity,
      ease: "linear",
    });

    return () => {
      yAnimation.stop();
      rotateAnimation.stop();
    };
  }, []);

  return (
    <motion.div
      className="fixed text-2xl pointer-events-none"
      style={{ 
        y,
        rotate,
        x: useMotionValue(Math.random() * window.innerWidth)
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      {emoji}
    </motion.div>
  );
}

function BounceText({ text }: { text: string }) {
  return (
    <motion.div
      className="flex space-x-1"
      initial="hidden"
      animate="visible"
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                delay: i * 0.05,
                y: { type: "spring", stiffness: 100 }
              }
            }
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function DevPortal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'stats' | 'skills' | 'journey'>('stats');
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [showFloatingEmojis, setShowFloatingEmojis] = useState(true);

  // Change phrase periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Render floating emojis
  const renderFloatingEmojis = () => {
    return techEmojis.map((emoji, index) => (
      <FloatingEmoji key={index} emoji={emoji} />
    ));
  };

  return (
    <>
      {/* Floating Emojis */}
      {showFloatingEmojis && renderFloatingEmojis()}

      {/* Main Portal Button */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          className="relative"
          animate={{ y: isOpen ? 0 : [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          {/* 3D Objects Container */}
          <motion.div
            className="absolute -inset-4 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {floatingObjects.map((obj, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${Math.sin(i * (Math.PI * 2 / 5)) * 40}px`,
                  left: `${Math.cos(i * (Math.PI * 2 / 5)) * 40}px`,
                }}
                animate={{
                  rotate: [0, obj.rotation, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.2,
                }}
              >
                {obj.emoji}
              </motion.div>
            ))}
          </motion.div>

          {/* Main Button */}
          <motion.div
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="relative flex items-center gap-3 rounded-full border bg-card/95 p-2 pr-4 shadow-lg backdrop-blur-sm"
              animate={{
                boxShadow: isOpen 
                  ? "0 0 20px rgba(168, 85, 247, 0.4)" 
                  : "0 0 10px rgba(168, 85, 247, 0.2)",
              }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            >
              <div className="relative h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-[2px]">
                <motion.div
                  className="h-full w-full rounded-full bg-card p-1 overflow-hidden"
                  animate={{
                    background: [
                      "linear-gradient(0deg, #1a1a1a, #1a1a1a)",
                      "linear-gradient(180deg, #a855f7, #ec4899)",
                      "linear-gradient(360deg, #1a1a1a, #1a1a1a)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-base">👨‍💻</span>
                </motion.div>
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-green-500" />
              </div>
              
              <BounceText text={currentPhrase} />
              
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                className="ml-1 text-xs opacity-60"
              >
                ↓
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Expanded Card */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="absolute top-full left-1/2 mt-4 w-[400px] -translate-x-1/2 rounded-2xl border bg-card/95 p-6 shadow-xl backdrop-blur-sm"
              >
                {/* Navigation */}
                <div className="mb-6 flex gap-2">
                  {(['stats', 'skills', 'journey'] as const).map((section) => (
                    <button
                      key={section}
                      onClick={() => setActiveSection(section)}
                      className={`relative rounded-lg px-4 py-2 text-sm transition-colors ${
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
                    className="space-y-4"
                  >
                    {activeSection === 'stats' && (
                      <div className="grid grid-cols-2 gap-3">
                        {devInfo.stats.map((stat, i) => (
                          <motion.div
                            key={stat.label}
                            className="group relative overflow-hidden rounded-xl border bg-card/50 p-4"
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
                              <div className="text-2xl">{stat.icon}</div>
                              <div className="mt-2 font-medium">{stat.value}</div>
                              <div className="text-xs text-muted-foreground">{stat.label}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {activeSection === 'skills' && (
                      <div className="space-y-4">
                        {devInfo.skills.map((skill, i) => (
                          <motion.div
                            key={skill.name}
                            className="space-y-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <div className="flex justify-between text-sm">
                              <span>{skill.name}</span>
                              <span className="text-muted-foreground">{skill.level}%</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-muted/30">
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
                      <div className="space-y-3">
                        {devInfo.experience.map((exp, i) => (
                          <motion.div
                            key={i}
                            className="group relative overflow-hidden rounded-xl border bg-card/50 p-4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 transition-opacity group-hover:opacity-100"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            />
                            <div className="relative flex items-center gap-3">
                              <span className="text-xl">🎯</span>
                              <p className="text-sm">{exp}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Social Links */}
                <div className="mt-6 flex justify-center gap-3">
                  {devInfo.social.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden rounded-lg border p-2 text-muted-foreground transition-colors hover:text-accent-foreground"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 transition-opacity group-hover:opacity-100"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <div className="relative">
                        {link.icon}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
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