import React from 'react';

const Avatar3D = ({ src }) => {
  return (
    <div className="w-full max-w-2xl mx-auto my-12 p-1 bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600 rounded-[2.5rem] shadow-2xl shadow-rose-500/20 transform hover:scale-[1.02] transition-all duration-700">
      <div className="relative aspect-square bg-slate-900 rounded-[2.4rem] overflow-hidden group border-4 border-white/10 backdrop-blur-3xl">
        {src ? (
          /* Placeholder for 3D Viewer (e.g. model-viewer or spline) */
          <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
             {/* Animated background inside the viewer */}
             <div className="absolute inset-0 bg-gradient-to-b from-rose-500/10 to-transparent animate-pulse" />
             
             {/* Text indicating 3D content */}
             <div className="relative z-10 flex flex-col items-center">
                <div className="w-32 h-32 mb-6 relative animate-bounce-slow">
                    <div className="absolute inset-0 bg-rose-400/20 rounded-full blur-2xl group-hover:bg-rose-400/40 transition-colors" />
                    <svg className="w-full h-full text-white drop-shadow-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                </div>
                <h3 className="text-white text-2xl font-black tracking-tighter mb-2 glow-text">Premium 3D Avatar</h3>
                <p className="text-rose-200/60 text-sm font-bold uppercase tracking-widest px-6 py-2 bg-white/5 rounded-full backdrop-blur-md border border-white/10">Loading Magical Model...</p>
             </div>

             {/* Model details indicator */}
             <div className="absolute bottom-6 right-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                    <span className="text-[10px] text-white/40 font-black tracking-[0.2em] uppercase">Interactive VR Ready</span>
                 </div>
             </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 p-12 text-center">
             <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
             </div>
             <p className="text-sm font-black text-rose-300/40 tracking-widest uppercase">No Avatar Set</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Avatar3D;
