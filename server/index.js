require('dotenv').config();

const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to Mongo DB"))
.catch(err => console.error('Connection error', err))

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173/",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
        "Content-Type",
        'Authorization',
        'Cache-Control',
        'Expires', 
        'Pragma'
    ],
    credentials: true
}))

app.use(cookieParser());
app.use(express.json());


app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));

