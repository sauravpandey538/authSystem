"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MdOutlineError } from "react-icons/md";


export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/user/verifyemail', { token })
            setVerified(true);
            console.log('success')
        } catch (error: any) {
            console.log('unsucessful')

            setError(true);
            console.log(error);

        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-2xl">Verify Email</h1>
            {/* <h2 className="p-2 bg-green-500 text-black">{token ? `${token}` : "no token"}</h2> */}

            {verified && (
                <div className="mt-7 flex flex-col gap-7 items-center justify-center">
                    <h2 className="text-xl"> Congratulation, Your Email Has Verified Sucessfully !!</h2>

                    <div className=" flex h-fit justify-center items-center">
                        <RiVerifiedBadgeFill className="text-7xl" />
                    </div>
                    <Link href="/login" className="bg-slate-300 hover:bg-slate-200 rounded-xl p-3">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div className="mt-7 flex flex-col gap-7 items-center justify-center">
                    <h2 className="text-xl"> Oops, Your Got Some Errors !!</h2>

                    <div className=" flex h-fit justify-center items-center">
                        <MdOutlineError className="text-7xl" />
                    </div>
                    <Link href="/login" className="bg-slate-200 rounded-xl p-2">
                        Retry
                    </Link>
                </div>
            )}
        </div>
    )

}