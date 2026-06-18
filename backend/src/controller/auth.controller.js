import {User} from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { AppError } from "../utils/appError.js";
import bcrypt from "bcryptjs";
import { createCart } from "./cart.controller.js";
import Cart from "../models/cart.model.js";

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
        role,
        profileCompleted:true,
    })

    // create cart
    await createCart(req,res)


    // token
    const token=jwt.sign({id:user._id},config.JWT_SECRET,{expiresIn:config.JWT_EXPIRES_IN});
    
    // cookie
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7*24 * 60 * 60 * 1000,
    };
    let userObject=user.toObject();
    delete userObject.password

    res.cookie("token",token);

    res.status(201).json({
        success:true,
        message:"User registered successfully",
        user:userObject
    })
  
})


export const login = asyncHandler(async (req, res) => {
    const {email,password,role} = req.body;

    if(!email || !password || !role){
        throw new AppError("All fields are required",400);
    }

    const user = await User.findOne({email,role}).select("+password +googleLogin");
    if(!user){
        throw new AppError("User not found",404);
    }

    if(user.googleLogin){
       
        throw new AppError("User is registered with google, please login with google",400);
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
    const userObject=user.toObject();
    delete userObject.password

    res.cookie("token",token);
   

    res.status(200).json({
        success:true,
        message:"User logged in successfully",
        user:userObject
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
    
    res.status(200).json({
        success:true,
        user:req.user
    })
  
})



export const googleAuthenticate = asyncHandler(async (req, res) => {
    
    let user=await User.findOne({email:req.user.emails[0].value});
    if(!user){
        user=await User.create({
            fullName:req.user.displayName,
            email:req.user.emails[0].value,
            role:"buyer",
            googleLogin:true,
            
        })
    }
    console.log(user)
    const token=jwt.sign({id:user._id},config.JWT_SECRET,{expiresIn:config.JWT_EXPIRES_IN});


    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7*24 * 60 * 60 * 1000,
    };

    res.cookie("token",token);

    res.redirect('http://localhost:5173/')
  
})

export const updateProfile = asyncHandler(async (req, res) => {
    const { fullName, phone, role } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (!fullName || !phone) {
        throw new AppError("Full name and phone number are required", 400);
    }

    // Validate phone number format (must be 10 digits)
    const phoneStr = phone.toString().trim();
    if (phoneStr.length !== 10 || isNaN(phone)) {
        throw new AppError("Phone number must be a 10-digit number", 400);
    }

    // Role validation
    if (role && !["buyer", "seller"].includes(role)) {
        throw new AppError("Invalid role specified", 400);
    }

    // Only allow role changes if profile is not completed yet
    if (!user.profileCompleted) {
        if (role) {
            user.role = role;
        }
    }

    user.fullName = fullName;
    user.phone = Number(phone);
    user.profileCompleted = true;

    await user.save();

    // If role is buyer, ensure they have a cart
    if (user.role === "buyer") {
        const existingCart = await Cart.findOne({ user: user._id });
        if (!existingCart) {
            await Cart.create({ user: user._id });
        }
    }

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user
    });
});
