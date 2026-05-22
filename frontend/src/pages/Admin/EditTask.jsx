import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';
import TodoList from '../../components/TodoList';
import MemberModal from '../../components/MemberModal';
import SelectedMembers from '../../components/SelectedMembers';
import toast from 'react-hot-toast';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    assignedTo: [],
    todoCheckList: [],
  });
  const [todoInput, setTodoInput] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch users (same as CreateTask)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  // Fetch task data and prefill form
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setFormData({
          title: data.title,
          description: data.description || '',
          priority: data.priority || 'Medium',
          dueDate: data.dueDate ? data.dueDate.split('T')[0] : '',
          assignedTo: data.assignedTo.map(m => m._id),
          todoCheckList: data.todoCheckList || [],
        });
        setSelectedMembers(data.assignedTo.map(m => m._id));
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load task');
        navigate('/admin/dashboard');
      }
    };
    fetchTask();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addTodo = () => {
    if (!todoInput.trim()) return;
    setFormData({
      ...formData,
      todoCheckList: [...formData.todoCheckList, { text: todoInput, completed: false }]
    });
    setTodoInput('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const updateData = {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        dueDate: formData.dueDate,
        assignedTo: selectedMembers,
        todoCheckList: formData.todoCheckList,
      };
      await axios.put(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, updateData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Task updated successfully');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update task');
    }
  };

  if (loading) return <AdminLayout><div className="p-10">Loading task...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-5xl"
        style={{ fontFamily: 'AEONIK' }}
      >
        <h1 className="text-3xl font-bold mb-8"
          style={{ fontFamily: 'LEMONMILK' }}
        >Edit Task</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">Task Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-xl"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              className="w-full border p-3 rounded-xl"
            />
          </div>

          {/* Priority, Due Date, Members */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block mb-2 font-medium">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full dark:bg-black border p-3 rounded-xl"
              >
                {['Low', 'Medium', 'High'].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Assign Members</label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="bg-black text-white dark:bg-white dark:text-black px-5 py-3 rounded-xl"
                >
                  Add Members
                </button>
                <SelectedMembers users={users} selectedMembers={selectedMembers} />
              </div>
            </div>
          </div>

          {/* Todo Checklist */}
          <TodoList
            todoInput={todoInput}
            setTodoInput={setTodoInput}
            formData={formData}
            setFormData={setFormData}
          />


          <button type="submit" className="bg-black text-white dark:bg-white dark:text-black p-4 rounded-xl font-semibold">
            Update Task
          </button>
        </form>

        {isModalOpen && (
          <MemberModal
            users={users}
            selectedMembers={selectedMembers}
            setSelectedMembers={setSelectedMembers}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default EditTask;