import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import { AiOutlineLogin } from "react-icons/ai";
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    const { data: session, status } = useSession();
    const [channel, setChannel] = useState(null)
    const [user, setUser] = useState(null)
    const router = useRouter()

    
    async function getUserByEmail(email) {
        const res = await fetch(`http://localhost:3000/api/user/email/${email}`);
        const data = await res.json();

        return data.data[0];
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            setChannel(window.localStorage.getItem("selectedChannel"))
        }

    }, [router])
    
    useEffect(() => {
        if (status === "authenticated") {
            async function getUser() {
                const user = await getUserByEmail(session.user.email)
                console.log(user);
                setUser(user)
            }
            getUser()
        }    
    }, [status])

    useEffect(() => {
        if (user) {
            if (!user.hasCompletedLogin) {
                router.push('/new-user')
            }
        }
    }, [user])

    const navLinkStyle = "text-white w-full h-full flex items-center justify-center text-xl font-semibold transition duration-300 cursor-pointer hover:border-b-4 hover:border-slate-900";

    return (
        <div className={`absolute flex items-center justify-between w-full top-14 h-14 z-40 ${channel == 'sasa-gamer47' ? 'bg-yellow-400' : 'bg-slate-900' } drop-shadow-lg`}>
            <div className={`${navLinkStyle} hover:bg-yellow-500`}>
                Home
            </div>
            <div className={`${navLinkStyle} hover:bg-yellow-600`}>
                Info canale
            </div>
            <div className={`${navLinkStyle} hover:bg-yellow-700`}>
                Video recenti
            </div>
            <div className={`${navLinkStyle} hover:bg-orange-500`}>
                Dirette
            </div>
            <div className={`${navLinkStyle} hover:bg-orange-600`}>
                Playlists
            </div>
            <div className={`${navLinkStyle} hover:bg-orange-700`}>
                Community
            </div>
            <div className={`${navLinkStyle} `}>
                <div className={`${navLinkStyle} `}>
                    theme toggle
                </div>
                <div className={`${navLinkStyle} `}>
                    {status === "authenticated" ?
                        (
                            <div className='w-full h-full flex justify-center items-center'>
                                <Image src={session.user.image} width="40" height="40"  className='rounded-full' />
                            </div>
                        ) :
                        (
                            <div>
                                <Link href={'/login'}>
                                    <AiOutlineLogin />
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default Navbar