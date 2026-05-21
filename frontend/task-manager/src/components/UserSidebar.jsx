

import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const UserSidebar = () => {

  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const linkClass = ({ isActive }) => `p-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-black text-white dark:bg-white dark:text-black' : 'hover:bg-zinc-200 dark:hover:bg-zinc-800'}`

  const navItems = ['Dashboard', 'My Tasks']

  const navPaths = ['/user/dashboard', '/user/my-task']

  return (
    <div className='md:w-[18%] md:min-h-screen border-r p-3 pb-9 flex flex-col justify-between bg-white dark:bg-zinc-900'
      style={{ fontFamily: 'AEONIK' }}
    >
      {/* TOP */}
      <div>
        {/* LOGO */}
        <div className='p-3 pb-9 pt-9 flex flex-col items-center justify-center'>
          <h1 className='text-xl font-bold'
            style={{ fontFamily: 'LEMONMILK' }}
          >CHEEL</h1>
          <p className='text-sm text-zinc-500 text-center'>Task Manager</p>
        </div>

        {/* NAV LINKS */}
        <div className='flex flex-col gap-3'>
          {navItems.map((item, i) => (
            <NavLink key={item} to={navPaths[i]} className={linkClass}>
              {item}
            </NavLink>
          ))}

          <button onClick={handleLogout} className='p-3 rounded-lg transition-all duration-300 bg-red-600 text-white hover:text-black hover:bg-zinc-200 dark:hover:bg-zinc-800' >
            Logout
          </button>
        </div>


      </div>


    </div>
  )
}

export default UserSidebar