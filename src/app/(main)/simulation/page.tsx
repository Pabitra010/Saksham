import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SimulationImage from '../../../../public/finalSimulationImage.png'
import logo from '../../../../public/Saksham_logo_simulation.png'
import EarthQuakeIcons from '../../../../public/icons/EarthQuake.svg'
import FloodIcons from '../../../../public/icons/Flood.svg'
import FireIcons from '../../../../public/icons/Fire.svg'
import CycloneIcons from '../../../../public/icons/Cyclone.svg'
import FooterPage from '@/components/Footer'

const SimulationPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6 mt-12 bg-[#F9F9F9]">
      <div className="w-full relative">
        <Image
          src={SimulationImage}
          alt="Simulation"
          width={1200}
          height={400}
          className="w-full object-cover h-56 sm:h-72 md:h-96 lg:h-[400px]"
        />
        <div className="absolute inset-0 left-0 flex flex-col md:flex-row items-center md:items-start justify-between flex-wrap p-4 sm:p-8 text-white bg-gradient-to-b from-black/25 via-black/10 to-transparent">
          <div className="w-full md:w-1/2 flex flex-col justify-center md:justify-center px-2 md:px-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 leading-tight">
              Disaster Preparedness and Response:{' '}
              <span className="text-yellow-400">Simulations</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-medium text-gray-200 max-w-2xl">
              Simulations provide realistic disaster scenarios to help schools and communities train effectively and respond confidently during emergencies.
            </p>
          </div>

          <div className="hidden md:flex justify-end md:w-1/3 lg:w-1/4 items-start">
            <Image
              src={logo}
              alt="Saksham Logo"
              width={150}
              height={150}
              className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 object-contain"
            />
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FEFFFE] rounded-lg p-6 sm:p-8 lg:p-10">
          <h2 className="text-[#1A5276] text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">Interactive Disaster Simulations</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#F9F9FB] p-6 sm:p-8 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:scale-105 duration-300 shadow">
              <Image src={EarthQuakeIcons} alt="Earthquake Icon" width={56} height={56} className="mb-3 w-12 h-12 sm:w-14 sm:h-14" />
              <h3 className="text-[#1A5276] text-lg sm:text-xl font-bold mb-2 text-center">Earthquake Simulation</h3>
              <p className="text-sm sm:text-base text-gray-500 text-center">
                Experience realistic earthquake scenarios to practice DROP, COVER, and HOLD ON techniques safely.
              </p>
            </div>

            <div className="bg-[#F9F9FB] p-6 sm:p-8 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:scale-105 duration-300 shadow">
              <Image src={FloodIcons} alt="Flood Icon" width={56} height={56} className="mb-3 w-12 h-12 sm:w-14 sm:h-14" />
              <h3 className="text-[#1A5276] text-lg sm:text-xl font-bold mb-2 text-center">Flood Simulation</h3>
              <p className="text-sm sm:text-base text-gray-500 text-center">
                Learn how to respond to rising water levels and practice evacuation routes during flood emergencies.
              </p>
            </div>

            <div className="bg-[#F9F9FB] p-6 sm:p-8 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:scale-105 duration-300 shadow">
              <Image src={FireIcons} alt="Fire Icon" width={56} height={56} className="mb-3 w-12 h-12 sm:w-14 sm:h-14" />
              <h3 className="text-[#1A5276] text-lg sm:text-xl font-bold mb-2 text-center">Fire Simulation</h3>
              <p className="text-sm sm:text-base text-gray-500 text-center">
                Practice evacuation drills and fire safety procedures to stay safe during fire emergencies.
              </p>
            </div>

            <div className="bg-[#F9F9FB] p-6 sm:p-8 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:scale-105 duration-300 shadow lg:col-span-1">
              <Image src={CycloneIcons} alt="Cyclone Icon" width={56} height={56} className="mb-3 w-12 h-12 sm:w-14 sm:h-14" />
              <h3 className="text-[#1A5276] text-lg sm:text-xl font-bold mb-2 text-center">Cyclone Simulation</h3>
              <p className="text-sm sm:text-base text-gray-500 text-center">
                Train on safety measures and emergency protocols during cyclones and severe storms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FEFFFE] rounded-lg p-6 sm:p-8 lg:p-10 my-6">
          <h2 className="text-[#1A5276] text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">Why Simulations Matter</h2>
          <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
            Simulations are a crucial component of disaster preparedness, offering a safe and controlled environment to practice responses to various emergencies. They help build muscle memory, improve decision-making skills, and enhance overall readiness for real-life situations.
          </p>

          <div className="mx-auto text-left w-full max-w-3xl">
            <h3 className="text-[#1A5276] text-xl sm:text-2xl font-bold mb-2">How to Use the Simulations</h3>
            <ul className="list-disc list-inside text-gray-600 text-sm sm:text-base">
              <li>Choose a disaster scenario from the options above.</li>
              <li>Follow the on-screen instructions to navigate through the simulation.</li>
              <li>Practice decision-making and emergency response steps in a safe environment.</li>
              <li>Review feedback and tips provided at the end of each simulation.</li>
              <li>Repeat simulations regularly to build confidence and preparedness.</li>
            </ul>
          </div>

          <div className="mx-auto text-left w-full max-w-3xl mt-6">
            <h3 className="text-[#1A5276] text-xl sm:text-2xl font-bold mb-2">Additional Resources</h3>
            <ul className="list-disc list-inside text-gray-600 text-sm sm:text-base">
              <li>
                <Link href="/" className="text-blue-500 hover:underline">Disaster Preparedness Guidelines</Link>
              </li>
              <li>
                <Link href="/resources" className="text-blue-500 hover:underline">Emergency Contact Numbers</Link>
              </li>
              <li>
                <Link href="/resources" className="text-blue-500 hover:underline">First Aid and Safety Tips</Link>
              </li>
              <li>
                <Link href="/resources" className="text-blue-500 hover:underline">Community Support Networks</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <FooterPage />
    </div>
  )
}

export default SimulationPage

