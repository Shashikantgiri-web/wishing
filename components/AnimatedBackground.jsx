'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * AnimatedBackground Component
 * Implements an Anti-Gravity Floating Theme with varied shapes (hearts, stars, circles).
 * Follows GSAP animation rules: ease: "none" for constant upward motion,
 * randomized horizontal drift, and infinite looping.
 */
const AnimatedBackground = ({ particleCount = 40 }) => {
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
      const size = Math.random() * 40 + 10; // 10px to 50px
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.className = `absolute pointer-events-none opacity-0`;
      
      // Styling based on shape type
      if (shapeType === 'circle' || shapeType === 'dot') {
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = color;
      } else if (shapeType === 'heart') {
        particle.innerHTML = '❤️';
        particle.style.fontSize = `${size}px`;
        particle.style.color = color;
        particle.style.filter = 'drop-shadow(0 0 5px rgba(0,0,0,0.1))';
      } else if (shapeType === 'star') {
        particle.innerHTML = '⭐';
        particle.style.fontSize = `${size}px`;
        particle.style.color = color;
      }

      if (shapeType === 'circle' || shapeType === 'dot') {
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.filter = 'blur(4px)';
      }

      Object.assign(particle.style, {
        left: `${Math.random() * 100}%`,
        bottom: `-100px`,
        willChange: 'transform',
        zIndex: 0,
      });

      container.appendChild(particle);

      // Animation logic
      const duration = Math.random() * 20 + 20; // 20 to 40 seconds
      const delay = Math.random() * 20;

      // Initial fade in
      gsap.to(particle, {
        opacity: Math.random() * 0.4 + 0.1,
        duration: 2,
        delay: Math.random() * 5
      });

      // Main upward loop
      gsap.to(particle, {
        y: -window.innerHeight - 300,
        x: `+=${Math.random() * 200 - 100}`,
        rotation: Math.random() * 720 - 360,
        duration: duration,
        repeat: -1,
        ease: 'none',
        delay: -delay,
      });

      // Subtle horizontal sway (Yoyo)
      gsap.to(particle, {
        x: `+=${Math.random() * 60 - 30}`,
        duration: Math.random() * 4 + 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      
      // Scale pulse
      gsap.to(particle, {
        scale: 1.2,
        duration: Math.random() * 2 + 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    return () => {
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


