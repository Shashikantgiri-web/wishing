'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * AnimatedBackground Component
 * Implements an Anti-Gravity Floating Theme with pastel particles moving upward.
 * Follows GSAP animation rules: ease: "none" for constant upward motion,
 * randomized horizontal drift, and infinite looping.
 */
const AnimatedBackground = ({ particleCount = 30 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing particles (safety)
    container.innerHTML = '';

    const particles = [];
    const colors = ['#ff9a9e', '#fad0c4', '#a18cd1', '#fbc2eb', '#ffecd2', '#fcb69f'];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 60 + 20; // 20px to 80px
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.className = 'absolute rounded-full pointer-events-none';
      Object.assign(particle.style, {
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        opacity: Math.random() * 0.3 + 0.1, // Soft transparency
        filter: 'blur(8px)',
        left: `${Math.random() * 100}%`,
        bottom: `-100px`, // Start below the screen
        willChange: 'transform',
      });

      container.appendChild(particle);
      particles.push(particle);

      // Animation logic
      // Upward motion with horizontal wandering
      const duration = Math.random() * 15 + 15; // 15 to 30 seconds
      const delay = Math.random() * 20;

      gsap.set(particle, { y: 0 });

      // Main upward loop
      gsap.to(particle, {
        y: -window.innerHeight - 200,
        x: `+=${Math.random() * 100 - 50}`,
        rotation: Math.random() * 360,
        duration: duration,
        repeat: -1,
        ease: 'none',
        delay: -delay, // Negative delay to start at random positions
      });

      // Subtle horizontal sway
      gsap.to(particle, {
        x: `+=${Math.random() * 40 - 20}`,
        duration: duration / 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    // Handle resize to ensure particles cover new width
    const handleResize = () => {
      // Could recalculate positions here if needed, 
      // but for floating particles, random is usually fine.
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [particleCount]);

  return (
    <div 
      ref={containerRef} 
      id="animated-bg"
      className="fixed inset-0 overflow-hidden pointer-events-none" 
      style={{ 
        zIndex: -1,
        background: 'var(--primary-gradient)',
        backgroundAttachment: 'fixed'
      }}
    />
  );
};

export default AnimatedBackground;

