import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { AutContext } from '../../context/AutContext'
import AdminSidebar from '../../componets/admin/AdminSidebar'

const AdminProfile = () => {

  const { user, logout } = useContext(AutContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out!')
    navigate('/admin-login')
  }

  return (
    <div className='min-h-screen bg-gray-50 flex'>

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className='flex-1 p-6'>

        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-gray-800'>Admin Profile</h1>
          <p className='text-gray-500 text-sm mt-1'>Your account details</p>
        </div>

        <div className='max-w-lg'>

          {/* Profile Card */}
          <div className='bg-white rounded-2xl shadow-sm p-6 mb-4'>

            {/* Avatar */}
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-2xl'>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className='text-lg font-bold text-gray-800'>{user?.name}</h2>
                <span className='text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium'>
                  Admin
                </span>
              </div>
            </div>

            {/* Details */}
            <div className='space-y-3'>
              <div className='flex items-center justify-between py-3 border-b border-gray-100'>
                <p className='text-sm text-gray-500'>Email</p>
                <p className='text-sm font-medium text-gray-700'>{user?.email}</p>
              </div>
              <div className='flex items-center justify-between py-3 border-b border-gray-100'>
                <p className='text-sm text-gray-500'>Role</p>
                <p className='text-sm font-medium text-gray-700 capitalize'>{user?.role}</p>
              </div>
              <div className='flex items-center justify-between py-3 border-b border-gray-100'>
                <p className='text-sm text-gray-500'>Village</p>
                <p className='text-sm font-medium text-gray-700'>{user?.village}</p>
              </div>
              <div className='flex items-center justify-between py-3'>
                <p className='text-sm text-gray-500'>Access</p>
                <p className='text-sm font-medium text-green-600'>Full Access ✅</p>
              </div>
            </div>

          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className='w-full bg-red-50 text-red-500 hover:bg-red-100 py-3 rounded-xl text-sm font-semibold transition'
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  )
}

export default AdminProfile