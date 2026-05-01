import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim:true,
        required: true
    },
    email: {
        type: String,
        trim:true,
        required: true,
        unique: true,
        lowercase:true
    },
    password: {
        type: String,
        required: true,
        select:false
    },
    phone:{
        type:Number,
        minlength:10,
        maxlength:10,
        required:true,
        unique:true,
        trim:true
    },
    role:{
        type:String,
        enum:["buyer","seller"],
        default:"buyer"
    }
    
},{timestamps:true})

export const User = mongoose.model("User", userSchema);