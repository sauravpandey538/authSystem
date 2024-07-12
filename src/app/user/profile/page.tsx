'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
            const response = await axios.get('/api/user/logout')
            console.log(response);
            router.push('/')
        } catch (error: any) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/user/me')
            console.log(response.data)
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
        </div>
    );
};

export default Profile;