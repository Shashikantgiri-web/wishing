'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Memories = () => {
  const containerRef = useRef(null);

  // High quality Unsplash images for demonstration
  const images = [
    'https://images.unsplash.com/photo-1530103862676-fa8c91bbe349?q=80&w=400&h=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=400&h=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1514525253361-b83f859b73c0?q=80&w=400&h=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=400&h=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=400&h=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533294160622-d5fece7e3604?q=80&w=400&h=350&auto=format&fit=crop',
  ];

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll('.memory-card');
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: `${Math.random() * 40 - 20}`,
        x: `${Math.random() * 20 - 10}`,
        duration: Math.random() * 4 + 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2,
      });
    });
  }, []);

  return (
    <section className="py-24 px-6 md:px-20 relative z-10 overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-4xl md:text-5xl font-bold text-rose-800 mb-16 text-center tracking-tight">
          Floating Memories 🎞️
        </h3>
        <div ref={containerRef} className="columns-1 sm:columns-2 md:columns-3 gap-10 space-y-10">
          {images.map((src, i) => (
            <div 
              key={i} 
              className="memory-card relative break-inside-avoid group cursor-pointer"
            >
              <div className="glass-card p-4 shadow-2xl transition-all duration-500 group-hover:scale-[1.03] group-hover:-rotate-1 hover:shadow-rose-200/50">
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src={src} 
                    alt={`Memory ${i}`} 
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="mt-4 text-slate-600 font-medium text-center italic drop-shadow-sm">
                  {["Magic times", "Best laughs", "Unforgettable", "Perfect day", "Forever", "Heartbeat"][i]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Memories;
