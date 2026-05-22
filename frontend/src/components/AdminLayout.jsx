

import React from 'react'
import AdminSidebar from './AdminSidebar'

const AdminLayout = ({ children }) => {
  return (
    <div className='flex flex-col md:flex-row'>
      <AdminSidebar />

      <div className='flex-1 p-6 bg-zinc-100 dark:bg-zinc-950'>
        {children}
      </div>
    </div>
  )
}

export default AdminLayout