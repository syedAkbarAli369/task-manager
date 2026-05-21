

import { Trash2 } from 'lucide-react'

const TodoList = ({ todoInput, setTodoInput, formData, setFormData }) => {

  const addTodo = () => {
    if (!todoInput.trim()) return

    setFormData({
      ...formData,
      todoCheckList: [...formData.todoCheckList,
      {
        text: todoInput,
        completed: false
      }
      ]
    })

    setTodoInput('')
  }

  const deleteTodo = (index) => {
    const updatedTodos = formData.todoCheckList.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      todoCheckList: updatedTodos,
    })
  }

  return (
    <div>
      <label className='block mb-2 font-medium'>TODO Checklist</label>

      <div className='flex flex-col md:flex-row gap-3'>
        <input type='text' value={todoInput} onChange={(e) => setTodoInput(e.target.value)} placeholder='Add checklist item' className='flex-1 border p-3 rounded-xl' />
        <button type='button' onClick={addTodo} className='bg-black text-white dark:bg-white dark:text-black px-5 py-2 md:py-0 rounded-xl'>+ Add</button>
      </div>

      <div className='mt-4 flex flex-col gap-3'>
        {formData.todoCheckList.map((todo, index) => (
          <div key={index} className='flex items-center justify-between bg-zinc-100 dark:bg-zinc-900 p-3 rounded-xl'>
            <p>{todo.text}</p>
            <button type='button' onClick={() => deleteTodo(index)} className='text-red-500'>
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoList