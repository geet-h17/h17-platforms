'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

type Bug = {
  id: number;
  x: number;
  y: number;
  type: '🐛' | '🪲' | '🦗' | '🕷️' | '🐜' | '💀';
  speed: number;
  size: number;
  points: number;
  isInvincible?: boolean;
};

type PowerUp = {
  id: number;
  type: '⚡' | '🛡️' | '⏱️' | '💣';
  x: number;
  y: number;
};

const bugTypes = ['🐛', '🪲', '🦗', '🕷️', '🐜', '💀'] as const;

const bugPoints = {
  '🐛': 10,
  '🪲': 20,
  '🦗': 30,
  '🕷️': 40,
  '🐜': 50,
  '💀': 0  // Dangerous bug - ends game if clicked
} as const;

const codeSnippets = [
  "if (coffee.isEmpty()) { developer.execute('panic'); }",
  "while (bugs) { bugs++; // Wait, that's not right... }",
  "catch (error) { throw user; // Yeet the user instead }",
  "// This code works, don't ask how or why",
  "git commit -m 'Fixed bugs' // Narrator: They didn't",
  "function sleep() { return new Error('Coffee needed'); }",
  "// Here be dragons 🐉",
  "try { /* TODO */ } catch { /* TODO later */ }",
];

const debugTips = [
  "Have you tried turning it off and on again?",
  "It works on my machine ¯\\_(ツ)_/¯",
  "The bug is between the keyboard and chair",
  "It's not a bug, it's an undocumented feature",
  "404: Solution not found",
];

export function BugSquasher() {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentCode, setCurrentCode] = useState(codeSnippets[0]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [debugTip, setDebugTip] = useState(debugTips[0]);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [gameSpeed, setGameSpeed] = useState(1);
  const [combo, setCombo] = useState(0);
  const [lastSquashTime, setLastSquashTime] = useState(Date.now());
  const controls = useAnimation();
  const [hasWon, setHasWon] = useState(false);

  const spawnBug = () => {
    if (bugs.length >= 30) {
      setIsGameOver(true);
      return;
    }

    const isDangerous = Math.random() < 0.2;
    const isBoss = !isDangerous && Math.random() < 0.15;
    const bugType = isDangerous ? '💀' : bugTypes[Math.floor(Math.random() * (bugTypes.length - 1))];
    
    const spawnSide = Math.floor(Math.random() * 4);
    let x, y;
    
    switch(spawnSide) {
      case 0: // top
        x = Math.random() * 100;
        y = 0;
        break;
      case 1: // right
        x = 100;
        y = Math.random() * 100;
        break;
      case 2: // bottom
        x = Math.random() * 100;
        y = 100;
        break;
      default: // left
        x = 0;
        y = Math.random() * 100;
    }
    
    const newBug: Bug = {
      id: Date.now(),
      x,
      y,
      type: bugType,
      speed: isBoss ? 1 : (Math.random() * 4 + 2) * gameSpeed,
      size: isBoss ? 2 : 1,
      points: isDangerous ? 0 : (isBoss ? bugPoints[bugType] * 10 : bugPoints[bugType]),
      isInvincible: isBoss,
    };

    setBugs(prev => [...prev, newBug]);
  };

  const spawnPowerUp = () => {
    const powerUpTypes = ['⚡', '🛡️', '⏱️', '💣'] as const;
    const newPowerUp: PowerUp = {
      id: Date.now(),
      type: powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)],
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    };
    setPowerUps(prev => [...prev, newPowerUp]);
  };

  const handlePowerUp = (powerUp: PowerUp) => {
    setPowerUps(prev => prev.filter(p => p.id !== powerUp.id));
    
    switch (powerUp.type) {
      case '⚡':
        setGameSpeed(prev => prev * 0.75);
        setTimeout(() => setGameSpeed(prev => prev / 0.75), 5000);
        break;
      case '🛡️':
        setBugs(prev => prev.map(bug => ({ ...bug, isInvincible: false })));
        break;
      case '⏱️':
        setBugs(prev => prev.map(bug => ({ ...bug, speed: bug.speed * 0.5 })));
        setTimeout(() => setBugs(prev => prev.map(bug => ({ ...bug, speed: bug.speed * 2 }))), 3000);
        break;
      case '💣':
        setBugs([]);
        const bombPoints = 50;
        setScore(prev => prev + bombPoints);
        break;
    }
  };

  const squashBug = (bugId: number) => {
    const bug = bugs.find(b => b.id === bugId);
    if (!bug) return;
    
    if (bug.type === '💀') {
      setIsGameOver(true);
      setDebugTip("Never click the skull! Game Over! 💀");
      return;
    }

    if (bug.isInvincible) return;

    const now = Date.now();
    const timeDiff = now - lastSquashTime;
    setLastSquashTime(now);

    // Combo system
    let newCombo = timeDiff < 1000 ? combo + 1 : 0;
    setCombo(newCombo);

    // Calculate score with combo multiplier
    const pointsEarned = Math.floor(bug.points * (1 + newCombo * 0.5));
    setScore(prev => prev + pointsEarned);

    setBugs(prev => prev.filter(b => b.id !== bugId));
    
    // Show random code snippet
    setCurrentCode(codeSnippets[Math.floor(Math.random() * codeSnippets.length)]);
    
    // Glitch effect
    controls.start({
      filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'],
      transition: { duration: 0.3 },
    });
  };

  const resetGame = () => {
    setBugs([]);
    setScore(0);
    setIsGameOver(false);
    setDebugTip(debugTips[Math.floor(Math.random() * debugTips.length)]);
  };

  useEffect(() => {
    if (isGameOver) {
      if (score > highScore) {
        setHighScore(score);
      }
      return;
    }

    const bugInterval = setInterval(spawnBug, 1000 / gameSpeed);
    const powerUpInterval = setInterval(spawnPowerUp, 7000);

    return () => {
      clearInterval(bugInterval);
      clearInterval(powerUpInterval);
    };
  }, [isGameOver, gameSpeed, score, highScore]);

  useEffect(() => {
    if (score >= 365 && !isGameOver) {
      setIsGameOver(true);
      setHasWon(true);
    }
  }, [score]);

  const getEndGameMessage = () => {
    if (hasWon) {
      return {
        title: "🏆 YOU'RE A BUG SLAYER!",
        message: "You've mastered the art of debugging!",
        buttonText: "Share Victory 🎉"
      };
    }
    return {
      title: "STACK OVERFLOW!",
      message: debugTip,
      buttonText: "Share Score 📊"
    };
  };

  const shareScore = () => {
    const message = hasWon 
      ? `🎮 Just conquered the Bug Squasher game with ${score} points! Real G stuff 🏆`
      : `🎮 Squashed some bugs and scored ${score} points! Almost there 💪`;
    
    const linkedinUrl = `https://www.linkedin.com/messaging/compose?recipient=geet-h17&body=${encodeURIComponent(message)}`;
    window.open(linkedinUrl, '_blank');
  };

  return (
    <motion.div
      className="relative h-[500px] overflow-hidden rounded-lg border bg-black/90 p-4 font-mono shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Matrix-style background */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xs text-green-500"
            animate={{
              y: ['0%', '100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{ left: `${i * 10}%` }}
          >
            {currentCode.split('').map((char, j) => (
              <div key={j}>{char}</div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Game interface */}
      <motion.div
        className="relative h-full"
        animate={controls}
      >
        {/* Header with additional stats */}
        <div className="mb-4 flex items-center justify-between text-green-500">
          <div>Score: {score}</div>
          <div>Speed: {gameSpeed.toFixed(1)}x</div>
          <div>Combo: {combo}x</div>
          <div>High Score: {highScore}</div>
        </div>

        {/* Code display */}
        <motion.div
          className="mb-4 rounded border border-green-500/20 bg-black/50 p-2 text-sm text-green-500"
          animate={{ opacity: [0.5, 1] }}
          transition={{ duration: 0.5 }}
        >
          {currentCode}
        </motion.div>

        {/* Points Guide - Single centered version */}
        <div className="mb-4 flex justify-center">
          <div className="inline-flex gap-4 rounded-lg border border-green-500/20 bg-black/80 px-4 py-2 text-xs text-green-500">
            {Object.entries(bugPoints).map(([bug, points]) => (
              <div key={bug} className="flex items-center gap-2">
                <span className="relative">
                  {bug}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-green-500/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </span>
                <span>{bug === '💀' ? 'Game Over' : points}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bug playground */}
        <div className="relative h-[300px] rounded border border-green-500/20">
          {bugs.map(bug => (
            <motion.div
              key={bug.id}
              className={`absolute cursor-pointer transform-gpu ${bug.isInvincible ? 'animate-pulse' : ''} ${bug.type === '💀' ? 'animate-bounce' : ''}`}
              initial={{ x: `${bug.x}%`, y: `${bug.y}%`, scale: bug.size }}
              animate={{
                x: [`${bug.x}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
                y: [`${bug.y}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
              }}
              transition={{
                duration: 3 / bug.speed,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
              onClick={() => squashBug(bug.id)}
              whileHover={{ scale: bug.size * 1.2 }}
              whileTap={{ scale: bug.size * 0.8 }}
              style={{
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `translate(-50%, -50%)`,
              }}
            >
              <span className="text-xl relative z-10">{bug.type}</span>
              <motion.div
                className={`absolute inset-0 rounded-full ${
                  bug.type === '💀' ? 'bg-purple-500/20 animate-pulse' : 
                  bug.isInvincible ? 'bg-red-500/20' : 
                  'bg-green-500/20'
                }`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.div>
          ))}

          {/* Power-ups */}
          {powerUps.map(powerUp => (
            <motion.div
              key={powerUp.id}
              className="absolute cursor-pointer transform-gpu"
              initial={{ x: `${powerUp.x}%`, y: `${powerUp.y}%`, scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              onClick={() => handlePowerUp(powerUp)}
              style={{
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `translate(-50%, -50%)`,
              }}
            >
              <span className="text-xl relative z-10">{powerUp.type}</span>
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-500/20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>

        {/* Enhanced Game over overlay */}
        {isGameOver && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="space-y-6 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className={`text-3xl font-bold ${hasWon ? 'text-green-500' : 'text-red-500'}`}>
                {getEndGameMessage().title}
              </div>
              
              <div className="space-y-2">
                <div className="text-xl text-green-500">Final Score: {score}</div>
                <div className="text-sm text-green-500/80">{getEndGameMessage().message}</div>
                {hasWon && (
                  <motion.div
                    className="mt-4 text-lg text-purple-500"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    You're officially a G! 🔥
                  </motion.div>
                )}
              </div>

              <div className="flex gap-4 justify-center">
                <motion.button
                  className="rounded border border-green-500 bg-green-500/10 px-4 py-2 text-green-500 hover:bg-green-500/20"
                  onClick={resetGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  npm run fix
                </motion.button>

                <motion.button
                  className="rounded border border-purple-500 bg-purple-500/10 px-4 py-2 text-purple-500 hover:bg-purple-500/20"
                  onClick={shareScore}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {getEndGameMessage().buttonText}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
} 