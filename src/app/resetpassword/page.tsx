'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

interface ComponentNameProps {

}
type FieldTuple = [string, string, any];

const ComponentName: React.FC<ComponentNameProps> = ({ }) => {
    const [token, setToken] = useState<string>("");
    const [newPass, setNewPass] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const handleUpdate = async () => {
        setLoading(true)
        if (newPass === confirmPass) {
            try {
                await axios.post('/api/user/forgetpassword', { newPass, token })
                router.push('/login')
            } catch (error) {
                toast.error("Invalid request", {
                    position: 'bottom-center'
                })
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
        else {
            toast.error("Confirmation password is wrong", { position: 'bottom-center' })
        }

    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    const fields: FieldTuple[] = [
        ['Enter your new password', newPass, setNewPass],
        ['Confirm your new password', confirmPass, setConfirmPass]
    ];

    return (
        <div className='flex justify-center items-center h-screen w-screen bg-black text-white'>
            <div className='flex flex-col gap-7 max-w-screen-sm w-full'>



                {fields.map(([placeholder, value, setValue], index) => (
                    <input
                        key={index}
                        placeholder={placeholder}
                        type='password'
                        className='w-full p-2 rounded bg-transparent border-gray-500 border-b-2 focus:outline-none'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                ))}
                <button
                    onClick={handleUpdate}
                    className='bg-black font-bold w-full p-3 mt-3 rounded border-gray-500 border-2 hover:border-gray-200 '

                >{loading ? 'Updating' : 'Update'}</button>
                <Toaster />
            </div>
        </div>
    );
};

export default ComponentName;