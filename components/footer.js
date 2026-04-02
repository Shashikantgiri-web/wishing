import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full py-16 border-t border-rose-100/20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
        <p className="text-slate-500 text-sm font-medium">
          © {new Date().getFullYear()} <span className="font-black text-rose-500">Wishing</span>. Created with ❤️ for your special moments.
        </p>
        <div className="flex gap-8 text-rose-400 text-[10px] uppercase tracking-[0.2em] font-black">
          <a href="#" className="hover:text-rose-600 transition-all hover:scale-110">Privacy</a>
          <a href="#" className="hover:text-rose-600 transition-all hover:scale-110">Terms</a>
          <a href="#" className="hover:text-rose-600 transition-all hover:scale-110">Socials</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer