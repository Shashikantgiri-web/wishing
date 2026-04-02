'use client';
import React, { useRef } from 'react';

const Gallery = () => {
  const scrollRef = useRef(null);

  const images = [
    'https://images.unsplash.com/photo-1521480642732-ca0db1966a3b?q=80&w=800&h=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&h=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=800&h=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533294485184-22b6441ef322?q=80&w=800&h=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1478144592103-258219070771?q=80&w=800&h=500&auto=format&fit=crop',
  ];

  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex justify-between items-end">
        <div className="space-y-4">
          <h3 className="text-4xl md:text-5xl font-black text-rose-900 tracking-tighter glow-text">
            Dream Gallery ✨
          </h3>
          <p className="text-slate-600 font-medium">Swipe to explore the magic ———&gt;</p>
        </div>
      </div>
      
      <div 
        ref={scrollRef} 
        className="flex gap-8 px-6 md:px-20 overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((src, i) => (
          <div 
            key={i} 
            className="group flex-shrink-0 w-[80vw] md:w-[600px] aspect-[4/3] glass-card p-4 shadow-2xl snap-center hover:shadow-rose-100/50 transition-all duration-700"
          >
            <div className="w-full h-full relative overflow-hidden rounded-xl">
              <img 
                src={src} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8 text-white p-4 glass-card border-white/40 shadow-lg">
                <p className="text-sm font-bold tracking-widest uppercase mb-1">Moment #{i + 1}</p>
                <h4 className="text-xl font-black">Pure Joy</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
