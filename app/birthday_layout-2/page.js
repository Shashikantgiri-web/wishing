'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BirthdayNav from '@/components/birthday_nav';
import Hero from '@/components/Hero';
import MessageSection from '@/components/MessageSection';
import Surprise from '@/components/Surprise';
import Footer from '@/components/footer';
import DisplayMessage from '@/components/display_message';
import Video from '@/components/video';
import Avatar3D from '@/components/avatar3d';
import Memories from '@/components/Memories';

gsap.registerPlugin(ScrollTrigger);

const BirthdayPage2 = () => {
  const { user, isLoaded } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const mainRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoaded && user) {
        try {
          const email = user.emailAddresses[0]?.emailAddress;
          
          // Fetch from both sources
          const [userRes, specialRes] = await Promise.all([
            fetch(`/api/check-user?email=${email}`),
            fetch(`/api/special-users`)
          ]);

          const userData = await userRes.json();
          const specialData = await specialRes.json();

          let finalData = {};
          if (userData.success && userData.exists) {
            finalData = { ...userData.user };
          }

          if (specialData.success && specialData.users) {
            const specialEntry = specialData.users.find(u => u.email === email);
            if (specialEntry) {
              finalData = { ...finalData, ...specialEntry };
            }
          }

          setUserData(finalData);
          
          // Access Gating Logic
          const today = new Date();
          const todayMMDD = today.toISOString().slice(5, 10);
          const dobMMDD = finalData.dob ? finalData.dob.slice(5, 10) : "";

          if (dobMMDD !== todayMMDD) {
            router.push("/normal_layout-3");
          } else {
            const isSpecial = specialData.users?.some(u => u.email === email);
            if (!isSpecial) {
              router.push("/birthday_layout-1");
            } else {
              setChecking(false);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setChecking(false);
        } finally {
          setLoading(false);
        }
      } else if (isLoaded && !user) {
        router.push("/");
      }
    };
    fetchUserData();
  }, [isLoaded, user, router]);

  useEffect(() => {
    if (!loading && !checking) {
      const sections = mainRef.current.querySelectorAll('section');
      sections.forEach((section) => {
        gsap.fromTo(section, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [loading, checking]);

  if (!isLoaded || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-rose-50/30">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  const name = user ? user.firstName : 'Celebrant';

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-transparent">
      {/* Premium Background Effects */}
      {/* Premium Background Effects handled by Root Layout */}
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-rose-100/20 rounded-full blur-[64px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-purple-100/15 rounded-full blur-[64px]" />
      </div>

      <BirthdayNav />
      
      <main ref={mainRef} className="relative z-10 pt-10">
        <Hero name={name} />
        
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-32">
          
          {/* Special 3D Avatar Section
          {userData?.avatar3D && (
            <section className="space-y-8 text-center scroll-mt-24" id="avatar-3d">
              <div className="inline-block px-6 py-2 bg-rose-50 rounded-full text-rose-500 font-black tracking-widest uppercase text-xs mb-4 shadow-sm">
                Premium 3D Experience
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight glow-text px-4">
                Your Birthday Avatar
              </h2>
              <div className="glass-card p-4 md:p-8 rounded-[40px] shadow-2xl bg-white/40">
                <Avatar3D src={userData.avatar3D} />
              </div>
              <p className="max-w-2xl mx-auto text-slate-500 font-medium text-lg leading-relaxed antialiased">
                Explore your personalized 3D twin, crafted specifically for this milestone birthday!
              </p>
            </section>
          )} */}

          {/* Special Video Message Section */}
          {userData?.animationVideo && (
            <section className="space-y-8 text-center scroll-mt-24" id="video-message">
              <div className="inline-block px-6 py-2 bg-purple-50 rounded-full text-purple-500 font-black tracking-widest uppercase text-xs mb-4 shadow-sm">
                Magical Moments
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight glow-text px-4">
                Birthday Cinematic
              </h2>
              <div className="glass-card p-2 md:p-4 rounded-[30px] shadow-2xl bg-white/40 overflow-hidden">
                <Video url={userData.animationVideo} />
              </div>
              <p className="max-w-2xl mx-auto text-slate-500 font-medium text-lg leading-relaxed antialiased">
                A special cinematic experience curated just for you. Sit back and enjoy the magic!
              </p>
            </section>
          )}

          <MessageSection message={`To ${name}, wishing you a day that's as beautiful and unique as you are!`} />
          
          {/* Polaroid Memories Section */}
          <Memories memories={userData?.memories || []} />

          <DisplayMessage />
          
          <Surprise />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BirthdayPage2;

