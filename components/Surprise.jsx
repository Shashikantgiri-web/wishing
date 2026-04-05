'use client';
import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';

const Surprise = () => {
  const [active, setActive] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const contentRef = useRef(null);

  const triggerSurprise = () => {
    if (active) return;
    setActive(true);

    const emojis = ['❤️', '✨', '🎈', '🎉', '🎁', '🎂', '💖', '⭐', '🌈'];

    // Box opening / pop animation
    gsap.fromTo(buttonRef.current, 
      { scale: 1 },
      { 
        scale: 1.2, 
        duration: 0.3, 
        yoyo: true, 
        repeat: 1, 
        ease: "back.out(2)",
        onComplete: () => {
          // Reveal the "Hidden Surprise" content area
          gsap.fromTo(contentRef.current,
            { scale: 0, opacity: 0, y: 50 },
            { 
              scale: 1, 
              opacity: 1, 
              y: 0, 
              duration: 1, 
              ease: "back.out(1.7)" 
            }
          );
        }
      }
    );

    // Explosive confetti
    for (let i = 0; i < 80; i++) {
      const element = document.createElement('div');
      element.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      element.className = 'absolute pointer-events-none text-4xl select-none z-50';
      
      containerRef.current.appendChild(element);

      // Random trajectory
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 800 + 400;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - 500;

      gsap.fromTo(element, 
        { x: 0, y: 0, scale: 0, opacity: 1, rotation: 0 },
        { 
          x: tx, 
          y: ty, 
          scale: Math.random() * 2 + 0.5,
          opacity: 0,
          rotation: Math.random() * 1080 - 540,
          duration: Math.random() * 2.5 + 2,
          ease: "power2.out",
          onComplete: () => {
            if (element.parentNode) {
              element.remove();
            }
          }
        }
      );
    }
  };

  return (
    <section className="py-32 px-6 relative z-20 flex flex-col items-center justify-start overflow-visible min-h-[70vh] max-h-[125vh]">
      <div className="relative w-full max-w-lg" ref={containerRef}>
        <div className="absolute inset-0 bg-rose-400/20 blur-[120px] rounded-full scale-150 animate-pulse" />
        
        <button 
          ref={buttonRef}
          onClick={triggerSurprise}
          disabled={active}
          className={`w-full group relative glass-card p-16 md:p-24 shadow-2xl transition-all border-rose-200/50 cursor-pointer ${active ? 'scale-90 opacity-50 gray-scale h-[120vh]' : 'hover:scale-105 active:scale-95'}`}
        >
          <div className="relative z-10 flex flex-col items-center">
            <div className="text-8xl mb-8 transform group-hover:rotate-12 transition-transform duration-500 ease-out drop-shadow-xl">
              {active ? '✨' : '🎁'}
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-rose-900 tracking-tighter glow-text mb-4 text-center">
              {active ? 'UNLEASHED!' : 'CLICK FOR MAGIC'}
            </h3>
            <p className="text-rose-600 font-black uppercase tracking-[0.4em] text-xs opacity-60">
              A special gift for you
            </p>
          </div>
          
          {/* Animated decorative rings */}
          <div className="absolute inset-0 border-4 border-rose-200/20 rounded-[40px] scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-700" />
          <div className="absolute inset-0 border-2 border-rose-100/10 rounded-[40px] scale-100 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-1000" />
        </button>

        {/* Hidden Surprise Revealed */}
        <div 
          ref={contentRef}
          className={`absolute top-full left-0 right-0 mt-20 text-center space-y-6 ${active ? 'block' : 'hidden'}`}
        >
          <div className="glass-card p-10 bg-white/60 shadow-2xl rounded-[40px] border-rose-100/50">
            <h4 className="text-3xl font-black text-rose-600 mb-4 tracking-tight">
              You are truly special! 💖
            </h4>
            <p className="text-slate-600 font-medium leading-relaxed">
              Today, the stars aligned to celebrate someone as wonderful as you. 
              May this year bring you as much happiness as you give to everyone around you!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Surprise;

