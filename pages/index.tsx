import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { ChannelSwitch, Navbar } from '../components'
import { useRouter } from 'next/router'

const Home: NextPage = () => {

  const router = useRouter()
  const { query: { channel } } = router
  
  useEffect(() => {
    if (channel) {
      // console.log(router.query);
      // console.log(channel);
      router.push(router.route)      
    }
  }, [router])
  


  return (
    <>
      <Head>
        <title>Libreria di YouTube | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChannelSwitch />
      <Navbar />
    </>
  )
}

export default Home
