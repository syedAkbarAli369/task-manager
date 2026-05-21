

import React from 'react'
import AdminLayout from '../../components/AdminLayout'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import TaskCard from '../../components/TaskCard'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

const Dashboard = () => {

  const [stats, setStats] = useState()
  const [tasks, setTasks] = useState([])

  useEffect(() => {

    const fetchDashboardData = async () => {

      try {
        const user = JSON.parse(localStorage.getItem('user'))

        // fetch dashboard stats
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/reports/dashboard`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })

        setStats(data)

        // fetch tasks
        const taskResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })

        setTasks(taskResponse.data)

      } catch (error) {
        console.error(error)

      }

    }

    fetchDashboardData()

  }, [])

  // Helper to reorder task with in a single column
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)

    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  // Move task between columns
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source)
    const destinationClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)
    destinationClone.splice(droppableDestination.index, 0, removed)

    return { sourceClone, destinationClone }
  }

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result
    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return



    // Find the task being dragged 
    const draggedTask = tasks.find(t => t._id === draggableId)
    if (!draggedTask) return

    // Determine new status based on destination column id
    let newStatus = destination.droppableId

    // Validate status 
    if (!['Acknowledged', 'Working', 'Completed'].includes(newStatus)) return

    // Create copies of current filtered arrays
    let acknowledged = tasks.filter(t => t.status === 'Acknowledged')
    let working = tasks.filter(t => t.status === 'Working')
    let completed = tasks.filter(t => t.status === 'Completed')

    // Remove from source column 
    if (source.droppableId === 'Acknowledged') {
      acknowledged.splice(source.index, 1)
    }
    else if (source.droppableId === 'Working') {
      working.splice(source.index, 1)
    }
    else {
      completed.splice(source.index, 1)
    }

    // Add to destination column with updated status 
    const updatedTask = { ...draggedTask, status: newStatus }
    if (destination.droppableId === 'Acknowledged') {
      acknowledged.splice(destination.index, 0, updatedTask)
    }
    else if (destination.droppableId === 'Working') {
      working.splice(destination.index, 0, updatedTask)
    }
    else {
      completed.splice(destination.index, 0, updatedTask)
    }

    // Merge back into one tasks array 
    const newTasks = [...acknowledged, ...working, ...completed]
    setTasks(newTasks)

    // Optimistically update backend
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/tasks/${draggableId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      )

    } catch (error) {
      console.error('Failed to update status', error)

      // rollback UI by refetching tasks
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('user')?.token}` }
      })

      setTasks(data)

    }

  }

  // filter task 
  const acknowledgedTasks = tasks.filter(task => task.status === 'Acknowledged')

  const workingTasks = tasks.filter(task => task.status === 'Working')

  const completedTasks = tasks.filter(task => task.status === 'Completed')

  const columns = [
    { id: 'Acknowledged', title: 'Acknowledged', tasks: acknowledgedTasks },
    { id: 'Working', title: 'Working', tasks: workingTasks },
    { id: 'Completed', title: 'Completed', tasks: completedTasks },
  ]

  return (
    <AdminLayout>
      <div style={{ fontFamily: 'AEONIK' }}>
        {/* HEADING */}
        <h1 className='text-3xl font-bold mb-8'
          style={{ fontFamily: 'LEMONMILK' }}
        >Dashboard</h1>

        {/* Draggable Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-9'>
            {
              columns.map(column => (
                <Droppable key={column.id} droppableId={column.id}>
                  {
                    (provided, snapshot) => (
                      <div ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`bg-zinc-100 dark:bg-zinc-900 p-3 rounded-2xl transition-colors `}
                      >
                        <h2 className='text-xl font-bold mb-3 text-center'
                          style={{ fontFamily: 'LEMONMILK' }}
                        >{column.title}</h2>
                        <div className='flex flex-col gap-4'>
                          {
                            column.tasks.map((task, index) => (
                              <Draggable key={task._id} draggableId={task._id} index={index}>
                                {
                                  (provided, snapshot) => (
                                    <div ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        ...provided.draggableProps.style,
                                        opacity: snapshot.isDragging ? 0.8 : 1
                                      }}
                                    >
                                      <TaskCard task={task} />
                                    </div>
                                  )
                                }
                              </Draggable>
                            ))
                          }
                          {provided.placeholder}
                        </div>
                      </div>
                    )
                  }
                </Droppable>
              ))
            }
          </div>
        </DragDropContext>

      </div>
    </AdminLayout>
  )
}

export default Dashboard