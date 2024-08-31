import React from 'react'

const Footer = () => {
    return (
        <div className='bg-purple-950 text-white flex flex-col justify-center items-center  w-full'>
            <div className="logo font-bold text-white text-xl">
                <span className='text-white'>AuraPulse</span>
            </div>
            <div className='flex justify-center items-center '> Created with <img className='w-7 mx-2' src="icons/heart.svg" alt="" /> by Lakshay </div>
        </div>
    )
}

export default Footer
