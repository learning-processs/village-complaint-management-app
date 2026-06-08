
import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js';
import cors from 'cors'
import { errorHandler } from './middleware/errorMiddleware.js';
import userRoute from './routes/userRouter.js';
import complaintRoute from './routes/complaintRouter.js';
import adminRoute from './routes/adminRouter.js';



// app config
const app = express();
const port = process.env.PORT || 5000;
connectDB();


// middleware
app.use(express.json());
app.use(cors());


// Routes


app.use('/api/auth',userRoute);
app.use('/api/complaint',complaintRoute);
app.use('/api/admin',adminRoute);


app.get('/',(req, resp)=>{
    resp.send("API WORKING...")
})

app.use(errorHandler);

app.listen(port,()=>console.log(`Server is running on port : ${port}`))