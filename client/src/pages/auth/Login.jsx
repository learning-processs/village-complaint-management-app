// src/pages/auth/Login.jsx

import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { AutContext } from '../../context/AutContext'

const Login = () => {

  const { login, loading } = useContext(AutContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await login(formData)
    console.log('Login result:', result) 

    if (result.success) {
      toast.success('Login successful!')
      // redirect based on role
      if (result.data.user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-md p-8'>

        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-green-600'>GraamSeva</h1>
          <p className='text-gray-500 mt-1'>Login to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>

          {/* Email */}
          <div>
            <label className='text-sm text-gray-600 mb-1 block'>
              Email Address
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='ramesh@gmail.com'
              required
              className='w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400'
            />
          </div>

          {/* Password */}
          <div>
            <label className='text-sm text-gray-600 mb-1 block'>
              Password
            </label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='••••••••'
              required
              className='w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400'
            />
          </div>

          {/* Submit */}
          <button
            type='submit'
            disabled={loading}
            className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 disabled:opacity-50'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        {/* Register Link */}
        <p className='text-center text-sm text-gray-500 mt-6'>
          Don't have an account?{' '}
          <Link to='/register' className='text-green-600 font-medium hover:underline'>
            Register
          </Link>
        </p>


        {/* Admin Login Link */}
        <p className='text-center text-sm text-gray-500 mt-3'>
          Are you an admin?{' '}
          <span
            onClick={() => navigate('/admin-login')}
            className='text-green-600 font-medium hover:underline cursor-pointer'
          >
            Admin Login
          </span>
        </p>

      </div>
    </div>
  )
}

export default Login