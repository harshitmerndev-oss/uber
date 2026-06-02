const captainmodel=require("../models/captain.model")
const captainservice=require("../services/captain.service")
const {validationResult}=require("express-validator")
const blacklistTokenModel=require("../models/blacklisttoken.model")


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
module.exports.logincaptain=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body;
    const captain=await captainmodel.findOne({email}).select('+password')
    if(!captain){
        return res.status(401).json({
            message:"Invalid email or password"
        })
    }
    const ismatch=await captain.comparePassword(password);
    if(!ismatch){
        return res.status(401).json({
            message:"invalid email or password"
        })
    }
    const token=captain.generateAuthToken()
    res.cookie('token',token)
    res.status(200).json({token,captain})
}
module.exports.getcaptainprofile=async(req,res,next)=>{
    const captain=req.captain;
    res.status(200).json({captain})
}
module.exports.logoutcaptain=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({token})
    res.clearCookie('token')
    res.status(200).json({message:"logged out successfully"})
}