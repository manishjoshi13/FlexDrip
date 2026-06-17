import { Router } from "express";
import { getAllProducts, getSinglePRoduct } from "../controller/buyer.controller.js";

const buyerRouter = Router()

buyerRouter.get("/",getAllProducts)  
buyerRouter.get("/:productId",getSinglePRoduct)  

export default buyerRouter