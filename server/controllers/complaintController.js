import { successResponse, errorResponse } from '../utils/apiResponse.js'
import complaintModel from '../models/complaintModel.js'
// import {cloudinary} from '../config/cloudinary.js'

import { cloudinary } from '../config/cloudinary.js'

// Upload buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { 
        folder: 'gramseva-complaints',
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) {
          console.log('Cloudinary error:', error.message)
          reject(error)
        } else {
          console.log('Success URL:', result.secure_url)
          resolve(result.secure_url)
        }
      }
    ).end(buffer)
  })
}

const createComplaint = async (req, resp) => {
  try {
    const { title, description, category, location } = req.body

    if (!title || !description || !category || !location) {
      return errorResponse(resp, 400, 'Please fill all fields')
    }

    // Try to upload images but don't crash if it fails
    let images = []
    if (req.files && req.files.length > 0) {
      try {
        images = await Promise.all(
          req.files.map(file => uploadToCloudinary(file.buffer))
        )
      } catch (uploadError) {
        images = []  // ← just use empty array if upload fails
      }
    }

    const complaint = await complaintModel.create({
      title, description, category, location,
      images,
      villager: req.user._id,
    })

    return successResponse(resp, 201, 'Complaint submitted successfully', { complaint })

  } catch (error) {
    return errorResponse(resp, 500, error.message)
  }
}

const getMyComplaints = async (req, resp) => {
  try {
    const complaints = await complaintModel
      .find({ villager: req.user._id })
      .sort({ createdAt: -1 })

    return successResponse(resp, 200, 'Complaints fetched successfully', {
      count: complaints.length,
      complaints,
    })
  } catch (error) {
    return errorResponse(resp, 500, error.message)
  }
}

const getComplaintById = async (req, resp) => {
  try {
    const complaint = await complaintModel
      .findById(req.params.id)
      .populate('villager', 'name email phone village')

    if (!complaint) {
      return errorResponse(resp, 404, 'Complaint not found')
    }

    return successResponse(resp, 200, 'Complaint fetched successfully', { complaint })
  } catch (error) {
    return errorResponse(resp, 500, error.message)
  }
}

const deleteComplaint = async (req, resp) => {
  try {
    const complaint = await complaintModel.findById(req.params.id)

    if (!complaint) {
      return errorResponse(resp, 404, 'Complaint not found')
    }

    if (complaint.villager.toString() !== req.user._id.toString()) {
      return errorResponse(resp, 403, 'Not authorized to delete this complaint')
    }

    await complaint.deleteOne()

    return successResponse(resp, 200, 'Complaint deleted successfully', {})
  } catch (error) {
    return errorResponse(resp, 500, error.message)
  }
}

export { createComplaint, getMyComplaints, getComplaintById, deleteComplaint }