'use client';
import React from 'react';
import { useUser } from '@clerk/nextjs';
import BirthdayNav from '@/components/birthday_nav';
import Hero from '@/components/Hero';
import MessageSection from '@/components/MessageSection';
import Surprise from '@/components/Surprise';
import Footer from '@/components/footer';
import DisplayMessage from '@/components/display_message';

const BirthdayPage2 = () => {
  const { user, isLoaded } = useUser();
  const name = isLoaded && user ? user.firstName : 'Celebrant';

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      <BirthdayNav />
      <main className="pt-10">
        <Hero name={name} />
        
        {/* Video Placeholder Section with Glassmorphism */}
        <section className="py-24 px-6 relative z-10 flex flex-col items-center">
            <div className="w-full max-w-5xl glass-card aspect-video overflow-hidden shadow-2xl relative group p-4">
                <div className="w-full h-full bg-rose-50 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-rose-100 to-transparent opacity-50" />
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl mb-6 cursor-pointer hover:scale-110 transition-transform">
                             <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-rose-500 border-b-[12px] border-b-transparent ml-1" />
                        </div>
                        <p className="text-rose-900/40 text-sm font-black tracking-widest uppercase">Watch Birthday Special</p>
                    </div>
                </div>
            </div>
            <p className="mt-8 text-rose-900 font-black tracking-tighter text-2xl glow-text">Press play for magic! ✨</p>
        </section>

        <MessageSection message={`To ${name}, wishing you a day that's as beautiful and unique as you are!`} />
        
        <DisplayMessage />
        
        <Surprise />
      </main>
      <Footer />
    </div>
  );
};

export default BirthdayPage2;

