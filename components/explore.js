"use client";
import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import Message from './message'

const Explore = () => {
  const { user } = useUser()
  const [celebrants, setCelebrants] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)
  const [wishMessage, setWishMessage] = useState("")
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users')
        const data = await res.json()
        if (data.success) {
          setCelebrants(data.users)
        }
      } catch (err) {
        console.error("Failed to fetch users:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleSendWish = async (e) => {
    e.preventDefault()
    if (!wishMessage.trim()) return

    setSending(true)
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromEmail: user?.emailAddresses[0]?.emailAddress || "anonymous@example.com",
          fromName: user?.firstName ? `${user.firstName} ${user.lastName}` : "Anonymous Friend",
          toEmail: selectedUser.email,
          message: wishMessage
        })
      })
      const data = await res.json()
      if (data.success) {
        alert(`Wish sent to ${selectedUser.firstname}!`)
        setSelectedUser(null)
        setWishMessage("")
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
    <div className="w-full max-w-5xl mx-auto py-24 px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-black text-white mb-2">Explore Celebrations</h2>
          <p className="text-slate-400">Join the party and send your best wishes to today's stars.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {celebrants.length > 0 ? (
          celebrants.map((u) => (
            <Message key={u.email} data={u} onSendWish={setSelectedUser} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white/5 border border-white/10 rounded-3xl">
            <p className="text-slate-400">No one is celebrating today. Be the first!</p>
          </div>
        )}
      </div>

      {/* Message Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Send a Wish to {selectedUser.firstname}</h3>
            <form onSubmit={handleSendWish} className="space-y-6">
              <textarea
                className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                placeholder="Write your birthday wish here..."
                value={wishMessage}
                onChange={(e) => setWishMessage(e.target.value)}
                required
              />
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 px-6 py-3 rounded-xl border border-white/10 text-slate-400 hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
                >
                  {sending ? "Sending..." : "Send Wish ✨"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Explore
