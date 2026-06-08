const errorHandler = (err , req , resp , next) => {
    
     const statusCode = resp.statusCode === 200 ? 500 : resp.statusCode;
     console.log(`Error : ${ err.message}`);


     resp.status(statusCode).json({

        success : false, 
        message : err.message || 'Server Error',
        stack : process.env.NODE_ENV === 'development' ? err.stack : null
     })
}

export {errorHandler};