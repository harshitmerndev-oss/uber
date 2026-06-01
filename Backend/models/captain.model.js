const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 character or long"],
            trim: true
        },
        lastname: {
            type: String,
            minlength: [3, "Last name must be at least 3 character or long"],
            trim: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be at 5 character long"],
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    socketID:{
        type: String
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle:{
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 character or long"]
            
        },
        plate: {
            type: String,
            required:true,
            minlength: [3, "Plate must be at least 3 character or long"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1 person"]

        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', "motorcycle","auto"]
        }
    },
    loccation:{
        lat:{
            type: Number,
            
        },
        lng:{
            type: Number,
            
        }
    }
})
captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    return token;
};

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

captainSchema.methods.comparePassword = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    } catch (error) {
        console.log(error);
    }
}
module.exports = mongoose.model("Captain", captainSchema);