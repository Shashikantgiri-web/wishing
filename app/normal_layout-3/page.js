"use client";
import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import NormalNav from '@/components/normal_nav'
import Explore from '@/components/explore'
import DisplayMessage from '@/components/display_message'
import Footer from '@/components/footer'

const Page = () => {
    const { user, isLoaded } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (isLoaded && !user) {
            router.push("/")
        }
    }, [user, isLoaded, router])

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        )
    }

    if (!user) return null

    return (
        <div className="min-h-screen bg-slate-950">
            <NormalNav />
            <main className="pt-20">
                {/* Explore Section */}
                <section className="py-12">
                    <Explore />
                </section>
                
                {/* My Wishes Section (The "Message Plate") */}
                <section className="border-b border-white/5 bg-gradient-to-b from-slate-900 to-slate-950">
                    <DisplayMessage />
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Page
