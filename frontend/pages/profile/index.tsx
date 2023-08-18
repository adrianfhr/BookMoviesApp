import React from 'react';
import Navbar from "@/components/navbar";
import Profile from '@/components/profile';
import Footer from '@/components/footer';

const ProfilePage = () => {
    return (
        <div className='py-4 bg-background h-screen'>
        <Navbar />
        <div className=" container mx-auto ">
            <Profile />
        </div>

        <Footer/>
        </div>

    );
}

export default ProfilePage;