const dotenv=require("dotenv");
const cors=require("cors");
dotenv.config();
const express =require("express");
const app=express();
const connectdb=require("./db/db")
app.use(cors());
const useroutes=require("./routes/user.routes")
connectdb();

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.get("/",(req,res)=>{
    res.send("hello world")
})
app.use('/users',useroutes)
module.exports=app;