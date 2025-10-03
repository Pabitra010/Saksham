'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { useSupabase } from './providers/SupabaseProvider'
import { signOut } from '@/app/login/actions'
import logo from '../../public/Saksham_logo.png'
import userIcon from '../../public/icons/user.svg'
import homeIcon from '../../public/icons/Home.svg'
import alertsIcon from '../../public/icons/Alerts.svg'
import supportIcon from '../../public/icons/Supports.svg'
import emergencyIcon from '../../public/icons/Emergency.svg'
import classRoomIcon from '../../public/icons/Classroom.svg'
import simulationIcon from '../../public/icons/simulation.svg'
import HeroPage from './hero'

const navItems = [
    { icon: homeIcon, label: 'Home', path: '/' },
    { icon: classRoomIcon, label: 'ClassRoom', path: '/classroom' },
    { icon: simulationIcon, label: 'Simulation', path: '/simulation' },
    { icon: alertsIcon, label: 'Alerts', path: '/alerts' },
    { icon: supportIcon, label: 'Supports', path: '/support' },
    { icon: emergencyIcon, label: 'Emergency Helpline', path: '/emergency' },
]

const Header = () => {
    const { supabase } = useSupabase()
    const [user, setUser] = useState<any>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Get initial user state
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user)
        })

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user ?? null)
        })

        // Click outside listener
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            subscription.unsubscribe()
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [supabase])

    const handleSignOut = async () => {
        await signOut()
        setIsDropdownOpen(false)
    }

    return (
        <div className='w-full pt-[60px]'>
            <nav className="w-full flex items-center justify-between px-8 py-2 fixed top-0 left-0 z-50 shadow-md transition-all duration-300 bg-[#164868] text-white">
                <div className='flex items-center gap-4'>
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 hover:opacity-80"
                            >
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                                    {user.user_metadata?.avatar_url ? (
                                        <Image 
                                            src={user.user_metadata.avatar_url} 
                                            alt="User" 
                                            width={40} 
                                            height={40}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                            <span className="text-gray-600 text-lg font-semibold">
                                                {user.email?.[0].toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute left-0 mt-3 w-72 bg-white rounded-lg shadow-xl py-4 text-gray-800 z-50">
                                    <div className="px-6 py-3 border-b border-gray-200">
                                        <div className="flex items-center gap-4">
                                            <div className="px-3 py-1 rounded-full overflow-hidden border-2 border-gray-200">
                                                {user.user_metadata?.avatar_url ? (
                                                    <Image 
                                                        src={user.user_metadata.avatar_url} 
                                                        alt="User" 
                                                        width={64} 
                                                        height={64}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <span className="text-gray-600 text-2xl font-semibold">
                                                            {user.email?.[0].toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold">
                                                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                                                </h3>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <button
                                            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                                        >
                                            My Account
                                        </button>
                                    </div>
                                    <div className="px-2 py-2">
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login" className='flex items-center gap-1 hover:opacity-80'>
                            <span className='bg-transparent rounded-full p-1'>
                                <Image src={userIcon.src} alt="User" width={20} height={20} />
                            </span>
                            <span className='text-sm font-bold'>User</span>
                        </Link>
                    )}
                    <div className='flex items-center gap-2'>
                        <Image src={logo} alt="Saksham Logo" width={50} height={50} />
                        <h1>Saksham (NDR & Empowerment)</h1>
                    </div>
                </div>

                <div className='text-md font-medium'>
                    <ul className='flex items-center gap-8'>
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <Link href={item.path} className='flex items-center gap-1 hover:opacity-80'>
                                    <Image src={item.icon.src} alt={item.label} width={20} height={20} />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
            <HeroPage />
        </div>
    )
}

export default Header

