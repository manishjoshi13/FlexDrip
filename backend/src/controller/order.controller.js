import { Order } from "../models/order.model.js";
import { asyncHandler } from "../utils/asyncWrapper.js";

export const createOrder = async (req, res) => {

}
export const getAllOrders=asyncHandler(async(req,res)=>{
    const {userId}=req.user
    const orders=await Order.find({userId})
    res.status(200).json({success:true,orders})
})
export const getOrder=asyncHandler(async(req,res)=>{
    const {orderId}=req.params
    const order=await Order.findById(orderId)
    res.status(200).json({success:true,order})
})
export const cancelOrder=asyncHandler(async(req,res)=>{
    const {orderId}=req.params
    const order=await Order.findByIdAndUpdate(orderId,{status:'cancelled'},{new:true})
    res.status(200).json({success:true,order})
})
export const updateOrderStatus=asyncHandler(async(req,res)=>{
    const {orderId}=req.params
    const {status}=req.body
    const order=await Order.findByIdAndUpdate(orderId,{status},{new:true})
    res.status(200).json({success:true,order})
})