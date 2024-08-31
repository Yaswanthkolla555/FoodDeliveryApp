import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"
// to access dotenv file
import dotenv from 'dotenv'
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing user order from frontend

const placeOrder=async (req,res)=>{

    const frontend_url="http://localhost:5173"
    try {
        const newOrder=new orderModel({
            // we will get the id from auth middleware
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        // order data is saved in database
        await newOrder.save();
        // we need to claear the data from users cart
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

        // to create payment link using stripe
        const line_items=req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name,
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1,
        })
// why session?
        const session =await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        console.log("he");
        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const verifyOrder =async (req,res)=>{
    const {orderId,success}=req.body;
    try{
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"Not Paid"})
        }
    }catch(error){
       console.log(error);
       res.json({success:false,message:"Error"})
    }
}
export {placeOrder,verifyOrder}