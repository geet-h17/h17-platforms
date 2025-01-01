'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const achievements = [
  {
    id: 'k8s',
    title: 'Kubernetes Contributor',
    description: 'Contributed to the Kubernetes Barbican KMS plugin 🎯',
    icon: '⚡',
    color: 'from-blue-500 to-cyan-500',
    link: 'https://github.com/kubernetes/kubernetes/pull/2278',
  },
  {
    id: 'helm',
    title: 'Helm Contributor',
    description: 'Enhanced the Control plane plugin codebase 🚀',
    icon: '🎮',
    color: 'from-purple-500 to-pink-500',
    link: 'https://github.com/helm/helm/pull/427',
  },
  {
    id: 'aws',
    title: 'AWS Security Expert',
    description: 'Mastered cloud security audits & architecture reviews 💪',
    icon: '☁️',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'devsecops',
    title: 'DevSecOps Ninja',
    description: 'Built secure CI/CD pipelines & automated security checks 🥷',
    icon: '🔐',
    color: 'from-green-500 to-emerald-500',
  },
];

const vibeWords = [
  'no cap fr fr',
  'bussin',
  'sheesh',
  'based',
  'W',
  'goated',
  'slaps',
];

export function AchievementsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="achievements" className="relative min-h-screen py-32" ref={containerRef}>
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-500/10 via-background to-background" />
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
            W's Only 🏆
          </h2>
          <p className="text-muted-foreground">
            Achievements that hit different fr fr
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {achievements.map((achievement, index) => (
            <motion.a
              key={achievement.id}
              href={achievement.link}
              target={achievement.link ? '_blank' : undefined}
              rel={achievement.link ? 'noopener noreferrer' : undefined}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredId(achievement.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <div className="relative overflow-hidden rounded-lg border bg-card p-6">
                {/* Animated background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${achievement.color} opacity-0 transition-opacity group-hover:opacity-10`}
                  animate={{
                    scale: hoveredId === achievement.id ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Icon with glow */}
                <div className="relative mb-4">
                  <motion.div
                    className="relative z-10 inline-block rounded-lg bg-card p-3"
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                  >
                    <span className="text-3xl">{achievement.icon}</span>
                  </motion.div>
                  <div className={`absolute inset-0 blur-xl bg-gradient-to-r ${achievement.color} opacity-20`} />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>

                {/* Random vibe word */}
                <motion.div
                  className="absolute bottom-4 right-4 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  {vibeWords[Math.floor(Math.random() * vibeWords.length)]}
                </motion.div>

                {/* Corner decoration */}
                <div className="absolute -right-12 -top-12 h-24 w-24 rotate-45 bg-gradient-to-r from-background to-primary/10" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Vibe check */}
        <motion.div
          className="mt-16 rounded-lg border bg-card/50 p-8 text-center backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto max-w-2xl space-y-4">
            <h3 className="text-2xl font-bold">Vibe Check ✨</h3>
            <p className="text-muted-foreground">
              Always pushing the boundaries and staying ahead of the game. 
              That's just how we roll fam!
            </p>
            <div className="flex justify-center gap-2">
              <span className="inline-block animate-bounce text-2xl">💯</span>
              <span className="inline-block animate-bounce text-2xl" style={{ animationDelay: '0.1s' }}>🔥</span>
              <span className="inline-block animate-bounce text-2xl" style={{ animationDelay: '0.2s' }}>✨</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 