'use client';
import React from 'react';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

const Hero = ({ name = "Celebrant" }) => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" }
    );
    
    // Floating animation for the whole hero content
    gsap.to(titleRef.current, {
      y: "-=20",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <section ref={heroRef} className="min-h-[90vh] flex flex-col items-center justify-center pt-20 px-4 relative z-10">
      <div ref={titleRef} className="text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-medium text-rose-500 tracking-widest uppercase glow-text">
          Happy Birthday 🎂
        </h2>
        <h1 className="text-7xl md:text-9xl font-black text-rose-600 tracking-tighter drop-shadow-2xl leading-tight">
          {name}
        </h1>
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
            className="glass-card px-10 py-5 text-rose-500 font-bold tracking-widest uppercase hover:scale-105 transition-all shadow-xl hover:shadow-rose-300/50"
          >
            Start the Journey ✨
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
