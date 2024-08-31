import React from 'react'

const Navbar = () => {
    return (
        <nav className=' text-white '>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
                <div className="logo font-bold text-white text-2xl">
                    <span className='text-white'>AuraPulse</span>
                </div>
                <button className='text-white bg-purple-950 my-5 mx-2 rounded-full flex  justify-between items-center ring-white ring-1 '>
                    <img className='invert  w-10 p-1' src="icons/icons8-github.svg" alt="github logo" />
                    <span className='font-bold px-2'><a href="https://github.com/LakshayJain458" target='_blank'>GitHub</a></span>

                </button>
            </div>
        </nav>
    )
}

export default Navbar