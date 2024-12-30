'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

// Sample blog posts data
const BLOG_POSTS = [
  {
    id: '1',
    title: 'From Local LLM Deployment to Making Custom LLM Local Add-ons',
    brief: 'A Game-Changer in AI Accessibility',
    slug: 'jwt-auth-rust',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    dateAdded: '2024-02-15',
    readTime: 8,
    tags: [
      { name: 'Rust', slug: 'rust' },
      { name: 'Security', slug: 'security' },
      { name: 'WebDev', slug: 'webdev' },
    ],
    views: 1234,
    reactions: 89,
    url: 'https://geethirawat.hashnode.dev/from-local-llm-deployment-to-making-custom-llm-local-add-ons-a-game-changer-in-ai-accessibility'
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns for React Applications',
    brief: 'Deep dive into advanced TypeScript patterns and techniques that will make your React applications more type-safe and maintainable.',
    slug: 'advanced-typescript-react',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    dateAdded: '2024-02-10',
    readTime: 12,
    tags: [
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'React', slug: 'react' },
      { name: 'Patterns', slug: 'patterns' },
    ],
    views: 2341,
    reactions: 156,
    url: 'https://your-blog-url.com/advanced-typescript-react'
  },
  {
    id: '3',
    title: 'Optimizing AWS Lambda Performance with Rust',
    brief: 'Explore how to leverage Rust\'s performance characteristics to build blazing-fast AWS Lambda functions with minimal cold start times.',
    slug: 'aws-lambda-rust',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    dateAdded: '2024-02-05',
    readTime: 10,
    tags: [
      { name: 'AWS', slug: 'aws' },
      { name: 'Rust', slug: 'rust' },
      { name: 'Serverless', slug: 'serverless' },
    ],
    views: 1876,
    reactions: 134,
    url: 'https://your-blog-url.com/aws-lambda-rust'
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return 'yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

const tagColors: Record<string, { bg: string; text: string }> = {
  Rust: { bg: 'bg-orange-500/10', text: 'text-orange-500' },
  Security: { bg: 'bg-red-500/10', text: 'text-red-500' },
  TypeScript: { bg: 'bg-blue-500/10', text: 'text-blue-500' },
  React: { bg: 'bg-cyan-500/10', text: 'text-cyan-500' },
  AWS: { bg: 'bg-yellow-500/10', text: 'text-yellow-500' },
  Serverless: { bg: 'bg-purple-500/10', text: 'text-purple-500' },
  WebDev: { bg: 'bg-green-500/10', text: 'text-green-500' },
  Patterns: { bg: 'bg-pink-500/10', text: 'text-pink-500' },
};

export function BlogSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="blog" className="relative min-h-screen py-32">
      <div className="container">
        <motion.div
          className="mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold tracking-tighter">
            Brain Dumps 🧠
          </h2>
          <p className="text-muted-foreground">
            Deep dives into security, performance, and cutting-edge tech
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl border bg-card transition-all hover:bg-accent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredId(post.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              {/* Cover Image with Parallax Effect */}
              <div className="relative aspect-video overflow-hidden">
                <motion.img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-full w-full object-cover"
                  animate={{
                    scale: hoveredId === post.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                
                {/* Floating Tag */}
                <motion.div
                  className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs backdrop-blur-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {post.readTime} min read
                </motion.div>
              </div>

              {/* Content */}
              <div className="relative space-y-4 p-6">
                {/* Tags with Custom Colors */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => {
                    const colors = tagColors[tag.name] || { bg: 'bg-primary/10', text: 'text-primary' };
                    return (
                      <span
                        key={tag.slug}
                        className={`rounded-full px-2 py-1 text-xs ${colors.bg} ${colors.text}`}
                      >
                        {tag.name}
                      </span>
                    );
                  })}
                </div>

                {/* Title with Gradient on Hover */}
                <h3 className="text-xl font-bold leading-tight tracking-tight transition-colors group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent">
                  {post.title}
                </h3>

                {/* Brief */}
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {post.brief}
                </p>

                {/* Metadata */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{formatDate(post.dateAdded)}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 transition-colors group-hover:text-cyan-500">
                      👁️ {post.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 transition-colors group-hover:text-red-500">
                      ❤️ {post.reactions}
                    </span>
                  </div>
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 group-hover:opacity-100" />
              </div>

              {/* Corner Accent */}
              <div className="absolute -right-12 -top-12 h-24 w-24 rotate-45 bg-gradient-to-r from-primary/0 to-primary/10 transition-transform group-hover:scale-150" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
} 