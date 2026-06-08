import express from 'express' ;
import { getMe, loginUser, register } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRoute = express.Router();

userRoute.post('/register', register);
userRoute.post('/login', loginUser);
userRoute.get('/me', protect , getMe);


export default userRoute;