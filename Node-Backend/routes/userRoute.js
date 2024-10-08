import express from "express"
import {loginUser,registerUser,userProfile} from "../controllers/userController.js"

const userRouter =express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/profile",userProfile)
export default userRouter;