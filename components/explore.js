"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Message from './message';
import Link from 'next/link';
import UpcomingBirthdays from './upcoming_birthdays';
import AiGenerator from './ai_generator';
import ShareOptions from './share_options';

const Explore = () => {
  const { user } = useUser();
  const [celebrants, setCelebrants] = useState([]);
  const [upcomingCelebrants, setUpcomingCelebrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        if (data.success) {
          const now = new Date();
          const todayStr = now.toISOString().slice(5, 10); // MM-DD
          
          // Today's Birthdays
          const todayBirthdays = data.users.filter(u => u.dob?.slice(5, 10) === todayStr);
          setCelebrants(todayBirthdays);

          // Upcoming Birthdays (next 3-5)
          const others = data.users.filter(u => u.dob?.slice(5, 10) !== todayStr);
          const sortedOthers = others.sort((a, b) => {
             const dA = a.dob?.slice(5, 10) || "";
             const dB = b.dob?.slice(5, 10) || "";
             return dA.localeCompare(dB);
          });

          const nextIndex = sortedOthers.findIndex(u => (u.dob?.slice(5, 10) || "") > todayStr);
          
          let upcoming;
          if (nextIndex === -1) {
            upcoming = sortedOthers.slice(0, 4);
          } else {
            upcoming = sortedOthers.slice(nextIndex, nextIndex + 4);
            if (upcoming.length < 4) {
               upcoming = [...upcoming, ...sortedOthers.slice(0, 4 - upcoming.length)];
            }
          }
          setUpcomingCelebrants(upcoming);
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSendWish = async (targetUser, message) => {
    if (!message.trim()) return;

    setSending(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: user?.emailAddresses[0]?.emailAddress || "anonymous@example.com",
          fromName: user?.firstName ? `${user.firstName} ${user.lastName}` : "Anonymous Friend",
          receiver: targetUser.email,
          message: message
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(`Wish sent to ${targetUser.firstname}! ✨`);
      } else {
        alert("Failed to send wish.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending wish.");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-24 px-6 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="space-y-4">
          <h2 className="text-5xl md:text-6xl font-black text-rose-900 tracking-tight glow-text leading-none">
             {celebrants.length > 0 ? "Today's Stars 🌟" : "Explore Moments ✨"}
          </h2>
          <p className="text-slate-600 text-xl font-medium max-w-xl">
             {celebrants.length > 0 
               ? "Someone special is celebrating today. Send them a touch of magic!" 
               : "Discover upcoming celebrations and keep the joy alive."}
          </p>
        </div>
      </div>

      {celebrants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {celebrants.map((u) => (
            <Message key={u.email} data={u} onSendWish={handleSendWish} />
          ))}
        </div>
      ) : (
        <div className="space-y-16">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <UpcomingBirthdays users={upcomingCelebrants} />
                <AiGenerator />
                <ShareOptions />
             </div>

             <div className="w-full py-20 glass-card border-dashed bg-rose-50/20 text-center px-10 relative overflow-hidden group shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-200/10 to-pink-200/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
                        <span className="text-4xl">🎂</span>
                    </div>
                    <h3 className="text-3xl font-black text-rose-900 mb-4 tracking-tight">Create Your Moment</h3>
                    <p className="text-slate-600 max-w-lg mx-auto mb-10 text-lg font-medium leading-relaxed">
                        Ready for your own celebration? Setup your page and let your inner circle shower you with love and magic.
                    </p>
                    <Link 
                        href="/" 
                        className="inline-block px-12 py-5 rounded-full bg-rose-500 text-white font-black hover:bg-rose-600 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-rose-200/50 uppercase tracking-widest text-sm"
                    >
                        Setup My Magic Page
                    </Link>
                </div>
             </div>
        </div>
      )}
    </div>
  );
};

export default Explore;

