'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export function LogoEffect() {
  const [isHovered, setIsHovered] = useState(false);
  
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [text, setText] = useState("H17 PLATFORMS");
  
  const handleMouseOver = () => {
    setIsHovered(true);
    let iteration = 0;
    const interval = setInterval(() => {
      setText(prev => 
        prev.split("")
          .map((letter, index) => {
            if (index < iteration) {
              return "H17 PLATFORMS"[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("")
      );
      iteration += 1/3;
      if (iteration >= "H17 PLATFORMS".length) clearInterval(interval);
    }, 30);
  };

  return (
    <motion.div
      className="relative cursor-pointer select-none"
      onMouseOver={handleMouseOver}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <motion.span
        className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-xl font-black tracking-tight text-transparent sm:text-2xl"
        animate={isHovered ? {
          scale: [1, 1.02, 1],
          transition: { duration: 0.3 }
        } : {}}
      >
        {text}
      </motion.span>
      <motion.div
        className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500"
        animate={isHovered ? { width: "100%" } : { width: "0%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
} 