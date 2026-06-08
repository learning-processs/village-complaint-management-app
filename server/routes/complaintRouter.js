import express from 'express';
import { createComplaint, deleteComplaint, getComplaintById, getMyComplaints } from '../controllers/complaintController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const complaintRoute = express.Router();

complaintRoute.post('/submit', protect, upload.array('images', 5) , createComplaint);
// get my complaint
complaintRoute.get('/my', protect , getMyComplaints);
// Get single complaint
complaintRoute.get('/:id', protect, getComplaintById);
// Delete complaint
complaintRoute.delete('/:id', protect ,  deleteComplaint);

export default complaintRoute;