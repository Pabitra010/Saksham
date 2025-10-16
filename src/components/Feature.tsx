import React from 'react'
import Image from 'next/image'
import classRoomIcon from '../../public/icons/FeatureClassRoom.svg'
import simulationIcon from '../../public/icons/FeatureSimulation.svg'
import SupportsIcon from '../../public/icons/FeatureSupports.svg'
import alertsIcon from '../../public/icons/FeatureAlerts.svg'
import Link from 'next/link'
import path from 'path'

const features = [
    { icon: classRoomIcon, title: 'Classroom', description: 'Educational resources and materials for disaster preparedness', path: '/classroom' },
    { icon: simulationIcon, title: 'Simulations', description: 'Realistic disaster scenarios for training and practice', path: '/simulation' },
    { icon: alertsIcon, title: 'Alerts', description: 'Live updates and news about ongoing disasters', path: '/alerts' },
    { icon: SupportsIcon, title: 'Community Support', description: 'Connect with volunteers and support networks', path: '/CommunitySupports' }
]

const FeaturePage = () => {
    return (
        <section className='w-full max-w-7xl mx-auto py-16 px-4'>
            <h2 className='text-4xl font-bold text-center text-[#164868] mb-16'>
                Our Key Features
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                {features.map((feature) => (
                    <Link href={feature.path}
                        key={feature.title}
                        className='bg-[#F8F9FA] p-8 rounded-lg text-center flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow duration-300'
                    >
                        <div className='mb-6'>
                            <Image 
                                src={feature.icon} 
                                alt={feature.title}
                                width={48}
                                height={48}
                                className='text-[#164868]'
                            />
                        </div>
                        <h3 className='text-xl font-bold text-[#164868] mb-4'>
                            {feature.title}
                        </h3>
                        <p className='text-gray-700 leading-relaxed'>
                            {feature.description}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default FeaturePage
