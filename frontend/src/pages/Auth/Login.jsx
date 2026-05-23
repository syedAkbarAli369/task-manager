
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import LoginImage from '../../assets/login4.jpg'
import toast from "react-hot-toast"

const Login = () => {

  const navigate = useNavigate()

  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData)

      login(data)

      if (data.role === 'admin') {
        navigate('/admin/dashboard')
      }
      else {
        navigate('/user/dashboard')
      }

      toast.success('Logged in Successfully')

    } catch (error) {
      console.error('Login failed:', error)
      toast.error(error.response.data.message || 'Login failed Please try again later.')

    }

  }

  return (
    <div className='flex flex-col items-center justify-center md:flex-row gap-9 md:h-screen overflow-hidden'
      style={{ fontFamily: 'AEONIK' }}
    >

      {/* left side */}
      <div className="flex md:items-start justify-center flex-col w-full p-9 pt-27  md:pl-9 md:pr-36">
        <h2 className='text-xl mb-3 font-bold' style={{ fontFamily: 'LEMONMILK' }}>
          Welcome
        </h2>

        <h3 className="font-medium mb-3 text-md"
        >Please login in to your account</h3>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-4 text-sm w-full md:w-[80%]'
        >
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            className='border p-3'
          />

          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            className='border p-3'
          />

          <button
            className='bg-black text-white p-3 dark:bg-white dark:text-black cursor-pointer'
          >
            Login
          </button>

        </form>

        <p className="pt-3">Did not have an account? <a href="/signup" className="text-blue-500">Signup</a></p>
      </div>

      {/* right side */}
      <div className="w-[90%] hidden md:block">
        {/* /Image will be added */}
        <div className='w-full h-full flex items-center justify-center'>
          <img src={LoginImage} alt="login image" className="w-full object-fit object-center object-cover rounded-3xl" />
        </div>
      </div>


    </div>
  )
}

export default Login