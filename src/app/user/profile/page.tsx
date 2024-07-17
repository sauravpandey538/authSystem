'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

interface UserApi {
    email: string,
    isAdmin: boolean,
    isVerified: boolean,
    password: string,
    username: string,
    _id: string
}

const Profile: React.FC = ({ }) => {
    const router = useRouter();
    const [user, SetUser] = useState<UserApi | null>(null)
    const handleLogout = async () => {
        try {
            await axios.get('/api/user/logout')
            router.push('/')
        } catch (error: any) {
            toast.error('Error during logout', { position: 'bottom-center' })

            console.log(error.message)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/user/me')
            console.log(response)
            SetUser(response.data.user)
        }
        fetchData()
    }, [])
    return (
        <div className='flex  flex-col gap-10 justify-center items-center h-screen w-screen bg-black text-white'>
            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}

                className='md:text-3xl sm:text-xl px-5 text-slate-400'>
                Thanks for being here <span className='font-bold text-slate-200'>{user?.username}</span>. You're a verified customer now :)
            </motion.p>
            <button
                className=' bg-slate-300 p-2 rounded-lg font-semibold text-black'
                onClick={handleLogout}>Logout</button>
            <Toaster />
        </div>
    );
};

export default Profile;