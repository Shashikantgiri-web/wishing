import React from 'react'
import Birthday_nav from '@/components/birthday_nav'
import Birthday_poster from '@/components/birthday_poster'
import Video from '@/components/video'
import Display_message from '@/components/display_message'
import Footer from '@/components/footer'

const page = () => {
    return (
        <>
            <Birthday_nav />
            <Birthday_poster />
            <Video />
            <Display_message />
            <Footer />
        </>
    )
}

export default page
