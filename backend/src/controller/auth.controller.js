import {User} from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { AppError } from "../utils/appError.js";
import bcrypt from "bcryptjs";

export const register = asyncHandler(async (req, res) => {
   
    const {fullName,email,password,phone,role} = req.body;

    if(!fullName || !email || !password || !phone || !role){
        throw new AppError("All fields are required",400);
    }
    
    const checkUser = await User.findOne({$or:[{email},{phone}]});
    if(checkUser){
        throw new AppError("User already exists",400);
    }
    

    const hashedPassword = await bcrypt.hash(password,10);

    // user create
    const user = await User.create({
        fullName,
        email,
        password:hashedPassword,
        phone,
        role
    })

    // token
    const token=jwt.sign({id:user._id},config.JWT_SECRET,{expiresIn:config.JWT_EXPIRES_IN});
    
    // cookie
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7*24 * 60 * 60 * 1000,
    };

    res.cookie("token",token);

    res.status(201).json({
        success:true,
        message:"User registered successfully",
        token,
        user
    })
  
})


export const login = asyncHandler(async (req, res) => {
    const {email,password,role} = req.body;

    if(!email || !password || !role){
        throw new AppError("All fields are required",400);
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        throw new AppError("User not found",404);
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        throw new AppError("Invalid password",401);
    }

    const token=jwt.sign({id:user._id},config.JWT_SECRET,{expiresIn:config.JWT_EXPIRES_IN});

        // cookie
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7*24 * 60 * 60 * 1000,
    };

    res.cookie("token",token);

    res.status(200).json({
        success:true,
        message:"User logged in successfully",
        token,
        user
    })
  
})

export const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success:true,
        message:"User logged out successfully"
    })
  
})

export const getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
  
})

export const verify = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
  
})