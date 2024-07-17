'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { sendEmail } from '@/helpers/mailer';
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

const Signup: React.FC = () => {
    const [showPass, setShowPass] = useState<boolean>(false)

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
    const [loading, setLoading] = useState<boolean>(false)
    const api: Api[] = [
        { id: 1, name: 'username', placeholder: 'username', type: 'text' },
        { id: 2, name: 'email', placeholder: 'email', type: 'text' },
        { id: 3, name: 'password', placeholder: 'password', type: showPass ? 'text' : 'password' },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        setError({ ...error, [name]: '' })
    };

    const handleSubmit = async () => {
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
                setLoading(true)
                const response = await axios.post('/api/user/signup', data);
                console.log('User created successfully:', response.data);

                toast.success("Verify your e-mail before login.", {
                    duration: 7000,
                    position: 'bottom-center'
                });



            } catch (error) {
                if (axios.isAxiosError(error)) {
                    toast.error('Username or Email is already taken');
                    console.error('Error creating user:', error.response?.data);
                } else {
                    toast.error('Unexpected Error');
                    console.error('Unexpected error:', error);
                }
            }
            finally {

                setLoading(false)
                setData({
                    username: '',
                    email: '',
                    password: ''
                })
            }
        }


    };

    const handleForgetPasswordOperation = async () => {
        if (data.email && error.email === '') {
            try {
                const response = await axios.post('/api/user/sendPasswordCall',
                    {
                        email: data.email,
                        emailType: "RESET"
                    })
                toast.success("Check your email for verification", {
                    duration: 7000,
                    position: 'bottom-center'
                });
                console.log('Email sent successfully', response);

            } catch (error) {
                toast.error('Unexpected Error');
                console.error('An error occurred while sending email', error);
            }
        }
        else {
            toast.error('Enter your email wisely');

        }

    };

    return (
        <div className='flex justify-center items-center h-screen w-screen bg-black text-white'>
            <div className='h-fit w-96  rounded-2xl p-6 bg-black'>
                <h1 className='w-full text-center py-5 text-xl font-semibold'>Signup Page</h1>

                <div className='flex flex-col gap-5'>

                    {api.map((item) => (
                        <div key={item.id} className='relative'>
                            <input
                                key={item.id}
                                name={item.name}
                                type={item.type}
                                placeholder={`Enter your ${item.placeholder}`}
                                value={data[item.name]}
                                onChange={handleChange}
                                className='w-full p-2 rounded bg-transparent border-gray-500 border-b-2  focus:outline-none'
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

                    >{loading ? 'Loading...' : 'Submit'}</button>
                </div>
                <div className='flex w-full justify-between mt-6'>

                    <Link href={''}
                        onClick={handleForgetPasswordOperation}
                    > <button
                        className='bg-black font-semibold w-full p-3  rounded hover:font-bold text-slate-300'
                    >
                            forget password</button> </Link>
                    <Link href='/login'>
                        <button
                            className='bg-black font-semibold w-full p-3  rounded hover:font-bold '
                        >
                            Login ---{">"}</button>
                    </Link>
                </div>
            </div>
            <Toaster />

        </div>
    );
};

export default Signup;
