import { z } from "zod"
import  User  from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const AuthRegister = async(req, res) => {
    const { userName, email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (checkUser)
        return res.json({
            success: false,
            message: "User Already exists with the same email! Please try again",
        });

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
        userName,
        email,
        password: hashPassword,
        });

        await newUser.save();
        res.status(200).json({
        success: true,
        message: "Registration successful",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
        success: false,
        message: "Some error occured",
        });
    }
}


const AuthLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Await the DB call!
        const foundData = await User.findOne({ email });
        if (!foundData) {
            return res.status(403).json({
            success: false,
            message: "User doesn't exist! Please register first",
            });
        }
    
        // Compare password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, foundData.password);
    
        if (!passwordMatch) {
            return res.status(403).json({
            success: false,
            message: "Incorrect password! Please try again",
            });
        }
    
        const token = jwt.sign(
            {
            id: foundData._id,
            role: foundData.role,
            email: foundData.email,
            userName: foundData.userName,
            },
            "CLIENT_SECRET_KEY",
            { expiresIn: "7d" }
        );
    
        res
            .cookie("token", token, { httpOnly: true, secure: false })
            .json({
            success: true,
            message: "Logged in successfully",
            user: {
                email: foundData.email,
                role: foundData.role,
                id: foundData._id,
                userName: foundData.userName,
            },
            });
        } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Internal server error.",
        });
        }
    };
    
const logoutUser = (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: 'Logged out successfully!'
    })
}

const authMiddleware = async(req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
    try {
        const decodedToken = jwt.verify(token, "CLIENT_SECRET_KEY");
        req.user = decodedToken;
        next();
    } catch(e) {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

}

export {AuthRegister, AuthLogin, logoutUser, authMiddleware};