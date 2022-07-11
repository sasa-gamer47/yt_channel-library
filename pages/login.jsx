import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'

const login = () => {
    const { data: session, status } = useSession()
    // console.log(session);
    // console.log(status);
    const router = useRouter()

    useEffect(() => {
        if (status === 'authenticated') {
            // set mongodb connection and saving account, set a variable "isFirstTime", if yes then set bio, channel name,... else redirect the user
            // should e able to do such a thing with the fetch, passing the session (account) infos.
            router.push('/')
        }
    }, [status])

    if (session) {
        return (
            <div>
                Welcome, {session.user.email}
                <button onClick={() => signOut()} >logout</button>
            </div>
        )
    } else {
        return (
            <div className='absolute flex justify-center items-center bg-green-600 w-full h-full'>
                <div className='sm:w-7/12 w-9/12 h-96 drop-shadow-xl bg-green-500 grid grid-cols-2'>
                    <div className='sm:w-full w-0 bg-green-400'>

                    </div>
                    <div className='w-full h-full flex flex-col items-center justify-around'>
                        <button onClick={() => signIn()} className='bg-white px-8 text-lg font-semibold drop-shadow-lg py-1 rounded-full transition duration-300 hover:bg-gray-200 hover:-translate-y-1' >
                            Google
                        </button>
                    </div>

                </div>
            </div>
        )
    }
}

export default login