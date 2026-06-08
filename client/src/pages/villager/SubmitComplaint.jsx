// src/pages/villager/SubmitComplaint.jsx

import { useState , useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Navbar from '../../componets/common/Navbar'
import { AutContext } from '../../context/AutContext'

const SubmitComplaint = () => {

  const navigate = useNavigate()
  const API = import.meta.env.VITE_API_URL

  const { token } = useContext(AutContext);

  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const [previews, setPreviews] = useState([])

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
  })

  // ─────────────────────────────────────────
  // Handle input change
  // ─────────────────────────────────────────
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // ─────────────────────────────────────────
  // Handle image selection
  // ─────────────────────────────────────────
  const handleImages = (e) => {
    const files = Array.from(e.target.files)

    setImages(files)

    // Create preview URLs
    const previewUrls = files.map(file => URL.createObjectURL(file))
    setPreviews(previewUrls)
  }

  // ─────────────────────────────────────────
  // Handle form submit
  // ─────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Use FormData because we're sending images
      const form = new FormData()
      form.append('title', formData.title)
      form.append('description', formData.description)
      form.append('category', formData.category)
      form.append('location', formData.location)

      // Append each image
      images.forEach(image => {
        form.append('images', image)
      })

      const { data } = await axios.post(`${API}/api/complaint/submit`, form, {
          headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`  // ← add this!
        }
      })

      if (data.success) {
        toast.success('Complaint submitted successfully!')
        navigate('/my-complaints')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['road', 'water', 'electricity', 'sanitation', 'other']

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />

      <div className='max-w-2xl mx-auto px-4 py-8'>

        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-gray-800'>Submit Complaint</h1>
          <p className='text-gray-500 text-sm mt-1'>
            Fill in the details about the problem
          </p>
        </div>

        {/* Form */}
        <div className='bg-white rounded-2xl shadow-sm p-6'>
          <form onSubmit={handleSubmit} className='space-y-5'>

            {/* Title */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block font-medium'>
                Complaint Title
              </label>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleChange}
                placeholder='Brief title of the problem'
                required
                className='w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400'
              />
            </div>

            {/* Category */}
            <div>
              <label className='text-sm text-gray-600 mb-2 block font-medium'>
                Category
              </label>
              <div className='flex flex-wrap gap-2'>
                {categories.map(cat => (
                  <button
                    key={cat}
                    type='button'
                    onClick={() => setFormData({ ...formData, category: cat })}
                    className={`px-4 py-1.5 rounded-full text-sm border transition capitalize
                      ${formData.category === cat
                        ? 'bg-green-600 text-white border-green-600'
                        : 'border-gray-300 text-gray-600 hover:border-green-400'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block font-medium'>
                Description
              </label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                placeholder='Describe the problem in detail...'
                required
                rows={4}
                className='w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none'
              />
            </div>

            {/* Location */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block font-medium'>
                Location
              </label>
              <input
                type='text'
                name='location'
                value={formData.location}
                onChange={handleChange}
                placeholder='e.g. Near temple, main road'
                required
                className='w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400'
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block font-medium'>
                Upload Photos
              </label>
              <label className='border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-green-400 transition'>
                <span className='text-3xl mb-2'>📷</span>
                <span className='text-sm text-gray-500'>
                  Click to upload photos
                </span>
                <span className='text-xs text-gray-400 mt-1'>
                  JPG, PNG up to 5MB each
                </span>
                <input
                  type='file'
                  multiple
                  accept='image/*'
                  onChange={handleImages}
                  className='hidden'
                />
              </label>

              {/* Image Previews */}
              {previews.length > 0 && (
                <div className='flex gap-3 mt-3 flex-wrap'>
                  {previews.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt='preview'
                      className='w-20 h-20 object-cover rounded-lg border border-gray-200'
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className='flex gap-3 pt-2'>
              <button
                type='button'
                onClick={() => navigate(-1)}
                className='flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={loading || !formData.category}
                className='flex-1 bg-green-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition disabled:opacity-50'
              >
                {loading ? 'Submitting...' : 'Submit Complaint'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default SubmitComplaint