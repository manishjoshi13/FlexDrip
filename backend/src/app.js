import express from "express";
import {config} from "./config/config.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";


const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json({}));
app.use(cors({
    origin:config.FRONTEND_URL,
    credentials:true
}))
app.use(morgan("dev"));
app.use(cookieParser());




export default app;
