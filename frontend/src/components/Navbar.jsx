

import { useState, useEffect } from "react"
import cheel from '../assets/cheel2.png'
import { Sun, Moon } from 'lucide-react'

const Navbar = () => {

  const [darkMode, setDarkMode] = useState();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    }
    else {
      document.documentElement.classList.remove('dark')
    }

  }, [darkMode])


  return (
    <nav className="flex items-center justify-between px-3 md:px-9 py-3 border-b bg-white dark:bg-zinc-900 dark:text-white absolute top-0 left-0 right-0 w-full overflow-hidden">

      {/* Left side */}
      <div style={{ fontFamily: 'LEMONMILK' }} className="flex items-center justify-center gap-3"
      >
        <div className="w-13 h-13 rounded-full bg-white flex items-center justify-center">
          <img src={cheel} className="w-27 h-27 object-cover" alt="image" />
        </div>

        <h1 className="text-md md:text-xl font-bold ">CHEEL TASK MANAGER</h1>
      </div>

      {/* Right side */}
      <div>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun /> : <Moon />}
        </button>
      </div>

    </nav>
  )
}

export default Navbar