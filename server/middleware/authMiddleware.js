import jwt from 'jsonwebtoken'
import { errorResponse } from '../utils/apiResponse.js'
import userModel from '../models/userModel.js';

const protect = async (req, resp, next) => {
  try {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return errorResponse(resp, 401, 'Not authorized, no token')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Check if admin token
    if (decoded.role === 'admin' && decoded.id === 'admin') {
      req.user = {
        id: 'admin',
        name: 'Admin',
        email: process.env.ADMIN_EMAIL,
        role: 'admin',
        village: 'All Villages',
      }
      return next()
    }

    // Normal user
    req.user = await userModel.findById(decoded.id).select('-password')

    if (!req.user) {
      return errorResponse(resp, 401, 'User not found')
    }

    next()

  } catch (error) {
    return errorResponse(resp, 401, 'Not authorized, token failed')
  }
}

export {protect};