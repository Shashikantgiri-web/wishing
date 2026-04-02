"use client";
import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

const DisplayMessage = () => {
  const { user, isLoaded } = useUser()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMessages = async () => {
      if (!isLoaded || !user) return

      try {
        const email = user.emailAddresses[0]?.emailAddress
        const res = await fetch(`/api/messages?toEmail=${email}`)
        const data = await res.json()
        if (data.success) {
          setMessages(data.messages)
        }
      } catch (err) {
        console.error("Failed to fetch messages:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [user, isLoaded])

  if (loading) {
    return (
      <div className="w-full flex justify-center py-12">
        <div className="animate-pulse flex space-x-4">
          <div className="w-12 h-12 bg-rose-200 rounded-full"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-rose-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-rose-200 rounded"></div>
              <div className="h-4 bg-rose-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-24 px-6 relative z-10">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-black text-rose-900 mb-6 glow-text tracking-tighter">
          Wishes for You 🎈
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto text-lg font-medium">
          A collection of heartfelt notes from those who cherish you most.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {messages.length > 0 ? (
          messages.map((m, i) => (
            <div 
              key={i} 
              className="group glass-card p-10 hover:shadow-rose-200/50 transition-all hover:-translate-y-2 relative overflow-hidden flex flex-col h-full shadow-xl"
            >
              {/* Decorative element */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-400/10 rounded-full blur-3xl group-hover:bg-rose-400/20 transition-all"></div>
              
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-400 to-pink-500 flex items-center justify-center font-black text-white shadow-lg text-xl uppercase">
                  {m.fromName?.[0] || "F"}
                </div>
                <span className="text-xl font-black text-rose-800 group-hover:text-rose-600 transition-colors tracking-tight">
                  {m.fromName}
                </span>
              </div>
              
              <p className="text-slate-700 leading-relaxed italic font-serif text-lg flex-grow relative z-10">
                &quot;{m.message || m.text}&quot;
              </p>
              
              <div className="mt-10 pt-6 border-t border-rose-200/20 flex items-center justify-between">
                <div className="flex -space-x-3">
                   <div className="w-8 h-8 rounded-full border-2 border-white glass-card flex items-center justify-center text-sm shadow-sm">❤️</div>
                   <div className="w-8 h-8 rounded-full border-2 border-white glass-card flex items-center justify-center text-sm shadow-sm">✨</div>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-rose-400 font-black">Received Today</span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-32 glass-card border-dashed bg-white/10">
            <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-rose-100/50 text-5xl shadow-inner">
              💌
            </div>
            <p className="text-rose-800 text-xl font-black tracking-tight">No wishes yet.</p>
            <p className="text-slate-500 mt-2 font-medium">Share your birthday page to start receiving love!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DisplayMessage;