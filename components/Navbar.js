import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex justify-center relative items-center'>  {/* Navbar fits the content */}
      <div className='h-20 flex items-center w-fit mt-5 gap-10 font-bold px-6 py-4 shadow-lg rounded-lg [background:radial-gradient(125%_125%_at_50%_10%,#000_100%)]'>
        <Image 
          src="/hackerWhite.webp" 
          alt="Logo" 
          width={50}    
          height={50}   
          className='' 
        />
        <Link href="/" className='transition duration-500 ease-in-out hover:text-orange-600'>{'>_Home'}</Link>
        <Link href="/team" className='transition duration-500 hover:text-orange-600'>{'>_Team'}</Link>
        <Link href="/halloffame" className='transition duration-500 hover:text-orange-600'>{'>_Hall Of Fame'}</Link>
        <Link href="/blogs" className='transition duration-500 hover:text-orange-600'>{'>_Blogs'}</Link>
        <Link href="/cache" className='transition duration-500 hover:text-orange-600'>{'>_Cache'}</Link>
        <Link href="/typewriter" className='transition duration-500 hover:text-orange-600'>{'>_Typewriter'}</Link>
        <Link href="/whatwedo" className='transition duration-500 hover:text-orange-600'>{'>_What We Do'}</Link>
      </div> 
    </div>
  )
}

export default Navbar
