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
    <div className="w-full max-w-4xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold mb-12 text-center text-white">Wishes for You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages.length > 0 ? (
          messages.map((m, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all group">
              <span className="text-purple-400 font-bold block mb-2">{m.fromName}</span>
              <p className="text-slate-300 leading-relaxed italic">{m.text}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-slate-400">No wishes yet. Share your birthday page to get some love!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DisplayMessage