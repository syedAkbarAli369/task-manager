

import React from 'react'
import UserSidebar from './UserSidebar'

const UserLayout = ({ children }) => {
  return (
    <div className='flex flex-col md:flex-row'>

      <UserSidebar />

      <div className='flex-1 p-6'>
        {children}
      </div>

    </div>
  )
}

export default UserLayout