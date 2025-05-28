import { z } from "zod"
import  { User } from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

// const PasswordSchema = z
//     .string()
//     .min(8, {message: "Min length: 8"})
//     .max(20, {message: "Password is too long."})
//     .regex(/[A-Z]/, {message: "Password should have atleast one uppercase character."})
//     .regex(/[a-z]/, {message: "Password should have atleast one lowercase character."})
//     .regex(/[0-9]/, {message: "Passowrd should contain atleast 1 number."})
//     .regex(/[^A-Za-z0-9]/, {message: "Password should contain atleast one special character."})

// const signupSchema = z.object({
//     username: z.string().min(3, {message: "Name is too short. Minimum length: 3"}).max(10, {message: "Name is too long. Maximum length: 10"}),
//     email: z.string().email({message: "Invalid email address"}),
//     password: PasswordSchema
// })

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


const AuthLogin = async(req, res) => {
    try{
        const email = req.body.email;
        const username = req.body.username;
        const passowrd = req.body.passowrd;
        const foundData = User.findOne({
            email: email,
            username: username
        })
        if(!foundData) {
            return res.status(403).json( {
                message: "Wrong email or username."
            })
        }
        else {
            const passowrdMatch = bcrypt.compare(passowrd, foundData.passowrd);
            if(!passowrdMatch) {
                return res.status(403).json({
                    message: "Wrong Password."
                })
            }else {
                const token = jwt.sign(
                    {
                        id: checkUser._id,
                        role: checkUser.role,
                        email: checkUser.email,
                        userName: checkUser.userName,
                    },
                    "CLIENT_SECRET_KEY",
                    { expiresIn: "7d" }
                    );
                
                    res.cookie("token", token, { httpOnly: true, secure: false }).json({
                        success: true,
                        message: "Logged in successfully",
                        user: {
                        email: checkUser.email,
                        role: checkUser.role,
                        id: checkUser._id,
                        userName: checkUser.userName,
                        },
                    });
            }
        }
    } catch(e) {
        res.status(500).json({
            message: "Internal server error.",
        })
        return;
    }
}
export {AuthRegister, AuthLogin};