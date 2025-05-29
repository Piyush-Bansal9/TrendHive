import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config({path: './.env'})

mongoose
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error));



const app = express();
const PORT = process.env.PORT || 5000;
import authRouter from './routes/auth-routes.js';


app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
        ],
        credentials: true,
        })
    );
    

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);


app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));

