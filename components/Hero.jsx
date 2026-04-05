'use client';
import React from 'react';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

const Hero = ({ name = "Celebrant" }) => {
  const heroRef = useRef(null);
  const introRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Stage 1: "Hey [Name]..."
    tl.fromTo(introRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 2, ease: "power3.out" }
    )
    .to(introRef.current, { 
      opacity: 0, 
      y: -30, 
      duration: 1, 
      delay: 1.5, 
      ease: "power3.in" 
    })
    
    // Stage 2: Main Birthday Reveal
    .fromTo(titleRef.current, 
      { opacity: 0, scale: 0.9, y: 30 }, 
      { opacity: 1, scale: 1, y: 0, duration: 2, ease: "back.out(1.7)" }
    )
    .fromTo(contentRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
      "-=1"
    );

    // Floating animation for the whole hero content
    gsap.to(titleRef.current, {
      y: "-=15",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, [name]);

  return (
    <section ref={heroRef} className="min-h-[100vh] flex flex-col items-center justify-center -mt-20 px-4 relative z-10 overflow-hidden">
      {/* Intro Text Backdrop */}
      <div 
        ref={introRef} 
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
      >
        <h2 className="text-4xl md:text-6xl font-black text-rose-500/80 tracking-tight glow-text">
          Hey {name}...
        </h2>
      </div>

      <div ref={titleRef} className="text-center space-y-6 relative z-10">
        <h2 className="text-2xl md:text-3xl font-medium text-rose-500 tracking-[0.3em] uppercase glow-text">
          Happy Birthday 🎂
        </h2>
        <h1 className="text-7xl md:text-9xl font-black text-rose-600 tracking-tighter drop-shadow-2xl leading-tight">
          {name}
        </h1>
        
        <div ref={contentRef} className="space-y-10">
          <p className="max-w-lg mx-auto text-lg md:text-xl text-slate-700 font-light leading-relaxed">
            Today is a celebration of the magic you bring into our lives. May your day be as beautiful and unique as you are.
          </p>
          <div className="pt-10">
            <button 
              onClick={() => {
                const nextSection = heroRef.current.nextElementSibling;
                if (nextSection) {
                  nextSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="glass-card px-10 py-5 text-rose-500 font-bold tracking-widest uppercase hover:scale-105 transition-all shadow-xl hover:shadow-rose-300/50 cursor-pointer"
            >
              Start Your Journey ✨
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

