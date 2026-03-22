import React from 'react'
import Message from './message'

const Explore = () => {
  const fakeData = [
    { name: "Alice", date: "Today", msg: "Celebrating 22 years of magic! ✨" },
    { name: "Bob", date: "Yesterday", msg: "Level 25 unlocked! 🎮" },
    { name: "Charlie", date: "2 days ago", msg: "Graced with another year. 🎂" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-24 px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-black text-white mb-2">Explore Celebrations</h2>
          <p className="text-slate-400">See how others are celebrating their special day.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-300 hover:bg-white/10 transition-colors">LATEST</button>
          <button className="px-4 py-2 rounded-lg bg-purple-600/20 border border-purple-500/30 text-xs font-bold text-purple-400">TRENDING</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {fakeData.map((d, i) => (
          <Message key={i} data={d} />
        ))}
      </div>
    </div>
  )
}

export default Explore
