import { z } from "zod"
import { UserModel } from "../../models/User";
import bcrypt from "bcrypt"
const jwt = require("jsonwebtoken");

const PasswordSchema = z
    .string()
    .min(8, {message: "Min length: 8"})
    .max(20, {message: "Password is too long."})
    .regex(/[A-Z]/, {message: "Password should have atleast one uppercase character."})
    .regex(/[a-z]/, {message: "Password should have atleast one lowercase character."})
    .regex(/[0-9]/, {message: "Passowrd should contain atleast 1 number."})
    .regex(/[^A-Za-z0-9]/, {message: "Password should contain atleast one special character."})

const signupSchema = z.object({
    username: z.string().min(3, {message: "Name is too short. Minimum length: 3"}).max(10, {message: "Name is too long. Maximum length: 10"}),
    email: z.string().email({message: "Invalid email address"}),
    password: PasswordSchema
})

const register = async(req, res) => {
    try{
        const validationResult = signupSchema.safeParse(req.body);
        if(!validationResult.success) {
            res.status(411).json({
                message: "Input errors",
                errors: validationResult.error.errors
            })
            return;
        }
        else {
            const foundData = await UserModel.findOne({
                email: validationResult.data.email
            })
            if(!foundData){
                const passowrd = validationResult.data.password;
                const hashedPassword = await bcrypt.hash(passowrd, 5);
                const newUser = await userModel.create({
                    email: validationResult.data?.email,
                    name: validationResult.data?.name,
                    password: hashedPassword
                });
                await newUser.save();
                res.status(200).json({
                    message: "You have signed up!"
                });
                return;
            }else {
                res.status(403).json({
                    message: "Email already exists."
                })
                return;
            }
        }
    }catch(e){
        res.status(500).json({
            message: "Internal Server error.",
        })
        return;
    }
}


const login = async(req, res) => {
    try{
        const email = req.body.email;
        const username = req.body.username;
        const passowrd = req.body.passowrd;
        const foundData = UserModel.findOne({
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
                    { expiresIn: "60m" }
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

