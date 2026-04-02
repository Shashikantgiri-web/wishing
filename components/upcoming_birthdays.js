import React from 'react';
import Link from 'next/link';

const UpcomingBirthdays = ({ users }) => {
  return (
    <div className="glass-card p-10 h-full flex flex-col shadow-xl">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-2xl shadow-inner border border-white/50">
          📅
        </div>
        <h3 className="text-2xl font-black text-rose-900 tracking-tight">Upcoming</h3>
      </div>

      <div className="space-y-6 flex-1">
        {users.length > 0 ? (
          users.map((u, i) => (
            <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/30 hover:bg-white/50 transition-all group border border-white/20 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-200 to-pink-200 flex items-center justify-center font-black text-rose-700 text-sm border-2 border-white group-hover:from-rose-400 group-hover:to-pink-400 group-hover:text-white transition-all shadow-md">
                  {u.firstname?.[0] || "U"}
                </div>
                <div>
                  <p className="text-base font-black text-rose-900 group-hover:text-rose-600 transition-colors tracking-tight">
                    {u.firstname} {u.lastname}
                  </p>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{u.dob}</p>
                </div>
              </div>
              <div className="text-[10px] font-black px-4 py-1.5 rounded-full bg-white/60 text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-all uppercase tracking-widest shadow-sm">
                Soon
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white/10 rounded-2xl border border-dashed border-rose-200">
            <p className="text-slate-500 font-medium">No celebrations soon.</p>
          </div>
        )}
      </div>

      <Link 
        href="/" 
        className="mt-10 py-4 text-center text-xs font-black text-rose-500 hover:text-rose-700 transition-all uppercase tracking-[0.3em] block glass-card bg-white/30 hover:bg-white/50 border-white/40 shadow-sm"
      >
        View All Friends →
      </Link>
    </div>
  );
};

export default UpcomingBirthdays;

