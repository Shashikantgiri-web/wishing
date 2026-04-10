'use client';
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import BirthdayNav from '@/components/birthday_nav';
import Hero from '@/components/Hero';
import Memories from '@/components/Memories';
import MessageSection from '@/components/MessageSection';
import Gallery from '@/components/Gallery';
import Surprise from '@/components/Surprise';
import Footer from '@/components/footer';
import DisplayMessage from '@/components/display_message';

const BirthdayPage = () => {
  console.log("Layout-1 Rendering");
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const name = isLoaded && user ? user.firstName : 'Celebrant';

  useEffect(() => {
    const checkAccess = async () => {
      if (isLoaded && user) {
        try {
          const email = user.emailAddresses[0]?.emailAddress;
          const res = await fetch(`/api/check-user?email=${email}`);
          const data = await res.json();

          if (data.success && data.exists) {
            const today = new Date();
            const todayMMDD = today.toISOString().slice(5, 10);
            const dobMMDD = data.user.dob.slice(5, 10);

            if (dobMMDD !== todayMMDD) {
              router.push("/normal_layout-3");
            } else {
                // Check if special to redirect to layout-2
                const specialRes = await fetch('/api/special-users');
                const specialData = await specialRes.json();
                const isSpecial = specialData.users?.some(u => u.email === email);
                if (isSpecial) {
                    router.push("/birthday_layout-2");
                } else {
                    setChecking(false);
                }
            }
          } else {
            router.push("/");
          }
        } catch (error) {
          console.error("Access check failed:", error);
          setChecking(false);
        }
      } else if (isLoaded && !user) {
        router.push("/");
      }
    };
    checkAccess();
  }, [isLoaded, user, router]);

  if (!isLoaded || checking) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-rose-50/30">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden">
      <BirthdayNav />
      <main>
        <Hero name={name} />
        {/* <Memories /> */}
        <MessageSection message={`To ${name}, may your day be filled with magic and your year with infinite joy!`} />
        {/* We can also keep DisplayMessage if there are communal wishes */}
        <DisplayMessage />
        {/* <Gallery /> */}
        <Surprise />
      </main>
      <Footer />
    </div>
  );
};

export default BirthdayPage;

