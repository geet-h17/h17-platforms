'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { BugSquasher } from './BugSquasher';
import { CodeBreaker } from './CodeBreaker';

const games = [
  { id: 'bugs', title: 'Bug Squasher', component: BugSquasher },
  { id: 'code', title: 'Code Breaker', component: CodeBreaker },
] as const;

export function GameSwitcher() {
  const [activeGame, setActiveGame] = useState<typeof games[number]['id']>('bugs');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSwitch = async (gameId: typeof games[number]['id']) => {
    if (isTransitioning || gameId === activeGame) return;
    setIsTransitioning(true);
    setActiveGame(gameId);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const ActiveGame = games.find(g => g.id === activeGame)?.component || BugSquasher;

  return (
    <div className="relative">
      {/* Game Switcher */}
      <motion.div 
        className="absolute -top-12 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full border border-cyan-500/20 bg-black/80 p-2 backdrop-blur"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {games.map((game) => (
          <motion.button
            key={game.id}
            onClick={() => handleSwitch(game.id)}
            className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
              activeGame === game.id ? 'text-cyan-500' : 'text-muted-foreground hover:text-cyan-500/80'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {game.title}
            {activeGame === game.id && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 -z-10 rounded-full bg-cyan-500/10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Games Container */}
      <div className="relative perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGame}
            initial={{ 
              opacity: 0,
              rotateY: -90,
              transformPerspective: 1000,
              z: -100,
            }}
            animate={{ 
              opacity: 1,
              rotateY: 0,
              z: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                mass: 1,
              }
            }}
            exit={{ 
              opacity: 0,
              rotateY: 90,
              z: -100,
              transition: { 
                type: "spring",
                stiffness: 100,
                damping: 15,
                mass: 1,
              }
            }}
            className="relative preserve-3d"
          >
            <ActiveGame />

            {/* Enhanced transition effects */}
            {isTransitioning && (
              <>
                <motion.div
                  className="absolute inset-0 z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.7, 0] }}
                  transition={{ duration: 0.5, times: [0, 0.5, 1] }}
                >
                  <div className="h-full w-full animate-glitch-1 bg-cyan-500/20" />
                  <div className="absolute inset-0 animate-glitch-2 bg-purple-500/20" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 z-40 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20"
                  animate={{
                    opacity: [0, 0.5, 0],
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 0.5 }}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Enhanced background effects */}
        <div className="absolute -inset-4 -z-10">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 blur-3xl"
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </div>
      </div>
    </div>
  );
} 