import { asyncHandler } from "../utils/asyncWrapper.js";
import { AppError } from "../utils/appError.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const authenticate = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        throw new AppError("Unauthorized",401);
    }
    const decodedToken = jwt.verify(token,config.JWT_SECRET);
    req.user = decodedToken;
    next();
})

