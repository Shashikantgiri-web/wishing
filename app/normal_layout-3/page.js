import React from 'react'
import NormalNav from '@/components/normal_nav'
import Explore from '@/components/explore'
import Footer from '@/components/footer'

const page = () => {
    return (
        <div className="min-h-screen bg-slate-950">
            <NormalNav />
            <main>
                <Explore />
            </main>
            <Footer />
        </div>
    )
}

export default page 
