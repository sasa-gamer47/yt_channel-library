import React from 'react'

const ChannelSwitch = () => {
  // border-4 border-sky-500 py-2 for active state *provvisory*
    return (
        <div class="absolute top-0 w-full flex text-2xl justify-around drop-shadow-lg">
            <div className="relative bg-yellow-400 text-center py-3 justify-center items-center w-full h-full transition duration-300 cursor-pointer text-white font-semibold hover:bg-yellow-500">
                sasa-gamer47
            </div>
            <div className="relative bg-slate-900 text-center py-3 justify-center items-center w-full h-full transition duration-300 cursor-pointer text-white font-semibold hover:bg-slate-800">
                angelstorm2132
            </div>
        </div>
    );
}

export default ChannelSwitch