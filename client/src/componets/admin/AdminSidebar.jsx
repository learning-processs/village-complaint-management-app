import { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { AutContext } from '../../context/AutContext'
import { useTheme } from '../../context/ThemeContext'

const AdminSidebar = () => {

  const { user, logout } = useContext(AutContext)
  const { darkMode, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  // State to track hover on the theme button
  const [isThemeHovered, setIsThemeHovered] = useState(false)

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
    <div
      // FIXED: Changed min-h-screen to h-screen and added flex-shrink-0 to prevent content from affecting its size
      className='w-56 h-screen border-r flex flex-col flex-shrink-0 sticky top-0 overflow-hidden'
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-color)',
      }}
    >

      {/* Logo */}
      <div
        className='p-5 border-b'
        style={{ borderColor: 'var(--border-color)' }}
      >
        <h1 className='text-lg font-bold text-green-600'>GraamSeva</h1>
        <p
          className='text-xs'
          style={{ color: 'var(--text-secondary)' }}
        >
          Admin Panel
        </p>
      </div>

      {/* Nav Links */}
      <nav className='flex-1 p-4 space-y-1 overflow-y-auto'>
        {links.map((link) => {
          const isActive = location.pathname === link.path

          return (
            <Link
              key={link.path}
              to={link.path}
              className='flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition'
              style={
                isActive
                  ? {
                      backgroundColor: 'rgba(34,197,94,0.15)',
                      color: '#16a34a',
                      fontWeight: 500,
                    }
                  : {
                      color: 'var(--text-primary)',
                    }
              }
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Theme Toggle */}
      {/* Theme Toggle */}
<div className='px-4 pb-2'>
  <div className='flex items-center gap-3 px-3 py-2.5'>
    <span className='text-sm' style={{ color: 'var(--text-primary)' }}>
      {darkMode ? 'Dark Mode' : 'Light Mode'}
    </span>
    <button
      onClick={toggleTheme}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ml-auto
        ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs shadow-md transition-transform duration-300
        ${darkMode ? 'translate-x-6 bg-orange-400' : 'translate-x-0.5 bg-white'}`}
      >
        {darkMode ? '🌙' : '☀️'}
      </span>
    </button>
  </div>
</div>

      {/* User Info + Logout */}
      <div
        className='p-4 border-t'
        style={{ borderColor: 'var(--border-color)' }}
      >
        <div className='flex items-center gap-3 mb-3'>
          <div className='w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-sm'>
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <p
              className='text-sm font-medium'
              style={{ color: 'var(--text-primary)' }}
            >
              {user?.name}
            </p>

            <p
              className='text-xs'
              style={{ color: 'var(--text-secondary)' }}
            >
              Admin
            </p>
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