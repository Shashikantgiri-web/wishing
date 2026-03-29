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
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Wishes for You
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto">
          Take a moment to read the beautiful messages sent by your friends and family.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {messages.length > 0 ? (
          messages.map((m, i) => (
            <div 
              key={i} 
              className="group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-purple-500/30 transition-all hover:translate-y-[-8px] relative overflow-hidden shadow-2xl shadow-purple-500/5"
            >
              {/* Decorative element */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-600/20 transition-all"></div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-lg">
                  {m.fromName?.[0] || "F"}
                </div>
                <span className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                  {m.fromName}
                </span>
              </div>
              
              <p className="text-slate-300 leading-relaxed italic font-medium relative z-10">
                &quot;{m.message || m.text}&quot;
              </p>
              
              <div className="mt-8 flex items-center justify-between">
                <div className="flex -space-x-2">
                   <div className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] text-pink-400">❤</div>
                   <div className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] text-purple-400">✨</div>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Received Today</span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-24 bg-white/5 border border-white/10 rounded-[3rem] border-dashed">
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 border border-white/5 text-2xl">
              💌
            </div>
            <p className="text-slate-400 font-medium">No wishes yet. Share your birthday page to get some love!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DisplayMessage