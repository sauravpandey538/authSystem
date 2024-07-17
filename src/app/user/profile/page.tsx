'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

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
            SetUser(response.data.user)
        }
        fetchData()
    }, [])
    return (
        <div>
            <p>`This is profile page of {user?.email} when the auth was sucessfully done`</p>

            <button
                className=' bg-slate-300 p-2 rounded-lg font-semibold'
                onClick={handleLogout}>Logout</button>
            <Toaster />
        </div>
    );
};

export default Profile;