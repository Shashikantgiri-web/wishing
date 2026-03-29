import React, { useState } from 'react'

const AiGenerator = () => {
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [generatedWish, setGeneratedWish] = useState("")

    const handleGenerate = () => {
        if (!name.trim()) return
        setLoading(true)
        // Simulate AI generation
        setTimeout(() => {
            const templates = [
                `Happy Birthday, ${name}! May your day be filled with joy and surprises!`,
                `Wishing you a fantastic year ahead, ${name}. Keep shining!`,
                `Cheers to another year of brilliance, ${name}. Have the best birthday!`,
                `To the coolest person I know, ${name}, happy birthday!`,
                `May all your dreams come true this year, ${name}. Happy birthday!`
            ]
            const random = templates[Math.floor(Math.random() * templates.length)]
            setGeneratedWish(random)
            setLoading(false)
        }, 1500)
    }

    return (
        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-white/10 backdrop-blur-xl h-full flex flex-col relative overflow-hidden group shadow-2xl shadow-purple-500/10">
            {/* Background dynamic glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-[80px] group-hover:bg-purple-500/30 transition-all duration-700"></div>

            <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl">
                    ✨
                </div>
                <h3 className="text-xl font-black text-white">AI Wish Generator</h3>
            </div>

            <div className="space-y-6 flex-1 relative z-10">
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Friend&apos;s Name</label>
                    <input 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-slate-600 font-bold"
                        placeholder="Who are we celebrating?"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {generatedWish && (
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/5 animate-in fade-in slide-in-from-bottom-2 duration-500 shadow-inner">
                        <p className="text-sm font-medium text-slate-300 italic leading-relaxed font-modern">
                           &quot;{generatedWish}&quot;
                        </p>
                    </div>
                )}
            </div>

            <button 
                onClick={handleGenerate}
                disabled={loading}
                className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-purple-600/20 disabled:opacity-50 relative z-10 overflow-hidden"
            >
                <div className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            <span>Generating Magic...</span>
                        </>
                    ) : (
                        <>
                             <span>✨ Generate with AI</span>
                        </>
                    )}
                </div>
            </button>
        </div>
    )
}

export default AiGenerator
