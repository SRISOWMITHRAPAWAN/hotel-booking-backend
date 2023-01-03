import express from "express";
import {verifyAdmin} from "../utils/verifyToken.js"
import Hotel from "../modules/Hotel.js";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel,countByCity, countByType,getHotelRooms } from "../controllers/hotel.js";
import { setHotel } from "../controllers/newhotel.js";
const router=express.Router();

router.post("/",verifyAdmin,createHotel);

router.put("/:id",verifyAdmin,updateHotel);

  router.delete("/:id",verifyAdmin,deleteHotel);

router.get("/find/:id",getHotel);
router.get("/payment/find/:id",setHotel)

router.get("/",getHotels);
router.get("/countByCity",countByCity);
router.get("/countByType",countByType);
router.get("/room/:id",getHotelRooms);


export default router