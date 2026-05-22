

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/AdminLayout'

const Team = () => {

  const [team, setTeam] = useState([])

  const fetchTeam = async () => {
    const user = JSON.parse(localStorage.getItem('user'))

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/users/team`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    )

    setTeam(data)
  }

  useEffect(() => {

    fetchTeam();

  }, [])

  return (
    <AdminLayout>
      <div>
        <div>
          <h1 className='text-3xl font-bold mb-8'
            style={{ fontFamily: 'LEMONMILK' }}
          >TEAM MEMBERS</h1>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'
          style={{ fontFamily: 'AEONIK' }}
        >

          {
            team.map(member => (
              <div key={member._id} className='bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow border'>
                {/* user */}
                <div className='flex items-center gap-4 mb-5'>
                  {/* <img src={
                member.profileImageUrl ? `http://localhost${member.profileImageUrl}}` : `https://ui-avatars.com/api/?name=${member.name}`
              } alt={member.name}
                className='w-18 h-18 rounded-full object-cover'
              /> */}

                  <img
                    src={
                      member.profileImageUrl && !member.profileImageUrl.startsWith('blob:')
                        ? `${import.meta.env.VITE_API_URL}${member.profileImageUrl}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`
                    }
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`
                    }}
                    alt={member.name}
                    className='w-18 h-18 rounded-full object-cover'
                  />

                  <div>
                    <h2 className='font-bold text-lg'>{member.name}</h2>
                    <p className='text-zinc-500 text-sm'>{member.email}</p>
                  </div>
                </div>


                {/* stats */}
                <div className='grid grid-cols-3 gap-3'>
                  <div className='bg-gray-100 dark:bg-gray-600 p-3 rounded-xl text-center flex flex-col items-center justify-center'>
                    <p>{member.taskStats.acknowledged}</p>
                    <p className='text-xs'>Acknowledged</p>
                  </div>
                  <div className='bg-blue-100 dark:bg-blue-600 p-3 rounded-xl text-center'>
                    <p>{member.taskStats.working}</p>
                    <p className='text-xs'>Working</p>
                  </div>
                  <div className='bg-green-100 dark:bg-green-600 p-3 rounded-xl text-center'>
                    <p>{member.taskStats.completed}</p>
                    <p className='text-xs'>Completed</p>
                  </div>

                </div>
              </div>
            ))
          }

        </div>
      </div>
    </AdminLayout>
  )
}

export default Team