import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

// 1. registerUser  →  create new account

const register = async (req , resp) => {
    try {



        const { name, email, phone, password, village } = req.body


        if(!name || !email || !phone || !password || !village){
            return errorResponse(resp, 400 , 'Please fill all fields..')

        }

        const userExists = await userModel.findOne({email})
        if(userExists){
            return errorResponse(resp , 400 , 'User Already exists with this email..')
        }

        const salt = await bcrypt.genSalt(10);
        const hassedPassword = await bcrypt.hash(password , salt);

        const user = await userModel.create({
            name, 
            email, 
            phone, 
            password: hassedPassword,
            village
        })

        // Generate Token 
        const token = generateToken(user._id , user.role);

        return successResponse(resp , 201 , 'Account Created successFully...',{
            user:{
                id: user._id, 
                name : user.name, 
                email : user.email, 
                phone : user.phone, 
                role: user.role, 
                village : user.village,
            }, 
            token,
        })
        
    } catch (error) {
        return errorResponse(resp , 500 , error.message);
    }
}

// 2. loginUser     →  login + get token

const loginUser = async (req, resp) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return errorResponse(resp, 400, 'Please provide email and password')
    }

    // Check if admin credentials from .env
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = generateToken('admin', 'admin')
      return successResponse(resp, 200, 'Admin login successful', {
        user: {
          id: 'admin',
          name: 'Admin',
          email: process.env.ADMIN_EMAIL,
          role: 'admin',
          village: 'All Villages',
        },
        token,
      })
    }

    // Normal villager login
    const user = await userModel.findOne({ email })
    if (!user) {
      return errorResponse(resp, 401, 'Invalid email or password')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return errorResponse(resp, 401, 'Invalid email or password')
    }

    const token = generateToken(user._id, user.role)

    return successResponse(resp, 200, 'Login successful', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        village: user.village,
      },
      token,
    })

  } catch (error) {
    return errorResponse(resp, 500, error.message)
  }
}
// 3. getMe         →  get logged in user info

const getMe = async (req , resp) => {
    try {

        return successResponse(resp , 200 , 'User fetched successfully', {
            user : req.user
        })
        
    } catch (error) {
        return errorResponse(resp , 500 , error.message);
    }
}

export { register, loginUser ,getMe};
