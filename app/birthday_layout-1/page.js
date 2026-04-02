'use client';
import React from 'react';
import { useUser } from '@clerk/nextjs';
import BirthdayNav from '@/components/birthday_nav';
import Hero from '@/components/Hero';
import Memories from '@/components/Memories';
import MessageSection from '@/components/MessageSection';
import Gallery from '@/components/Gallery';
import Surprise from '@/components/Surprise';
import Footer from '@/components/footer';
import DisplayMessage from '@/components/display_message';

const BirthdayPage = () => {
  const { user, isLoaded } = useUser();
  const name = isLoaded && user ? user.firstName : 'Celebrant';

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

