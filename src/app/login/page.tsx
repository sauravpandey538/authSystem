'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface User {
    username: string,
    email: string,
    password: string | number,
    [key: string]: string | number;
}

interface Api {
    id: number,
    name: string,
    placeholder: string,
    type: string
}

const Login: React.FC = () => {
    const router = useRouter();
    const [data, setData] = useState<User>({
        username: '',
        email: '',
        password: ''
    });

    const api: Api[] = [
        { id: 2, name: 'email', placeholder: 'email', type: 'email' },
        { id: 3, name: 'password', placeholder: 'password', type: 'password' },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/user/login', data)
            console.log(response.data);
            router.push("/user/profile")

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <div className='h-1/2 w-96 bg-slate-400 rounded-2xl p-6'>
                <h1 className='w-full text-center py-5 text-xl font-semibold'>Login Page</h1>
                <div className='flex flex-col gap-5'>
                    {api.map((item) => (
                        <input
                            key={item.id}
                            name={item.name}
                            type={item.type}
                            placeholder={`Please enter your ${item.placeholder}`}
                            value={data[item.name]}
                            onChange={handleChange}
                            className='w-full p-2 rounded'
                        />
                    ))}
                </div>
                <button className='bg-white w-full p-3 mt-3' onClick={handleLogin}>Submit</button>
                <Link href={'signup'} className=' text-black font-bold'>signup</Link>
            </div>
        </div>
    );
};

export default Login;
