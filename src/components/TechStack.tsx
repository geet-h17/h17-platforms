'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const technologies = [
  {
    category: 'Cloud & Infrastructure',
    items: [
      { name: 'AWS', icon: '☁️', color: 'from-orange-500 to-yellow-500' },
      { name: 'Azure', icon: '⚡', color: 'from-blue-500 to-cyan-500' },
      { name: 'Terraform', icon: '🏗️', color: 'from-purple-500 to-pink-500' },
      { name: 'Docker', icon: '🐳', color: 'from-blue-400 to-cyan-400' },
      { name: 'Kubernetes', icon: '⚓', color: 'from-blue-600 to-indigo-600' },
    ],
  },
  {
    category: 'Security Tools',
    items: [
      { name: 'Prowler', icon: '🔍', color: 'from-red-500 to-pink-500' },
      { name: 'ScoutSuite', icon: '🛡️', color: 'from-green-500 to-emerald-500' },
      { name: 'Steampipe', icon: '🚀', color: 'from-yellow-500 to-orange-500' },
      { name: 'OWASP ZAP', icon: '🕷️', color: 'from-purple-500 to-violet-500' },
      { name: 'Snyk', icon: '🔒', color: 'from-cyan-500 to-blue-500' },
    ],
  },
  {
    category: 'Development',
    items: [
      { name: 'Python', icon: '🐍', color: 'from-yellow-500 to-green-500' },
      { name: 'TypeScript', icon: '📘', color: 'from-blue-500 to-indigo-500' },
      { name: 'React', icon: '⚛️', color: 'from-cyan-400 to-blue-400' },
      { name: 'Node.js', icon: '💚', color: 'from-green-500 to-emerald-500' },
      { name: 'Git', icon: '📦', color: 'from-orange-500 to-red-500' },
    ],
  },
];

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="tech" className="relative min-h-screen py-32" ref={containerRef}>
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-background to-background" />
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
            Tech Arsenal ⚔️
          </h2>
          <p className="text-muted-foreground">
            Tools and technologies I work with to build secure and scalable solutions
          </p>
        </motion.div>

        <div className="space-y-16">
          {technologies.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.2 }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold tracking-tight">
                {category.category}
              </h3>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {category.items.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    className="group relative perspective-1000"
                    initial={{ opacity: 0, rotateX: -15 }}
                    whileInView={{ opacity: 1, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + techIndex * 0.1 }}
                  >
                    <div className="relative h-32 transform-gpu rounded-lg border bg-card transition-all duration-300 group-hover:scale-105">
                      {/* Glow effect */}
                      <div
                        className={`absolute inset-0 rounded-lg bg-gradient-to-r ${tech.color} opacity-0 blur-xl transition-opacity group-hover:opacity-20`}
                      />

                      {/* Content */}
                      <div className="flex h-full flex-col items-center justify-center p-4">
                        <span className="mb-2 text-3xl">{tech.icon}</span>
                        <span className="text-sm font-medium">{tech.name}</span>
                      </div>

                      {/* Hover border effect */}
                      <div
                        className={`absolute inset-0 rounded-lg bg-gradient-to-r ${tech.color} opacity-0 transition-opacity group-hover:opacity-20`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 