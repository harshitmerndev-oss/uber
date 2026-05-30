const userModel =require('../models/user.model')
const userservice=require("../services/user.service")
const {validationResult}=require("express-validator")

module.exports.registeruser=async(req, res,next)=>{
    // SUGGESTION: Wrap async controller code in try/catch and call next(error) for failed DB/hash operations.
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
        
    }
    const {fullname,email,password}=req.body;
    const hashedpassword=await userModel.hashPassword(password)
    const user=await userservice.createuser({
        firstname:fullname.firstname,

        lastname:fullname.lastname,
        email,
        password:hashedpassword
    })
const token=user.generateAuthToken();
res.status(201).json({
    token,
    user
})
}

module.exports.loginuser=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body;
    const user=await userModel.findOne({email}).select('+password')
    if(!user){
        return res.status(401).json({
            message:"Invalid email or password"
        })
    }
    const ismatch=await user.comparePassword(password);
    if(!ismatch){
        return res.status(401).json({
            message:"invalid email or password"
        })
    }
    const token=user.generateAuthToken();
    res.status(200).json({token,user})
}