import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { AutContext } from '../../context/AutContext'
import Navbar from '../../componets/common/Navbar'

const ComplaintDetail = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const { token } = useContext(AutContext)
  const [complaint, setComplaint] = useState(null)
  const [loading, setLoading] = useState(true)
  const API = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const { data } = await axios.get(`${API}/api/complaint/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (data.success) setComplaint(data.data.complaint)
      } catch (error) {
        toast.error('Failed to fetch complaint')
      } finally {
        setLoading(false)
      }
    }
    if (token) fetchComplaint()
  }, [id, token])

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

  const getStatusStep = (status) => {
    if (status === 'pending') return 1
    if (status === 'in-progress') return 2
    if (status === 'resolved') return 3
    return 1
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />
      <div className='flex items-center justify-center py-20'>
        <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
      </div>
    </div>
  )

  if (!complaint) return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />
      <div className='flex items-center justify-center py-20'>
        <p style={{ color: 'var(--text-secondary)' }}>Complaint not found!</p>
      </div>
    </div>
  )

  const steps = ['Submitted', 'In Progress', 'Resolved']
  const currentStep = getStatusStep(complaint.status)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <div className='max-w-2xl mx-auto px-4 py-8'>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 text-sm hover:text-green-600 mb-6 transition'
          style={{ color: 'var(--text-secondary)' }}
        >
          ← Back
        </button>

        {/* Main Card */}
        <div style={{ backgroundColor: 'var(--bg-card)' }} className='rounded-2xl shadow-sm p-6 mb-4'>

          {/* Header */}
          <div className='flex items-start justify-between mb-4'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl'>
                {getCategoryIcon(complaint.category)}
              </div>
              <div>
                <h1 className='text-lg font-bold' style={{ color: 'var(--text-primary)' }}>
                  {complaint.title}
                </h1>
                <p className='text-xs capitalize' style={{ color: 'var(--text-secondary)' }}>
                  {complaint.category}
                </p>
              </div>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(complaint.status)}`}>
              {complaint.status}
            </span>
          </div>

          {/* Status Tracker */}
          <div className='flex items-center mb-6'>
            {steps.map((step, index) => (
              <div key={step} className='flex items-center flex-1'>
                <div className='flex flex-col items-center'>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold
                    ${index + 1 <= currentStep ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'}`}
                  >
                    {index + 1 <= currentStep ? '✓' : index + 1}
                  </div>
                  <p className={`text-xs mt-1 whitespace-nowrap ${index + 1 <= currentStep ? 'text-green-600' : 'text-gray-400'}`}>
                    {step}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 mb-4 ${index + 1 < currentStep ? 'bg-green-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Description */}
          <div className='mb-4'>
            <p className='text-xs font-medium mb-1' style={{ color: 'var(--text-secondary)' }}>Description</p>
            <p className='text-sm leading-relaxed' style={{ color: 'var(--text-primary)' }}>
              {complaint.description}
            </p>
          </div>

          {/* Location & Date */}
          <div className='flex gap-4 mb-4'>
            <div>
              <p className='text-xs font-medium mb-1' style={{ color: 'var(--text-secondary)' }}>Location</p>
              <p className='text-sm' style={{ color: 'var(--text-primary)' }}>📍 {complaint.location}</p>
            </div>
            <div>
              <p className='text-xs font-medium mb-1' style={{ color: 'var(--text-secondary)' }}>Submitted</p>
              <p className='text-sm' style={{ color: 'var(--text-primary)' }}>
                🗓️ {new Date(complaint.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Images */}
          {complaint.images?.length > 0 && (
            <div className='mb-4'>
              <p className='text-xs font-medium mb-2' style={{ color: 'var(--text-secondary)' }}>Photos</p>
              <div className='flex gap-3 flex-wrap'>
                {complaint.images.map((img, index) => (
                  <img key={index} src={img} alt='complaint' className='w-24 h-24 object-cover rounded-xl border border-gray-200' />
                ))}
              </div>
            </div>
          )}

          {/* Admin Response */}
          {complaint.adminResponse && (
            <div className='bg-green-50 border-l-4 border-green-500 px-4 py-3 rounded-r-xl'>
              <p className='text-xs font-semibold text-green-700 mb-1'>Admin Response</p>
              <p className='text-sm text-green-700'>{complaint.adminResponse}</p>
            </div>
          )}

        </div>

        {/* Villager Info */}
        {complaint.villager && (
          <div style={{ backgroundColor: 'var(--bg-card)' }} className='rounded-2xl shadow-sm p-4'>
            <p className='text-xs font-medium mb-3' style={{ color: 'var(--text-secondary)' }}>
              Submitted by
            </p>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold'>
                {complaint.villager.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className='text-sm font-medium' style={{ color: 'var(--text-primary)' }}>
                  {complaint.villager.name}
                </p>
                <p className='text-xs' style={{ color: 'var(--text-secondary)' }}>
                  {complaint.villager.village} · {complaint.villager.phone}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default ComplaintDetail