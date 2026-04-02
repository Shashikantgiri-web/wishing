import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const NormalNav = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/40 backdrop-blur-xl border-b border-white/60 px-6 py-4 flex justify-between items-center shadow-sm">
      <Link href="/" className="text-2xl font-black bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent glow-text tracking-tighter">
        Wishing
      </Link>
      <div className="flex items-center gap-8 text-sm font-black text-slate-600 uppercase tracking-widest">
        <Link href="/normal_layout-3" className="text-rose-500 font-black border-b-2 border-rose-500 pb-1">Feed</Link>
        <Link href="/" className="hover:text-rose-500 transition-colors">Setup Birthday</Link>
        <UserButton />
      </div>
    </nav>
  )
}

export default NormalNav
