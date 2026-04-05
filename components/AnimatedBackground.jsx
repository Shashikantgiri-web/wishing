'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * AnimatedBackground Component
 * Implements an Anti-Gravity Floating Theme with varied shapes (hearts, stars, circles).
 * Follows GSAP animation rules: ease: "none" for constant upward motion,
 * randomized horizontal drift, and infinite looping.
 */
const AnimatedBackground = ({ particleCount = 15 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing particles (safety)
    container.innerHTML = '';

    const shapes = ['circle', 'heart', 'star', 'dot'];
    const colors = ['#ff9a9e', '#fad0c4', '#a18cd1', '#fbc2eb', '#ffecd2', '#fcb69f', '#ff7eb9'];

    for (let i = 0; i < particleCount; i++) {
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
      const particle = document.createElement('div');
      const size = Math.random() * 30 + 10;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.className = `absolute pointer-events-none opacity-0`;
      
      // Styling based on shape type
      if (shapeType === 'circle' || shapeType === 'dot') {
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = color;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
      } else if (shapeType === 'heart') {
        particle.innerHTML = '❤️';
        particle.style.fontSize = `${size}px`;
        particle.style.color = color;
      } else if (shapeType === 'star') {
        particle.innerHTML = '⭐';
        particle.style.fontSize = `${size}px`;
        particle.style.color = color;
      }

      Object.assign(particle.style, {
        left: `${Math.random() * 100}%`,
        bottom: `-100px`,
        willChange: 'transform',
        transform: 'translateZ(0)',
        zIndex: 0,
      });

      container.appendChild(particle);

      // Animation logic
      const duration = Math.random() * 25 + 25;
      const delay = Math.random() * 20;

      // Initial fade in
      gsap.to(particle, {
        opacity: Math.random() * 0.3 + 0.1,
        duration: 3,
        delay: Math.random() * 5
      });

      // Main upward loop
      gsap.to(particle, {
        y: -window.innerHeight - 300,
        x: `+=${Math.random() * 200 - 100}`,
        rotation: Math.random() * 360,
        duration: duration,
        repeat: -1,
        ease: 'none',
        delay: -delay,
      });
    }

    // Performance Fix: Pause animation when tab is not active
    const handleVisibilityChange = () => {
      if (document.hidden) {
        gsap.globalTimeline.pause();
      } else {
        gsap.globalTimeline.resume();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
        zIndex: 0,
        background: 'linear-gradient(to bottom, #fff5f5, #ffffff)',
      }}
    />
  );
};

export default AnimatedBackground;


