import complaintModel from "../models/complaintModel.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";


// Get all complaints

const getAllComplaints = async(req , resp) => {

    try {

        const complaints = await complaintModel
        .find()
        .populate('villager','name email phone village')
        .sort({createdAt : -1});


        return successResponse(resp , 200, 'All complaint fetched...', {
            count : complaints.length,
            complaints,
        })
        
    } catch (error) {
        return errorResponse(resp , 500 , error.message);
    }
}

const updateComplaint = async (req, resp) => {
  try {

    const { status, adminResponse } = req.body

    // Find complaint
    const complaint = await complaintModel.findById(req.params.id)

    if (!complaint) {
      return errorResponse(resp, 404, 'Complaint not found')
    }

    // Update fields
    complaint.status = status || complaint.status
    complaint.adminResponse = adminResponse || complaint.adminResponse

    await complaint.save()

    return successResponse(resp, 200, 'Complaint updated successfully', {
      complaint,
    })

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

    await complaint.deleteOne()

    return successResponse(resp, 200, 'Complaint deleted successfully', {})

  } catch (error) {
    return errorResponse(resp, 500, error.message)
  }
}


const getStats = async (req, resp) => {
  try {

    console.log('Stats hit!')
    console.log('User role:', req.user.role)

    const total = await complaintModel.countDocuments()
    const pending = await complaintModel.countDocuments({ status: 'pending' })
    const inProgress = await complaintModel.countDocuments({ status: 'in-progress' })
    const resolved = await complaintModel.countDocuments({ status: 'resolved' })

    return successResponse(resp, 200, 'Stats fetched successfully', {
      total,
      pending,
      inProgress,
      resolved,
    })

  } catch (error) {
    return errorResponse(resp, 500, error.message)
  }
}

export { getAllComplaints, updateComplaint, deleteComplaint, getStats }