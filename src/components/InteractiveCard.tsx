'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MouseEvent, useState } from 'react';
import { Project } from '@/types';

const languageColors = {
  Rust: { color: '#DE3F32', spark: '🦀' },
  TypeScript: { color: '#3178C6', spark: '💠' },
  React: { color: '#61DAFB', spark: '⚛️' },
  AWS: { color: '#FF9900', spark: '☁️' },
  Security: { color: '#4CAF50', spark: '🔒' },
  WebAssembly: { color: '#654FF0', spark: '⚡' },
  Performance: { color: '#FFD700', spark: '🚀' },
  Cloud: { color: '#4285F4', spark: '☁️' },
  Node: { color: '#339933', spark: '📦' },
} as const;

interface InteractiveCardProps {
  project: Project;
  index: number;
}

export function InteractiveCard({ project, index }: InteractiveCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  const springConfig = { damping: 20, stiffness: 300 };
  const scaleSpring = useSpring(1, springConfig);
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }

  function onMouseEnter() {
    if (!isDragging) {
      scaleSpring.set(1.1);
    }
  }

  function onMouseLeave() {
    if (!isDragging) {
      mouseX.set(0);
      mouseY.set(0);
      scaleSpring.set(1);
    }
  }

  // Find the primary language/tech from tags
  const primaryTag = project.tags[0];
  const tagColor = languageColors[primaryTag as keyof typeof languageColors];

  return (
    <motion.div
      drag
      dragConstraints={{
        left: -window.innerWidth / 2,
        right: window.innerWidth / 2,
        top: -window.innerHeight / 2,
        bottom: window.innerHeight / 2,
      }}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false);
        scaleSpring.set(1);
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        x,
        y,
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        scale: scaleSpring,
        zIndex: isDragging ? 50 : 1,
      }}
      className="relative cursor-grab perspective-1000"
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Language-specific spark effect */}
      {tagColor && (
        <motion.div
          className="absolute -right-2 -top-2 z-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <span className="text-lg">{tagColor.spark}</span>
        </motion.div>
      )}

      <div className="group relative h-full rounded-xl border bg-card p-6 shadow-lg transition-colors hover:bg-card/50">
        {/* Glow effect based on language color */}
        <div
          className="absolute inset-0 -z-10 rounded-xl opacity-0 blur-xl transition-opacity group-hover:opacity-20"
          style={{
            backgroundColor: tagColor?.color || '#fff',
          }}
        />

        <div className="space-y-2">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => {
            const tagStyle = languageColors[tag as keyof typeof languageColors];
            return (
              <span
                key={tag}
                className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: `${tagStyle?.color}20` || '#64748b20',
                  color: tagStyle?.color || 'currentColor',
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline"
            >
              Demo →
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline"
            >
              GitHub →
            </a>
          )}
        </div>

        {/* Glowing border effect */}
        <div 
          className="absolute -inset-px rounded-xl bg-gradient-to-r opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            backgroundImage: `linear-gradient(45deg, ${tagColor?.color}40, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
} 