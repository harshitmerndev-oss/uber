const captainmodel=require("../models/captain.model")
const captainservice=require("../services/captain.service")
const {validationResult}=require("express-validator")


module.exports.registercaptain=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const{fullname,email,password,vehicle}=req.body;
    const iscaptainexist=await captainmodel.findOne({email})
    if(iscaptainexist){
        return res.status(400).json({message:"captain already exist"})
    }
    const hashpassword= await captainmodel.hashPassword(password)
    const captain=await captainservice.createcaptain({    
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashpassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    })
    const token=captain.generateAuthToken();
    res.status(201).json({
        token,
        captain
    })
}