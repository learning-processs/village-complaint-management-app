import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { AutContext } from '../../context/AutContext'
import AdminSidebar from '../../componets/admin/AdminSidebar'

const ManageComplaints = () => {

  const { token } = useContext(AutContext)
  const [complaints, setComplaints] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const API = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const { data } = await axios.get(`${API}/api/admin/complaints`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (data.success) {
          setComplaints(data.data.complaints)
          setFiltered(data.data.complaints)
        }
      } catch (error) {
        toast.error('Failed to fetch complaints')
      } finally {
        setLoading(false)
      }
    }

    if (token) fetchComplaints()
  }, [token])

  useEffect(() => {
    let result = complaints

    if (statusFilter !== 'all') {
      result = result.filter(c => c.status === statusFilter)
    }

    if (categoryFilter !== 'all') {
      result = result.filter(c => c.category === categoryFilter)
    }

    setFiltered(result)
  }, [statusFilter, categoryFilter, complaints])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this complaint?')) return

    try {
      const { data } = await axios.delete(
        `${API}/api/admin/complaints/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      if (data.success) {
        toast.success('Complaint deleted!')
        setComplaints(complaints.filter(c => c._id !== id))
      }
    } catch (error) {
      toast.error('Failed to delete')
    }
  }

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

  // FIXED: Added structural layout with AdminSidebar inside the early loading state return block
  if (loading) return (
    <div
      className='min-h-screen flex'
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <AdminSidebar />
      <div className='flex-1 flex items-center justify-center'>
        <p style={{ color: 'var(--text-secondary)' }}>
          Loading...
        </p>
      </div>
    </div>
  )

  return (
    <div
      className='min-h-screen flex'
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <AdminSidebar />

      <div className='flex-1 p-6'>

        {/* Header */}
        <div className='mb-6'>
          <h1
            className='text-2xl font-bold'
            style={{ color: 'var(--text-primary)' }}
          >
            Manage Complaints
          </h1>

          <p
            className='text-sm mt-1'
            style={{ color: 'var(--text-secondary)' }}
          >
            {filtered.length} complaint{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Filters */}
        <div className='flex gap-3 mb-6 flex-wrap'>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)'
            }}
            className='border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400'
          >
            <option value='all'>All Status</option>
            <option value='pending'>Pending</option>
            <option value='in-progress'>In Progress</option>
            <option value='resolved'>Resolved</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)'
            }}
            className='border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400'
          >
            <option value='all'>All Categories</option>
            <option value='road'>Road</option>
            <option value='water'>Water</option>
            <option value='electricity'>Electricity</option>
            <option value='sanitation'>Sanitation</option>
            <option value='other'>Other</option>
          </select>

        </div>

        {/* Content */}
        {filtered.length === 0 ? (
          <div
            className='rounded-2xl p-12 text-center shadow-sm'
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <p className='text-4xl mb-3'>📋</p>

            <p style={{ color: 'var(--text-secondary)' }}>
              No complaints found!
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {filtered.map((complaint) => (
              <div
                key={complaint._id}
                className='rounded-2xl shadow-sm p-5 border'
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <div className='flex items-start gap-4'>

                  <div className='w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-2xl flex-shrink-0'>
                    {getCategoryIcon(complaint.category)}
                  </div>

                  <div className='flex-1 min-w-0'>

                    <div className='flex items-start justify-between gap-2'>
                      <h3
                        className='text-sm font-semibold'
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {complaint.title}
                      </h3>

                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium flex-shrink-0 ${getStatusColor(complaint.status)}`}
                      >
                        {complaint.status}
                      </span>
                    </div>

                    <p
                      className='text-xs mt-1 line-clamp-2'
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {complaint.description}
                    </p>

                    <div className='flex items-center gap-3 mt-2 flex-wrap'>
                      <span
                        className='text-xs'
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        👤 {complaint.villager?.name}
                      </span>

                      <span
                        className='text-xs'
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        物件 {complaint.villager?.village}
                      </span>

                      <span
                        className='text-xs'
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        📍 {complaint.location}
                      </span>

                      <span
                        className='text-xs'
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        🗓️ {new Date(
                          complaint.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <div className='flex gap-2 mt-3'>
                      <Link
                        to={`/admin/complaints/${complaint._id}`}
                        className='text-xs bg-green-50 text-green-600 px-3 py-1.5 rounded-lg hover:bg-green-100 transition'
                      >
                        Manage
                      </Link>

                      <button
                        onClick={() => handleDelete(complaint._id)}
                        className='text-xs bg-red-50 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-100 transition'
                      >
                        Delete
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default ManageComplaints