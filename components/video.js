import React from 'react'

const Video = ({ url }) => {
  return (
    <div className="w-full max-w-3xl mx-auto my-12 p-1 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-3xl shadow-2xl shadow-purple-500/20">
      <div className="relative aspect-video bg-slate-900 rounded-[1.4rem] overflow-hidden group">
        {url ? (
          <iframe 
            src={url} 
            className="w-full h-full" 
            allowFullScreen 
            title="Birthday Video"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium">No special message video added yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Video