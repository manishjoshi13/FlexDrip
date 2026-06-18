import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
export const getAllProducts=asyncHandler(async(req,res)=>{
    const products = await Product.aggregate([
        {
            $sample: { size: 10 }
        }
    ]);
    if(!products){
        return res.status(200).json({success:true,products:[],message:"No products found"})
    }
    return res.status(200).json({success:true,products,message:"Products fetched successfully"})
})
export const getSinglePRoduct=asyncHandler(async(req,res)=>{
    const {productId} = req.params
    const product=await Product.findById(productId)
    if(!product){
        return res.status(404).json({success:false,message:"Product not found"})
    }
    return res.status(200).json({success:true,product,message:"Product fetched successfully"})
})


export const getSimilarProducts=asyncHandler(async(req,res)=>{
    const productId=req.params.productId
    const product=await Product.findById(productId)
    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    const similarProducts=await Product.find({
        category:product.category,
        _id: { $ne: productId }
    })
    return res.status(200).json({success:true,products:similarProducts || [],message:"Products fetched successfully"})
})