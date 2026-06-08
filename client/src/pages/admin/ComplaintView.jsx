// src/pages/admin/ComplaintView.jsx

import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { AutContext } from '../../context/AutContext'
import AdminSidebar from '../../componets/admin/AdminSidebar'

const ComplaintView = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const { token } = useContext(AutContext)

  const [complaint, setComplaint] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  const [status, setStatus] = useState('')
  const [adminResponse, setAdminResponse] = useState('')

  const API = import.meta.env.VITE_API_URL

  // ─────────────────────────────────────────
  // Fetch complaint
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const { data } = await axios.get(`${API}/api/complaint/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (data.success) {
          setComplaint(data.data.complaint)
          setStatus(data.data.complaint.status)
          setAdminResponse(data.data.complaint.adminResponse || '')
        }
      } catch (error) {
        toast.error('Failed to fetch complaint')
      } finally {
        setLoading(false)
      }
    }
    if (token) fetchComplaint()
  }, [id, token])

  // ─────────────────────────────────────────
  // Update complaint
  // ─────────────────────────────────────────
  const handleUpdate = async () => {
    setUpdating(true)
    try {
      const { data } = await axios.put(
        `${API}/api/admin/complaints/${id}`,
        { status, adminResponse },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        toast.success('Complaint updated successfully!')
        setComplaint(data.data.complaint)
      }
    } catch (error) {
      toast.error('Failed to update complaint')
    } finally {
      setUpdating(false)
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

  if (loading) return (
    <div className='min-h-screen bg-gray-50 flex'>
      <AdminSidebar />
      <div className='flex-1 flex items-center justify-center'>
        <p className='text-gray-400'>Loading...</p>
      </div>
    </div>
  )

  if (!complaint) return (
    <div className='min-h-screen bg-gray-50 flex'>
      <AdminSidebar />
      <div className='flex-1 flex items-center justify-center'>
        <p className='text-gray-400'>Complaint not found!</p>
      </div>
    </div>
  )

  return (
    <div className='min-h-screen bg-gray-50 flex'>

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className='flex-1 p-6'>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 mb-6 transition'
        >
          ← Back
        </button>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

          {/* Left — Complaint Info */}
          <div className='space-y-4'>

            {/* Complaint Card */}
            <div className='bg-white rounded-2xl shadow-sm p-6'>

              {/* Header */}
              <div className='flex items-start gap-3 mb-4'>
                <div className='w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl'>
                  {getCategoryIcon(complaint.category)}
                </div>
                <div className='flex-1'>
                  <h1 className='text-lg font-bold text-gray-800'>
                    {complaint.title}
                  </h1>
                  <div className='flex items-center gap-2 mt-1'>
                    <span className='text-xs text-gray-400 capitalize'>
                      {complaint.category}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className='mb-4'>
                <p className='text-xs font-medium text-gray-500 mb-1'>
                  Description
                </p>
                <p className='text-sm text-gray-700 leading-relaxed'>
                  {complaint.description}
                </p>
              </div>

              {/* Location & Date */}
              <div className='grid grid-cols-2 gap-3 mb-4'>
                <div>
                  <p className='text-xs font-medium text-gray-500 mb-1'>Location</p>
                  <p className='text-sm text-gray-700'>📍 {complaint.location}</p>
                </div>
                <div>
                  <p className='text-xs font-medium text-gray-500 mb-1'>Date</p>
                  <p className='text-sm text-gray-700'>
                    🗓️ {new Date(complaint.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Images */}
              {complaint.images?.length > 0 && (
                <div>
                  <p className='text-xs font-medium text-gray-500 mb-2'>Photos</p>
                  <div className='flex gap-3 flex-wrap'>
                    {complaint.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt='complaint'
                        className='w-24 h-24 object-cover rounded-xl border border-gray-200'
                      />
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Villager Info */}
            <div className='bg-white rounded-2xl shadow-sm p-5'>
              <p className='text-xs font-medium text-gray-500 mb-3'>
                Submitted by
              </p>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold'>
                  {complaint.villager?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-700'>
                    {complaint.villager?.name}
                  </p>
                  <p className='text-xs text-gray-400'>
                    {complaint.villager?.village} · {complaint.villager?.phone}
                  </p>
                  <p className='text-xs text-gray-400'>
                    {complaint.villager?.email}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right — Admin Actions */}
          <div className='space-y-4'>

            {/* Update Status */}
            <div className='bg-white rounded-2xl shadow-sm p-6'>
              <h2 className='text-base font-semibold text-gray-700 mb-4'>
                Update Complaint
              </h2>

              {/* Status Select */}
              <div className='mb-4'>
                <label className='text-sm text-gray-500 mb-2 block'>
                  Update Status
                </label>
                <div className='flex gap-2 flex-wrap'>
                  {['pending', 'in-progress', 'resolved'].map(s => (
                    <button
                      key={s}
                      onClick={() => setStatus(s)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium border transition capitalize
                        ${status === s
                          ? getStatusColor(s) + ' border-transparent'
                          : 'border-gray-300 text-gray-500 hover:border-green-400'
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Admin Response */}
              <div className='mb-4'>
                <label className='text-sm text-gray-500 mb-2 block'>
                  Response to Villager
                </label>
                <textarea
                  value={adminResponse}
                  onChange={(e) => setAdminResponse(e.target.value)}
                  placeholder='Write your response here...'
                  rows={4}
                  className='w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none'
                />
              </div>

              {/* Update Button */}
              <button
                onClick={handleUpdate}
                disabled={updating}
                className='w-full bg-green-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition disabled:opacity-50'
              >
                {updating ? 'Updating...' : 'Update Complaint'}
              </button>

            </div>

            {/* Current Response */}
            {complaint.adminResponse && (
              <div className='bg-white rounded-2xl shadow-sm p-5'>
                <p className='text-xs font-medium text-gray-500 mb-2'>
                  Current Response
                </p>
                <div className='bg-green-50 border-l-4 border-green-500 px-4 py-3 rounded-r-xl'>
                  <p className='text-sm text-green-700'>
                    {complaint.adminResponse}
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default ComplaintView