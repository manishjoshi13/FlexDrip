import { Router } from "express";
import { register,login,logout,getMe,googleAuthenticate } from "../controller/auth.controller.js";
import { validateRegister,validateLogin } from "../validator/auth.validator.js";
import { authenticate } from "../middleware/auth.middleware.js";
import passport from "passport";


const router = Router();

router.post("/register",validateRegister,register)

router.post("/login",validateLogin,login)

router.post("/logout",authenticate,logout)

router.get("/get-me",authenticate,getMe)

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false,failureRedirect:"http://localhost:5173/login" }),googleAuthenticate
);





export default router;