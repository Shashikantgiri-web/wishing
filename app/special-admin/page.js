"use client";
import { useState, useEffect } from 'react';
import BirthdayNav from '@/components/birthday_nav';
import Footer from '@/components/footer';

export default function VIPAdmin() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [avatar3D, setAvatar3D] = useState("");
  const [animationVideo, setAnimationVideo] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [vipUsers, setVipUsers] = useState([]);

  const fetchVipUsers = async () => {
    try {
      const res = await fetch('/api/special-users');
      const data = await res.json();
      if (data.success) setVipUsers(data.users);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVipUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch('/api/special-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, dob, avatar3D, animationVideo })
      });
      const data = await res.json();
      if (data.success) {
        setMessage("✅ Success: " + data.message);
        fetchVipUsers();
        // Reset form
        setEmail(""); setName(""); setDob(""); setAvatar3D(""); setAnimationVideo("");
      } else {
        setMessage("❌ Error: " + data.message);
      }
    } catch (err) {
      setMessage("❌ Failed to contact API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <BirthdayNav />
      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Form Section */}
          <div className="glass-card p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/10 rounded-full blur-3xl -mr-10 -mt-10" />
            
            <h1 className="text-4xl font-black text-rose-600 mb-8 tracking-tight glow-text relative z-10">VIP User Manager</h1>
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">VIP Email (Identifier)</label>
                <input 
                  className="w-full bg-white/40 border border-white/60 rounded-xl px-5 py-3 focus:ring-2 focus:ring-rose-400 outline-none text-slate-800 font-bold shadow-sm"
                  type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="vip@example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Full Name</label>
                    <input 
                    className="w-full bg-white/40 border border-white/60 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-400 text-slate-800 shadow-sm"
                    type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Birth Date</label>
                    <input 
                    className="w-full bg-white/40 border border-white/60 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-400 text-slate-800 shadow-sm"
                    type="date" value={dob} onChange={e => setDob(e.target.value)} required
                    />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">3D Avatar URL (.glb)</label>
                <input 
                  className="w-full bg-white/40 border border-white/60 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-rose-400 text-slate-800 shadow-sm"
                  type="url" value={avatar3D} onChange={e => setAvatar3D(e.target.value)} placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Animation Video URL (.mp4)</label>
                <input 
                  className="w-full bg-white/40 border border-white/60 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-rose-400 text-slate-800 shadow-sm"
                  type="url" value={animationVideo} onChange={e => setAnimationVideo(e.target.value)} placeholder="https://..."
                />
              </div>

              {message && <p className={`p-4 rounded-xl font-bold text-center ${message.includes('Success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</p>}

              <button 
                type="submit" disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black rounded-xl shadow-xl shadow-rose-200/50 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 uppercase tracking-widest"
              >
                {loading ? "Syncing Database..." : "Register VIP User ✨"}
              </button>
            </form>
          </div>

          {/* List Section */}
          <div className="glass-card p-10 shadow-lg flex flex-col h-full">
            <h2 className="text-2xl font-black text-rose-900 mb-8 border-b border-rose-100 pb-4 uppercase tracking-tighter">Current VIP Database</h2>
            <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom_scroll">
                {vipUsers.map(u => (
                    <div key={u.email} className="p-5 rounded-2xl bg-white/30 border border-white/50 hover:bg-white/60 transition-all hover:translate-x-2 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                             👑
                        </div>
                        <p className="font-black text-rose-900 tracking-tight text-lg leading-none mb-1">{u.name}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{u.email}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                             <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-500 text-[10px] font-black uppercase tracking-widest border border-rose-100">🎂 {u.dob}</span>
                             {u.avatar3D && <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-500 text-[10px] font-black uppercase tracking-widest border border-blue-100">🧍 3D Ready</span>}
                             {u.animationVideo && <span className="px-3 py-1 rounded-full bg-green-50 text-green-500 text-[10px] font-black uppercase tracking-widest border border-green-100">🎥 Video Active</span>}
                        </div>
                    </div>
                ))}
                {vipUsers.length === 0 && (
                    <div className="text-center py-20 flex flex-col items-center">
                        <div className="text-4xl mb-4 grayscale">🗂️</div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Database is Currently Empty</p>
                    </div>
                )}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
