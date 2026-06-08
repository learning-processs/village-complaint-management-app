
const successResponse = (resp , statusCode , message , data = {})=>{
    return resp.status(statusCode).json({
        success : true,
        message, 
        data,
    })
}

const errorResponse = (resp, statusCode , message , data ={})=>{
    return resp.status(statusCode).json({
        success : false, 
        message, 
        data,
    })
}

export { successResponse , errorResponse};