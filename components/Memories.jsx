'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const Memories = ({ memories = [] }) => {
  const containerRef = useRef(null);

  // Default images if no personalized memories are provided
  const defaultImages = [
    { url: 'https://images.unsplash.com/photo-1530103862676-fa8c91bbe349?q=80&w=400&h=500&auto=format&fit=crop', caption: 'Magic times' },
    { url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=400&h=300&auto=format&fit=crop', caption: 'Best laughs' },
    { url: 'https://images.unsplash.com/photo-1514525253361-b83f859b73c0?q=80&w=400&h=600&auto=format&fit=crop', caption: 'Unforgettable' },
    { url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=400&h=400&auto=format&fit=crop', caption: 'Perfect day' },
    { url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=400&h=500&auto=format&fit=crop', caption: 'Forever' },
    { url: 'https://images.unsplash.com/photo-1533294160622-d5fece7e3604?q=80&w=400&h=350&auto=format&fit=crop', caption: 'Heartbeat' },
  ];

  const displayMemories = memories.length > 0 ? memories : defaultImages;

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll('.memory-card');
    
    // Polaroid Drop Animation (Bounce effect as they fall into place)
    gsap.fromTo(cards, 
      { 
        opacity: 0, 
        y: -100, 
        rotation: (i) => i % 2 === 0 ? 15 : -15 
      },
      {
        opacity: 1,
        y: 0,
        rotation: (i) => i % 2 === 0 ? 3 : -3,
        duration: 1.2,
        stagger: 0.3,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );

    // Subtle floating idle animation
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: "+=15",
        x: "+=10",
        rotation: i % 2 === 0 ? "+=2" : "-=2",
        duration: Math.random() * 3 + 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.5,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [displayMemories]);

  return (
    <section className="py-24 px-6 md:px-20 relative z-10 overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-4xl md:text-5xl font-bold text-rose-800 mb-16 text-center tracking-tight">
          Floating Memories 🎞️
        </h3>
        <div ref={containerRef} className="columns-1 sm:columns-2 md:columns-3 gap-10 space-y-10">
          {displayMemories.map((memory, i) => (
            <div 
              key={i} 
              className="memory-card relative break-inside-avoid group cursor-pointer"
            >
              <div className="glass-card p-4 shadow-2xl transition-all duration-500 group-hover:scale-[1.03] group-hover:-rotate-1 hover:shadow-rose-200/50 bg-white">
                <div className="relative overflow-hidden rounded-sm border-8 border-white shadow-inner">
                  <Image 
                    src={memory.url} 
                    alt={`Memory ${i}`} 
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="mt-6 text-slate-500 font-handwriting text-xl text-center italic drop-shadow-sm pb-2">
                  {memory.caption}
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

