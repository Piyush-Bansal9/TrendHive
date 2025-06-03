import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import adminProductsRouter from './routes/admin/products_routes.js'
import shopProductsRouter from './routes/shopping/products-routes.js'
import shopCartRouter from './routes/shopping/cart-routes.js'
import shopAddressRouter from './routes/shopping/address-routes.js'

dotenv.config({path: './.env'})

mongoose
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error));



const app = express();
const PORT = process.env.PORT || 5000;
import authRouter from './routes/auth/auth-routes.js';


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
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shopping/products", shopProductsRouter);
app.use("/api/shopping/cart", shopCartRouter);
app.use("/api/shopping/address", shopAddressRouter);

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));

