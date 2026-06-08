// src/pages/villager/MyComplaints.jsx

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Navbar from '../../componets/common/Navbar'

const MyComplaints = () => {

  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const API = import.meta.env.VITE_API_URL

  // ─────────────────────────────────────────
  // Fetch my complaints
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const { data } = await axios.get(`${API}/api/complaint/my`)
        if (data.success) {
          setComplaints(data.data.complaints)
        }
      } catch (error) {
        toast.error('Failed to fetch complaints')
      } finally {
        setLoading(false)
      }
    }
    fetchComplaints()
  }, [])

  // ─────────────────────────────────────────
  // Delete complaint
  // ─────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this complaint?')) return

    try {
      const { data } = await axios.delete(`${API}/api/complaint/${id}`)
      if (data.success) {
        toast.success('Complaint deleted!')
        setComplaints(complaints.filter(c => c._id !== id))
      }
    } catch (error) {
      toast.error('Failed to delete complaint')
    }
  }

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
    <div className='min-h-screen bg-gray-50'>
      <Navbar />

      <div className='max-w-3xl mx-auto px-4 py-8'>

        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h1 className='text-2xl font-bold text-gray-800'>My Complaints</h1>
            <p className='text-gray-500 text-sm mt-1'>
              {complaints.length} complaint{complaints.length !== 1 ? 's' : ''} submitted
            </p>
          </div>
          <Link
            to='/submit'
            className='bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition'
          >
            + New
          </Link>
        </div>

        {/* Loading */}
        {loading ? (
          <div className='text-center py-16'>
            <p className='text-gray-400'>Loading...</p>
          </div>

        ) : complaints.length === 0 ? (
          /* Empty State */
          <div className='bg-white rounded-2xl shadow-sm p-12 text-center'>
            <p className='text-4xl mb-3'>📋</p>
            <p className='text-gray-500 text-sm'>No complaints submitted yet!</p>
            <Link
              to='/submit'
              className='mt-4 inline-block bg-green-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-green-700 transition'
            >
              Submit First Complaint
            </Link>
          </div>

        ) : (
          /* Complaints List */
          <div className='space-y-4'>
            {complaints.map((complaint) => (
              <div
                key={complaint._id}
                className='bg-white rounded-2xl shadow-sm p-5 border border-gray-100'
              >
                <div className='flex items-start gap-4'>

                  {/* Icon */}
                  <div className='w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-2xl flex-shrink-0'>
                    {getCategoryIcon(complaint.category)}
                  </div>

                  {/* Info */}
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-start justify-between gap-2'>
                      <h3 className='text-sm font-semibold text-gray-800 truncate'>
                        {complaint.title}
                      </h3>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium flex-shrink-0 ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                      </span>
                    </div>

                    <p className='text-xs text-gray-500 mt-1 line-clamp-2'>
                      {complaint.description}
                    </p>

                    <div className='flex items-center gap-3 mt-2'>
                      <span className='text-xs text-gray-400'>
                        📍 {complaint.location}
                      </span>
                      <span className='text-xs text-gray-400'>
                        🗓️ {new Date(complaint.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Admin Response */}
                    {complaint.adminResponse && (
                      <div className='mt-3 bg-green-50 border-l-4 border-green-500 px-3 py-2 rounded-r-lg'>
                        <p className='text-xs font-medium text-green-700'>Admin Response:</p>
                        <p className='text-xs text-green-600 mt-0.5'>{complaint.adminResponse}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className='flex gap-2 mt-3'>
                      <Link
                        to={`/my-complaint/${complaint._id}`}
                        className='text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition'
                      >
                        View Details
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

                {/* Images */}
                {complaint.images?.length > 0 && (
                  <div className='flex gap-2 mt-4 flex-wrap'>
                    {complaint.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt='complaint'
                        className='w-16 h-16 object-cover rounded-lg border border-gray-200'
                      />
                    ))}
                  </div>
                )}

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default MyComplaints