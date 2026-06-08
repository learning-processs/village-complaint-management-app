import express from 'express';
import { deleteComplaint, getAllComplaints, getStats, updateComplaint } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import {adminOnly} from '../middleware/adminMiddleware.js';

const adminRoute = express.Router();

adminRoute.get('/complaints' , protect , adminOnly ,getAllComplaints);
adminRoute.put('/complaints/:id', protect , adminOnly, updateComplaint);
adminRoute.delete('/complaints/:id', protect , adminOnly,  deleteComplaint);
adminRoute.get('/stats', protect , adminOnly, getStats);

export default adminRoute;