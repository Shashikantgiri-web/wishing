'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(textRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        }
      }
    );
  }, []);

  return (
    <footer ref={footerRef} className="w-full py-24 border-t border-rose-100/20 relative z-10 bg-white/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-12 text-center">
        
        <div ref={textRef} className="space-y-4 max-w-2xl">
          <h3 className="text-3xl md:text-4xl font-black text-rose-600 tracking-tight">
            The celebration continues... 🎈
          </h3>
          <p className="text-slate-600 font-medium text-lg leading-relaxed antialiased">
            Every day with you is a reason to celebrate. We hope this little surprise brought a smile to your beautiful face. Here's to many more years of magic, laughter, and love!
          </p>
        </div>

        <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />

        <div className="flex flex-col items-center gap-6">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} <span className="text-rose-500">Wishing</span>. Crafted with pure ❤️
          </p>
          <div className="flex gap-10 text-rose-300 text-[10px] uppercase tracking-[0.2em] font-black">
            <a href="#" className="hover:text-rose-500 transition-all hover:scale-110">Privacy</a>
            <a href="#" className="hover:text-rose-500 transition-all hover:scale-110">Terms</a>
            <a href="#" className="hover:text-rose-500 transition-all hover:scale-110">Socials</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;