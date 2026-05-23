
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import AdminLayout from '../../components/AdminLayout'
import TodoList from '../../components/TodoList'
import MemberModal from '../../components/MemberModal'
import SelectedMembers from '../../components/SelectedMembers'
import toast from 'react-hot-toast'

const CreateTask = () => {

  const [users, setUsers] = useState([])

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    assignedTo: [],
    todoCheckList: [],
  })

  const [todoInput, setTodoInput] = useState('')
  // const [fileList, setFileList] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState([])

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })

        setUsers(data)

      } catch (error) {
        console.log(error)

      }
    }

    fetchUsers()
  }, [])

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Add todo 
  const addTodo = () => {
    if (!todoInput.trim()) return

    setFormData({
      ...formData,
      todoCheckList: [...formData.todoCheckList, { text: todoInput, completed: false }]
    })

    setTodoInput('')
  }

  // handle file change
  // const handleFileChange = (e) => {
  //   setFileList(Array.from(e.target.files))
  // }

  // Submit 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem('user'));

      // Send as regular JSON (not FormData)
      const submitData = {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        dueDate: formData.dueDate,
        assignedTo: selectedMembers,
        todoCheckList: formData.todoCheckList,
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks`, submitData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });

      toast.success('Task created successfully');

      // Optional: reset form
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
        assignedTo: [],
        todoCheckList: [],
      });
      setSelectedMembers([]);
      setTodoInput('');

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to create task');
    }
  };

  return (
    <AdminLayout>
      <div className='max-w-5xl'
        style={{ fontFamily: 'AEONIK' }}
      >
        <h1 className='text-3xl font-bold mb-8'
          style={{ fontFamily: 'LEMONMILK' }}
        >Create Task</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          {/* TITLE */}
          <div>
            <label className='block mb-2 font-medium'>Task Title</label>
            <input type='text' name='title' value={formData.title} onChange={handleChange} placeholder='Enter task title' className='w-full border p-3 rounded-xl' />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className='block mb-2 font-medium'>Description</label>
            <textarea name='description' value={formData.description} onChange={handleChange} placeholder='Enter description' rows='5' className='w-full border p-3 rounded-xl' />
          </div>

          {/* PRIORITY + DATE + MEMBER */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
            <div>
              <label className='block mb-2 font-medium'>Priority</label>
              <select name='priority' value={formData.priority} onChange={handleChange} className='w-full border p-3 rounded-xl dark:bg-black'>
                {['Low', 'Medium', 'High'].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* DUE DATE */}
            <div>
              <label className='block mb-2 font-medium'>Due Date</label>
              <input type='date' name='dueDate' value={formData.dueDate} onChange={handleChange} className='w-full border p-3 rounded-xl' />
            </div>

            {/* ASSIGN TO */}
            <div>
              <label className='block mb-2 font-medium'>Assign Members</label>
              <div className='flex items-center gap-4'>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(true)}
                  className='bg-black text-white dark:bg-white dark:text-black px-5 py-3 rounded-xl'
                >Add Members</button>

                <SelectedMembers
                  users={users}
                  selectedMembers={selectedMembers}
                />

                {
                  isModalOpen && <MemberModal users={users} selectedMembers={selectedMembers} setSelectedMembers={setSelectedMembers} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                }

              </div>

            </div>


          </div>

          {/* TODO CHECKLIST */}
          <TodoList todoInput={todoInput} setTodoInput={setTodoInput} formData={formData} setFormData={setFormData} />


          {/* BUTTON */}
          <button type='submit' className='bg-black text-white dark:bg-white dark:text-black p-4 rounded-xl font-semibold cursor-pointer'>Create Task</button>
        </form>
      </div>
    </AdminLayout>
  )
}

export default CreateTask