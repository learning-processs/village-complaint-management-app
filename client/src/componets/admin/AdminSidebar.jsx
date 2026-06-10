
import { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { AutContext } from '../../context/AutContext'
import { useTheme } from '../../context/ThemeContext'

const AdminSidebar = () => {

  const { user, logout } = useContext(AutContext)
  const { darkMode, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out!')
    navigate('/login')
  }

  const links = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/complaints', label: 'Complaints', icon: '📋' },
    { path: '/admin/profile', label: 'Profile', icon: '👤' },
  ]

  return (
    <div className='w-56 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col'>

      {/* Logo */}
      <div className='p-5 border-b border-gray-100 dark:border-gray-700'>
        <h1 className='text-lg font-bold text-green-600'>GraamSeva</h1>
        <p className='text-xs text-gray-400'>Admin Panel</p>
      </div>

      {/* Nav Links */}
      <nav className='flex-1 p-4 space-y-1'>
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition
              ${location.pathname === link.path
                ? 'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-400 font-medium'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
          >
            <span>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Dark Mode Toggle */}
      <div className='px-4 pb-2'>
        <button
          onClick={toggleTheme}
          className='w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition'
        >
          <span>{darkMode ? '☀️' : '🌙'}</span>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* User Info + Logout */}
      <div className='p-4 border-t border-gray-100 dark:border-gray-700'>
        <div className='flex items-center gap-3 mb-3'>
          <div className='w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-sm'>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className='text-sm font-medium text-gray-700 dark:text-gray-200'>{user?.name}</p>
            <p className='text-xs text-gray-400'>Admin</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className='w-full text-sm bg-red-50 text-red-500 hover:bg-red-100 py-2 rounded-lg transition'
        >
          Logout
        </button>
      </div>

    </div>
  )
}

export default AdminSidebar