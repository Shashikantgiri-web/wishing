'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MessageSection = React.memo(({ message = "To the one who makes every day brighter, happy birthday! You're not just a year older, but a year better, stronger, and more amazing. Keep shining!" }) => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    
    // Icon animation
    gsap.fromTo(iconRef.current, 
      { scale: 0, rotation: -45 },
      { 
        scale: 1, 
        rotation: 0, 
        duration: 1.5, 
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        }
      }
    );

    // Text animation (line by line effect using words/chunks)
    const words = message.split(' ');
    textRef.current.innerHTML = words.map(word => `<span class="inline-block opacity-0 translate-y-4" style="will-change: transform, opacity;">${word}&nbsp;</span>`).join('');
    
    const spans = textRef.current.querySelectorAll('span');
    
    gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 70%",
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [message]);

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-20 relative z-10 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="glass-card max-w-4xl w-full p-11 md:p-20 text-center space-y-10 shadow-2xl hover:shadow-rose-100/40 transition-shadow">
        <div ref={iconRef} style={{ willChange: 'transform, opacity' }} className="w-24 h-24 bg-rose-200/40 rounded-full flex items-center justify-center mx-auto mb-12 ring-8 ring-rose-100/20 shadow-lg">
          <span className="text-5xl">💌</span>
        </div>
        <h3 className="text-4xl md:text-5xl font-black text-rose-900 tracking-tighter glow-text">
          A Note from the Heart
        </h3>
        <blockquote 
          ref={textRef}
          className="text-2xl md:text-3xl text-slate-800 font-serif leading-relaxed italic antialiased drop-shadow-sm"
        >
          {message}
        </blockquote>
        <div className="pt-10 flex flex-col items-center space-y-4">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
          <p className="text-rose-600 font-black uppercase tracking-[0.3em] text-xs">
            Sent with boundless love & joy
          </p>
        </div>
      </div>
    </section>
  );
});

export default MessageSection;


