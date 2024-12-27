'use client';

import { motion } from 'framer-motion';

const objects = [
  {
    icon: (
      <svg className="h-full w-full" viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M8 4L4 8L8 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          d="M16 4L20 8L16 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
        />
      </svg>
    ),
    color: 'from-blue-500/20 to-cyan-500/20',
    size: 'h-16 w-16',
  },
  {
    icon: (
      <svg className="h-full w-full" viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M12 4v16m-8-8h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    ),
    color: 'from-purple-500/20 to-pink-500/20',
    size: 'h-12 w-12',
  },
  {
    icon: (
      <svg className="h-full w-full" viewBox="0 0 24 24" fill="none">
        <motion.rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          d="M9 8h6m-6 4h6m-6 4h6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
        />
      </svg>
    ),
    color: 'from-green-500/20 to-emerald-500/20',
    size: 'h-20 w-20',
  },
  {
    icon: (
      <svg className="h-full w-full" viewBox="0 0 24 24" fill="none">
        <motion.circle
          cx="12"
          cy="12"
          r="8"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          d="M12 8v8m-4-4h8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
        />
      </svg>
    ),
    color: 'from-orange-500/20 to-red-500/20',
    size: 'h-14 w-14',
  },
];

export function FloatingObjects() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {objects.map((obj, i) => (
        <motion.div
          key={i}
          className={`absolute ${obj.size} perspective-1000`}
          style={{
            left: `${15 + (i * 25)}%`,
            top: `${20 + (i % 2) * 40}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotateX: [0, 360],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className={`h-full w-full rounded-lg bg-gradient-to-br ${obj.color} p-3 shadow-lg backdrop-blur-sm`}>
            {obj.icon}
          </div>
        </motion.div>
      ))}
    </div>
  );
} 