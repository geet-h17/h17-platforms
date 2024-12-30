'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const contactMethods = [
  {
    id: 'email',
    label: 'Email',
    value: 'mailmeatgeet@gmail.com',
    icon: '📧',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/geethirawat',
    icon: '💼',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/geet-h17',
    icon: '🐙',
    color: 'from-purple-500 to-pink-500',
  },
];

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="contact" className="relative min-h-screen py-32" ref={containerRef}>
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
            Let's Connect 🤝
          </h2>
          <p className="text-muted-foreground">
            Got a project in mind? Let's discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.id}
              href={
                method.id === 'email'
                  ? `mailto:${method.value}`
                  : `https://${method.value}`
              }
              target={method.id !== 'email' ? '_blank' : undefined}
              rel={method.id !== 'email' ? 'noopener noreferrer' : undefined}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredId(method.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <div className="relative overflow-hidden rounded-lg border bg-card p-6">
                {/* Animated background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-0 transition-opacity group-hover:opacity-10`}
                  animate={{
                    scale: hoveredId === method.id ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Icon */}
                <motion.div
                  className="mb-4 inline-block rounded-lg bg-card p-3"
                  whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                >
                  <span className="text-3xl">{method.icon}</span>
                </motion.div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{method.label}</h3>
                  <p className="text-sm text-muted-foreground">{method.value}</p>
                </div>

                {/* Arrow indicator */}
                <motion.div
                  className="absolute bottom-6 right-6 text-lg opacity-0 transition-opacity group-hover:opacity-100"
                  initial={{ x: -10 }}
                  animate={{ x: hoveredId === method.id ? 0 : -10 }}
                >
                  →
                </motion.div>

                {/* Corner decoration */}
                <div className="absolute -right-12 -top-12 h-24 w-24 rotate-45 bg-gradient-to-r from-background to-primary/10" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Additional message */}
        <motion.div
          className="mt-16 rounded-lg border bg-card/50 p-8 text-center backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto max-w-2xl space-y-4">
            <h3 className="text-2xl font-bold">Open for Opportunities</h3>
            <p className="text-muted-foreground">
              Whether it's a potential project, job opportunity, or just a friendly chat about cloud security and DevSecOps,
              I'm always excited to connect with fellow tech enthusiasts.
            </p>
            <div className="flex justify-center gap-2">
              <span className="inline-block animate-bounce text-2xl">👋</span>
              <span className="inline-block animate-bounce text-2xl" style={{ animationDelay: '0.1s' }}>🚀</span>
              <span className="inline-block animate-bounce text-2xl" style={{ animationDelay: '0.2s' }}>💻</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 