// src/pages/admin/AdminDashboard.jsx

import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AutContext } from '../../context/AutContext'
import AdminSidebar from '../../componets/admin/AdminSidebar'

const AdminDashboard = () => {

  const { token } = useContext(AutContext)
  const [stats, setStats] = useState(null)
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  const API = import.meta.env.VITE_API_URL

  // ─────────────────────────────────────────
  // Fetch stats & recent complaints
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` }

        const [statsRes, complaintsRes] = await Promise.all([
          axios.get(`${API}/api/admin/stats`, { headers }),
          axios.get(`${API}/api/admin/complaints`, { headers }),
        ])

        if (statsRes.data.success) setStats(statsRes.data.data)
        if (complaintsRes.data.success) setComplaints(complaintsRes.data.data.complaints)

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    if (token) fetchData()
  }, [token])

  // ─────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────
  const getStatusColor = (status) => {
    if (status === 'pending') return 'bg-yellow-100 text-yellow-700'
    if (status === 'in-progress') return 'bg-blue-100 text-blue-700'
    if (status === 'resolved') return 'bg-green-100 text-green-700'
  }

  const getCategoryIcon = (category) => {
    if (category === 'road') return '🛣️'
    if (category === 'water') return '💧'
    if (category === 'electricity') return '⚡'
    if (category === 'sanitation') return '🧹'
    return '📋'
  }

  return (
    <div className='min-h-screen bg-gray-50 flex'>

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className='flex-1 p-6'>

        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-gray-800'>Dashboard</h1>
          <p className='text-gray-500 text-sm mt-1'>
            Overview of all complaints
          </p>
        </div>

        {loading ? (
          <p className='text-gray-400'>Loading...</p>
        ) : (
          <>
            {/* Stats Cards */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
              <div className='bg-white rounded-xl p-4 shadow-sm text-center'>
                <p className='text-3xl font-bold text-gray-700'>{stats?.total || 0}</p>
                <p className='text-xs text-gray-500 mt-1'>Total</p>
              </div>
              <div className='bg-white rounded-xl p-4 shadow-sm text-center'>
                <p className='text-3xl font-bold text-yellow-500'>{stats?.pending || 0}</p>
                <p className='text-xs text-gray-500 mt-1'>Pending</p>
              </div>
              <div className='bg-white rounded-xl p-4 shadow-sm text-center'>
                <p className='text-3xl font-bold text-blue-500'>{stats?.inProgress || 0}</p>
                <p className='text-xs text-gray-500 mt-1'>In Progress</p>
              </div>
              <div className='bg-white rounded-xl p-4 shadow-sm text-center'>
                <p className='text-3xl font-bold text-green-500'>{stats?.resolved || 0}</p>
                <p className='text-xs text-gray-500 mt-1'>Resolved</p>
              </div>
            </div>

            {/* Recent Complaints */}
            <div className='bg-white rounded-2xl shadow-sm p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg font-semibold text-gray-700'>
                  Recent Complaints
                </h2>
                <Link
                  to='/admin/complaints'
                  className='text-sm text-green-600 hover:underline'
                >
                  View all
                </Link>
              </div>

              {complaints.length === 0 ? (
                <p className='text-center text-gray-400 py-8'>
                  No complaints yet!
                </p>
              ) : (
                <div className='space-y-3'>
                  {complaints.slice(0, 5).map((complaint) => (
                    <Link
                      to={`/admin/complaints/${complaint._id}`}
                      key={complaint._id}
                      className='flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition border border-gray-100'
                    >
                      {/* Icon */}
                      <div className='w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-xl flex-shrink-0'>
                        {getCategoryIcon(complaint.category)}
                      </div>

                      {/* Info */}
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium text-gray-700 truncate'>
                          {complaint.title}
                        </p>
                        <p className='text-xs text-gray-400 mt-0.5'>
                          {complaint.villager?.name} · {complaint.villager?.village}
                        </p>
                      </div>

                      {/* Status */}
                      <span className={`text-xs px-3 py-1 rounded-full font-medium flex-shrink-0 ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard