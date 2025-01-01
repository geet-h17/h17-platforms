'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoEffect } from './LogoEffect';
import { useEffect, useState } from 'react';

const sections = [
  { 
    id: 'home', 
    label: 'Home', 
    color: 'from-blue-500 to-cyan-500',
    navColor: 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10'
  },
  { 
    id: 'projects', 
    label: 'Projects', 
    color: 'from-purple-500 to-pink-500',
    navColor: 'bg-gradient-to-r from-purple-500/10 to-pink-500/10'
  },
  { 
    id: 'blog', 
    label: 'Blog', 
    color: 'from-orange-500 to-red-500',
    navColor: 'bg-gradient-to-r from-orange-500/10 to-red-500/10'
  },
];

export function Navigation() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 100], [0.5, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'home';

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80; // Account for fixed header
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const currentSection = sections.find(section => section.id === activeSection);

  return (
    <motion.div 
      className={`fixed top-0 z-50 w-full backdrop-blur-sm transition-colors duration-500 ${currentSection?.navColor}`}
      style={{ opacity }}
    >
      <div className="container flex h-16 items-center justify-between">
        <LogoEffect />
        
        <nav className="flex items-center gap-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavClick(section.id)}
              className="group relative px-2 py-1"
            >
              <span 
                className={`relative z-10 text-sm font-medium transition-colors
                  ${activeSection === section.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/80'}`}
              >
                {section.label}
              </span>
              {activeSection === section.id && (
                <motion.div
                  layoutId="active-section"
                  className={`absolute inset-0 rounded-md bg-gradient-to-r ${section.color} opacity-20`}
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Gradient border at bottom */}
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
    </motion.div>
  );
}
