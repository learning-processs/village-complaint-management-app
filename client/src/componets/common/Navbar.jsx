// src/components/common/Navbar.jsx

import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { AutContext } from '../../context/AutContext'

const Navbar = () => {

  const { user, logout } = useContext(AutContext)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully!')
    navigate('/login')
  }

  return (
    <nav className='bg-white shadow-sm border-b border-gray-200'>
      <div className='max-w-6xl mx-auto px-4 py-3 flex items-center justify-between'>

        {/* Logo */}
        <Link to='/' className='text-xl font-bold text-green-600'>
          GraamSeva
        </Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center gap-6'>
          {user?.role === 'villager' && (
            <>
              <Link to='/' className='text-sm text-gray-600 hover:text-green-600'>
                Home
              </Link>
              <Link to='/submit' className='text-sm text-gray-600 hover:text-green-600'>
                Submit Complaint
              </Link>
              <Link to='/my-complaints' className='text-sm text-gray-600 hover:text-green-600'>
                My Complaints
              </Link>
            </>
          )}

          {user?.role === 'admin' && (
            <>
              <Link to='/admin' className='text-sm text-gray-600 hover:text-green-600'>
                Dashboard
              </Link>
              <Link to='/admin/complaints' className='text-sm text-gray-600 hover:text-green-600'>
                Complaints
              </Link>
              <Link to='/admin/profile' className='text-sm text-gray-600 hover:text-green-600'>
                Profile
              </Link>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className='hidden md:flex items-center gap-3'>
          {/* User Info */}
          <div className='text-right'>
            <p className='text-sm font-medium text-gray-700'>{user?.name}</p>
            <p className='text-xs text-gray-400'>{user?.village}</p>
          </div>

          {/* Avatar */}
          <div className='w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-sm'>
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className='text-sm bg-red-50 text-red-500 hover:bg-red-100 px-4 py-1.5 rounded-lg transition'
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className='md:hidden text-gray-600'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-3'>

          {user?.role === 'villager' && (
            <>
              <Link to='/' onClick={() => setMenuOpen(false)} className='block text-sm text-gray-600 hover:text-green-600'>Home</Link>
              <Link to='/submit' onClick={() => setMenuOpen(false)} className='block text-sm text-gray-600 hover:text-green-600'>Submit Complaint</Link>
              <Link to='/my-complaints' onClick={() => setMenuOpen(false)} className='block text-sm text-gray-600 hover:text-green-600'>My Complaints</Link>
            </>
          )}

          {user?.role === 'admin' && (
            <>
              <Link to='/admin' onClick={() => setMenuOpen(false)} className='block text-sm text-gray-600 hover:text-green-600'>Dashboard</Link>
              <Link to='/admin/complaints' onClick={() => setMenuOpen(false)} className='block text-sm text-gray-600 hover:text-green-600'>Complaints</Link>
              <Link to='/admin/profile' onClick={() => setMenuOpen(false)} className='block text-sm text-gray-600 hover:text-green-600'>Profile</Link>
            </>
          )}

          <div className='flex items-center justify-between pt-2 border-t border-gray-100'>
            <div>
              <p className='text-sm font-medium text-gray-700'>{user?.name}</p>
              <p className='text-xs text-gray-400'>{user?.village}</p>
            </div>
            <button
              onClick={handleLogout}
              className='text-sm bg-red-50 text-red-500 hover:bg-red-100 px-4 py-1.5 rounded-lg transition'
            >
              Logout
            </button>
          </div>

        </div>
      )}
    </nav>
  )
}

export default Navbar