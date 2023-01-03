import Hotel from "../modules/Hotel.js"

export const setHotel=async(req,res,next)=>{
    try{
  
        const hotel= await Hotel
         .findById(req.params.id
          );
            
            
   res.status(200).json(hotel)
       }catch(err){
           next(err)
       }
}