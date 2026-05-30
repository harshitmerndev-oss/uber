const usermodel=require("../models/user.model")

module.exports.createuser=async({
    firstname,lastname,email,password
})=>{
    if(!firstname || !email || !password){
        // SUGGESTION: Use `throw new Error(...)`; `new console.error(...)` is invalid.
        throw new console.error("all fields are required")
        
    }
    const user=usermodel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}
