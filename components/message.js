import React from 'react';

const Message = ({ data, onSendWish }) => {
  const [message, setMessage] = React.useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSendWish(data, message);
    setMessage("");
  };

  return (
    <div className="group glass-card p-10 hover:shadow-rose-100/50 transition-all hover:-translate-y-2 relative overflow-hidden flex flex-col h-full shadow-xl">
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-400/10 rounded-full blur-3xl group-hover:bg-rose-400/20 transition-all"></div>
      
      <div className="flex items-center gap-5 mb-8 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-400 to-pink-500 flex items-center justify-center font-black text-white shadow-lg rotate-3 group-hover:rotate-0 transition-all text-xl uppercase">
          {data?.firstname?.[0] || data?.name?.[0] || "U"}
        </div>
        <div>
          <h4 className="text-xl font-black text-rose-900 group-hover:text-rose-600 transition-colors tracking-tight">
            {data?.firstname ? `${data.firstname} ${data.lastname}` : (data?.name || "Anonymous")}
          </h4>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <p className="text-xs font-black text-rose-400 tracking-widest uppercase">Live Celebration</p>
          </div>
        </div>
      </div>

      <p className="text-slate-700 leading-relaxed font-medium mb-10 relative z-10 italic flex-grow">
        {data?.msg || "Sending love and best wishes on this special day! Hope your year is as bright as your smile."}
      </p>

      {/* Inline Message Input */}
      {onSendWish && (
          <div className="mb-8 relative z-10 space-y-4">
              <input 
                type="text"
                placeholder={`Wish ${data?.firstname || 'them'}...`} 
                className="w-full bg-white/40 border border-white/60 rounded-xl px-5 py-4 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all placeholder:text-slate-400 shadow-sm"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button 
                onClick={handleSend}
                disabled={!message.trim()}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-rose-200/40 disabled:opacity-30 disabled:grayscale"
              >
                Send Birthday Wish ✨
              </button>
          </div>
      )}
      
      <div className="flex items-center justify-between gap-4 text-slate-400 relative z-10 border-t border-rose-200/20 pt-6 mt-auto">
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-2 hover:text-rose-500 transition-all hover:scale-110 active:scale-90">
            <svg className="w-5 h-5 fill-rose-100 stroke-rose-400" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span className="text-xs font-black">42</span>
          </button>
          <button className="flex items-center gap-2 hover:text-rose-500 transition-all hover:scale-110 active:scale-90">
            <svg className="w-5 h-5 fill-rose-50 stroke-rose-300" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            <span className="text-xs font-black">18</span>
          </button>
        </div>
        
        <div className="text-[10px] font-black uppercase tracking-widest text-rose-300">
            Celebration
        </div>
      </div>
    </div>
  );
}

export default Message;