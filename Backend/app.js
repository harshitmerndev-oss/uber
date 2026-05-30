const dotenv=require("dotenv");
const cors=require("cors");
dotenv.config();
const express =require("express");
const app=express();
const connectdb=require("./db/db")
const useroutes=require("./routes/user.routes")
const cookieparser=require('cookie-parser')
connectdb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())


app.get("/",(req,res)=>{
    res.send("hello world")
})
app.use('/users',useroutes)
module.exports=app;