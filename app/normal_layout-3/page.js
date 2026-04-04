"use client";
import React, { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import NormalNav from '@/components/normal_nav';
import Explore from '@/components/explore';
import DisplayMessage from '@/components/display_message';
import Footer from '@/components/footer';

const Page = () => {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    useEffect(() => {
        const checkBirthday = async () => {
            if (isLoaded && user) {
                try {
                    const email = user.emailAddresses[0]?.emailAddress;
                    const res = await fetch(`/api/check-user?email=${email}`);
                    const data = await res.json();
                    
                    if (data.success && data.exists) {
                        const today = new Date();
                        const todayMMDD = today.toISOString().slice(5, 10);
                        const dobMMDD = data.user.dob.slice(5, 10);
                        
                        if (dobMMDD === todayMMDD) {
                            // Fetch special users list
                            const specialRes = await fetch('/api/special-users');
                            const specialData = await specialRes.json();
                            const isSpecial = specialData.users?.some(u => u.email === email);
                            
                            if (isSpecial) {
                                router.push("/birthday_layout-2");
                            } else {
                                router.push("/birthday_layout-1");
                            }
                        }
                    }
                } catch (error) {
                    console.error("Birthday check failed:", error);
                }
            } else if (isLoaded && !user) {
                router.push("/");
            }
        };
        checkBirthday();
    }, [user, isLoaded, router]);

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen">
            <NormalNav />
            <main className="pt-24">
                {/* Explore Section */}
                <section className="py-12 relative z-10">
                    <Explore />
                </section>
                
                {/* My Wishes Section (The "Message Plate") */}
                <section className="py-16 relative z-10">
                    <DisplayMessage />
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Page;

