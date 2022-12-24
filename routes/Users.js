import express from "express";

import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import {verifyAdmin, verifyToken,verifyUser}  from "../utils/verifyToken.js";
const router=express.Router();

router.get("/checkauthentication",verifyToken,(req,res,next)=>{
    res.send("hellow user you are logged in")
})
router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
    res.send("hellow user you are logged in you can delete your account")
})

router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
    res.send("hellow adminh you are logged in you can delete all account")
})
//update
router.put("/:id",verifyUser,updateUser);
//delete
  router.delete("/:id",verifyUser,deleteUser);
//get by id
router.get("/:id",verifyUser,getUser);
//get all
router.get("/",verifyAdmin,getUsers);


export default router