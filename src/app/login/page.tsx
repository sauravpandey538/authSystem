'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface User {
    username: string,
    email: string,
    password: string,
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
    const [error, setError] = useState<User>({
        username: '',
        email: '',
        password: ''
    })

    const api: Api[] = [
        { id: 2, name: 'email', placeholder: 'email', type: 'text' },
        { id: 3, name: 'password', placeholder: 'password', type: 'password' },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        setError({ ...error, [name]: '' })

    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let hasError = false;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (data.username.trim() === '') {
            setError(prevError => ({ ...prevError, email: 'Enter an email' }))
            hasError = true;
        }
        if (!emailRegex.test(data.email)) {
            setError(prevError => ({ ...prevError, email: 'Enter an valid email' }))
            hasError = true;
        }

        if (data.username.trim() === '') {
            setError(prevError => ({ ...prevError, username: 'Enter an username' }))
            hasError = true;
        }
        if (data.password.trim() === '') {
            setError(prevError => ({ ...prevError, password: 'Enter an password' }))
            hasError = true;
        }
        if (!hasError) {
            try {
                const response = await axios.post('/api/user/login', data)
                console.log(response.data);
                router.push("/user/profile")

            } catch (error) {
                console.log(error)
            }
        }

    }
    return (
        <div className='flex justify-center items-center h-screen w-screen bg-black text-white'>
            <div className='h-fit w-96  rounded-2xl p-6 bg-black'>
                <h1 className='w-full text-center py-5 text-xl font-semibold'>Login Page</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

                    {api.map((item) => (
                        <div>
                            <input
                                key={item.id}
                                name={item.name}
                                type={item.type}
                                placeholder={`Enter your ${item.placeholder}`}
                                value={data[item.name]}
                                onChange={handleChange}
                                className='w-full p-2 rounded bg-transparent border-gray-500 border-b-2  focus:outline-none'
                            />
                            {error[item.name] && <p className='text-red-400'>{error[item.name]}</p>}
                        </div>
                    ))}
                    <button
                        type='submit'
                        className='bg-black font-bold w-full p-3 mt-3 rounded border-gray-500 border-2 hover:border-gray-200'

                    >Submit</button>
                </form>
                <Link href='/signup'>
                    <span className='text-white font-bold mt-8 inline-block'>Go To Signup</span>
                </Link>
            </div>
        </div>
    );
};

export default Login;
