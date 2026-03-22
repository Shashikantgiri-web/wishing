import React from 'react'

const Message = ({ data, onSendWish }) => {
  return (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all hover:translate-y-[-4px] group relative overflow-hidden">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-lg">
          {data?.firstname?.[0] || data?.name?.[0] || "U"}
        </div>
        <div>
          <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors">
            {data?.firstname ? `${data.firstname} ${data.lastname}` : (data?.name || "Anonymous")}
          </h4>
          <p className="text-xs text-slate-500">{data?.dob || data?.date || "Recently"}</p>
        </div>
      </div>
      <p className="text-slate-300 leading-relaxed font-medium">
        {data?.msg || "Sending love and best wishes on this special day!"}
      </p>
      
      <div className="mt-8 flex items-center justify-between gap-4 text-slate-500">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 hover:text-pink-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            <span className="text-xs font-bold">24</span>
          </button>
          <button className="flex items-center gap-1 hover:text-purple-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            <span className="text-xs font-bold">12</span>
          </button>
        </div>
        
        {onSendWish && (
          <button 
            onClick={() => onSendWish(data)}
            className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all transform active:scale-95"
          >
            Send Wish ✨
          </button>
        )}
      </div>
    </div>
  )
}

export default Message