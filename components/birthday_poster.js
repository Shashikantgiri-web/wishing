import React from 'react'

const BirthdayPoster = () => {
  return (
    <div className="relative w-full h-[60vh] flex flex-col justify-center items-center overflow-hidden bg-slate-950">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
      
      <div className="relative z-10 text-center space-y-4 px-4">
        <h1 className="text-6xl md:text-8xl font-black tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
          HAPPY <br /> BIRTHDAY!
        </h1>
        <p className="text-lg md:text-xl text-purple-300/80 font-medium tracking-widest uppercase">
          Cheers to another wonderful year
        </p>
      </div>

      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </div>
  )
}

export default BirthdayPoster