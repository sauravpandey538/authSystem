'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import Logo from "../../../public/logo.png"
import Image from 'next/image';
interface User {
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
    const [showPass, setShowPass] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();
    const [data, setData] = useState<User>({

        email: '',
        password: ''
    });
    const [error, setError] = useState<User>({

        email: '',
        password: ''
    })

    const api: Api[] = [
        { id: 2, name: 'email', placeholder: 'email', type: 'text' },
        { id: 3, name: 'password', placeholder: 'password', type: showPass ? 'text' : 'password' },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        setError({ ...error, [name]: '' })

    };
    const handleSubmit = async () => {
        setLoading(true)
        let hasError = false;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (data.email.trim() === '') {
            setError(prevError => ({ ...prevError, email: 'Enter an email' }))
            hasError = true;
        }
        if (!emailRegex.test(data.email)) {
            setError(prevError => ({ ...prevError, email: 'Enter an valid email' }))
            hasError = true;
        }


        if (data.password.trim() === '') {
            setError(prevError => ({ ...prevError, password: 'Enter an password' }))
            hasError = true;
        }
        if (!hasError) {
            try {
                await axios.post('/api/user/login', data)
                router.push("/user/profile")

            } catch (error) {
                toast.error(
                    "Email and password didn't match", {
                    duration: 4000,
                    position: 'bottom-center'
                });

                console.error(error)
            }
        }
        setLoading(false)

    }
    return (
        <div className='flex justify-center items-center h-screen w-screen bg-black text-white'>
            <div className='h-fit w-96  rounded-2xl p-6 bg-black'>


                {/* <Image src={Logo} alt="Logo" className='rounded-xl  bg-transparent' /> */}

                <h1 className='w-full text-center py-5 text-xl font-semibold'>Login Page</h1>
                <div className='flex flex-col gap-5'>

                    {api.map((item) => (
                        <div className='relative' key={item.id}>
                            <input
                                key={item.id}
                                name={item.name}
                                type={item.type}
                                placeholder={`Enter your ${item.placeholder}`}
                                value={data[item.name]}
                                onChange={handleChange}
                                className='  w-full p-2 rounded bg-transparent border-gray-500 border-b-2  focus:outline-none'
                            />
                            {
                                item.name === 'password' &&
                                <button
                                    className='absolute top-4 right-0 '
                                    onClick={() => setShowPass(!showPass)}>{showPass ? <GoEyeClosed /> : <GoEye />}</button>
                            }
                            {error[item.name] && <p className='text-red-400'>{error[item.name]}</p>}
                        </div>
                    ))}
                    <button
                        onClick={handleSubmit}
                        className='bg-black font-bold w-full p-3 mt-3 rounded border-gray-500 border-2 hover:border-gray-200'

                    >Submit</button>
                </div>
                <Link href='/signup'>
                    <button

                        className='bg-black font-semibold w-full p-3 mt-6 rounded hover:font-bold '

                    >{"<"}---Signup</button>
                </Link>
            </div>
            <Toaster />

        </div>
    );
};

export default Login;
