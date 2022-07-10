import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ChannelSwitch, Navbar } from '../components'

const Home: NextPage = () => {
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
