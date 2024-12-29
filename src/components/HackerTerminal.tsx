'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const commands = [
  { cmd: 'help', description: 'List all commands' },
  { cmd: 'about', description: 'Learn about me' },
  { cmd: 'skills', description: 'View my technical skills' },
  { cmd: 'projects', description: 'Browse my projects' },
  { cmd: 'contact', description: 'Get in touch' },
  { cmd: 'clear', description: 'Clear terminal' },
];

const skills = [
  'Rust 🦀',
  'TypeScript ⚡',
  'AWS Cloud ☁️',
  'Security 🔒',
  'WebAssembly 🚀',
  'React ⚛️',
];

export function HackerTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['Type "help" to get started']);
  const [isTyping, setIsTyping] = useState(false);

  const handleCommand = (cmd: string) => {
    switch (cmd.toLowerCase()) {
      case 'help':
        setHistory(prev => [...prev, `> ${cmd}`, ...commands.map(c => `${c.cmd} - ${c.description}`)]);
        break;
      case 'about':
        setHistory(prev => [...prev, `> ${cmd}`, 
          'Hey! I\'m an indie developer and security researcher.',
          'Building tools that make the web more secure and efficient.',
          'Currently working on open-source security tools and Rust-based projects.'
        ]);
        break;
      case 'skills':
        setHistory(prev => [...prev, `> ${cmd}`, ...skills]);
        break;
      case 'projects':
        setHistory(prev => [...prev, `> ${cmd}`, 'Scroll down to see my projects in action! 👇']);
        break;
      case 'contact':
        setHistory(prev => [...prev, `> ${cmd}`, 'GitHub: @h17', 'Email: dev@h17.dev']);
        break;
      case 'clear':
        setHistory(['Terminal cleared']);
        break;
      default:
        setHistory(prev => [...prev, `> ${cmd}`, 'Command not found. Type "help" for available commands']);
    }
  };

  const handleSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      handleCommand(input.trim());
      setInput('');
    }
  };

  // Auto-type effect on mount
  useEffect(() => {
    const text = "whoami";
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setInput(prev => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          handleCommand('whoami');
          setInput('');
          setIsTyping(false);
        }, 500);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative h-[400px] w-full overflow-hidden rounded-lg border bg-black/90 font-mono text-green-500 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Terminal header */}
      <div className="flex h-6 items-center gap-2 border-b border-green-500/20 bg-black/50 px-4">
        <div className="h-2 w-2 rounded-full bg-red-500" />
        <div className="h-2 w-2 rounded-full bg-yellow-500" />
        <div className="h-2 w-2 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-green-500/80">h17@terminal:~</span>
      </div>

      {/* Terminal content */}
      <div className="h-[calc(100%-24px)] overflow-auto p-4">
        {history.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
            className={line.startsWith('>') ? 'text-blue-400' : ''}
          >
            {line}
          </motion.div>
        ))}
        <div className="mt-2 flex items-center">
          <span className="text-blue-400">{'>'}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => !isTyping && setInput(e.target.value)}
            onKeyDown={handleSubmit}
            className="ml-2 flex-1 bg-transparent outline-none"
            disabled={isTyping}
            autoFocus
          />
        </div>
      </div>

      {/* Matrix-like background effect */}
      <div className="absolute inset-0 -z-10 opacity-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xs"
            animate={{
              y: ['0%', '100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${i * 10}%`,
            }}
          >
            {Array.from({ length: 10 }).map((_, j) => (
              <div key={j}>
                {String.fromCharCode(0x30a0 + Math.random() * 96)}
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 