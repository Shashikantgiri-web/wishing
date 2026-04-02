import React, { useState } from 'react';

const AiGenerator = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [generatedWish, setGeneratedWish] = useState("");

    const handleGenerate = () => {
        if (!name.trim()) return;
        setLoading(true);
        // Simulate AI generation
        setTimeout(() => {
            const templates = [
                `Happy Birthday, ${name}! May your day be filled with joy and surprises!`,
                `Wishing you a fantastic year ahead, ${name}. Keep shining!`,
                `Cheers to another year of brilliance, ${name}. Have the best birthday!`,
                `To the coolest person I know, ${name}, happy birthday!`,
                `May all your dreams come true this year, ${name}. Happy birthday!`
            ];
            const random = templates[Math.floor(Math.random() * templates.length)];
            setGeneratedWish(random);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="glass-card p-10 h-full flex flex-col relative overflow-hidden group shadow-xl">
            {/* Background dynamic glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-rose-200/20 rounded-full blur-[100px] group-hover:bg-rose-200/40 transition-all duration-1000"></div>

            <div className="flex items-center gap-4 mb-10 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/50 flex items-center justify-center text-2xl shadow-inner border border-white/50">
                    ✨
                </div>
                <h3 className="text-2xl font-black text-rose-900 tracking-tight">AI Magic</h3>
            </div>

            <div className="space-y-8 flex-1 relative z-10">
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-rose-400 uppercase tracking-[0.3em] pl-1">Target Name</label>
                    <input 
                        className="w-full bg-white/40 border border-white/60 rounded-xl px-6 py-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all placeholder:text-slate-400 font-bold shadow-sm"
                        placeholder="Who is celebrating?"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {generatedWish && (
                    <div className="p-6 rounded-2xl bg-white/60 border border-white/40 animate-in fade-in slide-in-from-bottom-2 duration-700 shadow-md">
                        <p className="text-base font-medium text-slate-700 italic leading-relaxed font-serif">
                           &quot;{generatedWish}&quot;
                        </p>
                    </div>
                )}
            </div>

            <button 
                onClick={handleGenerate}
                disabled={loading}
                className="mt-10 w-full py-5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black hover:scale-[1.03] active:scale-[0.97] transition-all shadow-2xl shadow-rose-200/50 disabled:opacity-50 relative z-10 uppercase tracking-widest text-xs"
            >
                <div className="relative z-10 flex items-center justify-center gap-3">
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            <span>Brewing Magic...</span>
                        </>
                    ) : (
                        <span>✨ Generate Wish</span>
                    )}
                </div>
            </button>
        </div>
    );
};

export default AiGenerator;

