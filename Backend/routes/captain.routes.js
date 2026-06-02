const express=require('express');
const router=express.Router();
const {body}=require("express-validator");
 const captaincontroller=require("../controllers/captain.controller")
 const authmiddleware=require("../middlewares/auth.middleware")
router.post("/register",
  [body("email").isEmail().withMessage("invalid email"),body("fullname.firstname").isLength({min:3}).withMessage("first name must be at least 3 character long"),
    body("password").isLength({min:6}).withMessage("password must be at least 6 character long"),body("vehicle.color").isLength({min:3}).withMessage("color must be at least 3 character long"),
    body("vehicle.plate").isLength({min:3}).withMessage("plate must be at least 3 character long"),
    body("vehicle.capacity").isInt({min:1}).withMessage("capacity must be a atleast 1"),
    body("vehicle.vehicleType").isIn(['car','motorcycle','auto']).withMessage("vehicleType must be a valid option")
  ]  ,captaincontroller.registercaptain)

  router.post("/login",[
    body("email").isEmail().withMessage("invalid email"),
    body("password").isLength({min:6}).withMessage("password must be at least 6 character long")
  ],captaincontroller.logincaptain)
 router.get("/profile",authmiddleware.authcaptain, captaincontroller.getcaptainprofile)
 router.get("/logout",authmiddleware.authcaptain,captaincontroller.logoutcaptain)

module.exports=router;