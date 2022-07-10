import React from 'react'
import Image from 'next/image'
import { sasaYTLogo, angelstormYTLogo } from '../img'

const ChannelSwitch = () => {
  // border-4 border-yellow-800 py-2 for active state *provvisory*
    return (
        <div class="absolute z-50 top-0 w-full flex text-2xl justify-around drop-shadow-lg">
            <div className="relative bg-yellow-400 text-center py-3 flex justify-center items-center w-full h-full transition duration-300 cursor-pointer text-white font-semibold hover:bg-yellow-500">
                <div className='w-8 h-8 mr-5 scale-125'>
                    <Image src={sasaYTLogo} fill="responsive" className='rounded-full' />
                </div>
                <div>
                    sasa-gamer47
                </div>
            </div>
            <div className="relative bg-orange-600 text-center py-3 flex justify-center items-center w-full h-full transition duration-300 cursor-pointer text-white font-semibold hover:bg-orange-700">
                <div className='w-8 h-8 mr-5 scale-125'>
                    <Image src={angelstormYTLogo} fill="responsive" className='rounded-full' />
                </div>
                <div>
                    angelstorm2132
                </div>
            </div>
        </div>
    );
}

export default ChannelSwitch