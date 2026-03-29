import React from 'react'
import Link from 'next/link'

const UpcomingBirthdays = ({ users }) => {
  return (
    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl h-full flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-xl">
          📅
        </div>
        <h3 className="text-xl font-black text-white">Upcoming Birthdays</h3>
      </div>

      <div className="space-y-4 flex-1">
        {users.length > 0 ? (
          users.map((u, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 flex items-center justify-center font-bold text-white text-sm border border-white/5 group-hover:from-purple-500 group-hover:to-pink-500 transition-all">
                  {u.firstname?.[0] || "U"}
                </div>
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                    {u.firstname} {u.lastname}
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{u.dob}</p>
                </div>
              </div>
              <div className="text-[10px] font-black px-3 py-1 rounded-full bg-white/5 text-slate-400 group-hover:text-white transition-colors uppercase">
                Soon
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-500 text-sm">No upcoming birthdays found.</p>
          </div>
        )}
      </div>

      <Link 
        href="/" 
        className="mt-8 text-center text-xs font-black text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-widest block"
      >
        View All Friends →
      </Link>
    </div>
  )
}

export default UpcomingBirthdays
