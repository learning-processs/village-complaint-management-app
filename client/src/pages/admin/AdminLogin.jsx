// src/pages/admin/AdminLogin.jsx

import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { AutContext } from '../../context/AutContext'

const AdminLogin = () => {

  const { login } = useContext(AutContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const result = await login(formData)

    if (result.success) {
      if (result.data.user.role !== 'admin') {
        toast.error('Access denied! Admins only.')
        setLoading(false)
        return
      }
      toast.success('Welcome Admin!')
      navigate('/admin')
    } else {
      toast.error(result.message)
    }

    setLoading(false)
  }

  return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>

        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-green-400'>GraamSeva</h1>
          <p className='text-gray-400 mt-1'>Admin Portal</p>
        </div>

        <div className='bg-gray-800 rounded-2xl p-8'>
          <h2 className='text-xl font-semibold text-white mb-6'>Admin Login</h2>

          <form onSubmit={handleSubmit} className='space-y-4'>

            <div>
              <label className='text-sm text-gray-400 mb-1 block'>Email</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='admin@gramseva.com'
                required
                className='w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400'
              />
            </div>

            <div>
              <label className='text-sm text-gray-400 mb-1 block'>Password</label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='••••••••'
                required
                className='w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400'
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50'
            >
              {loading ? 'Logging in...' : 'Login as Admin'}
            </button>

          </form>

          <p className='text-center text-sm text-gray-500 mt-6'>
            Not an admin?{' '}
            <span
              onClick={() => navigate('/login')}
              className='text-green-400 cursor-pointer hover:underline'
            >
              Villager Login
            </span>
          </p>

        </div>
      </div>
    </div>
  )
}

export default AdminLogin