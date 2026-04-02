'use client';
import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';

const Surprise = () => {
  const [active, setActive] = useState(false);
  const containerRef = useRef(null);

  const triggerSurprise = () => {
    if (active) return;
    setActive(true);

    const emojis = ['❤️', '✨', '🎈', '🎉', '🎁', '🎂'];

    for (let i = 0; i < 60; i++) {
      const element = document.createElement('div');
      element.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      element.className = 'absolute pointer-events-none text-3xl select-none';
      
      containerRef.current.appendChild(element);

      // Random trajectory
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 600 + 300;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - 400; // Extra upward boost

      gsap.fromTo(element, 
        { x: 0, y: 0, scale: 0, opacity: 1, rotation: 0 },
        { 
          x: tx, 
          y: ty, 
          scale: Math.random() * 1.5 + 0.5,
          opacity: 0,
          rotation: Math.random() * 720 - 360,
          duration: Math.random() * 2 + 1.5,
          ease: "back.out(1.7)",
          onComplete: () => {
            if (element.parentNode) {
              element.remove();
            }
          }
        }
      );
    }

    setTimeout(() => setActive(false), 2500);
  };

  return (
    <section className="py-32 px-6 relative z-10 flex flex-col items-center justify-center overflow-visible min-h-[60vh]">
      <div className="relative" ref={containerRef}>
        <div className="absolute inset-0 bg-rose-300/20 blur-3xl rounded-full scale-150 animate-pulse" />
        
        <button 
          onClick={triggerSurprise}
          disabled={active}
          className="group relative glass-card p-16 md:p-24 shadow-2xl hover:shadow-rose-300/40 transition-all active:scale-95 border-rose-200/50"
        >
          <div className="relative z-10 flex flex-col items-center">
            <div className="text-7xl mb-8 transform group-hover:scale-125 transition-transform duration-700 ease-out drop-shadow-lg">
              {active ? '🎂' : '🎁'}
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-rose-900 tracking-tighter glow-text mb-4 text-center">
              {active ? 'MAGICAL!' : 'YOUR SURPRISE!'}
            </h3>
            <p className="text-slate-600 font-bold uppercase tracking-widest text-sm opacity-60">
              Tap to unleash the joy
            </p>
          </div>
          
          {/* Animated rings */}
          <div className="absolute inset-0 border-2 border-rose-200/30 rounded-[20px] scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-700" />
          <div className="absolute inset-0 border-2 border-rose-100/20 rounded-[20px] scale-100 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-1000" />
        </button>
      </div>
    </section>
  );
};

export default Surprise;
