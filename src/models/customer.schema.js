import mongoose from "mongoose";
import JWT from 'jsonwebtoken'
import config from '../config/index.js'

const customerDetails = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "Username is required"],
        trim : true,
        maxLength : [80 , "Username must not exceed 80 characters"]
    },
    email : {
        type : String,
        required : [true , "Email is required"],
        trim : true,
    },
    phNo : {
        type : Number,
        required : [true , "Phone number is required"]
    },
    address : {
        type : String,
        required : [true, "Address is required"]
    },
    custId : {
        type : Number
    },
    pin : {
        type : Number,
        default : 1234
    }
}, {timestamps : true})

customerDetails.methods = {
    getJWTToken : function() {
        JWT.sign({_id: this._id}, config.JWT_SECRET, {expiresIn : config.JWT_EXPIRY})
    }
}

export default mongoose.model("Customer" , customerDetails)