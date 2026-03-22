import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full py-12 border-t border-white/5 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Wishing. Created with ❤️ for your special moments.
        </p>
        <div className="flex gap-6 text-slate-400 text-xs uppercase tracking-widest font-semibold">
          <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Socials</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer