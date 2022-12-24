import express from "express";
import { 
    createRoom,
    updateRoom,
    deleteRoom,
    getRoom,
    getRooms, 
    updateRoomAvailability} from "../controllers/room.js";
import {verifyAdmin} from "../utils/verifyToken.js";

const router=express.Router();
router.post("/:hotelid",verifyAdmin,createRoom);

router.put("/:id",verifyAdmin,updateRoom);
router.put("/availability/:id",updateRoomAvailability);

  router.delete("/:id/:hotelid",verifyAdmin,deleteRoom);

router.get("/:id",getRoom);

router.get("/",getRooms);

export default router