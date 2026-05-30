const express=require('express');

const userController=require("../controllers/user.controller")
const {body}=require("express-validator");
// SUGGESTION: Remove unused imports to keep route files clean.
const userModel = require('../models/user.model');
const authmiddleware=require("../middlewares/auth.middleware")
const router=express.Router();

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    // SUGGESTION: The rule uses min: 6, but the message says 3 characters. Make both values match.
    body('fullname.firstname').isLength({min:6}).withMessage('First name must be at least 3 character long'),
    body('password').isLength({min:6}).withMessage("password must be at least 6 character long")
],userController.registeruser)



router.post("/login",[
    body('email').isEmail().withMessage("invalid Email"),
    body('password').isLength({min:6}).withMessage("pas")
], userController.loginuser)

router.get("/profile",authmiddleware.authuser ,userController.getuserprofile)
router.get("/logout",authmiddleware.authuser, userController.logoutuser)

module.exports=router;
