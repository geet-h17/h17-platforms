'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

type Challenge = {
  code: string;
  hint: string;
  solution: string;
  description: string;
  difficulty: 'n00b' | 'h4ck3r' | '1337';
};

const challenges: Challenge[] = [
  {
    code: "const secret = '********';\nconsole.log(btoa(secret));",
    hint: "Base64 encoded 'password'",
    solution: "cGFzc3dvcmQ=",
    description: "Decode the base64 string. Hint: It's what users never change",
    difficulty: 'n00b'
  },
  {
    code: "fetch('api/hack')\n  .then(r => r.json())\n  .then(({ p, k }) => p[k]);",
    hint: "Response: { p: ['sec','ret','key'], k: ? }",
    solution: "1",
    description: "Which index reveals the 'ret' string?",
    difficulty: 'h4ck3r'
  },
  {
    code: "0x1337.toString(2)\n  .split('')\n  .filter(x => x === '1')\n  .length",
    hint: "Convert hex to binary, count '1's",
    solution: "5",
    description: "How many 1's in the binary representation?",
    difficulty: '1337'
  },
  // Add more challenges...
];

const successMessages = [
  "ACCESS GRANTED 🔓",
  "SYSTEM COMPROMISED ⚡",
  "FIREWALL BYPASSED 🔥",
  "HACK SUCCESSFUL 💻",
];

const failureMessages = [
  "ACCESS DENIED ⛔",
  "SECURITY ALERT 🚨",
  "SYSTEM LOCKED 🔒",
  "HACK FAILED 💀",
];

export function CodeBreaker() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const controls = useAnimation();

  const getEndGameMessage = () => {
    if (hasWon) {
      return {
        title: "🏆 MASTER HACKER!",
        message: "You've cracked all the codes! Legendary stuff!",
        buttonText: "Share Victory 🎉"
      };
    }
    return {
      title: "SYSTEM LOCKED! 🔒",
      message: "Need more hints? The dev's got your back!",
      buttonText: "Get Hints 💡"
    };
  };

  const shareScore = () => {
    const message = hasWon 
      ? `🔓 Just cracked all challenges in the Code Breaker game! Real hacker stuff! Score: ${score}`
      : `🔒 Almost cracked the codes! Got stuck with ${score} points. Any hints?`;
    
    const linkedinUrl = `https://www.linkedin.com/messaging/compose?recipient=geet-h17&body=${encodeURIComponent(message)}`;
    window.open(linkedinUrl, '_blank');
  };

  const glitchEffect = async () => {
    await controls.start({
      x: [-2, 2, -2, 2, 0],
      filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)'],
      transition: { duration: 0.3 },
    });
  };

  const handleSubmit = async () => {
    await glitchEffect();
    
    if (input.trim() === challenges[currentChallenge].solution) {
      const successMsg = successMessages[Math.floor(Math.random() * successMessages.length)];
      setMessage(successMsg);
      setScore(prev => prev + (showHint ? 50 : 100));
      
      // Check if all challenges completed
      if (currentChallenge === challenges.length - 1) {
        setIsGameOver(true);
        setHasWon(true);
        return;
      }
      
      // Next challenge
      setTimeout(() => {
        setCurrentChallenge(prev => prev + 1);
        setInput('');
        setShowHint(false);
        setMessage('');
        setAttempts(3);
      }, 2000);
    } else {
      setAttempts(prev => prev - 1);
      if (attempts <= 1) {
        const failMsg = failureMessages[Math.floor(Math.random() * failureMessages.length)];
        setMessage(failMsg);
        setTimeout(() => {
          setIsGameOver(true);
          setHasWon(false);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setCurrentChallenge(0);
    setInput('');
    setAttempts(3);
    setShowHint(false);
    setMessage('');
    setScore(0);
    setIsGameOver(false);
    setHasWon(false);
  };

  return (
    <motion.div
      className="relative h-[400px] overflow-hidden rounded-lg border bg-black/90 p-6 font-mono shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Cyberpunk background effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-blue-500/10" />
        <motion.div
          className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      <motion.div
        className="relative space-y-4"
        animate={controls}
      >
        {/* Header */}
        <div className="flex items-center justify-between text-cyan-500">
          <div>LEVEL: {challenges[currentChallenge].difficulty}</div>
          <div>SCORE: {score}</div>
          <div>ATTEMPTS: {Array(attempts).fill('🔑').join(' ')}</div>
        </div>

        {/* Challenge */}
        <div className="space-y-2">
          <div className="text-sm text-cyan-500/80">
            {challenges[currentChallenge].description}
          </div>
          <motion.pre
            className="rounded border border-cyan-500/20 bg-black/50 p-3 text-sm text-cyan-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={currentChallenge}
          >
            {challenges[currentChallenge].code}
          </motion.pre>
        </div>

        {/* Hint */}
        {showHint && (
          <motion.div
            className="text-sm text-purple-500"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            HINT: {challenges[currentChallenge].hint}
          </motion.div>
        )}

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded border border-cyan-500/20 bg-black/50 px-3 py-2 text-cyan-500 outline-none focus:border-cyan-500"
            placeholder="Enter solution..."
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <motion.button
            onClick={handleSubmit}
            className="rounded border border-cyan-500 bg-cyan-500/10 px-4 py-2 text-cyan-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            EXECUTE
          </motion.button>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <motion.button
            onClick={() => setShowHint(true)}
            className="text-sm text-purple-500/80 hover:text-purple-500"
            whileHover={{ scale: 1.05 }}
            disabled={showHint}
          >
            [Request Hint]
          </motion.button>
          <motion.button
            onClick={resetGame}
            className="text-sm text-red-500/80 hover:text-red-500"
            whileHover={{ scale: 1.05 }}
          >
            [Reset System]
          </motion.button>
        </div>

        {/* Message overlay */}
        {message && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/50 text-xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className={message.includes('DENIED') || message.includes('FAILED') ? 'text-red-500' : 'text-green-500'}>
              {message}
            </div>
          </motion.div>
        )}

        {/* Enhanced Game Over Screen */}
        {isGameOver && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="space-y-6 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className={`text-3xl font-bold ${hasWon ? 'text-cyan-500' : 'text-red-500'}`}>
                {getEndGameMessage().title}
              </div>
              
              <div className="space-y-2">
                <div className="text-xl text-cyan-500">Final Score: {score}</div>
                <div className="text-sm text-cyan-500/80">{getEndGameMessage().message}</div>
                {hasWon && (
                  <motion.div
                    className="mt-4 text-lg text-purple-500"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Elite Hacker Status Achieved! 🚀
                  </motion.div>
                )}
              </div>

              <div className="flex gap-4 justify-center">
                <motion.button
                  className="rounded border border-cyan-500 bg-cyan-500/10 px-4 py-2 text-cyan-500 hover:bg-cyan-500/20"
                  onClick={resetGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {hasWon ? 'Play Again' : 'Try Again'}
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