

import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Home = () => {


  return (
    <div className=' bg-white text-black dark:bg-zinc-900 dark:text-white flex p-9 overflow-hidden'>

      <div className='max-w-5xl mx-auto text-center'
        style={{ fontFamily: 'AEONIK' }}
      >

        {/* Heading */}
        <h1 className='text-3xl md:text-5xl font-black leading-tight'
          style={{ fontFamily: 'LEMONMILK' }}
        >
          Manage Tasks <br />
          With Your Team
        </h1>

        {/* Description */}
        <p className='text-black dark:text-white text-md md:text-lg mt-6 max-w-2xl mx-auto'>
          A modern task management platform where admins can assign work,
          members can update progress, and teams can collaborate smoothly.
        </p>

        {/* Buttons */}
        <div className='flex items-center justify-center gap-5 mt-10'>

          <Link
            to='/login'
            className='bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl text-sm md:text-lg font-semibold hover:scale-105 transition'
          >
            Sign In
          </Link>

          <Link
            to='/signup'
            className='border border-zinc-700 px-8 py-4 rounded-2xl font-semibold hover:bg-zinc-900 text-sm md:text-lg dark:hover:bg-zinc-100 dark:hover:text-black hover:text-white transition'
          >
            Create Account
          </Link>

        </div>

        {/* Small Features */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-10'>

          <div className='bg-zinc-900 dark:bg-white p-6 rounded-2xl'>
            <h3 className='font-bold text-xl mb-3 text-white dark:text-black'>Task Boards</h3>
            <p className='text-zinc-400 dark:text-black text-sm'>
              Drag and drop tasks easily between statuses.
            </p>
          </div>

          <div className='bg-zinc-900 dark:bg-white p-6 rounded-2xl'>
            <h3 className='font-bold text-xl mb-3 text-white dark:text-black'>Team Collaboration</h3>
            <p className='text-zinc-400 dark:text-black text-sm'>
              Assign members and track progress live.
            </p>
          </div>

          <div className='bg-zinc-900 dark:bg-white p-6 rounded-2xl'>
            <h3 className='font-bold text-xl mb-3 text-white dark:text-black'>Smart Analytics</h3>
            <p className='text-zinc-400 dark:text-black text-sm'>
              Track progress, monitor deadlines, and measure team productivity.
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Home