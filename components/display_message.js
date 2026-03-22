import React from 'react'

const DisplayMessage = () => {
  const messages = [
    { from: "Mom", text: "Happy birthday to my wonderful child! May your day be as special as you are." },
    { from: "Dad", text: "Wishing you a fantastic year ahead full of joy and success!" },
    { from: "Best Friend", text: "Let's party! Can't wait to celebrate with you tonight! 🎈" }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold mb-12 text-center text-white">Wishes for You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages.map((m, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all group">
            <span className="text-purple-400 font-bold block mb-2">{m.from}</span>
            <p className="text-slate-300 leading-relaxed italic">{m.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DisplayMessage