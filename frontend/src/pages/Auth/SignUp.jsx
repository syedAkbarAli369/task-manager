
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getFullImageUrl } from "../../utils/uploadImage.js";
import SignupImage from '../../assets/signup.jpg'
import toast from "react-hot-toast";

const SignUp = () => {

  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    adminInviteToken: '',
    profileImage: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      setImagePreview(URL.createObjectURL(file))

      // temporary frontend preview only

      setFormData({
        ...formData,
        profileImage: file
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const submitData = new FormData()

      submitData.append('name', formData.name)
      submitData.append('email', formData.email)
      submitData.append('password', formData.password)
      submitData.append('adminInviteToken', formData.adminInviteToken)

      if (formData.profileImage) {
        submitData.append('profileImage', formData.profileImage)
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        submitData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      toast.success('Account Created Successfully')

      navigate('/login')

    } catch (error) {

      console.error(error)

      toast.error(
        error.response?.data?.message ||
        'Signup failed Please try again later.'
      )
    }
  }

  return (
    <div className='flex flex-col items-center justify-center md:flex-row gap-9 md:h-screen overflow-hidden'
      style={{ fontFamily: 'AEONIK' }}
    >
      {/* LEFT SIDE */}
      <div className='flex items-start justify-center flex-col w-full p-9 md:pl-9 md:pr-36'>
        <h2 className='text-xl mb-3 font-bold'
          style={{ fontFamily: 'LEMONMILK' }}
        >Create Account</h2>
        <h3 className='font-medium mb-5 text-md'>Join Cheel Task Manager</h3>

        {/* IMAGE */}
        <div className='mb-5'>
          <label htmlFor='imageUpload' className='cursor-pointer'>
            <div className='w-24 h-24 rounded-full border overflow-hidden flex items-center justify-center bg-zinc-200'>
              {imagePreview ? (
                <img src={imagePreview} alt='preview' className='w-full h-full object-cover' />
              ) : (
                <span className='text-sm dark:text-black'>Upload</span>
              )}
            </div>
          </label>
          <input type='file' id='imageUpload' className='hidden' onChange={handleImageChange} />
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 text-sm w-full md:w-[80%]'>
          {['name', 'email', 'password', 'adminInviteToken'].map((field) => (
            <input
              key={field}
              type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
              name={field}
              placeholder={field === 'adminInviteToken' ? 'Admin Invite Token (Optional)' :
                field === 'name' ? 'Full Name' :
                  field === 'email' ? 'Email Address' : 'Password'}
              value={formData[field]}
              onChange={handleChange}
              className='border p-3'
            />
          ))}
          <button className='bg-black text-white p-3 rounded-md dark:bg-white dark:text-black cursor-pointer'>Signup</button>
        </form>

        <p className='pt-3'>
          Already have an account?
          <a href='/login' className='text-blue-500 ml-2'>Login</a>
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className='w-[90%] hidden md:block'>
        <div className=' flex items-center justify-center'>
          <img src={SignupImage} alt="signup image" className="w-full object-fit object-center object-cover" />
        </div>
      </div>
    </div>
  );
}

export default SignUp