import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserLayout from '../../components/UserLayout'
import TaskCard from '../../components/TaskCard'

const MyTask = () => {

  const [tasks, setTasks] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchTasks = async () => {

      try {

        const user = JSON.parse(localStorage.getItem('user'))

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/tasks/my`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        )

        setTasks(data)

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)

      }

    }

    fetchTasks()

  }, [])

  return (
    <UserLayout>

      <div>

        <div>
          <h1 className='text-3xl font-bold mb-8'
            style={{ fontFamily: 'LEMONMILK' }}
          >My Tasks</h1>

        </div>

        <div className='flex flex-col gap-4'
          style={{ fontFamily: 'AEONIK' }}
        >

          {
            tasks.map(task => (

              <div
                key={task._id}
                className='bg-white dark:bg-zinc-900 p-5 rounded-2xl border shadow-sm flex md:flex-row flex-col justify-between'
              >

                <div>
                  <h2 className='font-bold text-lg'>
                    {task.title}
                  </h2>

                  <p className='text-zinc-500 text-sm'>
                    {task.description}
                  </p>
                </div>

                <div className='flex flex-col md:flex-row mt-9 items-center gap-3'>

                  <div>
                    <p className='text-sm font-medium'>
                      {task.priority}
                    </p>
                  </div>

                  <div>
                    <p className='text-sm'>
                      {
                        task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString()
                          : 'No Date'
                      }
                    </p>
                  </div>

                  <div>
                    <span className='bg-blue-100 dark:bg-blue-600 px-3 py-1 rounded-full text-sm'>
                      {task.status}
                    </span>
                  </div>

                  {/* <button
                  onClick={() => navigate(`/user/task-details/${task._id}`)}
                  className='bg-black text-white px-4 py-2 rounded-xl'
                >
                  Open
                </button> */}

                </div>

              </div>

            ))
          }

        </div>

      </div>


    </UserLayout>
  )
}

export default MyTask