'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const vibes = [
  {
    id: 'setup',
    title: 'Battle Station',
    description: 'Triple monitor setup with RGB everything. Peak productivity achieved 🎯',
    icon: '🖥️',
    color: 'from-purple-500 to-blue-500',
    specs: ['Mechanical Keyboard Gang', 'Dark Mode Everything', 'Ergonomic Life'],
  },
  {
    id: 'workflow',
    title: 'Dev Arsenal',
    description: 'VSCode with 42 must-have extensions, because why not? 💪',
    icon: '⚔️',
    color: 'from-blue-500 to-cyan-500',
    tools: ['Neovim Energy', 'GitHub Copilot', 'Terminal Wizardry'],
  },
  {
    id: 'mindset',
    title: 'Security Mindset',
    description: 'Trust nothing, verify everything, then verify again 🔍',
    icon: '🧠',
    color: 'from-red-500 to-orange-500',
    mantras: ['Zero Trust', 'Defense in Depth', 'Always Be Testing'],
  },
  {
    id: 'lifestyle',
    title: 'Tech Life',
    description: 'Living that cloud native lifestyle, scaling dreams to infinity ☁️',
    icon: '🚀',
    color: 'from-green-500 to-emerald-500',
    stack: ['Cloud Native', 'Kubernetes Life', 'Automation First'],
  },
];

const techQuotes = [
  "chmod 777 my_problems",
  "git commit -m 'fixed bugs, created new ones'",
  "while(alive) { coffee.drink(); code.write(); }",
  "catch (life) { try { harder } }",
  "// TODO: Sleep",
  "!false === true // funny because it's true",
  "sudo rm -rf /problems",
];

const spotifyPlaylists = [
  "Lofi Beats to Hack To",
  "Synthwave for Late Night Coding",
  "Epic Soundtracks for Bug Fixing",
  "Cyberpunk Coding Session",
];

export function VibeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [currentQuote, setCurrentQuote] = useState(() => 
    techQuotes[Math.floor(Math.random() * techQuotes.length)]
  );
  const [currentPlaylist, setCurrentPlaylist] = useState(() =>
    spotifyPlaylists[Math.floor(Math.random() * spotifyPlaylists.length)]
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="vibes" className="relative min-h-screen py-32" ref={containerRef}>
      {/* Animated background */}
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
            Dev Life Check 💫
          </h2>
          <div className="flex items-center gap-2">
            <motion.div
              className="rounded-lg bg-primary/10 px-3 py-1.5 font-mono text-sm text-primary"
              whileHover={{ scale: 1.05 }}
              onClick={() => setCurrentQuote(techQuotes[Math.floor(Math.random() * techQuotes.length)])}
            >
              {currentQuote}
            </motion.div>
            <motion.div
              className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-1.5 text-sm text-green-500"
              whileHover={{ scale: 1.05 }}
              onClick={() => setCurrentPlaylist(spotifyPlaylists[Math.floor(Math.random() * spotifyPlaylists.length)])}
            >
              <span>🎧</span>
              <span>{currentPlaylist}</span>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {vibes.map((vibe, index) => (
            <motion.div
              key={vibe.id}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredId(vibe.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <div className="relative overflow-hidden rounded-lg border bg-card p-6">
                {/* Animated background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${vibe.color} opacity-0 transition-opacity group-hover:opacity-10`}
                  animate={{
                    scale: hoveredId === vibe.id ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Icon with glow effect */}
                <div className="relative mb-4">
                  <motion.div
                    className="relative z-10 inline-block rounded-lg bg-card p-3"
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                  >
                    <span className="text-3xl">{vibe.icon}</span>
                  </motion.div>
                  <div className={`absolute inset-0 blur-xl bg-gradient-to-r ${vibe.color} opacity-20`} />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{vibe.title}</h3>
                  <p className="text-sm text-muted-foreground">{vibe.description}</p>
                </div>

                {/* Tech Stack/Specs */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {(vibe.specs || vibe.tools || vibe.mantras || vibe.stack)?.map((item, i) => (
                    <motion.span
                      key={item}
                      className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>

                {/* Corner decoration */}
                <div className="absolute -right-12 -top-12 h-24 w-24 rotate-45 bg-gradient-to-r from-background to-primary/10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Setup Showcase */}
        <motion.div
          className="mt-16 rounded-lg border bg-card/50 p-8 text-center backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto max-w-2xl space-y-4">
            <h3 className="text-2xl font-bold">Terminal Status ⚡</h3>
            <div className="font-mono text-sm text-muted-foreground">
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                <motion.p initial={{ x: -20 }} animate={{ x: 0 }}>$ neofetch</motion.p>
                <motion.p initial={{ x: -20 }} animate={{ x: 0 }}>OS: NeoVim BTW</motion.p>
                <motion.p initial={{ x: -20 }} animate={{ x: 0 }}>Shell: Oh-My-Zsh with 100+ aliases</motion.p>
                <motion.p initial={{ x: -20 }} animate={{ x: 0 }}>Terminal: Hyper with custom theme</motion.p>
                <motion.p initial={{ x: -20 }} animate={{ x: 0 }}>IDE: VSCode (but Vim keybindings ofc)</motion.p>
              </motion.div>
            </div>
            <div className="flex justify-center gap-2">
              <span className="inline-block animate-pulse text-2xl">⌨️</span>
              <span className="inline-block animate-pulse text-2xl" style={{ animationDelay: '0.1s' }}>🖱️</span>
              <span className="inline-block animate-pulse text-2xl" style={{ animationDelay: '0.2s' }}>🎧</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 