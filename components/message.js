import React from 'react'

const Message = ({ data, onSendWish }) => {
  return (
    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all hover:translate-y-[-6px] group relative overflow-hidden shadow-2xl shadow-purple-500/5">
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-600/10 to-transparent blur-3xl group-hover:from-purple-600/20 transition-all"></div>
      
      <div className="flex items-center gap-5 mb-6 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-xl rotate-3 group-hover:rotate-0 transition-all">
          <span className="text-xl">{data?.firstname?.[0] || data?.name?.[0] || "U"}</span>
        </div>
        <div>
          <h4 className="text-lg font-black text-white group-hover:text-purple-400 transition-colors">
            {data?.firstname ? `${data.firstname} ${data.lastname}` : (data?.name || "Anonymous")}
          </h4>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Live Celebration</p>
          </div>
        </div>
      </div>

      <p className="text-slate-300 leading-relaxed font-medium mb-8 relative z-10 line-clamp-3 italic">
        {data?.msg || "Sending love and best wishes on this special day! Hope your year is as bright as your smile."}
      </p>
      
      <div className="flex items-center justify-between gap-4 text-slate-500 relative z-10 border-t border-white/5 pt-6">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 hover:text-pink-500 transition-all hover:scale-110 active:scale-90">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span className="text-xs font-black">42</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-purple-500 transition-all hover:scale-110 active:scale-90">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            <span className="text-xs font-black">18</span>
          </button>
        </div>
        
        {onSendWish && (
          <button 
            onClick={() => onSendWish(data)}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-black transition-all shadow-lg shadow-purple-500/20 active:scale-95"
          >
            Send Wish ✨
          </button>
        )}
      </div>
    </div>
  )
}

export default Message