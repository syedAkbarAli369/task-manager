

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserLayout from '../../components/UserLayout'
import axios from 'axios'

const ViewTaskDetails = () => {

  const { id } = useParams()

  const [task, setTask] = useState(null)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))

        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        )

        setTask(data)

      } catch (error) {
        console.log(error)

      }


    }

    fetchTask()
  }, [id])

  if (!task) {
    return (
      <UserLayout>
        <div>Loading...</div>

      </UserLayout>
    )

  }


  return (
    <UserLayout>

      <div className='max-w-5xl mx-auto'
        style={{ fontFamily: 'AEONIK' }}
      >

        {/* TITLE */}
        <div className='mb-6'>
          <h1 className='text-4xl font-bold'
            style={{ fontFamily: 'LEMONMILK' }}
          >{task.title}</h1>

          <p className='text-zinc-500 mt-2'>
            {task.description}
          </p>
        </div>

        {/* STATUS + PRIORITY */}
        <div className='flex gap-4 mb-6'>

          <div className='bg-yellow-100 dark:bg-yellow-400 px-4 py-2 rounded-xl'>
            {task.priority}
          </div>


          <select value={task.status}
            onChange={async (e) => {
              const newStatus = e.target.value
              setTask({
                ...task,
                status: newStatus
              })

              try {
                const user = JSON.parse(localStorage.getItem('user'))

                await axios.put(`${import.meta.env.VITE_API_URL}/api/tasks/${task._id}`,
                  { status: newStatus },
                  {
                    headers: {
                      Authorization: `Bearer ${user.token}`
                    }
                  }
                )

              } catch (error) {
                console.log(error)

              }

            }}

            className='bg-blue-100 dark:bg-blue-600 px-4 py-2 rounded-xl outline-none'
          >
            <option value="Acknowledged">Acknowledged</option>
            <option value="Working">Working</option>
            <option value="Completed">Completed</option>

          </select>

        </div>

        {/* DUE DATE */}
        <div className='mb-6'>
          <h2 className='font-bold mb-2'>Due Date</h2>

          <p>
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : 'No due date'}
          </p>
        </div>

        {/* MEMBERS */}
        <div className='mb-6'>

          <h2 className='font-bold mb-3'>Assigned Members</h2>

          <div className='flex gap-4 flex-wrap'>

            {
              task.assignedTo.map(member => (
                <div
                  key={member._id}
                  className='flex items-center gap-3 bg-zinc-200 dark:bg-zinc-900 px-4 py-2 rounded-xl'
                >

                  <img
                    src={
                      member.profileImageUrl && !member.profileImageUrl.startsWith('blob:') ?
                        member.profileImageUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`
                    }
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}`
                    }}
                    alt={member.name}
                    className='w-12 h-12 rounded-full object-cover'
                  />

                  <div>
                    <p className='font-medium'>{member.name}</p>
                  </div>

                </div>
              ))
            }

          </div>

        </div>

        {/* CHECKLIST */}
        <div className='mb-6'>

          <h2 className='font-bold mb-3'>Checklist</h2>

          <div className='flex flex-col gap-3'>

            {
              task.todoCheckList.map((item, index) => (

                <label
                  key={index}
                  className='flex items-center gap-3 bg-zinc-100 dark:bg-zinc-900 p-3 rounded-xl'
                >

                  <input type="checkbox"
                    checked={item.completed}
                    onChange={async () => {
                      const updatedCheckList = [...task.todoCheckList]

                      updatedCheckList[index].completed = !updatedCheckList[index].completed

                      setTask({
                        ...task,
                        todoCheckList: updatedCheckList
                      })

                      try {
                        const user = JSON.parse(localStorage.getItem('user'))

                        await axios.put(
                          `${import.meta.env.VITE_API_URL}/api/tasks/${task._id}`, {
                          todoCheckList: updatedCheckList
                        },
                          {
                            headers: {
                              Authorization: `Bearer ${user.token}`
                            }
                          }
                        )

                      } catch (error) {
                        console.log(error)

                      }

                    }}


                  />


                  <span>
                    {item.text}
                  </span>
                </label>

              ))
            }

          </div>

        </div>


      </div>

    </UserLayout>
  )
}

export default ViewTaskDetails