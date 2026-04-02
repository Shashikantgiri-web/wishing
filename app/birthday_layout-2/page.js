'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import BirthdayNav from '@/components/birthday_nav';
import Hero from '@/components/Hero';
import MessageSection from '@/components/MessageSection';
import Surprise from '@/components/Surprise';
import Footer from '@/components/footer';
import DisplayMessage from '@/components/display_message';
import Video from '@/components/video';
import Avatar3D from '@/components/avatar3d';

const BirthdayPage2 = () => {
  const { user, isLoaded } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserData();
  }, [isLoaded, user]);

  if (!isLoaded || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-rose-50/30">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  const name = user ? user.firstName : 'Celebrant';

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-white">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-100/50 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-100/30 rounded-full blur-[120px]" />
      </div>

      <BirthdayNav />
      
      <main className="relative z-10 pt-10">
        <Hero name={name} />
        
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-24">
          
          {/* Special 3D Avatar Section */}
          {userData?.avatar3D && (
            <section className="space-y-8 text-center scroll-mt-24" id="avatar-3d">
              <div className="inline-block px-6 py-2 bg-rose-50 rounded-full text-rose-500 font-black tracking-widest uppercase text-xs mb-4">
                Premium 3D Experience
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight glow-text px-4">
                Your Birthday Avatar
              </h2>
              <Avatar3D src={userData.avatar3D} />
              <p className="max-w-2xl mx-auto text-slate-500 font-medium text-lg leading-relaxed">
                Explore your personalized 3D twin, crafted specifically for this milestone birthday!
              </p>
            </section>
          )}

          {/* Special Video Message Section */}
          {userData?.animationVideo && (
            <section className="space-y-8 text-center scroll-mt-24" id="video-message">
              <div className="inline-block px-6 py-2 bg-purple-50 rounded-full text-purple-500 font-black tracking-widest uppercase text-xs mb-4">
                Magical Moments
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight glow-text px-4">
                Birthday Cinematic
              </h2>
              <Video url={userData.animationVideo} />
              <p className="max-w-2xl mx-auto text-slate-500 font-medium text-lg leading-relaxed">
                A special cinematic experience curated just for you. Sit back and enjoy the magic!
              </p>
            </section>
          )}

          <MessageSection message={`To ${name}, wishing you a day that's as beautiful and unique as you are!`} />
          
          <DisplayMessage />
          
          <Surprise />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BirthdayPage2;
