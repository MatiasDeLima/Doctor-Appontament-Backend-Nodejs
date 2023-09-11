import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import doctorRouter from "./routes/doctorRouter.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: true
}

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/doctors', doctorRouter);

mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("MongoDB connect true");
    } catch (error) {
        console.log("MongoDB connect false");
    }
};

app.listen(port, () => {
    connectDB();
    console.log(`Server runing on port: ${port}`);
});