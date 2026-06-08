
import { errorResponse } from '../utils/apiResponse.js';
const adminOnly= async( req , resp , next) =>{

    try {
        
        const adminOnly = (req, resp , next) =>{
            if(req.user && req.user.role === 'admin'){
                next();
            }else{
                return errorResponse(resp , 403 , 'Not authorized, admin Only')
            }
        }

        next();
    } catch (error) {
        return errorResponse(resp, 401, 'Not authorized, token failed')
    }
}

export {adminOnly};