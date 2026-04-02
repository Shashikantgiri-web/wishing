import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const BirthdayNav = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/40 backdrop-blur-xl border-b border-white/60 px-6 py-4 flex justify-between items-center shadow-sm">
      <Link href="/" className="text-2xl font-black bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent glow-text tracking-tighter">
        Wishing
      </Link>
      <div className="flex items-center gap-8 text-sm font-black text-slate-600 uppercase tracking-widest">
        <Link href="/" className="hover:text-rose-500 transition-colors">Home</Link>
        <UserButton />
      </div>
    </nav>
  )
}

export default BirthdayNav