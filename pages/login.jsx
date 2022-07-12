import React, { useEffect } from 'react'
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/router'
import { setCookies } from "cookies-next";

const login = ({ /*pageVisited*/ }) => {
    const { data: session, status } = useSession()
    // console.log(session);
    // console.log(status);
    const router = useRouter()

    // useEffect(() => {
    //     if (!pageVisited) {
    //         setCookies("pageVisited", true);
    //     }
    // }, []);

    useEffect(() => {
        if (status === 'authenticated') {
            // set mongodb connection and saving account, set a variable "isFirstTime", if yes then set bio, channel name,... else redirect the user
            // should e able to do such a thing with the fetch, passing the session (account) infos.
            // if (!pageVisited) {
            //     router.push('/new-user')
            // } else {
            //     router.push('/')
            // }
            
                router.push('/')
        }
    }, [status])

    return (
        <div className='absolute flex justify-center items-center bg-green-600 w-full h-full'>
            <div className='sm:w-7/12 w-9/12 h-96 drop-shadow-xl bg-green-500 sm:grid sm:grid-cols-2'>
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

// export const getServerSideProps = async (ctx) => {
//     const { pageVisited } = ctx.req.cookies;

//     return { props: { pageVisited: pageVisited ?? null } };
// };

export default login