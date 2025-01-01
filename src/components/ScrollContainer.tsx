'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FloatingObjects } from './FloatingObjects';

export function ScrollContainer({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.2, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-[300vh]"
      style={{
        scale,
      }}
    >
      <FloatingObjects />
      <motion.div
        className="fixed inset-0 -z-20"
        style={{ opacity: backgroundOpacity }}
      >
        {/* Code pattern background */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <pre className="text-xs leading-4 text-current">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: -1000 }}
                animate={{ x: 1000 }}
                transition={{
                  duration: 20 + Math.random() * 10,
                  repeat: Infinity,
                  delay: Math.random() * 20,
                }}
              >
                {`const secure = async (data: ${['AWS.S3', 'Rust<T>', 'Security'][i % 3]}) => {
                  return await encrypt(data);
                }`}
              </motion.div>
            ))}
          </pre>
        </div>
      </motion.div>
      {children}
    </motion.div>
  );
} 