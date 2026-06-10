
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { AutContext } from '../../context/AutContext'
import { useTheme } from '../../context/ThemeContext'

const Navbar = () => {

  const { user, logout } = useContext(AutContext)
  const {darkMode , toggleTheme} = useTheme();
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully!')
    navigate('/login')
  }

 return (
<nav style={{ backgroundColor: 'var(--nav-bg)', borderBottom: '1px solid var(--border-color)' }} className='shadow-sm'>       
   <div className='max-w-6xl mx-auto px-4 py-3 flex items-center justify-between'>

        {/* Logo */}
        <Link to='/' className='text-xl font-bold text-green-600'>
          GraamSeva
        </Link>

       {/* Desktop Menu */}
        <div className='hidden md:flex items-center gap-4'>
          {user?.role === 'villager' && (
            <>
              <Link to='/' className='text-sm font-semibold text-gray-800 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition'>
                Home
              </Link>
              <Link to='/submit' className='text-sm font-semibold text-gray-800 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition'>
                Submit Complaint
              </Link>
              <Link to='/my-complaints' className='text-sm font-semibold text-gray-800 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition'>
                My Complaints
              </Link>
            </>
          )}

          {user?.role === 'admin' && (
            <>
              <Link to='/admin' className='text-sm font-semibold text-gray-800 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 transition'>
                Dashboard
              </Link>
              <Link to='/admin/complaints' className='text-sm font-semibold text-gray-800 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 transition'>
                Complaints
              </Link>
              <Link to='/admin/profile' className='text-sm font-semibold text-gray-800 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 transition'>
                Profile
              </Link>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className='hidden md:flex items-center gap-3'>

          {/* 🌙 Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className='w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-lg transition'
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {/* User Info */}
         <div className='text-right'>
          <p className='text-sm font-semibold text-gray-500'>{user?.name}</p>
          <p className='text-xs font-medium text-gray-500'>{user?.village}</p>
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
        <div className='md:hidden flex items-center gap-2'>
          {/* Dark mode toggle mobile */}
          <button
            onClick={toggleTheme}
            className='w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-lg'
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button
            className='text-gray-600 dark:text-gray-300'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ backgroundColor: 'var(--nav-bg)', borderTop: '1px solid var(--border-color)' }} className='md:hidden px-4 py-3 space-y-3'>
          {user?.role === 'villager' && (
            <>
              <Link to='/' onClick={() => setMenuOpen(false)} className='block text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-green-600'>Home</Link>
              <Link to='/submit' onClick={() => setMenuOpen(false)} className='block text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-green-600'>Submit Complaint</Link>
              <Link to='/my-complaints' onClick={() => setMenuOpen(false)} className='block text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-green-600'>My Complaints</Link>
            </>
          )}
          {user?.role === 'admin' && (
            <>
              <Link to='/admin' onClick={() => setMenuOpen(false)} className='block text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-green-600'>Dashboard</Link>
              <Link to='/admin/complaints' onClick={() => setMenuOpen(false)} className='block text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-green-600'>Complaints</Link>
              <Link to='/admin/profile' onClick={() => setMenuOpen(false)} className='block text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-green-600'>Profile</Link>
            </>
          )}
          <div className='flex items-center justify-between pt-2' style={{ borderTop: '1px solid var(--border-color)' }}>
            <div>
              <p className='text-sm font-semibold text-gray-800 dark:text-gray-100'>{user?.name}</p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>{user?.village}</p>
            </div>
            <button onClick={handleLogout} className='text-sm bg-red-50 text-red-500 px-4 py-1.5 rounded-lg'>
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar