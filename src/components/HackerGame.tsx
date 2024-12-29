'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

type SecurityLevel = 'n00b' | 'script kiddie' | 'l33t' | 'cyber wizard' | 'ASCII god';

const hackingPhrases = [
  "Bypassing quantum encryption...",
  "Hacking the mainframe... jk it's 2024",
  "Asking ChatGPT nicely for passwords...",
  "Downloading more RAM...",
  "Convincing AI not to take over...",
  "Making coffee.exe...",
  "Pretending to understand blockchain...",
  "sudo make_me_a_sandwich",
  "Converting caffeine to code...",
  "rm -rf /problems",
];

const achievements = [
  { name: "Hello World Pro", desc: "Wrote Hello World in 10 languages... simultaneously" },
  { name: "Bug Creator", desc: "Successfully created more bugs than features" },
  { name: "Stack Overflow Survivor", desc: "Copy-pasted code without breaking everything" },
  { name: "Git Wizard", desc: "Force pushed to main and lived to tell the tale" },
  { name: "CSS Whisperer", desc: "Made a div perfectly centered on first try" },
];

export function HackerGame() {
  const [securityLevel, setSecurityLevel] = useState<SecurityLevel>('n00b');
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [score, setScore] = useState(0);
  const [isHacking, setIsHacking] = useState(false);
  const controls = useAnimation();

  const glitchText = async () => {
    await controls.start({
      opacity: [0.5, 1, 0.5],
      x: [-2, 2, -2, 2, 0],
      transition: { duration: 0.2 },
    });
  };

  const startHacking = async () => {
    if (isHacking) return;
    setIsHacking(true);
    let points = 0;

    for (let i = 0; i < 5; i++) {
      setCurrentPhrase(prev => (prev + 1) % hackingPhrases.length);
      await glitchText();
      await new Promise(r => setTimeout(r, 1000));
      points += Math.floor(Math.random() * 100);
    }

    setScore(prev => prev + points);
    setIsHacking(false);

    // Update security level based on score
    if (score > 1000) setSecurityLevel('ASCII god');
    else if (score > 750) setSecurityLevel('cyber wizard');
    else if (score > 500) setSecurityLevel('l33t');
    else if (score > 250) setSecurityLevel('script kiddie');
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg border bg-black/90 p-6 font-mono shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Glitch overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 animate-glitch-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
        <div className="absolute inset-0 animate-glitch-2 bg-gradient-to-r from-red-500/50 to-transparent" />
      </div>

      {/* Game interface */}
      <div className="relative space-y-4 text-green-500">
        <div className="flex items-center justify-between">
          <div className="text-sm">Security Level: {securityLevel}</div>
          <div className="text-sm">Score: {score}</div>
        </div>

        <motion.div 
          animate={controls}
          className="h-20 rounded border border-green-500/20 bg-black/50 p-4"
        >
          {isHacking ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              {hackingPhrases[currentPhrase]}
            </motion.div>
          ) : (
            <div className="text-center text-muted-foreground">
              Ready to hack? Just don't tell mom...
            </div>
          )}
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={startHacking}
          disabled={isHacking}
          className="w-full rounded border border-green-500 bg-green-500/10 py-2 text-green-500 hover:bg-green-500/20"
        >
          {isHacking ? "HACKING IN PROGRESS..." : "START HACKING"}
        </motion.button>

        {/* Achievements */}
        <div className="space-y-2">
          <div className="text-sm text-green-500/80">Recent Achievements:</div>
          <div className="grid gap-2">
            {achievements.slice(0, 3).map((achievement, i) => (
              <motion.div
                key={achievement.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded border border-green-500/20 bg-black/50 p-2 text-xs"
              >
                <div className="font-bold">{achievement.name}</div>
                <div className="text-green-500/80">{achievement.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Easter egg: Konami code handler */}
        <div className="absolute bottom-2 right-2 text-xs text-green-500/40">
          ↑↑↓↓←→←→BA
        </div>
      </div>
    </motion.div>
  );
} 