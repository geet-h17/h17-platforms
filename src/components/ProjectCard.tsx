'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      className="group relative rounded-lg border border-border bg-card p-6 transition-colors hover:bg-card/50"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">
            {project.title}
          </h3>
          <div className="flex gap-2">
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                Demo
              </Link>
            )}
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
            )}
          </div>
        </div>
        <p className="text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
