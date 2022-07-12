import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession, signOut } from "next-auth/react";
import { AiOutlineLogin } from "react-icons/ai";
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from "@headlessui/react";
import { ThemeToggle } from './'

const Navbar = () => {
    const { data: session, status } = useSession();
    const [channel, setChannel] = useState(null)
    const [user, setUser] = useState(null)
    const [bgColor, setBgColor] = useState('')
    const [hoverBgColor, setHoverBgColor] = useState('')
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
                // console.log(user);
                setUser(user)
            }
            getUser()
        }    
    }, [status])

    useEffect(() => {
        if (channel) {
            channel === 'sasa-gamer47' ? setBgColor('bg-yellow-400') : setBgColor('bg-slate-900')
            channel === 'sasa-gamer47' ? setHoverBgColor('bg-yellow-500') : setHoverBgColor('bg-orange-600')

        }
    }, [channel])

    useEffect(() => {
        if (user) {
            if (!user.hasCompletedLogin) {
                router.push('/new-user')
            }
        }
    }, [user])

    const navLinkStyle = "text-white w-full h-full flex items-center justify-center text-xl font-semibold transition duration-300 cursor-pointer hover:border-b-4 hover:border-slate-900";
    const navLinkStyle1 = "text-white w-full h-full flex items-center justify-center text-xl transition duration-300";

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
            <div className={`${navLinkStyle1} `}>
                <div className={`${navLinkStyle1} `}>
                    <div className='h-full w-7/12 flex items-center justify-center'>
                        <ThemeToggle />
                    </div>
                </div>
                <div className={`${navLinkStyle1} `}>
                    {status === "authenticated" && user ?
                        (
                            <div className='relative w-full h-full flex justify-center items-center'>
                                <Menu>
                                        <Menu.Button>
                                            <Image src={session.user.image} width="40" height="40"  className='rounded-full' />
                                        </Menu.Button>
                                        <div className='absolute top-14 text-center'>
                                            <Menu.Items>
                                                <Menu.Item as='div' className={`transition duration-300 cursor-pointer ${bgColor} hover:${hoverBgColor} py-1 px-2 text-lg`}>
                                                    <>
                                                        <Link href={`/api/user/${user._id}`}><p>Profilo</p></Link>
                                                    </>
                                            </Menu.Item>
                                            {console.log(`{bgColor} hover:${hoverBgColor}`)}
                                                <Menu.Item as='div' className={`transition duration-300 cursor-pointer ${bgColor} hover:${hoverBgColor} py-1 px-2 text-lg`}>Impostazioni</Menu.Item>
                                                <Menu.Item as='div' className={`transition duration-300 cursor-pointer ${bgColor} hover:${hoverBgColor} py-1 px-2 text-lg`}>
                                                    <p onClick={() => signOut()}>Log out</p>
                                                </Menu.Item>
                                            </Menu.Items>    
                                        </div>
                                    </Menu>
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