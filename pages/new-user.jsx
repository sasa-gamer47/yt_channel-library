import React, { useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'

const newUser = () => {
    const { data: session, status } = useSession()
    // console.log(session);
    // console.log(status);
    const router = useRouter()

    const inputStyle = 'drop-shadow-lg px-5 py-1 rounded-full bg-white outline-none w-7/12'
    const textareaStyle = 'drop-shadow-lg px-2 py-1 bg-white outline-none w-7/12'
    const labelStyle = 'font-semibold text-gray-900 text-lg'

    async function getUserByEmail(email) {
        const res = await fetch(`http://localhost:3000/api/user/email/${email}`)
        const data = await res.json()

        return data.data[0]
    }

    useEffect(() => {
        if (status === "authenticated") {
            async function getUser() {
                const user = await getUserByEmail(session.user.email);
                if (user.hasCompletedLogin) {
                    router.push('/')
                }
            }
            getUser();
        }
    }, [status]);

    const finishLogin = async (e) => {
        if (status === "authenticated") {
            e.preventDefault()
            // console.log(e)

            const name = e.target[0].value
            const surname = e.target[1].value
            const youtubeChannelUrl = e.target[2].value
            const bio = e.target[3].value
            const hobby = e.target[4].value

            // console.log(name, surname, youtubeChannelUrl, bio, hobby)
            
            const user = {
                name: session.user.name,
                image: session.user.image,
                email: session.user.email,
                realName: name,
                surname,
                youtubeChannelUrl,
                bio,
                hobby,
                hasCompletedLogin: true,
            }

            const data = await getUserByEmail(session.user.email)

            // console.log(data)

            const res = await fetch(`http://localhost:3000/api/user/${data._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });


            setTimeout(() => router.push('/'), 100)

            // console.log(user)
        }
    }

    return (
        <>
            <div className='absolute bg-green-600 w-full h-full'>
            </div>
            <div className='absolute inset-5 sm:inset-24 selection:bg-green-700 selection:text-white drop-shadow-xl bg-green-500 sm:grid sm:grid-cols-2'>
                <div className='sm:w-full w-0 bg-green-400'>

                </div>
                <form className='w-full h-full flex flex-col items-center justify-around' onSubmit={(e) => finishLogin(e)}>
                    <label htmlFor="name" className={labelStyle}>Nome</label>
                    <input type="text" name='name' placeholder="Inserisci il tuo nome" className={inputStyle} />
                    <label htmlFor="surname" className={labelStyle}>Cognome</label>
                    <input type="text" name='surname' placeholder="Inserisci il tuo cognome" className={inputStyle} />
                    <label htmlFor="channelUrl" className={labelStyle}>Link canale youtube</label>
                    <input type="url" name='channelUrl' placeholder="Inserisci l'url del tuo canale Youtube" className={`${inputStyle} placeholder:text-sm`} />
                    <label htmlFor="bio" className={labelStyle}>Bio</label>
                    <textarea name='bio' placeholder="Descriviti un po'..." className={textareaStyle} />
                    <label htmlFor="hobby" className={labelStyle}>Hobby</label>
                    <input type="text" name='hobby' placeholder="Inserisci il tuo hobby (gaming, musica, istruzione...)" className={inputStyle} />
                    <input type="submit" value="Termina il login" className='drop-shadow-xl px-5 py-1 rounded-full bg-green-700 font-semibold text-white cursor-pointer transition duration-300 hover:bg-green-800 hover:-translate-y-1 text-lg mt-5' />
                </form>

            </div>
        </>
    )
}

export default newUser