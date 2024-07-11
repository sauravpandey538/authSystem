'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

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

const Signup: React.FC = () => {
    const [data, setData] = useState<User>({
        username: '',
        email: '',
        password: ''
    });

    const api: Api[] = [
        { id: 1, name: 'username', placeholder: 'username', type: 'text' },
        { id: 2, name: 'email', placeholder: 'email', type: 'email' },
        { id: 3, name: 'password', placeholder: 'password', type: 'password' },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/user/signup', data);
            console.log('User created successfully:', response.data);
            router.push("/login")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error creating user:', error.response?.data);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <div className='h-1/2 w-96 bg-slate-400 rounded-2xl p-6'>
                <h1 className='w-full text-center py-5 text-xl font-semibold'>Signup Page</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
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
                    <button
                        type='submit'
                        className='bg-white w-full p-3 mt-3 rounded'>Submit</button>
                </form>
                <Link href='/login'>
                    <span className='text-black font-bold mt-3 inline-block'>Login</span>
                </Link>
            </div>
        </div>
    );
};

export default Signup;
