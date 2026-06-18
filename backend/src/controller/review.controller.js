import { Review } from "../models/review.model.js";
import { asyncHandler } from "../utils/asyncWrapper.js";

export const createReview = asyncHandler( async (req, res) => {
        const productId=req.params.productId
        const { rating, comment, isVerifiedBuyer } = req.body;
        const review = await Review.create({ productId, rating, comment, isVerifiedBuyer });
        res.status(201).json({ success: true, review });
    
})

export const deleteReview=asyncHandler(async(req,res)=>{
    const {reviewId}=req.params
    await Review.findByIdAndDelete(reviewId)
    res.status(204).json({ success: true, message: "review deleted successfully" });
})

export const getReviews=asyncHandler(async(req,res)=>{
    const {productId}=req.params
    const reviews=await Review.find({productId})
    res.status(200).json({ success: true, reviews });
})