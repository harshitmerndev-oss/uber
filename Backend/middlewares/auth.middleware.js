const userModel=require("../models/user.model")
const blacklistTokenModel=require("../models/blacklisttoken.model")
const captainModel=require("../models/captain.model")
const bcrypt=require("bcrypt");
const jwt =require("jsonwebtoken")


module.exports.authuser=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"unotharized"})
    }
    const isblacklisted=await blacklistTokenModel.findOne({token})
    if(isblacklisted){
        return res.status(401).json({message:"unotharized"})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=await userModel.findById(decoded._id)
        req.user=user;
        return next();

    }catch(err){
        return res.status(401).json({
            message:"unotharized"
            
        })

    }
}
module.exports.authcaptain=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"unotharized"})
    }
    const isblacklisted=await blacklistTokenModel.findOne({token})
    if(isblacklisted){
        return res.status(401).json({message:"unotharized"})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const captain=await captainModel.findById(decoded._id)
        req.captain=captain;
        return next();

    }catch(err){
        return res.status(401).json({
            message:"unotharized"
            
        })            
    }
}