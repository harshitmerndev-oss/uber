const mongoose =require('mongoose');
const dns=require("dns");
dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
])
function connectdb(){
    // SUGGESTION: Return this promise so server startup can react if the database connection fails.
    mongoose.connect(process.env.DB_CONNECT)
    .then(()=>{
    console.log("connect to to db")
        
 } ).catch(err=>console.log(err));
}
module.exports=connectdb
