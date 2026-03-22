import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const BirthdayNav = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/50 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
        Wishing
      </Link>
      <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
        <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
        <UserButton />
      </div>
    </nav>
  )
}

export default BirthdayNav