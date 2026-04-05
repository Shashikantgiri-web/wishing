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
  const [memories, setMemories] = useState([{ url: "", caption: "" }]);
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

  const handleAddMemory = () => {
    setMemories([...memories, { url: "", caption: "" }]);
  };

  const handleRemoveMemory = (index) => {
    const updatedMemories = memories.filter((_, i) => i !== index);
    setMemories(updatedMemories);
  };

  const handleMemoryChange = (index, field, value) => {
    const updatedMemories = [...memories];
    updatedMemories[index][field] = value;
    setMemories(updatedMemories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Filter out empty memories
    const validMemories = memories.filter(m => m.url.trim() !== "");

    try {
      const res = await fetch('/api/special-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            email, name, dob, avatar3D, animationVideo,
            memories: validMemories 
        })
      });
      const data = await res.json();
      if (data.success) {
        setMessage("✅ Success: " + data.message);
        fetchVipUsers();
        // Reset form
        setEmail(""); setName(""); setDob(""); setAvatar3D(""); setAnimationVideo("");
        setMemories([{ url: "", caption: "" }]);
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
    <div className="min-h-screen bg-rose-50/20">
      <BirthdayNav />
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Form Section */}
          <div className="lg:col-span-3">
            <div className="glass-card p-10 shadow-2xl relative overflow-hidden bg-white/70">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/20 rounded-full blur-3xl -mr-10 -mt-10" />
              
              <h1 className="text-4xl font-black text-rose-600 mb-8 tracking-tight glow-text relative z-10">VIP User Manager</h1>
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">VIP Email (Identifier)</label>
                    <input 
                        className="w-full bg-white/60 border border-white rounded-xl px-5 py-3 focus:ring-2 focus:ring-rose-400 outline-none text-slate-800 font-bold shadow-sm"
                        type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="vip@example.com"
                    />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Full Name</label>
                        <input 
                        className="w-full bg-white/60 border border-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-400 text-slate-800 shadow-sm"
                        type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="John Doe"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Birth Date</label>
                        <input 
                        className="w-full bg-white/60 border border-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-400 text-slate-800 shadow-sm font-bold"
                        type="date" value={dob} onChange={e => setDob(e.target.value)} required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">3D Avatar URL (.glb)</label>
                        <input 
                        className="w-full bg-white/60 border border-white rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-rose-400 text-slate-800 shadow-sm"
                        type="url" value={avatar3D} onChange={e => setAvatar3D(e.target.value)} placeholder="https://..."
                        />
                    </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Animation Video URL (.mp4)</label>
                  <input 
                    className="w-full bg-white/60 border border-white rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-rose-400 text-slate-800 shadow-sm"
                    type="url" value={animationVideo} onChange={e => setAnimationVideo(e.target.value)} placeholder="https://..."
                  />
                </div>

                {/* Memories Management */}
                <div className="pt-6 border-t border-rose-100">
                    <div className="flex items-center justify-between mb-6">
                        <label className="text-lg font-black text-rose-900 uppercase tracking-tighter">Personalized Memories</label>
                        <button 
                            type="button" onClick={handleAddMemory}
                            className="px-4 py-2 bg-rose-100 text-rose-600 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-rose-200 transition-colors"
                        >
                            + Add Image
                        </button>
                    </div>
                    
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom_scroll">
                        {memories.map((memory, index) => (
                            <div key={index} className="p-5 rounded-2xl bg-white/40 border border-white/60 relative group space-y-4">
                                <button 
                                    type="button" onClick={() => handleRemoveMemory(index)}
                                    className="absolute -top-2 -right-2 w-7 h-7 bg-white text-rose-500 rounded-full shadow-md flex items-center justify-center text-xs font-bold hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                >
                                    ✕
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Image URL</label>
                                        <input 
                                            className="w-full bg-white/80 border border-white rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-rose-300 text-sm"
                                            value={memory.url} onChange={e => handleMemoryChange(index, "url", e.target.value)} 
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Caption</label>
                                        <input 
                                            className="w-full bg-white/80 border border-white rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-rose-300 text-sm"
                                            value={memory.caption} onChange={e => handleMemoryChange(index, "caption", e.target.value)} 
                                            placeholder="Magic moments..."
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {message && <p className={`p-4 rounded-2xl font-bold text-center shadow-sm ${message.includes('Success') ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>{message}</p>}

                <button 
                  type="submit" disabled={loading}
                  className="w-full py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black rounded-2xl shadow-xl shadow-rose-200/50 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 uppercase tracking-[0.2em] text-sm mt-4"
                >
                  {loading ? "Syncing Universe..." : "Lock in VIP Status ✨"}
                </button>
              </form>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <div className="glass-card p-10 shadow-lg flex flex-col h-full bg-white/50 backdrop-blur-sm">
                <h2 className="text-2xl font-black text-rose-900 mb-8 border-b border-rose-100 pb-4 uppercase tracking-tighter">Current VIP Database</h2>
                <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom_scroll">
                    {vipUsers.map(u => (
                        <div key={u.email} className="p-5 rounded-3xl bg-white/60 border border-white hover:bg-white transition-all hover:translate-x-2 group relative shadow-sm">
                            <div className="absolute top-0 right-0 p-5 opacity-20 group-hover:opacity-100 transition-opacity">
                                👑
                            </div>
                            <p className="font-black text-rose-900 tracking-tight text-xl leading-none mb-1">{u.name}</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{u.email}</p>
                            <div className="mt-5 flex flex-wrap gap-2">
                                <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-500 text-[10px] font-black uppercase tracking-widest border border-rose-100">🎂 {u.dob}</span>
                                {u.avatar3D && <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-500 text-[10px] font-black uppercase tracking-widest border border-blue-100">🧍 3D Ready</span>}
                                {u.animationVideo && <span className="px-3 py-1 rounded-full bg-green-50 text-green-500 text-[10px] font-black uppercase tracking-widest border border-green-100">🎥 Video Active</span>}
                                {u.memories?.length > 0 && <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-500 text-[10px] font-black uppercase tracking-widest border border-purple-100">📸 {u.memories.length} Memories</span>}
                            </div>
                        </div>
                    ))}
                    {vipUsers.length === 0 && (
                        <div className="text-center py-20 flex flex-col items-center">
                            <div className="text-4xl mb-4 grayscale opacity-30">🗂️</div>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Database is Empty</p>
                        </div>
                    )}
                </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

