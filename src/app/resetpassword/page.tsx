'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface ComponentNameProps {

}

const ComponentName: React.FC<ComponentNameProps> = ({ }) => {
    const [token, setToken] = useState<string>("")
    const [newPass, setNewPass] = useState<string>("")
    const handleUpdate = async () => {
        try {
            const response = await axios.post('/api/user/forgetpassword', { newPass, token })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    return (
        <div className='flex justify-center items-center h-screen w-screen bg-black text-white'>
            <div className='flex flex-col gap-7 max-w-screen-sm w-full'>
                {token}
                {newPass}

                <input placeholder='enter the new password'
                    className='w-full p-2 rounded bg-transparent border-gray-500 border-b-2  focus:outline-none'
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                />
                <button
                    onClick={handleUpdate}
                    className='bg-black font-bold w-full p-3 mt-3 rounded border-gray-500 border-2 hover:border-gray-200 '

                >Update</button>

            </div>
        </div>
    );
};

export default ComponentName;