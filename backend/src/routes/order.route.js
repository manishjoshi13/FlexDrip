import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createOrder, getMyOrders, getOrderById, cancelOrder } from "../controller/order.controller.js";
import { buyerAuth } from "../middleware/auth.middleware.js";

const orderRouter=Router()

orderRouter.post("/create",authenticate,buyerAuth,createOrder)
orderRouter.get("/myorders",authenticate,buyerAuth,getMyOrders)
orderRouter.get("/details/:id",authenticate,buyerAuth,getOrderById)
orderRouter.put("/cancel/:id",authenticate,buyerAuth,cancelOrder)

export default orderRouter
