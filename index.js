import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/Auth.js"
import usersRoute from "./routes/Users.js"
import hotelsRoute from "./routes/Hotels.js"
import roomsRoute from "./routes/Rooms.js"
import cookieParser from "cookie-parser"
import cors from "cors";
import bodyParser from "body-parser"

dotenv.config()

const KEY=process.env.SECRET_KEY
import Stripe from "stripe"


const stripe = new Stripe(KEY, {
    apiVersion: '2020-08-27',
  });




const app=express()



const connect =async()=>{
    try {
        await mongoose.connect(process.env.MONGO);
   console.log("connected to mongodb")
    } catch (error) {
      throw error;
      }
}

mongoose.connection.off("disconnected",()=>{
    console.log("mongodb disconnected")
})
mongoose.connection.on("connected",()=>{
    console.log("mongodb connected")
})


//middleware
app.use(cors({
    origin:"*"
}
));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


app.use(express.json())

app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);


app.post("/api/payment",async(req,res)=>{
    let status,error;
    const {token,amount}=req.body;
    
    try{
await stripe.charges.create({
    source: token.id,
    amount,
    currency:"usd",

});
status="success";
    }catch(error){
        console.log(error)
        status="Failure";
    }
    res.json({error,status})
})

app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500
    const errorMessage=err.message || "something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
 })

app.listen(8000,()=>{
    connect()
    console.log("connected to node js__")
})