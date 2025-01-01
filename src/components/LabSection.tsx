'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const experiments = [
  {
    id: 'cloud-sec',
    title: 'Cloud Security Scanner',
    description: 'Interactive demo of cloud security scanning and visualization',
    icon: '🔒',
    color: 'from-red-500 to-orange-500',
    status: 'live',
    demoUrl: '#',
  },
  {
    id: 'threat-viz',
    title: 'Threat Visualizer',
    description: 'Real-time visualization of security threats and attack patterns',
    icon: '📊',
    color: 'from-blue-500 to-cyan-500',
    status: 'coming-soon',
    demoUrl: '#',
  },
  {
    id: 'iac-analyzer',
    title: 'IaC Security Analyzer',
    description: 'Analyze and secure your Infrastructure as Code',
    icon: '🏗️',
    color: 'from-purple-500 to-pink-500',
    status: 'beta',
    demoUrl: '#',
  },
  {
    id: 'devsecops',
    title: 'DevSecOps Pipeline',
    description: 'Interactive CI/CD pipeline with security controls',
    icon: '⚡',
    color: 'from-green-500 to-emerald-500',
    status: 'live',
    demoUrl: '#',
  },
];

export function LabSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="lab" className="relative min-h-screen py-32" ref={containerRef}>
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/10 via-background to-background" />
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
            Security Lab 🧪
          </h2>
          <p className="text-muted-foreground">
            Interactive demos and experiments in cloud security and DevSecOps
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {experiments.map((experiment, index) => (
            <motion.div
              key={experiment.id}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredId(experiment.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <div className="relative overflow-hidden rounded-lg border bg-card">
                {/* Animated background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${experiment.color} opacity-0 transition-opacity group-hover:opacity-10`}
                  animate={{
                    scale: hoveredId === experiment.id ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <div className="relative space-y-4 p-6">
                  {/* Icon */}
                  <motion.div
                    className="inline-block rounded-lg bg-card p-3"
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                  >
                    <span className="text-3xl">{experiment.icon}</span>
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">{experiment.title}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-xs ${
                        experiment.status === 'live'
                          ? 'bg-green-500/20 text-green-500'
                          : experiment.status === 'beta'
                          ? 'bg-yellow-500/20 text-yellow-500'
                          : 'bg-blue-500/20 text-blue-500'
                      }`}>
                        {experiment.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {experiment.description}
                    </p>
                  </div>

                  {/* Action */}
                  <motion.a
                    href={experiment.demoUrl}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary"
                    whileHover={{ x: 5 }}
                  >
                    Try it out
                    <span className="text-lg">→</span>
                  </motion.a>
                </div>

                {/* Corner decoration */}
                <div className="absolute -right-12 -top-12 h-24 w-24 rotate-45 bg-gradient-to-r from-background to-primary/10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming soon teaser */}
        <motion.div
          className="mt-12 rounded-lg border bg-card/50 p-6 text-center backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground">
            More experiments coming soon! Stay tuned for updates.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 