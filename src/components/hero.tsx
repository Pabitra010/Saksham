import React from 'react'
import Image from 'next/image'
import hero from '../../public/hero-new.png'

const HeroPage = () => {
    return (
        <div className='relative w-full h-screen'>
            <Image
                src={hero}
                alt="Hero Image"
                className='w-full h-full object-cover'
                priority
            />
            {/* Dark overlay */}
            <div className='absolute inset-0 bg-black/50'></div>

            {/* Content */}
            <div className='absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4'>
                <h1 className='text-5xl md:text-6xl font-bold mb-4'>
                    Stay Prepared <span className='text-yellow-400'>Stay Safe</span> with
                </h1>
                <h2 className='text-5xl md:text-6xl font-bold mb-8'>Saksham</h2>
                <p className='text-xl md:text-2xl mb-12 max-w-3xl'>
                    This platform helps educate, train, and coordinate disaster response for schools and colleges
                </p>
                <div className='flex gap-6'>
                    <button className='px-8 py-3 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition'>
                        What to Do
                    </button>
                    <button className='px-8 py-3 border-2 border-white text-white font-semibold rounded hover:bg-white/10 transition'>
                        What Not to Do
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeroPage
