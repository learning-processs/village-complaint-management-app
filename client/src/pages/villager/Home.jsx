// src/pages/villager/Home.jsx

import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AutContext } from '../../context/AutContext'
import Navbar from '../../componets/common/Navbar'

const Home = () => {

  const { user ,token} = useContext(AutContext)
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  const API = import.meta.env.VITE_API_URL

  // Fetch my complaints
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const { data } = await axios.get(`${API}/api/complaint/my`, {
          headers: { Authorization: `Bearer ${token}` }})
        if (data.success) {
          setComplaints(data.data.complaints)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    if(token) fetchComplaints()
  }, [])

  // Status badge color
  const getStatusColor = (status) => {
    if (status === 'pending') return 'bg-yellow-100 text-yellow-700'
    if (status === 'in-progress') return 'bg-blue-100 text-blue-700'
    if (status === 'resolved') return 'bg-green-100 text-green-700'
  }

  // Category icon
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

      <div className='max-w-4xl mx-auto px-4 py-8'>

        {/* Hero Section */}
        <div className='bg-green-600 rounded-2xl p-6 mb-8 text-white'>
          <h1 className='text-2xl font-bold mb-1'>
            Welcome, {user?.name}! 👋
          </h1>
          <p className='text-green-100 text-sm mb-4'>
            Village: {user?.village} · Report problems and track their status
          </p>
          <div className='flex gap-3 flex-wrap'>
            <Link
              to='/submit'
              className='bg-white text-green-600 font-semibold text-sm px-5 py-2 rounded-lg hover:bg-green-50 transition'
            >
              + Submit Complaint
            </Link>
            <Link
              to='/my-complaints'
              className='border border-white text-white text-sm px-5 py-2 rounded-lg hover:bg-green-700 transition'
            >
              My Complaints
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-3 gap-4 mb-8'>
          <div className='bg-white rounded-xl p-4 text-center shadow-sm'>
            <p className='text-2xl font-bold text-gray-700'>{complaints.length}</p>
            <p className='text-xs text-gray-500 mt-1'>Total</p>
          </div>
          <div className='bg-white rounded-xl p-4 text-center shadow-sm'>
            <p className='text-2xl font-bold text-yellow-500'>
              {complaints.filter(c => c.status === 'pending').length}
            </p>
            <p className='text-xs text-gray-500 mt-1'>Pending</p>
          </div>
          <div className='bg-white rounded-xl p-4 text-center shadow-sm'>
            <p className='text-2xl font-bold text-green-500'>
              {complaints.filter(c => c.status === 'resolved').length}
            </p>
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
              to='/my-complaints'
              className='text-sm text-green-600 hover:underline'
            >
              View all
            </Link>
          </div>

          {loading ? (
            <p className='text-center text-gray-400 py-8'>Loading...</p>
          ) : complaints.length === 0 ? (
            <div className='text-center py-8'>
              <p className='text-gray-400 text-sm'>No complaints yet!</p>
              <Link
                to='/submit'
                className='mt-3 inline-block bg-green-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-green-700 transition'
              >
                Submit First Complaint
              </Link>
            </div>
          ) : (
            <div className='space-y-3'>
              {complaints.slice(0, 5).map((complaint) => (
                <Link
                  to={`/my-complaint/${complaint._id}`}
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
                      {new Date(complaint.createdAt).toLocaleDateString()}
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

      </div>
    </div>
  )
}

export default Home