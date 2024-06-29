import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"
import {v4} from "uuid"
import path from "path"


const foodRouter=express.Router();

// Image storage using multer.
const uuidv4=v4();
const storage=multer.diskStorage({
    destination:"uploads",
    filename:function(req,file,cb){
        const uniquename=uuidv4;
        cb(null,uniquename+path.extname(file.originalname))
    }
})
const upload=multer({storage:storage});
// we have to use this middle ware

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)

export default foodRouter;





