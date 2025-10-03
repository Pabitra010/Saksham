"use client";
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowLeft } from "react-icons/fa"
import logo from '../../public/Saksham_logo.png'

const ClassroomNavbarPage = () => {
  return (
    <nav className='w-full px-4 py-2 bg-[#174967] text-white flex items-center justify-between'>
      <div className='w-full flex items-center'>
        <div className='flex items-center mr-1'>
          <FaArrowLeft className='inline-block mr-1' />
          <Link href='/' style={{ textDecoration: "none" }} className=' text-bold text-xl mr-4 hover:underline'>Back</Link>
        </div>
        <div className='flex items-center gap-2'>
          <Image src={logo} alt="Saksham Logo" width={50} height={50} />
          <h1>Saksham (NDR & Empowerment)</h1>
        </div>
      </div>
      <div>
        <h1>User</h1>
      </div>
    </nav>
  )
}

export default ClassroomNavbarPage
