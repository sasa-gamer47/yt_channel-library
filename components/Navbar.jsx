import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import { AiOutlineLogin } from "react-icons/ai";
import Link from 'next/link';

const Navbar = () => {
    const { data: session, status } = useSession();
    const [channel, setChannel] = useState(null)
    const router = useRouter()

    useEffect(() => {
        if (typeof window !== "undefined") {
            setChannel(window.localStorage.getItem("selectedChannel"))
        }
    }, [router])

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
                        <div>display img</div>
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