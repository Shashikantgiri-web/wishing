"use client";
import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import Message from './message'
import Link from 'next/link'
import UpcomingBirthdays from './upcoming_birthdays'
import AiGenerator from './ai_generator'
import ShareOptions from './share_options'

const Explore = () => {
  const { user } = useUser()
  const [celebrants, setCelebrants] = useState([])
  const [upcomingCelebrants, setUpcomingCelebrants] = useState([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users')
        const data = await res.json()
        if (data.success) {
          const now = new Date();
          const todayStr = now.toISOString().slice(5, 10); // MM-DD
          
          // Today's Birthdays
          const todayBirthdays = data.users.filter(u => u.dob?.slice(5, 10) === todayStr);
          setCelebrants(todayBirthdays);

          // Upcoming Birthdays (next 3-5)
          // Sort remaining users by MM-DD
          const others = data.users.filter(u => u.dob?.slice(5, 10) !== todayStr);
          const sortedOthers = others.sort((a, b) => {
             const dA = a.dob?.slice(5, 10) || "";
             const dB = b.dob?.slice(5, 10) || "";
             return dA.localeCompare(dB);
          });

          // Find first index where date > todayStr
          const nextIndex = sortedOthers.findIndex(u => (u.dob?.slice(5, 10) || "") > todayStr);
          
          let upcoming;
          if (nextIndex === -1) {
            // All birthdays happened earlier this year, so next ones are at start of next year
            upcoming = sortedOthers.slice(0, 4);
          } else {
            upcoming = sortedOthers.slice(nextIndex, nextIndex + 4);
            // If we have fewer than 4, wrap around to start of year
            if (upcoming.length < 4) {
               upcoming = [...upcoming, ...sortedOthers.slice(0, 4 - upcoming.length)];
            }
          }
          setUpcomingCelebrants(upcoming);
        }
      } catch (err) {
        console.error("Failed to fetch users:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleSendWish = async (targetUser, message) => {
    if (!message.trim()) return

    setSending(true)
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
      })
      const data = await res.json()
      if (data.success) {
        alert(`Wish sent to ${targetUser.firstname}! ✨`)
      } else {
        alert("Failed to send wish.")
      }
    } catch (err) {
      console.error(err)
      alert("Error sending wish.")
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="w-full flex justify-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-24 px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
        <div>
          <h2 className="text-5xl font-black text-white mb-4 tracking-tight">
             {celebrants.length > 0 ? "Today's Stars" : "Explore Celebrations"}
          </h2>
          <p className="text-slate-400 text-lg">
             {celebrants.length > 0 
               ? "Someone special is celebrating today. Send them a wish!" 
               : "Join the party and keep the celebration spirit alive."}
          </p>
        </div>
      </div>

      {celebrants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {celebrants.map((u) => (
            <Message key={u.email} data={u} onSendWish={handleSendWish} />
          ))}
        </div>
      ) : (
        <div className="space-y-12 animate-in fade-in duration-1000">
             {/* New Modular Empty State Layout */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <UpcomingBirthdays users={upcomingCelebrants} />
                <AiGenerator />
                <ShareOptions />
             </div>

             <div className="w-full py-16 bg-white/5 border border-white/10 rounded-[3rem] text-center px-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/5 text-3xl shadow-2xl group-hover:scale-110 transition-transform">
                        🎂
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Want your own birthday celebration page?</h3>
                    <p className="text-slate-400 max-w-md mx-auto mb-8">
                        Setup your birthday details and let your friends surprise you with amazing 3D avatars and heartfelt wishes.
                    </p>
                    <Link 
                        href="/" 
                        className="inline-block px-10 py-4 rounded-full bg-white text-slate-950 font-black hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
                    >
                        Setup My Birthday Page
                    </Link>
                </div>
             </div>
        </div>
      )}
    </div>
  )
}

export default Explore
