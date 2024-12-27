'use client';

import { Background } from '@/components/canvas/Background';
import { FloatingObjects } from '@/components/FloatingObjects';
import { InteractiveCard } from '@/components/InteractiveCard';
import { ScrollContainer } from '@/components/ScrollContainer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useCallback, useEffect, useState } from 'react';
import { GameSwitcher } from '@/components/GameSwitcher';
import { BlogSection } from '@/components/BlogSection';
import { TechStack } from '@/components/TechStack';
import { ContactSection } from '@/components/ContactSection';
import { VibeSection } from '@/components/VibeSection';
import { DevPortalTrigger } from '@/components/DevPortalTrigger';

const projects = [
  {
    id: '1',
    title: 'AWS Security Scanner',
    description: 'Advanced security scanning tool for AWS infrastructure with real-time monitoring.',
    tags: ['AWS', 'Security', 'TypeScript', 'React'],
    demoUrl: 'https://demo.h17.in/aws-scanner',
    githubUrl: 'https://github.com/h17/aws-scanner',
    thumbnail: '/images/aws-scanner.png',
    category: 'developer-tools',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Rust Web Framework',
    description: 'High-performance web framework built with Rust for maximum efficiency.',
    tags: ['Rust', 'WebAssembly', 'Performance'],
    demoUrl: 'https://demo.h17.in/rust-web',
    githubUrl: 'https://github.com/h17/rust-web',
    thumbnail: '/images/rust-web.png',
    category: 'libraries',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add more projects...
];

const tools = [
  {
    id: 't1',
    title: 'AWS Security Suite',
    description: 'Comprehensive security tooling for AWS infrastructure.',
    tags: ['AWS', 'Security', 'Cloud'],
    demoUrl: 'https://aws-tools.h17.in',
    githubUrl: 'https://github.com/h17/aws-tools',
    thumbnail: '/images/aws-tools.png',
    category: 'utilities',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add more tools...
];

const securityIcons = [
  { icon: '🔒', label: 'Security', color: 'from-blue-500/20' },
  { icon: '🛡️', label: 'Defense', color: 'from-purple-500/20' },
  { icon: '⚡', label: 'Performance', color: 'from-cyan-500/20' },
  { icon: '🚀', label: 'Speed', color: 'from-green-500/20' },
  { icon: '💻', label: 'Code', color: 'from-pink-500/20' },
];

// Add Konami code sequence
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

function FloatingSecurityIcon({ icon, label, color, index }: { icon: string; label: string; color: string; index: number }) {
  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 10
      }}
      style={{
        left: `${10 + (index * 20)}%`,
        top: `${115 + (index % 2) * 40}%`,
        willChange: 'transform'  // Performance optimization
      }}
    >
      <motion.div
        className={`relative flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${color} to-transparent p-3 backdrop-blur-sm`}
        whileHover={{ scale: 1.2, rotate: 10 }}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: index * 0.2,
          type: "spring",
          stiffness: 50
        }}
        style={{ willChange: 'transform' }}
      >
        <span className="text-2xl select-none">{icon}</span>
        <motion.div
          className="absolute -inset-1 rounded-xl bg-white/20"
          animate={{
            opacity: [0, 0.2, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.3,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      <motion.div
        className="mt-2 text-center text-sm text-muted-foreground select-none"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: index * 0.3,
          ease: "easeInOut"
        }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

function HiddenEasterEgg() {
  const [konamiProgress, setKonamiProgress] = useState<number>(0);
  const [isKonamiCompleted, setIsKonamiCompleted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === KONAMI_CODE[konamiProgress]) {
        const newProgress = konamiProgress + 1;
        setKonamiProgress(newProgress);
        
        if (newProgress === KONAMI_CODE.length) {
          setIsKonamiCompleted(true);
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 10000); // Hide after 10s
        }
      } else {
        setKonamiProgress(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress]);

  const shareToLinkedIn = () => {
    const message = encodeURIComponent("I am OOG! I typed the Konami code on your site! 🎮✨");
    window.open(`https://www.linkedin.com/messaging/compose?recipient=geet-h17&body=${message}`, '_blank');
  };

  return (
    <>
      <div className="absolute z-50 overflow-hidden select-none"
        style={{
          left: '65%',
          top: '135%',
          transform: 'rotate(-15deg)'
        }}
      >
        <div 
          className={`relative text-transparent group w-48 h-12 cursor-none ${isKonamiCompleted ? 'animate-pulse' : ''}`}
          style={{ mixBlendMode: 'difference' }}
        >
          
          {/* Hidden text with shimmer effect */}
          <div className={`relative text-sm font-mono tracking-widest ${isKonamiCompleted ? 'opacity-100 text-purple-500' : 'opacity-0 group-hover:opacity-5'}`}>
            {isKonamiCompleted ? 'u looked too deep' : 'heard of konami code'}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {!isKonamiCompleted && (
            <div 
              className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                WebkitMaskImage: 'radial-gradient(circle at var(--mouse-x, 0) var(--mouse-y, 0), black 10%, transparent 70%)',
                maskImage: 'radial-gradient(circle at var(--mouse-x, 0) var(--mouse-y, 0), black 10%, transparent 70%)',
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
              }}
            >
              <div className="text-sm font-mono tracking-widest text-white/90 p-2">
                konami code???
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Animated Notification */}
      {showNotification && (
        <motion.div
          className="fixed top-25 right-2 z-50"
          initial={{ opacity: 0, scale: 0.5, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <motion.div
            className="relative p-6 bg-black/80 rounded-lg border border-transparent"
            animate={{
              borderColor: ['rgba(147,51,234,0.5)', 'rgba(59,130,246,0.5)', 'rgba(236,72,153,0.5)', 'rgba(147,51,234,0.5)'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent">
                OOG Status Achieved! 🏆
              </h3>
              <p className="text-white/90 mb-4">You've unlocked the secret!</p>
              <motion.button
                onClick={shareToLinkedIn}
                className="w-full px-4 py-2 rounded bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 border border-purple-500/50 text-white/90 hover:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Tell the Dev you're OOG
              </motion.button>
            </div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-lg blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

function HeroSection() {
  // Memoize the binary code generation
  const generateBinaryCode = useCallback(() => {
    return Array.from({ length: 20 }).map(() => 
      Math.random() > 0.5 ? '1' : '0'
    );
  }, []);

  return (
    <section id="home" className="relative min-h-screen">
      {/* Matrix-style background - Optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-background via-background/50 to-transparent"
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ willChange: 'opacity' }}
        />
        {Array.from({ length: 10 }).map((_, i) => (  // Reduced number of columns
          <motion.div
            key={i}
            className="absolute left-0 top-0 text-green-500/10 font-mono text-sm select-none"
            initial={{ y: -100 }}
            animate={{
              y: ['0%', '100%'],
            }}
            transition={{
              duration: 15,  // Slower animation
              repeat: Infinity,
              delay: i * 0.8,
              ease: "linear"
            }}
            style={{ 
              left: `${i * 10}%`,  // Wider spacing
              willChange: 'transform',
              backfaceVisibility: 'hidden'
            }}
          >
            {generateBinaryCode().map((bit, j) => (
              <div key={j} className="leading-none">{bit}</div>
            ))}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="container relative grid grid-cols-1 gap-8 pt-32 lg:grid-cols-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ willChange: 'transform' }}
      >
        {/* Left side - Personal intro */}
        <motion.div
          className="relative space-y-4"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2,
            type: "spring",
            stiffness: 100
          }}
          style={{ willChange: 'transform' }}
        >
          <div className="flex items-center gap-4">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
             🟢 Available for freelance work...
            </div>
            <DevPortalTrigger />
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            <span className="block">Indie Dev</span>
            <motion.span 
              className="mt-1 block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              style={{ backgroundSize: '200% auto' }}
            >
              & Security Researcher
            </motion.span>
          </h1>

          <p className="text-xl text-muted-foreground">
            Building tools that hit different in web security and performance.
            <span className="block mt-2 text-foreground/80">
              One hack at a time 🚀...
            </span>
          </p>

          <div className="flex flex-wrap gap-4 pt-8">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground"
            >
              <span>peep the builds</span>
              <span className="text-lg">→</span>
            </motion.a>
            <motion.a
              href="https://github.com/geet-h17"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 rounded-lg border px-4 py-2"
            >
              <span>GitHub</span>
              <span className="text-lg">↗</span>
            </motion.a>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            {[
              { label: 'Projects', value: '15+' },
              { label: 'GitHub Stars', value: '1.2k' },
              { label: 'Contributions', value: '500+' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="space-y-1"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right side - Security Themed Animations */}
        <div className="relative">
          <GameSwitcher />
          
          {/* Floating Security Icons */}
          {securityIcons.map((item, index) => (
            <FloatingSecurityIcon key={index} {...item} index={index} />
          ))}
          
          {/* Hidden Easter Egg */}
          <HiddenEasterEgg />
          
          {/* 3D Glow Effects - Optimized */}
          <motion.div
            className="absolute -right-4 -top-4 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ willChange: 'transform, opacity' }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-blue-500/10 to-pink-500/10 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ willChange: 'transform, opacity' }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="projects" className="relative min-h-screen py-32" ref={ref}>
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-background to-background" />
      </motion.div>

      <div className="container">
        <motion.div
          className="mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold tracking-tighter">
            Featured Projects 🚀
          </h2>
          <p className="text-muted-foreground">
            A collection of security tools, prjcts that slaps 🍑...
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <InteractiveCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <ScrollContainer>
      <Background />
      <FloatingObjects />
      <main className="relative">
        <HeroSection />
        <ProjectsSection />
        <TechStack />
        <VibeSection />
        <BlogSection />
        <ContactSection />
      </main>
    </ScrollContainer>
  );
}
