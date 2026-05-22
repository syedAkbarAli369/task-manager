

import React from 'react'
import { Pencil } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const TaskCard = ({ task, isMember = false }) => {

  const navigate = useNavigate()
  const location = useLocation()

  const priorityColors = {
    Low: 'bg-green-100 text-green-700 dark:bg-green-600 dark:text-white',
    Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-white',
    High: 'bg-red-100 text-red-700 dark:bg-red-600 dark:text-white'
  }

  // Helper to get member display info (name + image URL)

  const getMemberInfo = (member) => {
    if (typeof member === 'object' && member !== null) {
      const name = member.name || 'Unknown'

      let imageUrl;

      if (member.profileImageUrl && typeof member.profileImageUrl === 'string') {
        imageUrl = member.profileImageUrl
      }
      else {
        imageUrl = `https://ui-avatars.com/api/${encodeURIComponent(name)}&background=random}`
      }

      return { name, imageUrl }
    }

    return {
      name: 'Member',
      imageUrl: 'https://ui-avatars.com/api/?name=U&background=random'
    }

  }

  return (
    <div
      onClick={() => {
        if (location.pathname.includes('/user')) {
          navigate(`/user/task-details/${task._id}`)
        }
      }}
      className='bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border flex flex-col gap-4 cursor-pointer'>
      {/* PRIORITY */}
      <div className='flex items-center justify-between'>
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>

        {/* Edit */}
        {
          !isMember && (
            <button
              onClick={() => navigate(`/admin/edit-task/${task._id}`)}
              className='text-zinc-500 hover:text-black cursor-pointer  '
            >
              <Pencil size={18} />
            </button>
          )
        }

        {/* {
          isMember && (
            <button
              onClick={() => navigate(`/admin/edit-task/${task._id}`)}
              className='text-zinc-500 hover:text-black cursor-pointer'
            >
              <Pencil size={18} />
            </button>
          )
        } */}


      </div>

      {/* TITLE + DESC */}
      <div>
        <h3 className='font-semibold text-lg'>{task.title}</h3>
        <p className='text-sm text-zinc-500 mt-1 line-clamp-3'>{task.description}</p>
      </div>

      {/* TODO LIST */}
      <div className='border-r-2 border-l-2 pl-3'>
        {
          task.todoCheckList?.length > 0 && (
            <ul className='list-disc text-xs text-zinc-600 p-3 space-y-1'>
              {
                task.todoCheckList.slice(0, 3).map((todo, idx) => (
                  <li key={idx} className={todo.completed ? 'line-through' : 'text-zinc-400'}>
                    {todo.text}
                  </li>
                ))
              }

              {
                task.todoCheckList.length > 3 && (
                  <li>+ more...</li>
                )
              }

            </ul>
          )
        }

      </div>

      {/* DATES */}
      <div className='flex justify-between text-xs text-zinc-500'>
        <div>
          <p className='font-medium'>Start Date</p>
          <p>{new Date(task.createdAt).toLocaleDateString()}</p>
        </div>
        <div>
          <p className='font-medium'>Due Date</p>
          <p>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Due Date'}</p>
        </div>
      </div>

      {/* MEMBERS + ATTACHMENTS */}
      <div className='flex items-center justify-between'>
        {/* MEMBERS */}
        <div className='flex items-center'>
          {task.assignedTo?.slice(0, 3).map((member, idx) => {
            const { name, imageUrl } = getMemberInfo(member)
            return (
              <img
                key={typeof member === 'object' ? member._id : `id-${idx}`}
                src={imageUrl}
                alt={name}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
                }}
                className='w-9 h-9 rounded-full border-2 border-white object-cover -ml-2 first:ml-0'
              />
            )
          })}
          {task.assignedTo?.length > 3 && (
            <div className='w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-xs -ml-2 border-2 border-white'>
              +{task.assignedTo.length - 3}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default TaskCard